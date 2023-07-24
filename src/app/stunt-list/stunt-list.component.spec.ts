import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuntListComponent } from './stunt-list.component';

describe('StuntListComponent', () => {
  let component: StuntListComponent;
  let fixture: ComponentFixture<StuntListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StuntListComponent]
    });
    fixture = TestBed.createComponent(StuntListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
