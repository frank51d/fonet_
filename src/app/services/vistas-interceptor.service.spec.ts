import { TestBed } from '@angular/core/testing';

import { VistasInterceptorService } from './vistas-interceptor.service';

describe('VistasInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VistasInterceptorService = TestBed.get(VistasInterceptorService);
    expect(service).toBeTruthy();
  });
});
