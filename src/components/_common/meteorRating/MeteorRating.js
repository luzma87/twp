import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { range } from 'lodash';

import PropTypes from 'prop-types';
import React from 'react';
import './meteorRating.css';

const total = 5;

const MeteorRating = (props) => {
  const {
    id, value, onChange, readonly, size, compact,
  } = props;
  if (compact) {
    return (
      <>
        <span className="full-meteor" style={{ marginLeft: 8 }}>
          {value}
        </span>
        <FontAwesomeIcon icon={['fas', 'meteor']} className="full-meteor" style={{ marginLeft: 2 }} />
      </>
    );
  }
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
  compact: PropTypes.bool,
};

MeteorRating.defaultProps = {
  value: 0,
  readonly: false,
  size: '2x',
  onChange: null,
  compact: false,
};

export default MeteorRating;
