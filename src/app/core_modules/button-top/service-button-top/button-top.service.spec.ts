import { TestBed } from '@angular/core/testing';

import { ButtonTopService } from './button-top.service';

describe('ButtonTopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ButtonTopService = TestBed.get(ButtonTopService);
    expect(service).toBeTruthy();
  });
});
