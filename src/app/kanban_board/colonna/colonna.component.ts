import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Carta} from "../kanban-board.component";

@Component({
  selector: 'app-colonna',
  templateUrl: './colonna.component.html',
  styleUrls: ['./colonna.component.scss']
})
export class ColonnaComponent {
  // Classe della colonna
  @Input() classeColonna = '';
  // Titolo della colonna
  @Input() titoloColonna = '';

  // Array di carte che arriva filtrato per colonna
  @Input() arrayDiCarte: Carta[] = [];

  // Event emitters per i drag
  @Output() onDrop = new EventEmitter<[DragEvent, string]>();
  @Output() onDragOver = new EventEmitter<[DragEvent, string]>();
  @Output() onDragLeave = new EventEmitter<DragEvent>();
  @Output() onDragStart = new EventEmitter<Carta>();

  onDropEmit(evento: DragEvent, colonna: string) {
    this.onDrop.emit([evento, colonna]);
  }

  onDragOverEmit(evento: DragEvent, colonna: string) {
    this.onDragOver.emit([evento, colonna]);
  }

  onDragLeaveEmit(evento: DragEvent) {
    this.onDragLeave.emit(evento);
  }

  onDragStartEmit(evento: Carta) {
    this.onDragStart.emit(evento);
  }
}
