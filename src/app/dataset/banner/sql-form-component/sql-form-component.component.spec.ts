import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlFormComponentComponent } from './sql-form-component.component';

describe('SqlFormComponentComponent', () => {
  let component: SqlFormComponentComponent;
  let fixture: ComponentFixture<SqlFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqlFormComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
