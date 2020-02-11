import React from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import Flex from "./Flex";
import Logo from "./internal/Logo";
import useTheme from "../hooks/useTheme";

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
  testId: PropTypes.string
};

const DEFAULT_PROPS = {
  __internal__notFixed: false
};

Header.DEFAULT_PROPS = DEFAULT_PROPS;

function Header(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { children, testId, __internal__notFixed } = props;
  const theme = useTheme();

  return (
    <header
      css={
        __internal__notFixed
          ? null
          : {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: theme.zIndices.header
            }
      }
      data-testid={testId}
    >
      <Container bg="white" height="56" height-lg="80" boxShadow="header">
        <Container hasBreakpointWidth height="100%">
          <Flex fullHeight placeItems="left center">
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
  __internal__notFixed: PropTypes.bool
};

Header.Logo = HeaderLogo;

export default Header;
