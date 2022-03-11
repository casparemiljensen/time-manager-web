import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeregistrationDetailComponent } from './timeregistration-detail.component';

describe('TimeregistrationDetailComponent', () => {
  let component: TimeregistrationDetailComponent;
  let fixture: ComponentFixture<TimeregistrationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeregistrationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeregistrationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
