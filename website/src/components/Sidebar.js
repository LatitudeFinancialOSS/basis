import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Location } from "@reach/router";
import { pascalCase } from "pascal-case";
import { Container, Text, designTokens } from "basis";
import { version } from "../../../package.json";

function Section({ heading, children }) {
  return (
    <Container margin="5 0 4">
      {heading && (
        <Text weight="bold" color="grey.t75" margin="0 6 2">
          {heading.toUpperCase()}
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
  const isCurrent = location.pathname.startsWith(href);

  return (
    <li css={{ listStyleType: "none" }}>
      <Link
        css={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: `${designTokens.space[2]} ${designTokens.space[6]}`,
          color: isCurrent
            ? designTokens.colors.black
            : designTokens.colors.grey.t75,
          backgroundColor: isCurrent ? designTokens.colors.grey.t16 : null,
          fontWeight: isCurrent ? designTokens.fontWeights.medium : null,
          ":hover": {
            backgroundColor: designTokens.colors.grey.t16
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
          padding: `${designTokens.space[5]} ${designTokens.space[6]}`,
          borderBottom: `1px solid ${designTokens.colors.grey.t10}`,
          backgroundColor: designTokens.colors.grey.t05
        }}
      >
        <Link to="/">
          <Text intent="h5">Basis</Text>
        </Link>
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "auto",
          backgroundColor: designTokens.colors.grey.t05
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
                <Item location={location} href="/color">
                  Color
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
            padding: `${designTokens.space[4]} ${designTokens.space[6]}`,
            fontSize: "10px",
            color: designTokens.colors.grey.t65,
            borderTop: `1px solid ${designTokens.colors.grey.t10}`
          }}
        >
          Version {version}
        </div>
      </div>
    </header>
  );
}

export default Sidebar;
