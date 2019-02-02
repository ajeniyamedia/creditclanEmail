import { ProductroutingModule } from './productrouting.module';

describe('ProductroutingModule', () => {
  let productroutingModule: ProductroutingModule;

  beforeEach(() => {
    productroutingModule = new ProductroutingModule();
  });

  it('should create an instance', () => {
    expect(productroutingModule).toBeTruthy();
  });
});
