import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/index';
import { OptionsserviceService, LoansService, StorageService } from '../_services/index';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-loanmore',
	templateUrl: './loanmore.component.html',
	styleUrls: ['./loanmore.component.css']
})
export class LoanmoreComponent implements OnInit {

	view = 'cheque';
	loan: any;
	public kycStatus = ['Request KYC', 'Pending KYC', 'View KYC'];
	public docsStatus = { '0': 'Request Documents Pickup', '2': 'View Document Pickups', '1': 'Pending Documents Pickup' };
	public schedule: any;
	public parentRouteId: number;
	public sub: any;
	public loading = false;
	public currentUser: any;
	public status = false;
	public docpickups: any;
	has_remita = false;
	constructor(public route: ActivatedRoute, public storageService: StorageService, public optionsService: OptionsserviceService, public loansService: LoansService, private DataService: DataService) {

	}
	ngOnInit() {
		this.currentUser = this.storageService.read<any>('currentUser');
		this.has_remita = this.storageService.read<any>('has_remita');
		this.optionsService.getDocTypes().subscribe(docpickups => this.docpickups = docpickups);
		this.sub = this.route.parent.params.subscribe(params => {
			this.parentRouteId = +params["id"];
			this.loansService.getLoan(this.currentUser.token, this.parentRouteId)
				.subscribe(loan => {
					this.loan = loan


				});
		});
	}

	open(section) {
		this.view = section;
	}
	close() {
		this.view = 'cheque';
	}

	// Load Modals for action links
	acceptContract() {
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'accept_contract_mod', data: this.loan });
	}
	requestFinancials() {
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'request_financial_mod', data: this.loan });
	}
	requestOthers() {
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'request_others_mod', data: this.loan });
	}
	requestGuarantors() {
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'request_guarantor_mod', data: this.loan });
	}
	requestToGetPaid() {
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'request_to_get_paid', data: this.loan });
	}

	requestKYC() {
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'request_kyc_mod', data: this.loan });
	}

	requestDocs() {
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'request_docs_mod', data: this.loan, docpickups: this.docpickups });
	}

	deleteRequest() {
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'delete_request_mod', data: this.loan });
	}
	sendBVN() {
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'send_bvn_mod', data: this.loan });
	}

	requestCard() {
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'request_card_mod', data: this.loan });
	}

	sendContract() {
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'send_contract_mod', data: this.loan });
	}

	confirmAccount() {
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'confirm_account_mod', data: this.loan });
	}

	setupdirectdebit() {
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'setup_debit_mandate', data: this.loan });
	}
	checkdirectdebitstatus(){
		this.DataService.onOpenLoanChildModal.emit({ 'location': 'check_debit_mandate', data: this.loan });
	}
	assignLoanOfficer(){
		this.DataService.onChangeLoanOfficer.emit({loan: this.loan});
	}
}
