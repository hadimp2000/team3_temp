import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlFormModalComponent } from './sql-form-modal.component';

describe('SqlFormModalComponent', () => {
  let component: SqlFormModalComponent;
  let fixture: ComponentFixture<SqlFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqlFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
