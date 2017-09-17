import 'plugins/sequence/sequence_controller';

import './less/main.less';
import './assets/sequence.css';

require('ui/routes').enable();

require('ui/routes').when('/', {
  template: require('plugins/sequence/templates/vis.html'),
  controller: 'SequenceController',
  controllerAs: 'ctrl'
});
