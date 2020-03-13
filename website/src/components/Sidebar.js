import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Location } from "@reach/router";
import { pascalCase } from "pascal-case";
import { Container, Text, useTheme } from "basis";
import { version } from "../../../package.json";

function Section({ heading, children }) {
  return (
    <Container margin="5 0 4">
      {heading && (
        <Text color="grey.t75" margin="0 6 2">
          <strong>{heading.toUpperCase()}</strong>
        </Text>
      )}
      <ul css={{ margin: 0, padding: 0 }}>{children}</ul>
    </Container>
  );
}

Section.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node.isRequired
};

function Item({ location, href, children }) {
  const theme = useTheme();
  const isCurrent = location.pathname.startsWith(href);

  return (
    <li css={{ listStyleType: "none" }}>
      <Link
        css={{
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",
          width: "100%",
          padding: `${theme.space[2]} ${theme.space[6]}`,
          color: isCurrent ? theme.colors.black : theme.colors.grey.t75,
          backgroundColor: isCurrent ? theme.colors.grey.t16 : null,
          fontWeight: isCurrent ? theme.fontWeights.medium : null,
          ":hover": {
            backgroundColor: theme.colors.grey.t16
          }
        }}
        to={href}
      >
        {children}
      </Link>
    </li>
  );
}

Item.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

function Sidebar() {
  const theme = useTheme();
  const data = useStaticQuery(graphql`
    query ComponentsQuery {
      allFile(
        filter: { relativePath: { regex: "/^components/.*/index.js/" } }
        sort: { order: ASC, fields: relativePath }
      ) {
        edges {
          node {
            relativeDirectory
          }
        }
      }
    }
  `);
  const components = data.allFile.edges.map(({ node }) => {
    const { relativeDirectory } = node;

    return {
      componentName: pascalCase(relativeDirectory.split("/")[1]),
      href: `/${relativeDirectory}`
    };
  });

  return (
    <header css={{ minHeight: 0, display: "flex", flexDirection: "column" }}>
      <div
        css={{
          padding: `${theme.space[5]} ${theme.space[6]}`,
          borderBottom: `1px solid ${theme.colors.grey.t10}`,
          backgroundColor: theme.colors.grey.t05
        }}
      >
        <Link to="/">
          <Text as="h5" textStyle="heading5">
            Basis
          </Text>
        </Link>
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "auto",
          backgroundColor: theme.colors.grey.t05
        }}
      >
        <Location>
          {({ location }) => (
            <>
              <Section>
                <Item location={location} href="/playground">
                  Playground
                </Item>
              </Section>
              <Section heading="Foundation">
                <Item location={location} href="/typography">
                  Typography
                </Item>
                <Item location={location} href="/spacing">
                  Spacing
                </Item>
                <Item location={location} href="/colors">
                  Colors
                </Item>
              </Section>
              <Section heading="Components">
                {components.map(({ componentName, href }, index) => (
                  <Item location={location} href={href} key={index}>
                    {componentName}
                  </Item>
                ))}
              </Section>
            </>
          )}
        </Location>
        <div
          css={{
            marginTop: "auto",
            padding: `${theme.space[4]} ${theme.space[6]}`,
            fontSize: "10px",
            color: theme.colors.grey.t65,
            borderTop: `1px solid ${theme.colors.grey.t10}`
          }}
        >
          Version {version}
        </div>
      </div>
    </header>
  );
}

export default Sidebar;
