(function() {
  'use strict';

  angular
  .module('apiOrgApp', [
    'lbServices',
    'app.filters',
    'app.router',

    'app.notes',
    'app.todos'
  ])
  .run(appRun)
  .controller('AppController', AppController);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates([], '/notes');
  }

  AppController.$inject = ['$scope', '$location'];

  function AppController($scope, $location) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  }
})();
