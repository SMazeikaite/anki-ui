import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityVisualiserComponent } from './activity-visualiser.component';

describe('ActivityVisualiserComponent', () => {
  let component: ActivityVisualiserComponent;
  let fixture: ComponentFixture<ActivityVisualiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityVisualiserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityVisualiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
