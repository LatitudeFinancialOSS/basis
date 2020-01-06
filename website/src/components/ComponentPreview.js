import React from "react";
import PropTypes from "prop-types";
import { LivePreview } from "react-live";
import Frame, { FrameContextConsumer } from "react-frame-component";
import weakMemoize from "@emotion/weak-memoize";
import createCache from "@emotion/cache";
import { CacheProvider, Global } from "@emotion/core";
import { ThemeProvider, defaultTheme } from "basis";
import CacheProviderWithContainer from "./CacheProviderWithContainer";
import "typeface-montserrat";
import "typeface-roboto";

// Inspired by: https://github.com/emotion-js/emotion/issues/760#issuecomment-404353706
const memoizedCreateCacheWithContainer = weakMemoize(container => {
  return createCache({
    key: "website", // This key must exist! See: https://emotion.sh/docs/@emotion/cache#key
    container
  });
});
const iframeHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:600|Roboto:300,500,700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="component-preview">
    </div>
  </body>
</html>
`;
const iframeStyle = {
  width: "100%",
  height: "100%",
  border: 0
};

function ComponentPreview({ hasBodyMargin = true }) {
  return (
    <div css={{ height: "100%" }}>
      <Frame
        initialContent={iframeHTML}
        mountTarget="#component-preview"
        style={iframeStyle}
      >
        <FrameContextConsumer>
          {({ window, document }) => {
            const cache = memoizedCreateCacheWithContainer({
              container: document.head
            });

            /*
              CacheProvider injects website styles into the iframe (e.g. DemoBlock styles).
              CacheProviderWithContainer injects design system styles into the iframe (e.g. Button styles).
            */
            return (
              <CacheProvider value={cache}>
                <CacheProviderWithContainer container={document.head}>
                  <ThemeProvider theme={defaultTheme} window={window}>
                    {!hasBodyMargin && (
                      <Global
                        styles={{
                          body: {
                            margin: 0
                          }
                        }}
                      />
                    )}
                    <LivePreview />
                  </ThemeProvider>
                </CacheProviderWithContainer>
              </CacheProvider>
            );
          }}
        </FrameContextConsumer>
      </Frame>
    </div>
  );
}

ComponentPreview.propTypes = {
  hasBodyMargin: PropTypes.bool
};

export default ComponentPreview;
