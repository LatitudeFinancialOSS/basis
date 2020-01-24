import React from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import Flex from "./Flex";
import Logo from "./internal/Logo";
import useTheme from "../hooks/useTheme";

function HeaderLogo({ name }) {
  return (
    <Logo name={name} color="primary.blue.t100" height="5" height-xs="7" />
  );
}

HeaderLogo.propTypes = {
  name: PropTypes.oneOf(Logo.NAMES).isRequired
};

const DEFAULT_PROPS = {
  __internal__notFixed: false
};

Header.DEFAULT_PROPS = DEFAULT_PROPS;

function Header(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { children, __internal__notFixed } = props;
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
    >
      <Container bg="white" height="11" height-lg="14" boxShadow="header">
        <Container hasBreakpointWidth={true} height="100%">
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
  __internal__notFixed: PropTypes.bool
};

Header.Logo = HeaderLogo;

export default Header;
