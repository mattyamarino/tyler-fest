import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuntHistoryComponent } from './stunt-history.component';

describe('StuntHistoryComponent', () => {
  let component: StuntHistoryComponent;
  let fixture: ComponentFixture<StuntHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StuntHistoryComponent]
    });
    fixture = TestBed.createComponent(StuntHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
