(function() {
  'use strict';

  angular
    .module('app.notes', [])
    .controller('NoteController', NoteController);

  NoteController.$inject = ['$state', 'Note', 'Todo'];

  function NoteController($state, Note, Todo) {
    var vm = this;

    vm.note;
    vm.loading = false;
    vm.refreshNotes = refreshNotes;
    vm.add = addNote;
    vm.edit = editNote;
    vm.saveEdit = saveEdit;
    vm.transfer = transferNote;
    vm.delete = deleteNote;
    vm.update = updateNote;

    vm.refreshNotes();

    function refreshNotes() {
      vm.notes = Note.find();
    }

    function addNote() {
      vm.loading = true;

      Note.create({title: vm.note.title, text: vm.note.text})
        .$promise
        .then(function (note) {
          vm.notes.push(note);
          vm.note.title = '';
          vm.note.text = '';
          vm.loading = false;
          $('.modal').modal('hide');
        });
    }

    function editNote(note) {
      vm.form = angular.copy(note);
    }

    function saveEdit() {
      vm.update(vm.form);
      $('.modal').modal('hide');
      vm.refreshNotes();
    }

    function transferNote(note) {
      if (!confirm("Are you sure you want to transfer this entry to 'Todo list'?")) return;

      vm.loading = true;

      Note.deleteById({id: note.id})
        .$promise
        .then(function () {
          vm.notes.splice(vm.notes.indexOf(note), 1);
          Todo.create({entry: note.title, isDone: false})
            .$promise
            .then(function () {
              $state.go('todos');
            });
          vm.loading = false;
        });
    }

    function deleteNote(note) {
      if (!confirm('Are you sure you want to delete the entry?')) return;

      vm.loading = true;

      Note.deleteById({id: note.id})
        .$promise
        .then(function () {
          vm.notes.splice(vm.notes.indexOf(note), 1);
          vm.loading = false;
        });
    }

    function updateNote(note) {
      note.$save();
    }
  }
}());
