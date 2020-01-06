import React from "react";
import PropTypes from "prop-types";

function Message({ primaryColor }) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Message"
    >
      <path
        d="M6 8a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H11l-2.4 3.2A2 2 0 017 26a1 1 0 01-1-1V8z"
        fill={primaryColor}
      />
    </svg>
  );
}

Message.propTypes = {
  primaryColor: PropTypes.string.isRequired
};

export default Message;
