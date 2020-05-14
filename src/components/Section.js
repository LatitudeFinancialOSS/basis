import React from "react";
import PropTypes from "prop-types";
import Container from "./Container";

import { responsivePaddingType } from "../hooks/useResponsiveProp";
import useAllResponsiveProps from "../hooks/useAllResponsiveProps";

const { BACKGROUNDS } = Container;

const DEFAULT_PROPS = {
  bg: Container.DEFAULT_PROPS.bg,
};

Section.BACKGROUNDS = BACKGROUNDS;
Section.DEFAULT_PROPS = DEFAULT_PROPS;

function Section(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { bg, children, testId } = props;
  const paddingProps = useAllResponsiveProps(props, "padding");

  return (
    <Container bg={bg} {...paddingProps} testId={testId}>
      <Container hasBreakpointWidth>{children}</Container>
    </Container>
  );
}

Section.propTypes = {
  bg: PropTypes.oneOf(BACKGROUNDS),
  ...responsivePaddingType,
  children: PropTypes.node,
  testId: PropTypes.string,
};

export default Section;
