import React from "react";
import PropTypes from "prop-types";

function Assistance({ size, primaryColor, testId }) {
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
        d="M16 6c5.522 0 10 4.477 10 10 0 5.522-4.478 10-10 10S6 21.522 6 16c0-5.523 4.478-10 10-10zm2.27 15.556A5.99 5.99 0 0116 22a5.99 5.99 0 01-2.27-.444l-1.5 1.499c1.125.603 2.408.945 3.77.945s2.645-.342 3.77-.945zM16 12c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm7.223.562l-1.532 1.533a6.007 6.007 0 01-.001 3.811l1.533 1.532C23.72 18.396 24 17.23 24 16s-.279-2.396-.777-3.438zm-14.446 0C8.28 13.604 8 14.77 8 16s.279 2.396.777 3.438l1.533-1.531a6.003 6.003 0 01-.001-3.812zM16 8a7.955 7.955 0 00-3.77.945l1.5 1.5A5.972 5.972 0 0116 10c.803 0 1.57.158 2.27.444l1.5-1.499A7.961 7.961 0 0016 8z"
        fillRule="evenodd"
        fill={primaryColor}
      />
    </svg>
  );
}

Assistance.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Assistance;
