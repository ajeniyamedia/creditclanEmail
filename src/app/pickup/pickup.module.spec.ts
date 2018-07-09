import { PickupModule } from './pickup.module';

describe('PickupModule', () => {
  let pickupModule: PickupModule;

  beforeEach(() => {
    pickupModule = new PickupModule();
  });

  it('should create an instance', () => {
    expect(pickupModule).toBeTruthy();
  });
});
