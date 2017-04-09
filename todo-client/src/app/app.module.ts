import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { TodoComponent } from './todo/todo.component';

import { NoteApi as NoteService, TodoApi as TodoService } from './lb-services';

const appRoutes: Routes = [
  {
    path: 'notes',
    component: NoteComponent,
    data: { title: 'Notes' }
  },
  {
    path: 'todos',
    component: TodoComponent,
    data: { title: 'Todos' }
  },
  { path: '',
    redirectTo: '/notes',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [NoteService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
