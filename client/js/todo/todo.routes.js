(function() {
  'use strict';

  angular
    .module('app.todos')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'todos',
        config: {
          url: '/todos',
          templateUrl: '/js/todo/todo.html',
          controller: 'TodoController',
          controllerAs: 'vm',
          title: 'To Do'
        }
      }
    ];
  }
})();
