import { TestBed } from '@angular/core/testing';

import { Agendas } from './agendas';

describe('Agendas', () => {
  let service: Agendas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Agendas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
