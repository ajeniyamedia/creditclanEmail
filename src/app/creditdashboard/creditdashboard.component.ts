import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ApprovalsService, DataService, UserService, OperationsService, AuthenticationService, StorageService, AnalyticsService } from '../_services/index';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnonymousSubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-creditdashboard',
  templateUrl: './creditdashboard.component.html',
  styleUrls: ['./creditdashboard.component.css']
})
export class CreditdashboardComponent implements OnInit {
  DISBURSEMENTS:any;
  DASHBOARD_TM:any;
  // Vertical BarChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0], label: 'Booked' },
    { data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0], label: 'Collected' }
  ];
  emp_perf = {
    PEOPLE_PEOPLE_ID: '',
    TPDATE: '',
    TPDATE_: '',
    CATEGORY: ''
  }
  pie_perf = { 
    PIETPDATE: '',
    PIETPDATE_: '',
    CATEGORY: '1',
    SUBCATEGORY:'',
    SUBSTAFFCATEGORY:''
  }
  pps_perf = { 
    PPSTPDATE: '',
    PPSTPDATE_: '', 
  }
  platform_performance:any;
  // Doughnut
  public doughnutChartLabels: string[] = ['', '', '','',''];
  public doughnutChartData: number[] = [0, 0, 0];
  public doughnutChartLegent: any = { 'display': false, 'position': 'bottom' };
  public doughnutChartType: string = 'doughnut';
  public doughnutChartOptions: any = {
    legend: {
      position: 'right'
    }
  };
  running_employee_performace = false;
  employee_performance: any;
  filterStatus = 'date_duration';
  public filter_types = [
    {
      'display': 'Date Range',
      'value': 'date_duration'
    },
    {
      'display': 'Report Category',
      'value': 'category'
    }
  ]
  public report_categories = [
    {
      'display': 'Customer',
      'value': '1'
    },
    {
      'display': 'Loans',
      'value': '2'
    }
    ,
    {
      'display': 'Performance',
      'value': '3'
    }
  ]
  bar_form = {
    BAR_CATEGORY: {},
    BAR_STYLE: '0'
  }
  public bar_categories = [
    {
      'display': '--select--',
      'value': '0'
    },
    {
      'display': 'Booked / Collected',
      'value': '1'
    },
    {
      'display': 'Collections / Due',
      'value': '2'
    }
    ,
    {
      'display': 'Disbursed / Repaid',
      'value': '3'
    },
    {
      'display': 'Repayment Analysis',
      'value': '4'
    },
    {
      'display': 'Tenure Analysis',
      'value': '5'
    }
    ,
    {
      'display': 'Loan Revenue',
      'value': '6'
    }
  ]
  loan_viewed = 0;
  approvals_size = '0';
  public timerSubscription: AnonymousSubscription;
  public postsSubscription: AnonymousSubscription;
  public approvals: any;
  public loading = false;
  public preloading = true;
  public currentUser: any;
  public dashboarddata: any;
  public dashboardFilter = { byMe: false };
  public repayments = 2;
  public bottomSection = false
  //public myCount = 0;
  public disbursements: any;
  public expiring_loans: any;
  public showingWalletSummary = false;
  public showingAvgPTime = false;
  public showingDisburseSummary = false;
  public loans_summary: any;
  current = '0';
  public summaryOpen = false;
  public showingAvgLRate = false;
  public showinglandb = false;
  public showingLInv = false;
  public showingPInv = false;
  public approvalsOpen = false;
  public userClosedView = false;
  employees: any;
  is_company_staff=false; 
  piefilterStatus = 'date_duration';
  piefilterStatusCategory = '';
  public pie_filter_types = [
    {
      'display': 'Date Range',
      'value': 'date_duration'
    },
    {
      'display': 'Distribution',
      'value': 'distribution'
    }
  ]
  public pie_report_categories = [
    {
      'display': 'Loan Status',
      'value': '1'
    },
    {
      'display': 'Request',
      'value': '2'
    }
    ,
    {
      'display': 'Staff Report',
      'value': '3'
    }
  ]
  public pie_report_subcategories = [
    {
      'display': 'Occupation',
      'value': '1'
    },
    {
      'display': 'Sector',
      'value': '2'
    }
    ,
    {
      'display': 'State of Origin',
      'value': '3'
    },
    {
      'display': 'Marital Status',
      'value': '4'
    },
    {
      'display': 'Gender',
      'value': '5'
    }
    ,
    {
      'display': 'Income',
      'value': '6'
    },
    {
      'display': 'Home Address State',
      'value': '7'
    }
  ]
  public pie_staff_subcategories = [
    {
      'display': 'Occupation',
      'value': '1'
    },
    {
      'display': 'Sector',
      'value': '2'
    }
    ,
    {
      'display': 'State of Origin',
      'value': '3'
    },
    {
      'display': 'Marital Status',
      'value': '4'
    },
    {
      'display': 'Gender',
      'value': '5'
    }
    ,
    {
      'display': 'Income',
      'value': '6'
    },
    {
      'display': 'Home Address State',
      'value': '7'
    }
  ]
  platform_analysis_view = 'first';
  constructor(public analytics: AnalyticsService, public approvalService: ApprovalsService, public DataService: DataService, 
    public router: Router, public fb: FormBuilder, public operationsService: OperationsService, 
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.DataService.onRequestCreated.subscribe(res => {
      this.loadDashboardData();

    })
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      this.summaryOpen = true;
    }

  }
  closeWalletSummary() {
    this.showingWalletSummary = false;
  }
  showAvgPTime() {
    this.showingAvgPTime = false;
  }
  showDisburseSumm() {
    this.showingDisburseSummary = false;
  }
  // onCountoEnd(): void {
  //   console.log('counto end');
  // }
  loadDashboardData() {
    this.operationsService.loadDashboard(this.currentUser.token, this.dashboardFilter)
      .subscribe(dashboarddatas => {
        if (dashboarddatas == false) {
          this.router.navigate(['/login']);
        } else { 
          this.preloading = false;
          this.dashboarddata = dashboarddatas;
          this.repayments = dashboarddatas.REPAYMENTS;  
          //this.loans_summary = dashboarddatas.loans_summary;
          this.employees = dashboarddatas.employees;
        }

      });

  }
  currentStats() {
    this.operationsService.currentStats(this.currentUser.token, this.dashboardFilter)
      .subscribe(dashboarddatas => {
        if (dashboarddatas == false) {
          this.router.navigate(['/login']);
        } else { 
          this.DASHBOARD_TM = dashboarddatas; 
          this.DISBURSEMENTS = dashboarddatas.DISBURSEMENTS;
        }

      });

  }
  
  ngOnInit() {
    const self = this;
    this.loadDashboardData();
    this.currentStats();
    setTimeout(function () {
      self.refreshData();
    }, 2000);
    this.bar_form.BAR_STYLE = '1';
    this.bar_form.BAR_CATEGORY = this.bar_categories[0];
    this.runPiePerformance();
    this.is_company_staff = this.storageService.read<any>('is_company_staff');
  }
  public refreshData(): void {

    this.postsSubscription = this.approvalService.getApprovals(this.currentUser.token).subscribe(approvals => {
      if (approvals.size == '0') {

      } else {
        this.approvals = approvals.approvals;
        this.approvals_size = approvals.size;
        if (!this.approvalsOpen) {
          if (!this.userClosedView) {
            this.approvalsOpen = true;
            this.loan_viewed = approvals.loan_viewed;
          }

        }

      }
      this.subscribeToData();
    });
  }
  closeShowInterest() {
    this.approvalsOpen = false;
    this.userClosedView = true;
  }
  public ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  public subscribeToData(): void {
    //this.timerSubscription = Observable.timer(10000).first().subscribe(() => this.refreshData());
  }
  
  runPlatformAnalysis(){
    this.barChartLabels = ['Jan','Feb','Mar','Apr','May','June','Jul','Aug','Sept','Oct','Nov','Dec']
    this.loading = true;
    this.analytics.runPlatformAnalysis(this.currentUser.token, this.bar_form)
      .subscribe(platform_analysis => {
        this.loading = false;
        this.barChartData = JSON.parse(JSON.stringify(platform_analysis.data));

      });
  }
  pps_performance:any;
  runPPSPerformance(){ 
    this.loading = true;
    this.analytics.runPPSPerformance(this.currentUser.token, this.pps_perf)
      .subscribe(platform_analysis => {
        this.loading = false;
        this.pps_performance = platform_analysis;

      });
  }
  

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;

  }
 
  runPiePerformance() {
    
    this.loading = true;
    this.analytics.runPiePerformance(this.currentUser.token, this.pie_perf)
      .subscribe(employee_performance => {
        this.running_employee_performace = false;
        this.platform_performance = employee_performance;
        this.doughnutChartLabels = employee_performance.labels;
        this.doughnutChartData = employee_performance.data;
      });

  }
 
  changeFilter(event) {
    this.filterStatus = event.target.value
  }
  runEmployeePerformance() {

    this.running_employee_performace = true;
    this.analytics.runEmployeePerformance(this.currentUser.token, this.emp_perf)
      .subscribe(employee_performance => {
        this.running_employee_performace = false;
        this.employee_performance = employee_performance;

      });

  }
  
  changePieFilter(event) {
    this.piefilterStatus = event.target.value
  }
  changePieFilterCategory(event) {
    this.piefilterStatusCategory = event.target.value
  }
  

}
