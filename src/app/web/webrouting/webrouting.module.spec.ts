import { WebroutingModule } from './webrouting.module';

describe('WebroutingModule', () => {
  let webroutingModule: WebroutingModule;

  beforeEach(() => {
    webroutingModule = new WebroutingModule();
  });

  it('should create an instance', () => {
    expect(webroutingModule).toBeTruthy();
  });
});
