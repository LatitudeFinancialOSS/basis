import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";

function Twitter({ size, primaryColor, hoverColor, testId }) {
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
        d="M4 16c0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12S22.628 4 16 4C9.373 4 4 9.372 4 16zm12.246-2.238a2.894 2.894 0 012.892-2.892 2.88 2.88 0 012.112.912 5.872 5.872 0 001.836-.701 2.889 2.889 0 01-1.272 1.601 5.872 5.872 0 001.662-.456 5.931 5.931 0 01-1.446 1.501c.006.119.006.245.006.371 0 3.823-2.91 8.232-8.232 8.232a8.06 8.06 0 01-4.422-1.308 5.816 5.816 0 004.284-1.194 2.889 2.889 0 01-2.7-2.01 2.843 2.843 0 001.308-.048 2.897 2.897 0 01-2.322-2.838v-.036c.39.216.834.348 1.308.36a2.88 2.88 0 01-1.29-2.406c0-.528.144-1.026.39-1.452a8.208 8.208 0 005.964 3.024 2.651 2.651 0 01-.078-.66z"
        fillRule="evenodd"
      />
    </svg>
  );
}

Twitter.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string,
  testId: PropTypes.string,
};

export default Twitter;
