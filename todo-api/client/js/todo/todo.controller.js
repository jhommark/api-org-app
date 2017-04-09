(function() {
  'use strict';

  angular
    .module('app.todos', [])
    .controller('TodoController', TodoController);

  TodoController.$inject = ['$state', 'Todo', 'Note'];

  function TodoController($state, Todo, Note) {
    var vm = this;

    vm.todo;
    vm.loading = false;
    vm.refreshTodos = refreshTodos;
    vm.add = addTodo;
    vm.edit = editTodo;
    vm.saveEdit = saveEdit;
    vm.transfer = transferTodo;
    vm.delete = deleteTodo;
    vm.update = updateTodo;

    vm.refreshTodos();

    function refreshTodos() {
      vm.todos = Todo.find();
    }

    function addTodo() {
      vm.loading = true;

      Todo.create({entry: vm.todo.entry, isDone: false})
        .$promise
        .then(function (todo) {
          vm.todos.push(todo);
          vm.todo.entry = '';
          vm.loading = false;
          $('.modal').modal('hide');
        });
    }

    function editTodo(todo) {
      vm.form = angular.copy(todo);
    }

    function saveEdit() {
      vm.update(vm.form);
      $('.modal').modal('hide');
      vm.refreshTodos();
    }

    function transferTodo(todo) {
      if (!confirm("Are you sure you want to transfer this entry to 'Note list'?")) return;

      vm.loading = true;

      Todo.deleteById({id: todo.id})
        .$promise
        .then(function () {
          vm.todos.splice(vm.todos.indexOf(todo), 1);
          Note.create({title: todo.entry})
            .$promise
            .then(function () {
              $state.go('notes');
            });
          vm.loading = false;
        });
    }

    function deleteTodo(todo) {
      if (!confirm('Are you sure you want to delete the entry?')) return;

      vm.loading = true;

      Todo.deleteById({id: todo.id})
        .$promise
        .then(function () {
          vm.todos.splice(vm.todos.indexOf(todo), 1);
          vm.loading = false;
        });
    }

    function updateTodo(todo) {
      todo.$save();
    }
  }
}());
