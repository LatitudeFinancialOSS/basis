import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";

function LinkedIn({ size, primaryColor, hoverColor, testId }) {
  const theme = useTheme();

  return (
    <svg
      css={{
        display: "block",
        fill: primaryColor,
        transition: hoverColor ? theme.transitions.icon : null,
        ":hover": {
          ...(hoverColor && { fill: hoverColor }),
        },
      }}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      focusable="false"
      role="img"
      data-testid={testId}
    >
      <path
        d="M21.6610422,10.8859127 C24.7727047,10.8859127 27,12.7847222 27,16.7132937 L27,26 L22.4799007,26 L22.4799007,18.3013784 C22.4799007,16.1894841 21.677132,15.0109127 20.0066606,15.0109127 C18.1890819,15.0109127 17.239206,16.2388784 17.239206,18.3013784 L17.239206,26 L12.8828784,26 L12.8828784,11.3333333 L17.239206,11.3333333 L17.239206,13.3085317 C17.239206,13.3085317 18.5493797,10.8859127 21.6610422,10.8859127 Z M9.97866005,11.3333333 L9.97866005,26 L5.43672457,26 L5.43672457,11.3333333 L9.97866005,11.3333333 Z M7.68585608,4 C9.16957033,4 10.3717122,5.21188388 10.3717122,6.70634921 C10.3717122,8.20081454 9.16957033,9.41269841 7.68585608,9.41269841 C6.20271647,9.41269841 5,8.20081454 5,6.70634921 C5,5.21188388 6.20271647,4 7.68585608,4 Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

LinkedIn.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string,
  testId: PropTypes.string,
};

export default LinkedIn;
