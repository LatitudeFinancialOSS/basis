import React from "react";
import PropTypes from "prop-types";
import {
  responsiveHeightType,
  responsiveMaxWidthType,
} from "../hooks/useResponsiveProp";
import useAllResponsiveProps from "../hooks/useAllResponsiveProps";

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
  const maxWidthProps = useAllResponsiveProps(props, "maxWidth");

  if (!NAMES.includes(name)) {
    return null;
  }

  const LogoComponent = require(`../logos/${name}`).default;
  const logoProps = {
    color,
    ...heightProps,
    ...maxWidthProps,
    testId,
  };

  return <LogoComponent {...logoProps} />;
}

Logo.propTypes = {
  name: PropTypes.oneOf(NAMES).isRequired,
  color: PropTypes.oneOf(COLORS),
  ...responsiveHeightType,
  ...responsiveMaxWidthType,
  testId: PropTypes.string,
};

export default Logo;
