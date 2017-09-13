import React from 'react';
import PropTypes from 'prop-types';

import Entity from './Entity';
import Relations from './Relations';
import {
  PADDING,
  DEFAULT_SEQUENCE_WIDTH,
  DEFAULT_SEQUENCE_HEIGHT,
  TREATMENT_WIDTH,
  RELATION_GAP,
} from '../constants';

import { formatSchema } from '../helpers';

export default class Sequence extends React.Component {
  static propTypes = {
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    schema: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onSelected: PropTypes.func,
  };

  static defaultProps = {
    width: DEFAULT_SEQUENCE_WIDTH,
    height: DEFAULT_SEQUENCE_HEIGHT,
    schema: [],
    onSelected: () => {},
  };

  state = {
    containerX: 0,
    schema: {},
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ schema: formatSchema(nextProps.schema || {}) });
  }

  updateEntityBoxes(index, box) {
    const {
      schema: {
        entities: {
          length = 0,
        } = {},
      } = {},
    } = this.state;

    if (!this.boxes) {
      this.boxes = [...Array(length).keys()];
    }

    this.boxes[index] = box;

    if (this.boxes.every(pos => typeof pos !== 'number')) {
      this.updateEntityPositions();
    }
  }

  updateEntityPositions() {
    const { width } = this.props;
    let combinedSize = 0;

    const positions = this.boxes.map((box, index, boxes) => {
      if (index === 0) {
        return 0;
      }

      combinedSize += boxes[index - 1].x + boxes[index - 1].width + PADDING / 2;
      return combinedSize;
    });

    const lastIndex = positions.length - 1;

    this.setState({
      positions,
      containerX: (width / 2) - ((positions[lastIndex] + this.boxes[lastIndex].width) / 2),
    });
  }

  calculateEntityTreatments(entityRelations) {
    let { height } = this.props;

    if (height === 0) {
      height = DEFAULT_SEQUENCE_HEIGHT;
    }

    const {
      schema: {
        entities = [],
        relations = [],
      } = {},
    } = this.state;

    const relationsOffset = height / 2 - ((relations.length - 1) * RELATION_GAP) / 2;

    if (!entities || !relations || !this.boxes) {
      return;
    }

    const groups = entityRelations.reduce((acc, rel) => {
      const { from, to } = rel;
      const key = `${from}::${to}`;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(rel);
      return acc;
    }, {});

    return Object.keys(groups).map(keyString => {
      const treatmentBox = {};
      const relation1Index = groups[keyString][0].index;
      const relation2Index = groups[keyString][1].index;

      treatmentBox.x = 0;
      treatmentBox.y = relationsOffset + (relation1Index * RELATION_GAP) - 5;
      treatmentBox.width = TREATMENT_WIDTH;
      treatmentBox.height = relationsOffset + (relation2Index * RELATION_GAP) - treatmentBox.y + 5;

      return treatmentBox;
    });
  }

  render() {
    const {
      positions = [],
      // containerX,
      schema: {
        entities = [],
        relations = [],
      } = {},
    } = this.state;

    const containerX = 10;

    const width = (() => {
      if (positions.length) {
        const lastIndex = positions.length - 1;
        return positions[lastIndex] + this.boxes[lastIndex].width + 20;
      }

      return '100%';
    })();

    const { onSelected } = this.props;
    let { height } = this.props;

    if (this.props.height === 0) {
      height = DEFAULT_SEQUENCE_HEIGHT;
    }

    return (
      <svg
        ref={element => { this.svg = element; }}
        width={width}
        height={height}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          paddingTop: 10,
          backgroundColor: '#fff',
        }}
      >
        <defs>
          <marker id="markerArrow" markerWidth="13" markerHeight="13" refX="10" refY="6" orient="auto">
            <path d="M2,2 L2,11 L10,6 L2,2" style={{ fill: '#000000' }} />
          </marker>
        </defs>

        <g transform={`translate(${containerX})`}>
          {entities.map((name, index) => {
            let entityRelations = [];

            if (index > 0) {
              entityRelations = relations.reduce((acc, rel, relIndex) => {
                if (rel.from === name || rel.to === name) {
                  return acc.concat({ ...rel, index: relIndex });
                }

                return acc;
              }, []);
            }

            return (
              <Entity
                {...{
                  height,
                  entityRelations,
                  key: index,
                  text: name,
                  treatments: this.calculateEntityTreatments(entityRelations),
                  x: positions ? positions[index] : 0,
                  onSizeUpdated: box => {
                    this.updateEntityBoxes(index, box);
                  },
                }}
              />
            );
          })}

          <Relations
            {...{
              entities,
              relations,
              positions,
              height,
              boxes: this.boxes,
              onSelected,
            }}
          />
        </g>
      </svg>
    );
  }
}
