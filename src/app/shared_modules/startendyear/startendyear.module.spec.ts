import { StartendyearModule } from './startendyear.module';

describe('StartendyearcontrolModule', () => {
  let startendyearModule: StartendyearModule;

  beforeEach(() => {
    startendyearModule = new StartendyearModule();
  });

  it('should create an instance', () => {
    expect(startendyearModule).toBeTruthy();
  });
});
