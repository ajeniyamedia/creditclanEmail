import { KycModule } from './kyc.module';

describe('KycModule', () => {
  let kycModule: KycModule;

  beforeEach(() => {
    kycModule = new KycModule();
  });

  it('should create an instance', () => {
    expect(kycModule).toBeTruthy();
  });
});
