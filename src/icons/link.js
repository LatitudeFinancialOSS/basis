import React from "react";
import PropTypes from "prop-types";

function Link({ size, primaryColor, testId }) {
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
        d="M17.47 21.964l-.064.011a6.882 6.882 0 01-.259.04c-.03.005-.061.008-.092.012a6.47 6.47 0 01-.561.042l-.113.002h-.217l-.115-.003a6.812 6.812 0 01-.219-.013l-.11-.008a6.74 6.74 0 01-.238-.027l-.088-.01a6.396 6.396 0 01-.326-.054l-2.084 2.084a3.577 3.577 0 01-5.053 0 3.577 3.577 0 010-5.052l4.449-4.45a3.577 3.577 0 015.052 0 3.56 3.56 0 011.038 2.683l1.676-1.676a5.457 5.457 0 00-9.099-2.339L6.6 17.656a5.457 5.457 0 107.717 7.717l3.477-3.477a6.359 6.359 0 01-.322.068"
        fill={primaryColor}
      />
      <path
        d="M25.402 6.599a5.457 5.457 0 00-7.718 0L14.2 10.083a6.445 6.445 0 012.728-.064l2.088-2.088a3.577 3.577 0 015.053 0 3.577 3.577 0 010 5.053l-4.449 4.449a3.577 3.577 0 01-5.053 0 3.553 3.553 0 01-1.036-2.684l-1.678 1.678a5.457 5.457 0 009.1 2.338l4.449-4.449a5.457 5.457 0 000-7.717"
        fill={primaryColor}
      />
    </svg>
  );
}

Link.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Link;
