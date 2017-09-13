import { uiModules } from 'ui/modules';

import 'plugins/sequence/directives/sequenceVisualization';

const module = uiModules.get('kibana/sequence', ['kibana']);

module.controller('SequenceController', function ($scope, $http) {
  $http.get('../api/sequence/indices').then((response) => {
    $scope.indices = response.data;
  });

  $http.get('../api/sequence/schema').then((response) => {
    $scope.schema = response.data;
  });

  // $scope.$watch('esResponse', function (resp) {
  //   if (resp) {
  //     // console.log('lol esResponse', resp);
  //   }
  // });
});
