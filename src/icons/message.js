import React from "react";
import PropTypes from "prop-types";

function Message({ size, primaryColor, testId }) {
  return (
    <svg
      css={{
        display: "block",
      }}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      focusable="false"
      role="img"
      data-testid={testId}
    >
      <path
        d="M6 8a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H11l-2.4 3.2A2 2 0 017 26a1 1 0 01-1-1V8z"
        fill={primaryColor}
      />
    </svg>
  );
}

Message.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Message;
