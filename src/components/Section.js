import React from "react";
import PropTypes from "prop-types";
import Container, { BACKGROUNDS as CONTAINER_BACKGROUNDS } from "./Container";
import Grid from "./Grid";
import { responsivePaddingType } from "../hooks/useResponsiveProp";
import useAllResponsiveProps from "../hooks/useAllResponsiveProps";

export const BACKGROUNDS = CONTAINER_BACKGROUNDS;

export const DEFAULT_PROPS = {
  debug: false
};

function Section(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { bg, debug, children } = props;
  const paddingProps = useAllResponsiveProps(props, "padding");

  return (
    <Container bg={bg} {...paddingProps}>
      <Container hasBreakpointWidth>
        <Grid cols={4} cols-sm={8} cols-lg={12} colsGutter="30px" debug={debug}>
          {children}
        </Grid>
      </Container>
    </Container>
  );
}

Section.propTypes = {
  bg: PropTypes.oneOf(BACKGROUNDS),
  ...responsivePaddingType,
  debug: PropTypes.bool,
  children: PropTypes.node
};

export default Section;
