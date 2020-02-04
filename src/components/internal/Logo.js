import React from "react";
import PropTypes from "prop-types";
import LatitudeLogo from "../../logos/latitude";
import GemLogo from "../../logos/gem";
import { responsiveHeightType } from "../../hooks/useResponsiveProp";
import useAllResponsiveProps from "../../hooks/useAllResponsiveProps";

const NAMES = ["latitude", "gem"];
const COLORS = ["primary.blue.t100", "black", "white"];

const DEFAULT_PROPS = {};

Logo.NAMES = NAMES;
Logo.COLORS = COLORS;
Logo.DEFAULT_PROPS = DEFAULT_PROPS;

function Logo(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { name, color, testId } = props;
  const heightProps = useAllResponsiveProps(props, "height");
  const logoProps = {
    color,
    ...heightProps,
    testId
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
  color: PropTypes.oneOf(COLORS),
  ...responsiveHeightType,
  testId: PropTypes.string
};

export default Logo;
