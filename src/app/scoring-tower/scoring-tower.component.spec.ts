import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringTowerComponent } from './scoring-tower.component';

describe('ScoringTowerComponent', () => {
  let component: ScoringTowerComponent;
  let fixture: ComponentFixture<ScoringTowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoringTowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoringTowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
