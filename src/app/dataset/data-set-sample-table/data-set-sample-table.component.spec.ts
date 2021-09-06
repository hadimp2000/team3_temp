import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSetSampleTableComponent } from './data-set-sample-table.component';

describe('DataSetSampleTableComponent', () => {
  let component: DataSetSampleTableComponent;
  let fixture: ComponentFixture<DataSetSampleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSetSampleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSetSampleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
