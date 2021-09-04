import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineBoardComponent } from './pipeline-board.component';

describe('PipelineBoardComponent', () => {
  let component: PipelineBoardComponent;
  let fixture: ComponentFixture<PipelineBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
