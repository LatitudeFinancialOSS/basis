import React from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import Text from "./Text";
import Link from "./Link";
import useTheme from "../hooks/useTheme";
import Logo, { NAMES as LOGO_NAMES } from "./internal/Logo";
import tokens from "../themes/tokens";

function HeaderLogo({ name }) {
  const theme = useTheme();

  const css = {
    display: "flex",
    alignItems: "center",
    height: tokens.sizes[16],
    [theme.minMediaQueries.lg]: {
      height: tokens.sizes[15]
    }
  };
  return (
    <div css={css}>
      <Logo name={name} color="white" height="9" height-md="8" />
    </div>
  );
}

HeaderLogo.propTypes = {
  name: PropTypes.oneOf(LOGO_NAMES).isRequired
};

function Header({ children }) {
  return (
    <Container bg="primary.blue.t100">
      <Container bg="primary.blue.t100" hasBreakpointWidth={true}>
        <div css={{ display: "flex", alignItems: "center" }}>{children}</div>
      </Container>
    </Container>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired
};

function LegalLinks({ children }) {
  const theme = useTheme();
  const links = React.Children.toArray(children).filter(
    // Ignore all children that aren't a Link
    child => child.type === Link
  );
  const linksContainerCSS = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    [theme.minMediaQueries.md]: {
      flexDirection: "row"
    }
  };

  return (
    <div css={linksContainerCSS}>
      {links.map((link, index) => {
        const linkItemCSS = {
          whiteSpace: "nowrap",
          marginTop: index > 0 && tokens.space[3],
          [theme.minMediaQueries.md]: {
            marginTop: 0,
            marginLeft: index > 0 && tokens.space[4]
          }
        };

        return (
          <div css={linkItemCSS} key={index}>
            {link}
          </div>
        );
      })}
    </div>
  );
}

LegalLinks.propTypes = {
  children: PropTypes.node.isRequired
};

function LegalCopy({ children }) {
  return (
    <Text intent="legal" align="center" margin="7 0 0 0" margin-md="6 0 0 0">
      {children}
    </Text>
  );
}

LegalCopy.propTypes = {
  children: PropTypes.node.isRequired
};

function Legal({ children }) {
  return (
    <Container bg="secondary.lightBlue.t30">
      <Container
        bg="secondary.lightBlue.t30"
        padding="7 0"
        hasBreakpointWidth={true}
      >
        {children}
      </Container>
    </Container>
  );
}

Legal.propTypes = {
  children: PropTypes.node.isRequired
};

function Footer({ children }) {
  return <footer>{children}</footer>;
}

Footer.propTypes = {
  children: PropTypes.node.isRequired
};

Header.Logo = HeaderLogo;
Footer.Header = Header;
Legal.Links = LegalLinks;
Legal.Copy = LegalCopy;
Footer.Legal = Legal;

export default Footer;
