import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import './meteorRating.css';
import { range } from 'lodash';

import PropTypes from 'prop-types';

const MeteorRatingDisplay = (props) => {
  const {value} = props;
  return (
    <div>
      {range(value).map(s => {
          return <FontAwesomeIcon
            key={`meteor_${s}`} icon={['fas', 'meteor']} size="2x"
            className="full-meteor"
          />
      })}
    </div>
  );
};

MeteorRatingDisplay.propTypes = {
  value: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

MeteorRatingDisplay.defaultProps = {
  value: 0
};

export default MeteorRatingDisplay;
