import { InvestorsModule } from './investors.module';

describe('InvestorsModule', () => {
  let investorsModule: InvestorsModule;

  beforeEach(() => {
    investorsModule = new InvestorsModule();
  });

  it('should create an instance', () => {
    expect(investorsModule).toBeTruthy();
  });
});
