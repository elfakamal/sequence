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
      console.log('scope', $scope);
      console.log('width', $el);
      console.log('width', $el[0].parentElement);
      console.log('width', $el[0].parentElement.offsetWidth);
      console.log('height', $el[0].parentElement.offsetHeight);
      $scope.height = $el[0].parentElement.offsetHeight;

      // $scope.$on('renderComplete', () => {
      //   console.log('render complete');
      // });

      // $el[0].parentElement.addEventListener('resize', () => {
      //   console.log('watch width', $el[0].parentElement.offsetWidth);
      //   console.log('watch height', $el[0].parentElement.offsetHeight);
      // });

      $scope.$on('globalNav:update', () => {
        console.log('watch width', $el[0].parentElement.offsetWidth);
        console.log('watch height', $el[0].parentElement.offsetHeight);
      });

      const addToState = ['schema', 'height'];
      const Component = addScope(Sequence, $scope, addToState);

      render(<Component className="sequence__visualization"/>, $el[0]);
      $scope.$on('$destroy', () => unmountComponentAtNode($el[0]));
    }
  };
});
