import React from "react";
import PropTypes from "prop-types";
import Container, { BACKGROUNDS as CONTAINER_BACKGROUNDS } from "./Container";

import { responsivePaddingType } from "../hooks/useResponsiveProp";
import useAllResponsiveProps from "../hooks/useAllResponsiveProps";

export const BACKGROUNDS = CONTAINER_BACKGROUNDS;

function Section(props) {
  const { bg, children } = props;
  const paddingProps = useAllResponsiveProps(props, "padding");

  return (
    <Container bg={bg} {...paddingProps}>
      <Container hasBreakpointWidth>{children}</Container>
    </Container>
  );
}

Section.propTypes = {
  bg: PropTypes.oneOf(BACKGROUNDS),
  ...responsivePaddingType,
  children: PropTypes.node
};

export default Section;
