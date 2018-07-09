export class OfferModel {
    constructor( 
        public REQUEST_ID: string,
        public PLATFORM_ID: string,
        public BORROWER_ID: string,
        public BID_PRINCIPAL:string,
        public BID_TENOR:string,
        public BID_PERIOD_ID:string,
        public BID_RATE:string,
        public BID_RATE_PERIOD_ID:string,
        public IS_GENERAL_LENDING:string,
        public OFFER_STATUS?:string
        
      ) { }
}
