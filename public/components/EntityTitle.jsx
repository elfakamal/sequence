import React from 'react';
import PropTypes from 'prop-types';

import { ENTITY_TITLE_HEIGHT, PADDING } from '../constants';

export default class EntityTitle extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    onSizeUpdated: PropTypes.func,
  };

  static defaultProps = {
    text: '',
    x: 0,
    y: 0,
    onSizeUpdated: () => {},
  };

  componentDidMount() {
    setTimeout(this.forceUpdate.bind(this, () => {
      this.props.onSizeUpdated(this.rect.getBBox());
    }));
  }

  render() {
    const { x, y, text } = this.props;
    let width = 0;

    if (this.text) {
      width = this.text.getBBox().width;
    }

    return (
      <g>
        <rect
          {...{ x, y, rx: 0, ry: 0 }}
          ref={element => { this.rect = element; }}
          width={width + PADDING}
          height={ENTITY_TITLE_HEIGHT}
          style={{
            fill: '#3caed2',
            stroke: 'black',
            strokeWidth: 1,
            opacity: 1,
          }}
        />
        <text
          x={x + width / 2 + PADDING / 2}
          y={y + ENTITY_TITLE_HEIGHT / 2}
          ref={element => { this.text = element; }}
          alignmentBaseline="middle"
          textAnchor="middle"
          style={{
            fill: '#fff',
          }}
        >{text}</text>
      </g>
    );
  }
}
