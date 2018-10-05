import { TopBarModule } from './top-bar.module';

describe('TopBarModule', () => {
  let topBarModule: TopBarModule;

  beforeEach(() => {
    topBarModule = new TopBarModule();
  });

  it('should create an instance', () => {
    expect(topBarModule).toBeTruthy();
  });
});
