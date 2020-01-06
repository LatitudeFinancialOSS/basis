import React from "react";
import PropTypes from "prop-types";

function Person({ primaryColor }) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Person"
    >
      <path
        d="M19 19a6 6 0 016 6v1h-2v-1a4 4 0 00-4-4h-6a4 4 0 00-4 4v1H7v-1a6 6 0 016-6h6zM16 6a6 6 0 110 12 6 6 0 010-12zm0 2a4 4 0 100 8 4 4 0 000-8z"
        fill={primaryColor}
      />
    </svg>
  );
}

Person.propTypes = {
  primaryColor: PropTypes.string.isRequired
};

export default Person;
