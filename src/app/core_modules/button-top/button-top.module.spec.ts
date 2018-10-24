import { ButtonTopModule } from './button-top.module';

describe('ButtonTopModule', () => {
  let buttonTopModule: ButtonTopModule;

  beforeEach(() => {
    buttonTopModule = new ButtonTopModule();
  });

  it('should create an instance', () => {
    expect(buttonTopModule).toBeTruthy();
  });
});
