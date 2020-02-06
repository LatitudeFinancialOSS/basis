import React from "react";
import PropTypes from "prop-types";
import { Location } from "@reach/router";
import { Global } from "@emotion/core";
import { Link as GatsbyLink } from "gatsby";
import { COMPONENT_STATUS } from "../utils/constants";
import SEO from "../components/SEO";
import Sidebar from "../components/Sidebar";
import ComponentStatusIndicator from "../components/ComponentStatusIndicator";
import { BasisProvider, designTokens, Container, Text, Link } from "basis";
import theme from "../themes/website";
import { getTabsUrls } from "../utils/url";
import "typeface-montserrat";
import "typeface-roboto";

function Page({ pageContext, children }) {
  const { header, status, layout = "default" } = pageContext;
  const title = header ? `${header} | Basis` : "Basis";

  return (
    <BasisProvider theme={theme} InternalLink={GatsbyLink}>
      <Global
        styles={{
          body: {
            margin: 0,
            fontFamily: designTokens.fonts.body,
            fontSize: theme.fontSizes[1],
            lineHeight: theme.lineHeights[2],
            color: theme.colors.black
          },
          a: {
            color: "inherit",
            textDecoration: "none"
          }
        }}
      />
      <SEO title={title} />
      {layout === "empty" ? (
        <main>{children}</main>
      ) : (
        <div
          css={{
            height: "100vh",
            display: "grid",
            gridTemplateColumns: `${theme.sizes[19]} 1fr`
          }}
        >
          <Sidebar />
          <main
            css={{
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              overflow: "auto"
            }}
          >
            {header && (
              <div
                css={{
                  borderBottom: `1px solid ${theme.colors.grey.t16}`
                }}
              >
                <div
                  css={{
                    display: "flex",
                    padding: `${theme.space[5]} ${theme.space[6]} 0`
                  }}
                >
                  <Text as="h1" textStyle="heading4">
                    {header}
                  </Text>
                  {status && (
                    <Container margin="0 0 0 9">
                      <ComponentStatusIndicator status={status} />
                    </Container>
                  )}
                </div>
                <Location>
                  {({ location }) => {
                    const urls = getTabsUrls(location);

                    return (
                      <ul
                        css={{
                          display: "flex",
                          margin: `${theme.space[6]} 0 0`,
                          padding: 0
                        }}
                      >
                        {urls.map(({ name, href, isCurrent }) => (
                          <li
                            css={{
                              listStyleType: "none",
                              color: isCurrent
                                ? theme.colors.black
                                : theme.colors.grey.t65,
                              ...(isCurrent && {
                                "::after": {
                                  content: "''",
                                  display: "block",
                                  height: designTokens.borderWidths[1],
                                  margin: `0 ${theme.space[6]}`,
                                  backgroundColor: theme.colors.black
                                }
                              })
                            }}
                            key={name}
                          >
                            <Link href={href} newTab={false} padding="2 6">
                              {name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    );
                  }}
                </Location>
              </div>
            )}
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                minHeight: 0,
                overflowY: "auto"
              }}
            >
              {children}
            </div>
          </main>
        </div>
      )}
    </BasisProvider>
  );
}

Page.propTypes = {
  pageContext: PropTypes.shape({
    header: PropTypes.string,
    status: PropTypes.oneOf(Object.values(COMPONENT_STATUS)),
    layout: PropTypes.string
  }).isRequired,
  children: PropTypes.node
};

export default Page;
