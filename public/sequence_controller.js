import _ from 'lodash';
import { uiModules } from 'ui/modules';
import { AggResponseTabifyProvider } from 'ui/agg_response/tabify/tabify';

import 'plugins/sequence/directives/sequenceVisualization';

const module = uiModules.get('kibana/sequence', ['kibana']);

module.controller('SequenceController', function ($scope, $http, Private) {
  const tabifyAggResponse = Private(AggResponseTabifyProvider);

  var metrics = $scope.metrics = [];
  var result;
  var Flow = function (timestamp, from, to, url, message) {
    this.timestamp = timestamp;
    this.from = from;
    this.to = to;
    this.url = url;
    this.message = message;
  };

  var timestamp;
  var from;
  var to;
  var message;
  var url;

  $scope.processTableGroups = function (tableGroups) {
    for (var i = 0; i < tableGroups.tables[0].rows.length; i++) {
      for (var j = 0; j < tableGroups.tables[0].rows[i].length; j++) {
        if ( j == 0 ) {
          timestamp = tableGroups.tables[0].rows[i][j].key;
        }
        if ( j == 1 ) {
          from = tableGroups.tables[0].rows[i][j].key;
        }
        if ( j == 2 ) {
          to = tableGroups.tables[0].rows[i][j].key;
        }
        if ( j == 3 ) {
          url = tableGroups.tables[0].rows[i][j].key;
        }
        if ( j == 4 ) {
          message = tableGroups.tables[0].rows[i][j].key;
          result[i] = new Flow(timestamp,from,to,url,message) ;
        }
      }

    }
    console.log(JSON.stringify(result));
    $scope.schema = JSON.stringify(result);
  };

  $scope.$watch('esResponse', function (resp) {
    let tableGroups = $scope.tableGroups = null;
    if (resp) {
      const options = {
        asAggConfigResults: true
      };

      metrics.length = 0;
      tableGroups = tabifyAggResponse($scope.vis, resp, options);
      console.log(tableGroups.tables[0].column);
      result = new Array(tableGroups.tables[0].rows.length);
      $scope.processTableGroups(tableGroups);
    }
  });
});
