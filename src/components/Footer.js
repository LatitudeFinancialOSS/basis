import React from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import Flex from "./Flex";
import Text from "./Text";
import Link from "./Link";
import useTheme from "../hooks/useTheme";
import Logo from "./internal/Logo";
import tokens from "../themes/tokens";

function HeaderLogo({ name, testId }) {
  return (
    <Flex height="16" height-lg="15" placeItems="left center" testId={testId}>
      <Logo name={name} color="white" height="9" height-md="8" />
    </Flex>
  );
}

HeaderLogo.propTypes = {
  name: PropTypes.oneOf(Logo.NAMES).isRequired,
  testId: PropTypes.string
};

function Header({ children, testId }) {
  return (
    <Container bg="primary.blue.t100" testId={testId}>
      <Container bg="primary.blue.t100" hasBreakpointWidth={true}>
        <Flex placeItems="left center">{children}</Flex>
      </Container>
    </Container>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

function LegalLinks({ children, testId }) {
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
    <div css={linksContainerCSS} data-testid={testId}>
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
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

function LegalCopy({ children, testId }) {
  return (
    <Text
      intent="legal"
      align="center"
      margin="7 0 0 0"
      margin-md="6 0 0 0"
      testId={testId}
    >
      {children}
    </Text>
  );
}

LegalCopy.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

function Legal({ children, testId }) {
  return (
    <Container bg="secondary.lightBlue.t30" testId={testId}>
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
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

function Footer({ children, testId }) {
  return <footer data-testid={testId}>{children}</footer>;
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

Header.Logo = HeaderLogo;
Footer.Header = Header;
Legal.Links = LegalLinks;
Legal.Copy = LegalCopy;
Footer.Legal = Legal;

export default Footer;
