import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanBoard } from './kanban_board/kanban-board.component';
import { CarteComponent } from './kanban_board/colonna/carta/carte.component';
import {ColonnaComponent} from "./kanban_board/colonna/colonna.component";

@NgModule({
  declarations: [
    AppComponent,
    KanbanBoard,
    ColonnaComponent,
    CarteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
