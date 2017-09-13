import api from './server/routes';

export default kibana => new kibana.Plugin({
  require: ['elasticsearch'],

  uiExports: {
    app: {
      title: 'Sequence',
      description: 'Sequence diagram',
      icon: 'plugins/sequence/stats.svg',
      main: 'plugins/sequence/app',
    },

    visTypes: ['plugins/sequence/sequence'],
  },

  init(server) {
    api(server);
  },
});

