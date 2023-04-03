import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckVisualisationComponent } from './deck-visualisation.component';

describe('DeckVisualisationComponent', () => {
  let component: DeckVisualisationComponent;
  let fixture: ComponentFixture<DeckVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckVisualisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
