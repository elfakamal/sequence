import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { uiModules } from 'ui/modules';

import Sequence from '../components/Sequence';
import addScope from '../lib/add_scope';

const app = uiModules.get('apps/sequence/directives');

app.directive('sequenceVisualization', () => {
  return {
    restrict: 'E',
    link: ($scope, $el) => {
      $scope.height = $el[0].parentElement.offsetHeight;

      const addToState = ['schema', 'height'];
      const Component = addScope(Sequence, $scope, addToState);

      render(<Component className="sequence__visualization"/>, $el[0]);
      $scope.$on('$destroy', () => unmountComponentAtNode($el[0]));
    }
  };
});
