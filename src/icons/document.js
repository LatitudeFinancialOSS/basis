import React from "react";
import PropTypes from "prop-types";

function Document({ size, primaryColor, testId }) {
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
        d="M18 6c.266 0 .52.105.707.293l5 5A.996.996 0 0124 12v12c0 1.103-.897 2-2 2H10c-1.103 0-2-.897-2-2V8c0-1.103.897-2 2-2zm-1 2h-7v16h12V13h-3c-1.103 0-2-.897-2-2V8zm2.5 13a.5.5 0 010 1h-7a.5.5 0 010-1h7zm0-3a.5.5 0 010 1h-7a.5.5 0 010-1h7zm0-3a.5.5 0 010 1h-7a.5.5 0 010-1h7zm-5-3a.5.5 0 010 1h-2a.5.5 0 010-1h2zM19 9.414V11h1.586L19 9.414z"
        fill={primaryColor}
        fillRule="evenodd"
      />
    </svg>
  );
}

Document.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Document;
