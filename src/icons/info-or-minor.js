import React from "react";
import PropTypes from "prop-types";

function InfoOrMinor({ size, primaryColor, testId }) {
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
        d="M16 6c5.522 0 10 4.477 10 10 0 5.522-4.478 10-10 10S6 21.522 6 16c0-5.523 4.478-10 10-10zm0 2c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm.057 5.5c.521 0 .943.422.943.943v6.115c0 .52-.422.942-.943.942h-.115a.942.942 0 01-.942-.942v-6.115c0-.521.421-.943.942-.943zM16 10a1 1 0 11-.117.007L16 10z"
        fillRule="evenodd"
        fill={primaryColor}
      />
    </svg>
  );
}

InfoOrMinor.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default InfoOrMinor;
