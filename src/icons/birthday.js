import React from "react";
import PropTypes from "prop-types";

function Birthday({ size, primaryColor, testId }) {
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
        d="M11 8v4.999h4V8h2v4.999h4V8h2v4.999L24 13a3 3 0 013 3v5a3.001 3.001 0 01-2 2.829V27h3v2H4v-2h3v-2.17A3.001 3.001 0 015 22v-6a3 3 0 013-3l1-.001V8h2zm9 12a1 1 0 00-1 1v1a3 3 0 01-6 0 1 1 0 00-2 0 3.001 3.001 0 01-2 2.829V27h14v-3.17A3.001 3.001 0 0121 21a1 1 0 00-1-1zm4-5H8a1 1 0 00-1 1v6a1 1 0 002 0 3 3 0 016 0 1 1 0 002 0v-1a3 3 0 016 0 1 1 0 002 0v-5a1 1 0 00-1-1zM10 3c.552 0 1 2.226 1 2.857C11 6.488 10.552 7 10 7s-1-.512-1-1.143S9.448 3 10 3zm6 0c.552 0 1 2.226 1 2.857C17 6.488 16.552 7 16 7s-1-.512-1-1.143S15.448 3 16 3zm6 0c.552 0 1 2.226 1 2.857C23 6.488 22.552 7 22 7s-1-.512-1-1.143S21.448 3 22 3z"
        fill={primaryColor}
      />
    </svg>
  );
}

Birthday.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Birthday;
