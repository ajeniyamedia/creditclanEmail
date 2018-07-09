import { DecisionModule } from './decision.module';

describe('DecisionModule', () => {
  let decisionModule: DecisionModule;

  beforeEach(() => {
    decisionModule = new DecisionModule();
  });

  it('should create an instance', () => {
    expect(decisionModule).toBeTruthy();
  });
});
