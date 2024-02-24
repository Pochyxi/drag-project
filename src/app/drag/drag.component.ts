import {Component} from '@angular/core';
import html2canvas from "html2canvas";

class Ticket {
  ticketId: string;
  ticketName: string;
  status: string;

  constructor({ticketId = '', ticketName = '', status = ''}: {
    ticketId?: string,
    ticketName?: string,
    status?: string
  } = {}) {
    this.ticketId = ticketId;
    this.ticketName = ticketName;
    this.status = status;
  }
}

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss']
})
export class DragComponent {
  DONE = 'Done';
  IN_PROGRESS = 'In Progress';
  TO_DO = 'To Do';

  ticketsArray: Ticket[] = [
    {"ticketId": "adi-1", "ticketName": "Recupero password", "status": "To Do"},
    {"ticketId": "adi-2", "ticketName": "Aggiornamento software", "status": "In Progress"},
    {"ticketId": "adi-3", "ticketName": "Risoluzione bug grafico", "status": "Done"},
    {"ticketId": "adi-4", "ticketName": "Ottimizzazione database", "status": "To Do"},
    {"ticketId": "adi-5", "ticketName": "Implementazione nuova feature", "status": "In Progress"},
    {"ticketId": "adi-6", "ticketName": "Miglioramento sicurezza sistema", "status": "Done"},
    {"ticketId": "adi-7", "ticketName": "Refactoring codice", "status": "To Do"},
    {"ticketId": "adi-8", "ticketName": "Integrazione API esterne", "status": "In Progress"},
    {"ticketId": "adi-9", "ticketName": "Test prestazionali", "status": "Done"},
    {"ticketId": "adi-10", "ticketName": "Rinnovo certificati SSL", "status": "To Do"}
  ];
  currentItem = new Ticket();

  overColumn = '';

  filterTickets(status: string) {
    return this.ticketsArray.filter(ticket => ticket.status === status);
  }

  // Inizio trascinamento
  onDragStart(item: Ticket) {
    console.log('onDragStart', item);
    this.currentItem = item;
  }

  // Fine trascinamento
  onDrop(event: DragEvent, status: string) {
    console.log('onDrop', event);
    console.log(this.currentItem);

    const ticket = this.ticketsArray.find(ticket => ticket.ticketId === this.currentItem.ticketId);

    if (ticket) {
      ticket.status = status;
    }

    this.currentItem = new Ticket();
    // console.log('Verifica della presenza del ticket', ticket);
    // console.log(this.filterTickets(this.TO_DO));
    //
    // console.log('Verifica del resetto del currentItem');
    // console.log(this.currentItem);

    this.overColumn = '';
    event.target && (event.target as HTMLElement).classList.remove('card-drag-over');
  }

  // Trascinamento al passaggio sopra
  onDragOver(event: DragEvent, sectionName: string) {
    if(this.overColumn !== sectionName) {
      this.overColumn = sectionName;

      if (this.currentItem.status === sectionName) {
        return;
      }

      const target = event.target as HTMLElement;
      target.classList.add('card-drag-over');
    }

    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    this.overColumn = '';
    event.target && (event.target as HTMLElement).classList.remove('card-drag-over');
  }
}
