import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSetTableComponent } from './data-set-table.component';

describe('DataSetTableComponent', () => {
  let component: DataSetTableComponent;
  let fixture: ComponentFixture<DataSetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSetTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
