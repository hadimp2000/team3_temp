import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinDetailsComponent } from './join-details.component';

describe('JoinDetailsComponent', () => {
  let component: JoinDetailsComponent;
  let fixture: ComponentFixture<JoinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
