import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { TemplateVisTypeProvider } from 'ui/template_vis_type/template_vis_type';

import './assets/sequence.css';
import './less/main.less';
import 'plugins/sequence/sequence_controller';

// register the provider with the visTypes registry
VisTypesRegistryProvider.register(SequenceVisProvider);

function SequenceVisProvider(Private) {
  const TemplateVisType = Private(TemplateVisTypeProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  return new TemplateVisType({
    name: 'sequence',
    title: 'Sequence',
    description: 'Display as Sequence Chart',
    icon: 'fa-tachometer',
    template: require('plugins/sequence/templates/vis.html'),
  });
}

// export the provider so that the visType can be required with Private()
export default SequenceVisProvider;
