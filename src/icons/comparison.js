import React from "react";
import PropTypes from "prop-types";

function Comparison({ size, primaryColor, testId }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      focusable="false"
      role="img"
      aria-label="Comparison"
      data-testid={testId}
    >
      <path
        d="M8.139 17.08a1 1 0 01.53 1.31A8.506 8.506 0 008 21.715C8 26.297 11.589 30 16 30s8-3.703 8-8.285c0-1.161-.23-2.287-.67-3.325a1 1 0 111.842-.78c.544 1.284.828 2.675.828 4.105C26 27.388 21.53 32 16 32S6 27.388 6 21.715c0-1.43.284-2.82.828-4.105a1 1 0 011.31-.53zM16 11c3.24 0 6.134 1.825 7.376 4.59l.184.41-.184.41C22.134 19.175 19.24 21 16 21s-6.134-1.825-7.376-4.59L8.44 16l.184-.41C9.866 12.825 12.76 11 16 11zm3.049 2.763l-3.764 5.198a6.576 6.576 0 002.086-.106l2.923-4.196a5.973 5.973 0 00-1.245-.896zm-2.465-.737l-3.733 5.156c.42.238.875.43 1.353.567l3.91-5.397a6.437 6.437 0 00-1.53-.326zm4.393 2.4l-1.975 2.837A5.752 5.752 0 0021.346 16a5.42 5.42 0 00-.37-.574zm-7.574-1.885l-2.369 3.047c.283.382.616.728.99 1.03l3.32-4.585a6.395 6.395 0 00-1.941.508zM16 0c5.53 0 10 4.612 10 10.286 0 1.43-.284 2.82-.828 4.104a1 1 0 11-1.842-.78 8.5 8.5 0 00.67-3.324C24 5.703 20.411 2 16 2s-8 3.703-8 8.286a8.5 8.5 0 00.67 3.324 1 1 0 11-1.842.78A10.506 10.506 0 016 10.286C6 4.612 10.47 0 16 0z"
        fill={primaryColor}
      />
    </svg>
  );
}

Comparison.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string
};

export default Comparison;
