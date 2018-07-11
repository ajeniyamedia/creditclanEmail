import { WebModule } from './web.module';

describe('WebModule', () => {
  let webModule: WebModule;

  beforeEach(() => {
    webModule = new WebModule();
  });

  it('should create an instance', () => {
    expect(webModule).toBeTruthy();
  });
});
