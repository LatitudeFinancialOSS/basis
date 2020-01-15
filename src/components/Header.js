import React from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import Logo, { NAMES as LOGO_NAMES } from "./internal/Logo";

function HeaderLogo({ name }) {
  return (
    <Logo name={name} color="primary.blue.t100" height="5" height-xs="7" />
  );
}

HeaderLogo.propTypes = {
  name: PropTypes.oneOf(LOGO_NAMES).isRequired
};

function Header({ children }) {
  return (
    <header>
      <Container bg="white" height="10" height-lg="13" boxShadow="header">
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
