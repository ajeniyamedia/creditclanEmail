import { SettingsroutingModule } from './settingsrouting.module';

describe('SettingsroutingModule', () => {
  let settingsroutingModule: SettingsroutingModule;

  beforeEach(() => {
    settingsroutingModule = new SettingsroutingModule();
  });

  it('should create an instance', () => {
    expect(settingsroutingModule).toBeTruthy();
  });
});
