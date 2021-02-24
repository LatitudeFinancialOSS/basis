import React, { Children } from "react";
import PropTypes from "prop-types";
import Accordion from "./Accordion";
import Container from "./Container";
import Flex from "./Flex";
import Icon from "./Icon";
import Link from "./Link";
import Stack from "./Stack";
import Text from "./Text";
import useBreakpoint from "../hooks/useBreakpoint";
import useTheme from "../hooks/useTheme";
import Logo from "./Logo";
import useFooterLinks, { FooterLinksProvider } from "../hooks/useFooterLinks";
import { compareBreakpoints } from "../utils/css";
import { mergeProps } from "../utils/component";

function HeaderLogo({ name, testId }) {
  return (
    <Container height="56" height-lg="80" testId={testId}>
      <Flex height="100%" placeItems="left center">
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
  testId: PropTypes.string,
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
      <Flex height="100%" placeItems="left center">
        <Text margin="0" margin-sm="0 4 0 0">
          <strong>Connect with us</strong>
        </Text>
        <Stack direction="horizontal" gap="3" margin="0 0 0 auto" margin-sm="0">
          {children}
        </Stack>
      </Flex>
    </Container>
  );
}

HeaderSocial.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

function SocialFacebook({ href, title, onClick, testId }) {
  return (
    <Link
      appearance="icon"
      href={href}
      newTab
      title={title}
      onClick={onClick}
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
  onClick: PropTypes.func,
  testId: PropTypes.string,
};

function SocialYouTube({ href, title, onClick, testId }) {
  return (
    <Link
      appearance="icon"
      href={href}
      newTab
      title={title}
      onClick={onClick}
      testId={testId}
    >
      <Icon name="youtube" color="white" hoverColor="secondary.lightBlue.t60" />
    </Link>
  );
}

SocialYouTube.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  testId: PropTypes.string,
};

function SocialTwitter({ href, title, onClick, testId }) {
  return (
    <Link
      appearance="icon"
      href={href}
      newTab
      title={title}
      onClick={onClick}
      testId={testId}
    >
      <Icon name="twitter" color="white" hoverColor="secondary.lightBlue.t60" />
    </Link>
  );
}

SocialTwitter.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  testId: PropTypes.string,
};

function SocialInstagram({ href, title, onClick, testId }) {
  return (
    <Link
      appearance="icon"
      href={href}
      newTab
      title={title}
      onClick={onClick}
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
  onClick: PropTypes.func,
  testId: PropTypes.string,
};

function SocialLinkedIn({ href, title, onClick, testId }) {
  return (
    <Link
      appearance="icon"
      href={href}
      newTab
      title={title}
      onClick={onClick}
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
  onClick: PropTypes.func,
  testId: PropTypes.string,
};

function Header({ children, testId }) {
  return (
    <Container bg="primary.blue.t100" testId={testId}>
      <Container bg="primary.blue.t100" hasBreakpointWidth>
        <Flex direction="column" direction-sm="row" placeItems="left center">
          {children}
        </Flex>
      </Container>
    </Container>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

const SECTION_TITLES_AS = ["h2", "h3", "h4", "h5", "h6"];
const LINKS_DEFAULT_PROPS = {
  sectionTitlesAs: "h5",
  switchLayoutAt: "md",
};

Links.SECTION_TITLES_AS = SECTION_TITLES_AS;
Links.DEFAULT_PROPS = LINKS_DEFAULT_PROPS;

function Links(props) {
  const mergedProps = mergeProps(props, LINKS_DEFAULT_PROPS);
  const { sectionTitlesAs, switchLayoutAt, children, testId } = mergedProps;
  const theme = useTheme();
  const bp = useBreakpoint();
  const result = compareBreakpoints(bp, switchLayoutAt, theme);
  const isColumnsLayout = result >= 0;

  return (
    <FooterLinksProvider value={{ sectionTitlesAs }}>
      <Container
        bg={isColumnsLayout ? "white" : "primary.blue.t100"}
        padding={isColumnsLayout ? "8 0" : "8 0 0 0"}
        testId={testId}
      >
        <Container hasBreakpointWidth>
          {isColumnsLayout ? (
            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {children}
            </div>
          ) : (
            <Accordion itemGap="small">
              {Children.map(children, (child, index) => (
                <Accordion.Item key={index}>
                  <Accordion.Item.Header>
                    {child.props.title}
                  </Accordion.Item.Header>
                  <Accordion.Item.Content>
                    <Stack gap="5">{child.props.children}</Stack>
                  </Accordion.Item.Content>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Container>
      </Container>
    </FooterLinksProvider>
  );
}

Links.propTypes = {
  sectionTitlesAs: PropTypes.oneOf(SECTION_TITLES_AS),
  switchLayoutAt: PropTypes.string,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

function LinksSection({ title, children, testId }) {
  const { sectionTitlesAs } = useFooterLinks();

  return (
    <div data-testid={testId}>
      <Text as={sectionTitlesAs} textStyle="subtitle2" margin="0 0 4 0">
        <strong>{title}</strong>
      </Text>
      <Stack gap="5">{children}</Stack>
    </div>
  );
}

LinksSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

function LegalLinks({ children, testId }) {
  return (
    <Container padding="0 4" padding-lg="0" textAlign="center">
      <Stack direction="horizontal" align="center" gap="3 4" testId={testId}>
        {children}
      </Stack>
    </Container>
  );
}

LegalLinks.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
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
  testId: PropTypes.string,
};

function Legal({ children, testId }) {
  return (
    <Container bg="secondary.lightBlue.t25" testId={testId}>
      <Container hasBreakpointWidth padding="9 0" textAlign="center">
        {children}
      </Container>
    </Container>
  );
}

Legal.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

function Footer({ children, testId }) {
  return <footer data-testid={testId}>{children}</footer>;
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

Footer.Header = Header;
Footer.Header.Logo = HeaderLogo;
Footer.Header.Social = HeaderSocial;
Footer.Header.Social.Facebook = SocialFacebook;
Footer.Header.Social.YouTube = SocialYouTube;
Footer.Header.Social.Twitter = SocialTwitter;
Footer.Header.Social.Instagram = SocialInstagram;
Footer.Header.Social.LinkedIn = SocialLinkedIn;

Footer.Links = Links;
Footer.Links.Section = LinksSection;

Footer.Legal = Legal;
Footer.Legal.Links = LegalLinks;
Footer.Legal.Copy = LegalCopy;

export default Footer;
