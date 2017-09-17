import React from 'react';
import PropTypes from 'prop-types';

export default class Line extends React.Component {
  static propTypes = {
    start: PropTypes.shape(),
    end: PropTypes.shape(),
    dashed: PropTypes.bool,
    markerStart: PropTypes.string,
    markerEnd: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  state = {};

  // TODO: implement on click
  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    const { start, end, dashed, markerStart, markerEnd } = this.props;
    const lineProps = {};
    const lineStyle = {};

    if (dashed) {
      lineProps.strokeDasharray = '5, 5';
    }

    if (markerStart) {
      lineStyle.markerStart = markerStart;
    }

    if (markerEnd) {
      lineStyle.markerEnd = markerEnd;
    }

    return (
      <g>
        <line
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          className="line"
          style={{
            ...lineStyle,
            stroke: 'gray',
            strokeWidth: 1,
          }}
          {...lineProps}
        />
        <line
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          className="line-placeholder"
          onClick={this.onClick}
          style={{
            stroke: 'rgba(0,0,0,0.01)',
            strokeWidth: 10,
            cursor: 'pointer',
          }}
        />
      </g>
    );
  }
}
