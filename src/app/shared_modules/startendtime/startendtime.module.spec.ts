import { StartendtimeModule } from './startendtime.module';

describe('StartendtimeModule', () => {
  let startendtimeModule: StartendtimeModule;

  beforeEach(() => {
    startendtimeModule = new StartendtimeModule();
  });

  it('should create an instance', () => {
    expect(startendtimeModule).toBeTruthy();
  });
});
