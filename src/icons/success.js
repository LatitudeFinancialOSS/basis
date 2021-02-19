import React from "react";
import PropTypes from "prop-types";

function Success({ size, primaryColor, testId }) {
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
        d="M16 6c5.522 0 10 4.477 10 10 0 5.522-4.478 10-10 10S6 21.522 6 16c0-5.523 4.478-10 10-10zm0 2c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm4.674 3.89a.915.915 0 01.09 1.314L14.33 20.34a.969.969 0 01-1.444-.009l-1.658-2.03a.917.917 0 01.107-1.314.97.97 0 011.344.105l.942 1.209 5.708-6.324a.968.968 0 011.345-.088z"
        fillRule="evenodd"
        fill={primaryColor}
      />
    </svg>
  );
}

Success.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Success;
