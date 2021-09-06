import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcessModalComponent } from './add-process-modal.component';

describe('AddProcessModalComponent', () => {
  let component: AddProcessModalComponent;
  let fixture: ComponentFixture<AddProcessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProcessModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProcessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
