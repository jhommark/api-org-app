import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteApi as NoteService, TodoApi as TodoService } from '../lb-services';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  loading: boolean = false;
  notes: any = [];
  note: any;
  form: any;

  constructor(private Note: NoteService, private Todo: TodoService, private router: Router) { }

  refreshNotes() {
    this.Note.find().subscribe((notes: any) => {
      this.notes = notes;
    });
  }

  addNote() {
    this.loading = true;

    this.Note.create({title: this.note.title, text: this.note.text})
      .subscribe((note) => {
        this.notes.push(note);
        this.note.title = '';
        this.note.text = '';
        this.loading = false;
        // $('.modal').modal('hide');
      });
  }

  editNote(note) {
    // this.form = angular.copy(note);
  }

  saveEdit() {
    // this.Note.update(this.form);
    // $('.modal').modal('hide');
    this.refreshNotes();
  }

  transferNote(note) {
    if (!confirm("Are you sure you want to transfer this entry to 'Todo list'?")) return;

    this.loading = true;

    this.Note.deleteById({id: note.id})
      .subscribe(() => {
        this.notes.splice(this.notes.indexOf(note), 1);
        this.Todo.create({entry: note.title, isDone: false})
          .subscribe(() => {
            this.router.navigate(['/todos']);
          });
        this.loading = false;
      });
  }

  deleteNote(note) {
    if (!confirm('Are you sure you want to delete the entry?')) return;

    this.loading = true;

    this.Note.deleteById({id: note.id})
      .subscribe(() => {
        this.notes.splice(this.notes.indexOf(note), 1);
        this.loading = false;
      });
  }

  updateNote(note) {
    note.$save();
  }

  ngOnInit() {
    this.refreshNotes();
  }
}
