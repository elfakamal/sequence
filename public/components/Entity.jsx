import React from 'react';
import PropTypes from 'prop-types';

import EntityTitle from './EntityTitle';
import Line from './Line';
import { ENTITY_TITLE_HEIGHT, TREATMENT_WIDTH } from '../constants';
// import { includes } from '../helpers';

export default class Entity extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    text: PropTypes.string,
    height: PropTypes.number,
    onSizeUpdated: PropTypes.func,
    entityRelations: PropTypes.arrayOf(PropTypes.shape()),
    treatments: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    x: 0,
    y: 0,
    text: 'Entity',
    height: 0,
    onSizeUpdated: () => {},
    entityRelations: [],
    treatments: [],
  };

  constructor(props) {
    super(props);

    this.onSizeUpdated = this.onSizeUpdated.bind(this);
  }

  state = {};

  onSizeUpdated(box) {
    this.setState({ box }, () => {
      if (this.props.onSizeUpdated) {
        this.props.onSizeUpdated(box);
      }
    });
  }

  render() {
    const { x, text, height, treatments } = this.props;
    const { box: { width = 0 } = {} } = this.state;
    const { onSizeUpdated } = this;
    const start = { x: 0, y: ENTITY_TITLE_HEIGHT };
    const end = { x: 0, y: height - ENTITY_TITLE_HEIGHT - 20 };

    start.x = end.x = width / 2;

    const style = {
      fill: '3caed2',
      stroke: '3caed2',
      strokeWidth: 1,
      opacity: 1,
    };

    return (
      <g {...{ transform: `translate(${x})` }}>
        <EntityTitle {...{ x: 0, y: 0, text, onSizeUpdated }} />
        <Line {...{ start, end, dashed: true }} />
        {treatments.map(({ y: ty, width: tw, height: th }, key) => (
          <rect
            {...{
              key,
              style,
              y: ty,
              width: tw,
              height: th,
              x: (width / 2) - (TREATMENT_WIDTH / 2),
            }}
          />
        ))}
        <EntityTitle {...{ x: 0, y: height - ENTITY_TITLE_HEIGHT - 20, text }} />
      </g>
    );
  }
}
