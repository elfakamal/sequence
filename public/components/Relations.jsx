import React from 'react';
import PropTypes from 'prop-types';

import Line from './Line';
import { RELATION_GAP, TREATMENT_WIDTH } from '../constants';

const Relations = props => {
  const {
    entities = [],
    relations = [],
    positions = [],
    boxes = [],
    height = 0,
    onSelected,
  } = props;

  if (entities.length === 0 || relations.length === 0 ||
      positions.length === 0 || boxes.length === 0) {
    return null;
  }

  const relationsOffset = height / 2 - ((relations.length - 1) * RELATION_GAP) / 2;

  return (
    <g>
      {positions && relations.map((relation, index) => {
        const { from, to, message, status } = relation;
        const fromIndex = entities.indexOf(from);
        const toIndex = entities.indexOf(to);
        const relationY = relationsOffset + RELATION_GAP * index;

        let fromPoint = {};
        let toPoint = {};
        let margin = 0;
        let dashed = false;

        if (message === 'request') {
          margin = fromIndex === 0 ? 0 : TREATMENT_WIDTH / 2;

          fromPoint = {
            x: positions[fromIndex] + boxes[fromIndex].width / 2 + margin,
            y: relationY,
          };

          toPoint = {
            x: positions[toIndex] + boxes[toIndex].width / 2 - TREATMENT_WIDTH / 2,
            y: relationY,
          };
        } else {
          dashed = true;

          // TODO: swap indexes before using them.
          // The actual usage is a bit confusing.
          fromPoint = {
            x: positions[toIndex] + boxes[toIndex].width / 2 - TREATMENT_WIDTH / 2,
            y: relationY,
          };

          margin = fromIndex === 0 ? 0 : TREATMENT_WIDTH / 2;

          toPoint = {
            x: positions[fromIndex] + boxes[fromIndex].width / 2 + margin,
            y: relationY,
          };
        }

        return (
          <Line
            key={index}
            start={fromPoint}
            end={toPoint}
            dashed={dashed}
            status={status}
            markerEnd="url(#markerArrow)"
            onClick={() => onSelected(relation)}
          />
        );
      })}
    </g>
  );
};

Relations.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.string),
  relations: PropTypes.arrayOf(PropTypes.shape()),
  positions: PropTypes.arrayOf(PropTypes.number),
  boxes: PropTypes.arrayOf(PropTypes.shape()),
  height: PropTypes.number,
  onSelected: PropTypes.func,
};

Relations.defaultProps = {
  entities: [],
  relations: [],
  positions: [],
  boxes: [],
  height: 0,
  onSelected: () => {},
};

export default Relations;
