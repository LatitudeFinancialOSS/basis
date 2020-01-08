import React, { useState, useRef } from "react";
import { LiveProvider, LiveEditor, LiveError, withLive } from "react-live";
import { Resizable } from "re-resizable";
import { rgba } from "polished";
import * as allDesignSystem from "basis";
import { formatCode } from "../utils/formatting";
import { reactLiveEditorTheme } from "../utils/constants";
import ComponentPreview from "../components/ComponentPreview";
import DemoBlock from "../components/DemoBlock";

const { designTokens, useTheme, Text, Container } = allDesignSystem;

const topOnly = {
  top: true,
  right: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false
};

const initialCode = `
  <Container bg="secondary.lightBlue.t30" padding="2 4" padding-sm="3 5" padding-md="5 7">
    <Text intent="h1" size="5" size-sm="3" size-md="2">
      Hello World
    </Text>
  </Container>
`;
const prettify = code =>
  formatCode(code, {
    printWidth: 81
  });

const scope = {
  ...allDesignSystem,
  DemoBlock
};

const PlaygroundError = withLive(({ live }) => {
  if (!live.error) {
    return null;
  }

  return (
    <div
      css={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        maxHeight: designTokens.sizes[15],
        overflowY: "auto",
        padding: `${designTokens.space[4]} ${designTokens.space[7]}`,
        backgroundColor: designTokens.colors.white,
        borderTop: `${designTokens.borderWidths[0]} solid ${designTokens.colors.grey.t10}`,
        color: designTokens.colors.conditional.negative.text,
        "> pre": {
          margin: 0
        }
      }}
    >
      <LiveError />
    </div>
  );
});

function PlaygroundFrame() {
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        backgroundColor: designTokens.colors.white,
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }}
    >
      <ComponentPreview hasBodyMargin={false} />
    </div>
  );
}

function Playground() {
  const theme = useTheme();
  const [code, setCode] = useState(() => prettify(initialCode));
  const [height, setHeight] = useState("40vh");
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const settingsRef = useRef();

  return (
    <div css={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <LiveProvider code={code} scope={scope} theme={reactLiveEditorTheme}>
        <div css={{ flexGrow: 1, position: "relative", overflowX: "auto" }}>
          <div
            css={{
              display: "flex",
              padding: designTokens.space[7],
              height: "100%",
              width: "min-content", // Without it, right padding is not visible.
              boxSizing: "border-box",
              backgroundColor: designTokens.colors.grey.t03
            }}
          >
            {Object.entries(theme.breakpoints).map(([bp, width], index) => (
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: index === 0 ? null : designTokens.space[7],
                  width
                }}
                key={bp}
              >
                <div css={{ flexGrow: 1 }}>
                  <PlaygroundFrame />
                </div>
                <Container padding="1">
                  <Text color="grey.t75">
                    <strong>{bp}</strong> – {width}
                  </Text>
                </Container>
              </div>
            ))}
          </div>
          <PlaygroundError />
        </div>
        <Resizable
          style={{
            flexShrink: 0
          }}
          enable={topOnly}
          minHeight="10vh"
          maxHeight="90vh"
          size={{
            width: "100%",
            height
          }}
          onResizeStop={(_e, _direction, _ref, d) => {
            setHeight(height + d.height);
          }}
        >
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              boxSizing: "border-box"
            }}
          >
            <div
              css={{
                flexShrink: 0,
                display: "flex",
                padding: `${designTokens.space[2]} ${designTokens.space[7]}`,
                backgroundColor: designTokens.colors.grey.t05,
                borderTop: `${designTokens.borderWidths[0]} solid ${designTokens.colors.grey.t10}`,
                borderBottom: `${designTokens.borderWidths[0]} solid ${designTokens.colors.grey.t10}`
              }}
            >
              <button
                onClick={() => {
                  setCode(prettify(code));
                }}
              >
                Prettify
              </button>
              <button
                css={{ marginLeft: "auto" }}
                onClick={() => {
                  setAreSettingsOpen(!areSettingsOpen);
                }}
              >
                Settings
              </button>
            </div>
            <div
              css={{
                display: "flex",
                position: "relative",
                flexGrow: 1,
                minHeight: 0,
                overflowX: "auto"
              }}
            >
              <div
                css={{
                  padding: `${designTokens.space[4]} ${designTokens.space[7]}`,
                  "textarea:focus": {
                    outline: "none"
                  }
                }}
              >
                <LiveEditor
                  style={{ paddingRight: designTokens.space[8] }}
                  padding={0}
                  onChange={setCode}
                />
              </div>
              {areSettingsOpen && (
                <div
                  css={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: rgba(designTokens.colors.white, 0.7)
                  }}
                  onClick={e => {
                    if (!settingsRef.current.contains(e.target)) {
                      setAreSettingsOpen(false);
                    }
                  }}
                >
                  <div
                    css={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      right: 0,
                      width: designTokens.sizes[16],
                      maxWidth: "100vw",
                      boxSizing: "border-box",
                      padding: `${designTokens.space[4]} ${designTokens.space[7]}`,
                      backgroundColor: designTokens.colors.grey.t03,
                      borderLeft: `${designTokens.borderWidths[0]} solid ${designTokens.colors.grey.t10}`
                    }}
                    ref={settingsRef}
                  >
                    Settings
                  </div>
                </div>
              )}
            </div>
          </div>
        </Resizable>
      </LiveProvider>
    </div>
  );
}

export default Playground;
