import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";

function YouTube({ size, primaryColor, hoverColor, testId }) {
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
        d="M16.3395033,6.84081649 C17.8995578,6.84801236 24.3787171,6.90677861 26.1580154,7.38670301 C27.2767627,7.68762579 28.1576672,8.57429174 28.4566696,9.70027772 C29.0000147,11.740998 29.0000147,15.9989741 29.0000147,15.9989741 L29.000002,16.0092505 C28.9995711,16.240469 28.9844905,20.3151173 28.4566696,22.2978183 C28.1576672,23.4236566 27.2767627,24.3103225 26.1580154,24.611393 C24.25458,25.1246618 16.9726125,25.1560864 16.088078,25.1580104 L15.9117503,25.1580104 C15.0272158,25.1560864 7.74524828,25.1246618 5.84181288,24.611393 C4.72321332,24.3103225 3.84216105,23.4236566 3.54315874,22.2978183 C3.06191022,20.4900615 3.00691039,16.9432378 3.00062469,16.1561467 L3.00062469,15.8417967 C3.00691039,15.0546825 3.06191022,11.5077729 3.54315874,9.70027772 C3.84216105,8.57429174 4.72321332,7.68762579 5.84181288,7.38670301 C7.62111119,6.90677861 14.1002705,6.84801236 15.660325,6.84081649 Z M13.3408027,12.1330693 L13.3408027,19.864879 L20.1363098,15.9991219 L13.3408027,12.1330693 Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

YouTube.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string,
  testId: PropTypes.string,
};

export default YouTube;
