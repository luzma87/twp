import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import './meteorRating.css';
import { range } from 'lodash';

import PropTypes from 'prop-types';

const total = 5;

const MeteorRating = (props) => {
  const {value, onClick} = props;
  return (
    <div>
      {range(total).map(s => {
        let currentValue = s + 1;
        if (currentValue <= value) {
          return <FontAwesomeIcon
            key={`meteor_${s}`} icon={['fas', 'meteor']} size="2x"
            className="full-meteor"
            onClick={() => {
              onClick(currentValue, true);
            }
            }
          />
        }
        return <FontAwesomeIcon
          key={`meteor_${s}`} icon={['far', 'meteor']} size="2x"
          className="empty-meteor"
          onClick={() => {
            onClick(currentValue, false);
          }
          }
        />
      })}
    </div>
  );
};

MeteorRating.propTypes = {
  value: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

MeteorRating.defaultProps = {
  value: 0
};

export default MeteorRating;
