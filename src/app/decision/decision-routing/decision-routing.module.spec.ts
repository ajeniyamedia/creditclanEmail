import { DecisionRoutingModule } from './decision-routing.module';

describe('DecisionRoutingModule', () => {
  let decisionRoutingModule: DecisionRoutingModule;

  beforeEach(() => {
    decisionRoutingModule = new DecisionRoutingModule();
  });

  it('should create an instance', () => {
    expect(decisionRoutingModule).toBeTruthy();
  });
});
