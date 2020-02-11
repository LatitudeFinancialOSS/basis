import React from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import { Flex, Text, Link, Icon } from "..";
import Logo from "./internal/Logo";

function HeaderLogo({ name, testId }) {
  return (
    <Container height="56" height-lg="80" testId={testId}>
      <Flex fullHeight placeItems="left center">
        <Logo
          name={name}
          color="white"
          height="36"
          height-xs="40"
          height-lg="48"
          maxWidth="120"
          maxWidth-xs="none"
        />
      </Flex>
    </Container>
  );
}

HeaderLogo.propTypes = {
  name: PropTypes.oneOf(Logo.NAMES).isRequired,
  testId: PropTypes.string
};

function HeaderSocial({ children, testId }) {
  return (
    <Container
      height="56"
      width="100%"
      width-sm="auto"
      margin-sm="0 0 0 auto"
      testId={testId}
    >
      <Flex fullHeight placeItems="left center">
        <Text margin="0" margin-sm="0 4 0 0">
          <strong>Connect with us</strong>
        </Text>
        <Flex gutter="3" margin="0 0 0 auto" margin-sm="0">
          {children}
        </Flex>
      </Flex>
    </Container>
  );
}

HeaderSocial.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

function SocialFacebook({ href, title, testId }) {
  return (
    <Link
      variant="icon"
      href={href}
      newTab={true}
      title={title}
      testId={testId}
    >
      <Icon
        name="facebook"
        color="white"
        hoverColor="secondary.lightBlue.t60"
      />
    </Link>
  );
}

SocialFacebook.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  testId: PropTypes.string
};

function SocialYouTube({ href, title, testId }) {
  return (
    <Link
      variant="icon"
      href={href}
      newTab={true}
      title={title}
      testId={testId}
    >
      <Icon name="youtube" color="white" hoverColor="secondary.lightBlue.t60" />
    </Link>
  );
}

SocialYouTube.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  testId: PropTypes.string
};

function SocialTwitter({ href, title, testId }) {
  return (
    <Link
      variant="icon"
      href={href}
      newTab={true}
      title={title}
      testId={testId}
    >
      <Icon name="twitter" color="white" hoverColor="secondary.lightBlue.t60" />
    </Link>
  );
}

SocialTwitter.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  testId: PropTypes.string
};

function SocialInstagram({ href, title, testId }) {
  return (
    <Link
      variant="icon"
      href={href}
      newTab={true}
      title={title}
      testId={testId}
    >
      <Icon
        name="instagram"
        color="white"
        hoverColor="secondary.lightBlue.t60"
      />
    </Link>
  );
}

SocialInstagram.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  testId: PropTypes.string
};

function SocialLinkedIn({ href, title, testId }) {
  return (
    <Link
      variant="icon"
      href={href}
      newTab={true}
      title={title}
      testId={testId}
    >
      <Icon
        name="linkedin"
        color="white"
        hoverColor="secondary.lightBlue.t60"
      />
    </Link>
  );
}

SocialLinkedIn.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  testId: PropTypes.string
};

function Header({ children, testId }) {
  return (
    <Container bg="primary.blue.t100" testId={testId}>
      <Container bg="primary.blue.t100" hasBreakpointWidth={true}>
        <Flex direction="column" direction-sm="row" placeItems="left center">
          {children}
        </Flex>
      </Container>
    </Container>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

function LegalLinks({ children, testId }) {
  const links = React.Children.toArray(children).filter(
    // Ignore all children that aren't a Link
    child => child.type === Link
  );

  return (
    <Flex gutter="3 4" wrap placeItems="top center" testId={testId}>
      {links}
    </Flex>
  );
}

LegalLinks.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

function LegalCopy({ children, testId }) {
  return (
    <Container textStyle="legal" margin="7 0 0 0" testId={testId}>
      {children}
    </Container>
  );
}

LegalCopy.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

function Legal({ children, testId }) {
  return (
    <Container bg="secondary.lightBlue.t30" testId={testId}>
      <Container hasBreakpointWidth={true} padding="9 0" textAlign="center">
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

Footer.Header = Header;
Footer.Header.Logo = HeaderLogo;
Footer.Header.Social = HeaderSocial;
Footer.Header.Social.Facebook = SocialFacebook;
Footer.Header.Social.YouTube = SocialYouTube;
Footer.Header.Social.Twitter = SocialTwitter;
Footer.Header.Social.Instagram = SocialInstagram;
Footer.Header.Social.LinkedIn = SocialLinkedIn;

Footer.Legal = Legal;
Footer.Legal.Links = LegalLinks;
Footer.Legal.Copy = LegalCopy;

export default Footer;
