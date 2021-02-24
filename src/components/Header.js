import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import Flex from "./Flex";
import Logo from "./Logo";
import { getPropsFromMap } from "../utils/component";

function HeaderLogo({ name, testId }) {
  return (
    <Logo
      name={name}
      height="36"
      height-xs="40"
      height-lg="48"
      maxWidth="120"
      maxWidth-xs="none"
      testId={testId}
    />
  );
}

HeaderLogo.propTypes = {
  name: PropTypes.oneOf(Logo.NAMES).isRequired,
  testId: PropTypes.string,
};

const DEFAULT_PROPS = {};

Header.DEFAULT_PROPS = DEFAULT_PROPS;
Header.ID = "Header";
Header.HEIGHT_MAP = {
  default: 56,
  lg: 80,
};

function Header(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { children, testId } = props;
  const heightMap = Header.HEIGHT_MAP;
  const heightProps = useMemo(() => getPropsFromMap("height", heightMap), [
    heightMap,
  ]);

  return (
    <header data-testid={testId}>
      <Container bg="white" {...heightProps} boxShadow="header">
        <Container hasBreakpointWidth height="100%">
          <Flex height="100%" placeItems="left center">
            {children}
          </Flex>
        </Container>
      </Container>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

Header.Logo = HeaderLogo;

export default Header;
