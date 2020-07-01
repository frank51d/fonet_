import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoinOrdenComponent } from './doin-orden.component';

describe('DoinOrdenComponent', () => {
  let component: DoinOrdenComponent;
  let fixture: ComponentFixture<DoinOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoinOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoinOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
