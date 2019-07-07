import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './meteorRating.css';
import { range } from 'lodash';

import PropTypes from 'prop-types';

const total = 5;

const MeteorRating = (props) => {
  const {
    value, onClick, readonly, size,
  } = props;
  return (
    <div>
      {range(total).map((s) => {
        const currentValue = s + 1;
        if (currentValue <= value) {
          return (
            <FontAwesomeIcon
              size={size}
              key={`meteor_${s}`}
              icon={['fas', 'meteor']}
              className={`full-meteor ${readonly ? '' : 'hoverable'}`}
              onClick={() => {
                if (onClick) onClick(currentValue, true);
              }}
            />
          );
        }
        return (
          <FontAwesomeIcon
            size={size}
            key={`meteor_${s}`}
            icon={['far', 'meteor']}
            className={`empty-meteor ${readonly ? '' : 'hoverable'}`}
            onClick={() => {
              if (onClick) onClick(currentValue, false);
            }}
          />
        );
      })}
    </div>
  );
};

MeteorRating.propTypes = {
  value: PropTypes.number,
  onClick: PropTypes.func,
  readonly: PropTypes.bool,
  size: PropTypes.string,
};

MeteorRating.defaultProps = {
  value: 0,
  onClick: null,
  readonly: false,
  size: '2x',
};

export default MeteorRating;
