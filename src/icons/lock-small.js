import React from "react";
import PropTypes from "prop-types";

function LockSmall({ primaryColor }) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Lock small"
    >
      <path
        d="M16 13a1 1 0 00-1 1v1h2v-1a1 1 0 00-1-1zm3 2h.2c.442 0 .8.336.8.75v4.5c0 .414-.358.75-.8.75h-6.4c-.442 0-.8-.336-.8-.75v-4.5c0-.414.358-.75.8-.75h.2v-1a3 3 0 016 0v1z"
        fill={primaryColor}
      />
    </svg>
  );
}

LockSmall.propTypes = {
  primaryColor: PropTypes.string.isRequired
};

export default LockSmall;
