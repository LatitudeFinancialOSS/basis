import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Location } from "@reach/router";
import { Global } from "@emotion/core";
import { COMPONENT_STATUS } from "../utils/constants";
import SEO from "../components/SEO";
import Sidebar from "../components/Sidebar";
import ComponentStatusIndicator from "../components/ComponentStatusIndicator";
import { Text, Container, designTokens, ThemeProvider } from "basis";
import { getTabsUrls } from "../utils/url";
import websiteTheme from "../themes/website";
import "typeface-montserrat";
import "typeface-roboto";

function Page({ pageContext, children }) {
  const { header, status, layout = "default" } = pageContext;
  const title = header ? `${header} | Basis` : "Basis";

  return (
    <ThemeProvider theme={websiteTheme}>
      <Global
        styles={{
          body: {
            margin: 0,
            fontFamily: designTokens.fonts.body,
            fontSize: designTokens.fontSizes[1],
            lineHeight: designTokens.lineHeights[0],
            color: designTokens.colors.black
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
            gridTemplateColumns: `${designTokens.sizes[19]} 1fr`
          }}
        >
          <Sidebar />
          <main
            css={{ minHeight: 0, display: "flex", flexDirection: "column" }}
          >
            {header && (
              <div
                css={{
                  marginBottom: designTokens.space[2],
                  padding: `${designTokens.space[5]} ${designTokens.space[6]} 0`,
                  borderBottom: `1px solid ${designTokens.colors.grey.t16}`
                }}
              >
                <div
                  css={{
                    display: "flex",
                    height: designTokens.space[5]
                  }}
                >
                  <Text intent="h4">{header}</Text>
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
                          margin: `${designTokens.space[10]} 0 0`,
                          padding: 0
                        }}
                      >
                        {urls.map(({ name, to, isCurrent }, index) => (
                          <li
                            css={{
                              listStyleType: "none",
                              marginLeft:
                                index === 0 ? 0 : designTokens.space[8],
                              paddingBottom: designTokens.space[2],
                              color: isCurrent
                                ? designTokens.colors.black
                                : designTokens.colors.grey.t65,
                              borderBottom: isCurrent
                                ? `${designTokens.borderWidths[1]} solid ${designTokens.colors.black}`
                                : 0
                            }}
                            key={name}
                          >
                            {to ? (
                              <Link to={to}>{name}</Link>
                            ) : (
                              <a title="Coming soon">{name}</a>
                            )}
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
    </ThemeProvider>
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
