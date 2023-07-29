import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuntFormComponent } from './stunt-form.component';

describe('StuntFormComponent', () => {
  let component: StuntFormComponent;
  let fixture: ComponentFixture<StuntFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StuntFormComponent]
    });
    fixture = TestBed.createComponent(StuntFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
