import { SettingModuleModule } from './setting-module.module';

describe('SettingModuleModule', () => {
  let settingModuleModule: SettingModuleModule;

  beforeEach(() => {
    settingModuleModule = new SettingModuleModule();
  });

  it('should create an instance', () => {
    expect(settingModuleModule).toBeTruthy();
  });
});
