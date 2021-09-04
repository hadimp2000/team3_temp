import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDetailsComponent } from './filter-details.component';

describe('FilterDetailsComponent', () => {
  let component: FilterDetailsComponent;
  let fixture: ComponentFixture<FilterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
