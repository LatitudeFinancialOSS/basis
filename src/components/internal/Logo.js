import React from "react";
import PropTypes from "prop-types";
import LatitudeLogo from "../../logos/latitude";
import GemLogo from "../../logos/gem";
import { responsiveHeightType } from "../../hooks/useResponsiveProp";
import useAllResponsiveProps from "../../hooks/useAllResponsiveProps";

export const NAMES = ["latitude", "gem"];
export const COLORS = ["primary.blue.t100", "black", "white"];

export const DEFAULT_PROPS = {};

function Logo(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { name, color } = props;
  const heightProps = useAllResponsiveProps(props, "height");
  const logoProps = {
    color,
    ...heightProps
  };

  switch (name) {
    case "latitude": {
      return <LatitudeLogo {...logoProps} />;
    }

    case "gem": {
      return <GemLogo {...logoProps} />;
    }

    default: {
      return null;
    }
  }
}

Logo.propTypes = {
  name: PropTypes.oneOf(NAMES).isRequired,
  color: PropTypes.oneOf(COLORS).isRequired,
  ...responsiveHeightType
};

export default Logo;
