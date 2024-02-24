import {Component} from '@angular/core';
import html2canvas from "html2canvas";

class Carta {
  idCarta: string;
  nomeTask: string;
  colonnaDiAppartenenza: string;

  constructor({idCarta = '', nomeTask = '', colonnaDiAppartenenza = ''}: {
    idCarta?: string,
    nomeTask?: string,
    colonnaDiAppartenenza?: string
  } = {}) {
    this.idCarta = idCarta;
    this.nomeTask = nomeTask;
    this.colonnaDiAppartenenza = colonnaDiAppartenenza;
  }
}

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss']
})
export class DragComponent {
  // Costanti per le colonne
  COMPLETATO = 'COMPLETATO';
  IN_ESECUZIONE = 'IN ESECUZIONE';
  DA_COMPLETARE = 'DA COMPLETARE';

  // Mockup di dati
  arrayDiCarte: Carta[] = [
    {"idCarta": "adi-1", "nomeTask": "Recupero password", "colonnaDiAppartenenza": "DA COMPLETARE"},
    {"idCarta": "adi-2", "nomeTask": "Aggiornamento software", "colonnaDiAppartenenza": "IN ESECUZIONE"},
    {"idCarta": "adi-3", "nomeTask": "Risoluzione bug grafico", "colonnaDiAppartenenza": "COMPLETATO"},
    {"idCarta": "adi-4", "nomeTask": "Ottimizzazione database", "colonnaDiAppartenenza": "DA COMPLETARE"},
    {"idCarta": "adi-5", "nomeTask": "Implementazione nuova feature", "colonnaDiAppartenenza": "IN ESECUZIONE"},
    {"idCarta": "adi-6", "nomeTask": "Miglioramento sicurezza sistema", "colonnaDiAppartenenza": "COMPLETATO"},
    {"idCarta": "adi-7", "nomeTask": "Refactoring codice", "colonnaDiAppartenenza": "DA COMPLETARE"},
    {"idCarta": "adi-8", "nomeTask": "Integrazione API esterne", "colonnaDiAppartenenza": "IN ESECUZIONE"},
    {"idCarta": "adi-9", "nomeTask": "Test prestazionali", "colonnaDiAppartenenza": "COMPLETATO"},
    {"idCarta": "adi-10", "nomeTask": "Rinnovo certificati SSL", "colonnaDiAppartenenza": "DA COMPLETARE"},
  ];

  // Card corrente trascinata
  cartaTrascinata = new Carta();

  // Colonna su cui si sta trascinando la carta
  colonnaDragOver = '';

  // Inizio trascinamento
  onDragStart(item: Carta) {
    // Imposto l'elemento corrente trascinato
    this.cartaTrascinata = item;
  }

  // Trascinamento al passaggio sopra
  onDragOver(evento: DragEvent, nomeSezione: string) {
    evento.preventDefault();

    // Evita di eseguire il codice se la colonna è già evidenziata
    if (this.colonnaDragOver !== nomeSezione) {
      this.colonnaDragOver = nomeSezione;

      // Se la carta è nella colonna di partenza, non fare nulla
      if (this.cartaTrascinata.colonnaDiAppartenenza !== nomeSezione) {

        // Aggiungo la classe di passaggio
        this.manipolazioneClassePassaggio(evento, true);
      } else {
        this.colonnaDragOver = '';
      }
    }
  }

  // Trascinamento al passaggio fuori
  onDragLeave(evento: DragEvent) {
    evento.preventDefault();

    // Resetto la colonna evidenziata
    this.colonnaDragOver = '';

    // Rimuovo la classe di passaggio
    this.manipolazioneClassePassaggio(evento);
  }

  // Fine trascinamento
  onDrop(evento: DragEvent, colonnaDiAppartenenza: string) {
    evento.preventDefault();

    // Recupero la carta corrispondente
    const carta = this.arrayDiCarte.find(carta => carta.idCarta === this.cartaTrascinata.idCarta);

    // Aggiorno lo stato della carta
    if (carta) {
      carta.colonnaDiAppartenenza = colonnaDiAppartenenza;
    }

    // Resetto la carta corrente e la colonna evidenziata
    this.cartaTrascinata = new Carta();
    this.colonnaDragOver = '';

    // Rimuovo la classe di passaggio
    this.manipolazioneClassePassaggio(evento);
  }

  // Filtra tutte le carte per stato
  filtraCartePerColonna(stato: string) {
    return this.arrayDiCarte.filter(carta => carta.colonnaDiAppartenenza === stato);
  }

  manipolazioneClassePassaggio(evento: DragEvent, add?: boolean) {
    // recupero l'elemento che ha scatenato l'evento
    let colonnaNellHTML = evento.target as HTMLElement;

    // Questo approccio evita che anche le carta figlie vengano evidenziate
    const colonnaPiuVicina = colonnaNellHTML.closest('.colonna_kanban');
    if (colonnaPiuVicina) {
      if (add) {
        colonnaPiuVicina.classList.add('la_carta_sta_passando');
      } else {
        colonnaPiuVicina.classList.remove('la_carta_sta_passando');
      }
    }

  }
}
