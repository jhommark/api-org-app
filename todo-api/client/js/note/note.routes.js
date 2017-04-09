(function() {
  'use strict';

  angular
    .module('app.notes')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'notes',
        config: {
          url: '/notes',
          templateUrl: '/js/note/note.html',
          controller: 'NoteController',
          controllerAs: 'vm',
          title: 'Notes'
        }
      }
    ];
  }
})();
