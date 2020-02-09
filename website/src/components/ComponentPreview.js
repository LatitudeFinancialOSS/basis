import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { LivePreview } from "react-live";
import Frame, { FrameContextConsumer } from "react-frame-component";
import weakMemoize from "@emotion/weak-memoize";
import createCache from "@emotion/cache";
import { CacheProvider, Global } from "@emotion/core";
import { BasisProvider, defaultTheme } from "basis";
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

function LivePreviewWrapper({ containerRef, highlightedComponents, children }) {
  return (
    <div
      css={{
        position: "relative",
        minHeight: "100vh"
      }}
      ref={containerRef}
    >
      {children}
      {containerRef && (
        <div
          css={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            cursor: "default"
          }}
        >
          {Object.keys(highlightedComponents).map(testId => {
            const { left, top, right, bottom } = highlightedComponents[testId];

            return (
              <div
                css={{
                  position: "absolute",
                  left,
                  top,
                  width: right - left,
                  height: bottom - top,
                  backgroundColor: "rgba(255, 0, 0, 0.2)"
                }}
                key={testId}
              >
                {testId}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

LivePreviewWrapper.propTypes = {
  children: PropTypes.node,
  containerRef: PropTypes.func,
  highlightedComponents: PropTypes.object
};

function ComponentPreviewContent({
  window,
  document,
  hasBodyMargin,
  setDocument,
  containerRef,
  highlightedComponents
}) {
  useEffect(() => {
    if (setDocument) {
      setDocument(document);
    }
  }, [setDocument, document]);

  return (
    <BasisProvider theme={defaultTheme} window={window}>
      {!hasBodyMargin && (
        <Global
          styles={{
            body: {
              margin: 0
            }
          }}
        />
      )}
      <LivePreview
        Component={LivePreviewWrapper}
        containerRef={containerRef}
        highlightedComponents={highlightedComponents}
      />
    </BasisProvider>
  );
}

ComponentPreviewContent.propTypes = {
  window: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired,
  hasBodyMargin: PropTypes.bool.isRequired,
  setDocument: PropTypes.func,
  containerRef: PropTypes.func,
  highlightedComponents: PropTypes.object
};

function ComponentPreview({
  iframeTitle = "Preview",
  hasBodyMargin = true,
  setDocument,
  containerRef,
  highlightedComponents
}) {
  return (
    <Frame
      title={iframeTitle}
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
            CacheProviderWithContainer injects design system styles into the iframe (e.g. Button styles).
            I'm not sure if we still need the CacheProvider. It used to inject website styles into the iframe (e.g. DemoBlock styles).
          */
          return (
            <CacheProvider value={cache}>
              <CacheProviderWithContainer container={document.head}>
                <ComponentPreviewContent
                  window={window}
                  document={document}
                  hasBodyMargin={hasBodyMargin}
                  setDocument={setDocument}
                  containerRef={containerRef}
                  highlightedComponents={highlightedComponents}
                />
              </CacheProviderWithContainer>
            </CacheProvider>
          );
        }}
      </FrameContextConsumer>
    </Frame>
  );
}

ComponentPreview.propTypes = {
  iframeTitle: PropTypes.string,
  hasBodyMargin: PropTypes.bool,
  setDocument: PropTypes.func,
  containerRef: PropTypes.func,
  highlightedComponents: PropTypes.object
};

export default ComponentPreview;
