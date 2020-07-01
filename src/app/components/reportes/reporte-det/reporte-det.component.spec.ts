import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDetComponent } from './reporte-det.component';

describe('ReporteDetComponent', () => {
  let component: ReporteDetComponent;
  let fixture: ComponentFixture<ReporteDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
