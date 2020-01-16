import React from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import Logo, { NAMES as LOGO_NAMES } from "./internal/Logo";
import useTheme from "../hooks/useTheme";

function HeaderLogo({ name }) {
  return (
    <Logo name={name} color="primary.blue.t100" height="5" height-xs="7" />
  );
}

HeaderLogo.propTypes = {
  name: PropTypes.oneOf(LOGO_NAMES).isRequired
};

function Header({ children }) {
  const theme = useTheme();

  return (
    <header
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndices.header
      }}
    >
      <Container bg="white" height="11" height-lg="14" boxShadow="header">
        <Container hasBreakpointWidth={true} height="100%">
          <div css={{ display: "flex", height: "100%", alignItems: "center" }}>
            {children}
          </div>
        </Container>
      </Container>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired
};

Header.Logo = HeaderLogo;

export default Header;
