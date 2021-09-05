import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregateDetailsComponent } from './aggregate-details.component';

describe('AggregateDetailsComponent', () => {
  let component: AggregateDetailsComponent;
  let fixture: ComponentFixture<AggregateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
