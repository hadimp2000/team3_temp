import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelinesListComponent } from './pipelines-list.component';

describe('PipelinesListComponent', () => {
  let component: PipelinesListComponent;
  let fixture: ComponentFixture<PipelinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelinesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
