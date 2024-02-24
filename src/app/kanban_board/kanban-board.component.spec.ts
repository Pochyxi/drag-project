import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoard } from './kanban-board.component';

describe('DragComponent', () => {
  let component: KanbanBoard;
  let fixture: ComponentFixture<KanbanBoard>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KanbanBoard]
    });
    fixture = TestBed.createComponent(KanbanBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
