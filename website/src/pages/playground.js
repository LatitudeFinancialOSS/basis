import React, { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { LiveProvider, LiveEditor, LiveError, withLive } from "react-live";
import { Resizable } from "re-resizable";
import { rgba } from "polished";
import lzString from "lz-string";
import queryString from "query-string";
import * as allDesignSystem from "basis";
import { getReactLiveNoInline } from "../utils/ast";
import { formatCode } from "../utils/formatting";
import { reactLiveEditorTheme } from "../utils/constants";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import ComponentPreview from "../components/ComponentPreview";
import DemoBlock from "../components/DemoBlock";

const {
  designTokens,
  useTheme,
  VisuallyHidden,
  Text,
  Button
} = allDesignSystem;

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

const prettify = code =>
  formatCode(code, {
    printWidth: 81
  });

const defaultCode = prettify(`
  <Container bg="secondary.lightBlue.t30" padding="2 4" padding-sm="3 5" padding-md="5 7">
    <Text intent="h1" size="5" size-sm="3" size-md="2">
      Hello World
    </Text>
  </Container>
`);

const scope = {
  ...allDesignSystem,
  DemoBlock
};

const PlaygroundError = withLive(({ live }) => {
  if (typeof window === "undefined" || !live.error) {
    return null;
  }

  return (
    <div
      css={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        maxHeight: designTokens.sizes[19],
        overflowY: "auto",
        padding: `${designTokens.space[4]} ${designTokens.space[8]}`,
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

function PlaygroundScreen({ width }) {
  return (
    <div
      css={{
        width: "100%",
        backgroundColor: designTokens.colors.white,
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }}
    >
      <ComponentPreview
        iframeTitle={`Preview at ${width}px`}
        hasBodyMargin={false}
      />
    </div>
  );
}

PlaygroundScreen.propTypes = {
  width: PropTypes.number.isRequired
};

function PlaygroundSettings({ screens, setScreens }) {
  const [newScreen, setNewScreen] = useState({
    id: "new-screen",
    name: "",
    width: ""
  });
  const [newScreenError, setNewScreenError] = useState(null);
  const onFrameChange = (id, key, value) => {
    const frameIndex = screens.findIndex(frame => frame.id === id);

    if (frameIndex === -1) {
      return;
    }

    const before = screens.slice(0, frameIndex);
    const updatedFrame = {
      ...screens[frameIndex],
      [key]: value
    };
    const after = screens.slice(frameIndex + 1);

    setScreens(before.concat(updatedFrame, after));
  };
  const onFrameRemove = id => {
    const frameIndex = screens.findIndex(frame => frame.id === id);

    if (frameIndex === -1) {
      return;
    }

    const before = screens.slice(0, frameIndex);
    const after = screens.slice(frameIndex + 1);

    setScreens(before.concat(after));
  };
  const onFrameAdd = e => {
    e.preventDefault();

    const { name, width } = newScreen;
    const cleanName = name.trim();

    if (cleanName === "") {
      setNewScreenError("name is missing");
      return;
    }

    if (screens.find(frame => frame.name === cleanName)) {
      setNewScreenError(
        <>
          <strong>{cleanName}</strong> already exists
        </>
      );
      return;
    }

    const widthInt = parseInt(width, 10);

    if (isNaN(widthInt)) {
      setNewScreenError("width is missing");
      return;
    }

    if (widthInt < 200 || widthInt > 5000) {
      setNewScreenError("width must be between 200 and 5000");
      return;
    }

    if (screens.find(frame => frame.width === widthInt)) {
      setNewScreenError(
        <>
          <strong>{widthInt}px</strong> already exists
        </>
      );
      return;
    }

    setScreens(
      screens.concat({
        id: cleanName,
        name: cleanName,
        width: widthInt
      })
    );
    setNewScreen({
      ...newScreen,
      name: "",
      width: ""
    });
    setNewScreenError(null);
  };

  return (
    <div
      css={{
        height: "100%",
        boxSizing: "border-box",
        padding: `${designTokens.space[4]} ${designTokens.space[8]}`,
        backgroundColor: designTokens.colors.grey.t03
      }}
    >
      <label>Screens</label>
      <ul css={{ listStyleType: "none", margin: 0, padding: 0 }}>
        {screens.map(({ id, name, width }) => (
          <li key={id}>
            <input
              css={{ width: 100 }}
              type="text"
              value={name}
              onChange={e => onFrameChange(id, "name", e.target.value)}
            />
            <input
              css={{ width: 50 }}
              type="number"
              value={width}
              onChange={e => onFrameChange(id, "width", Number(e.target.value))}
            />
            <button
              aria-label="Remove Screen"
              onClick={() => onFrameRemove(id)}
            >
              ✕
            </button>
          </li>
        ))}
        <li key={newScreen.id}>
          <form onSubmit={onFrameAdd}>
            <input
              css={{ width: 100 }}
              type="text"
              value={newScreen.name}
              placeholder="name"
              onChange={e =>
                setNewScreen({
                  ...newScreen,
                  name: e.target.value
                })
              }
            />
            <input
              css={{ width: 50 }}
              type="number"
              value={newScreen.width}
              placeholder="width"
              onChange={e =>
                setNewScreen({
                  ...newScreen,
                  width: Number(e.target.value)
                })
              }
            />
            <button aria-label="Add New Screen">Add</button>
            {newScreenError && (
              <Text intent="body2" color="conditional.negative.text">
                {newScreenError}
              </Text>
            )}
          </form>
        </li>
      </ul>
    </div>
  );
}

PlaygroundSettings.propTypes = {
  screens: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  setScreens: PropTypes.func.isRequired
};

function Playground({ location }) {
  const theme = useTheme();
  const [code, setCode] = useState("");
  const noInline = useMemo(() => getReactLiveNoInline(code), [code]);
  const [height, setHeight] = useState("40vh");
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const settingsRef = useRef();
  const [screens, setScreens] = useState([]);
  const [isShareSuccessful, copyShareUrlToClipboard] = useCopyToClipboard(
    () => {
      const data = {
        code: prettify(code),
        settings: {
          screens: screens.map(({ name, width }) => [name, width])
        }
      };
      const dataStr = lzString.compressToEncodedURIComponent(
        JSON.stringify(data)
      );

      const { url, query } = queryString.parseUrl(location.href);

      return `${url}?${queryString.stringify({
        ...query,
        data: dataStr
      })}`;
    }
  );

  useEffect(() => {
    let initialCode = defaultCode;
    let initialScreens = Object.entries(theme.breakpoints);

    const { data } = queryString.parse(location.search);

    if (data) {
      try {
        const dataFromUrl = JSON.parse(
          lzString.decompressFromEncodedURIComponent(data)
        );

        if (dataFromUrl.code) {
          initialCode = dataFromUrl.code;
        }

        if (dataFromUrl.settings && dataFromUrl.settings.screens) {
          initialScreens = dataFromUrl.settings.screens;
        }
      } catch (_e) {
        // ESLint doesn't allow an empty block
      }
    }

    setCode(initialCode);
    setScreens(
      initialScreens.map(([bp, width]) => ({
        id: bp,
        name: bp,
        width: parseInt(width, 10)
      }))
    );
  }, [location.search, theme.breakpoints]);

  return (
    <div css={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <LiveProvider
        code={code}
        noInline={noInline}
        scope={scope}
        theme={reactLiveEditorTheme}
      >
        <div
          css={{
            flexGrow: 1,
            display: "flex",
            position: "relative",
            overflowX: "auto",
            backgroundColor: designTokens.colors.grey.t03
          }}
        >
          <div
            css={{
              display: "flex",
              padding: designTokens.space[8],
              width: "min-content" // Without it, right padding is not visible.
            }}
          >
            {screens.map(({ id, name, width }, index) => (
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: index === 0 ? null : designTokens.space[8],
                  width
                }}
                key={id}
              >
                <div css={{ flexGrow: 1, display: "flex" }}>
                  <PlaygroundScreen width={width} />
                </div>
                <Text color="grey.t75" margin="1 1 0">
                  <strong>{name}</strong> – {width}px
                </Text>
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
                padding: `${designTokens.space[2]} ${designTokens.space[8]}`,
                backgroundColor: designTokens.colors.grey.t05,
                borderTop: `${designTokens.borderWidths[0]} solid ${designTokens.colors.grey.t10}`,
                borderBottom: `${designTokens.borderWidths[0]} solid ${designTokens.colors.grey.t10}`
              }}
            >
              <Button
                variant="secondary"
                isFullWidth={false}
                onClick={() => {
                  setCode(prettify(code));
                }}
              >
                Prettify
              </Button>
              <Button
                margin="0 0 0 4"
                variant="secondary"
                isFullWidth={false}
                isDisabled={isShareSuccessful}
                onClick={copyShareUrlToClipboard}
              >
                {isShareSuccessful ? "Copied!" : "Share"}
              </Button>
              <Button
                margin="0 0 0 auto"
                variant="secondary"
                isFullWidth={false}
                onClick={() => {
                  setAreSettingsOpen(!areSettingsOpen);
                }}
              >
                Settings
              </Button>
            </div>
            <div
              css={{
                display: "flex",
                position: "relative",
                flexGrow: 1,
                minHeight: 0
              }}
            >
              <div
                css={{
                  padding: `${designTokens.space[4]} ${designTokens.space[8]}`,
                  width: "100%",
                  overflow: "auto",
                  "textarea:focus": {
                    outline: "none"
                  }
                }}
              >
                <VisuallyHidden>
                  <label htmlFor="code-editor">Code Editor</label>
                </VisuallyHidden>
                <LiveEditor
                  textareaId="code-editor"
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
                      width: designTokens.sizes[20],
                      maxWidth: "100vw",
                      boxSizing: "border-box",
                      borderLeft: `${designTokens.borderWidths[0]} solid ${designTokens.colors.grey.t10}`
                    }}
                    ref={settingsRef}
                  >
                    <PlaygroundSettings
                      screens={screens}
                      setScreens={setScreens}
                    />
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

Playground.propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired
};

export default Playground;
