import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './meteorRating.css';
import { range } from 'lodash';

import PropTypes from 'prop-types';

const total = 5;

const MeteorRating = (props) => {
  const {
    id, value, onChange, readonly, size,
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
                if (onChange) {
                  const event = {
                    target: {
                      name: id,
                      value: currentValue,
                    },
                  };
                  onChange(event);
                }
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
              if (onChange) {
                const event = {
                  target: {
                    name: id,
                    value: currentValue,
                  },
                };
                onChange(event);
              }
            }}
          />
        );
      })}
    </div>
  );
};

MeteorRating.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  size: PropTypes.string,
};

MeteorRating.defaultProps = {
  value: 0,
  readonly: false,
  size: '2x',
  onChange: null,
};

export default MeteorRating;
