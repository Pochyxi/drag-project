import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Carta} from "../../kanban-board.component";


@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent {
  // Array di carte
  @Input() arrayDiCarte: Carta[] = [];

  // Evento di trascinamento
  @Output() onDragStart = new EventEmitter<Carta>();

  // Inizio trascinamento
  onDragStartEmit(evento: Carta) {
    this.onDragStart.emit(evento);
  }
}
