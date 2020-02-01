import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef
} from "react";
import PropTypes from "prop-types";
import { LiveProvider, LiveEditor, LiveError, withLive } from "react-live";
import { Resizable } from "re-resizable";
import { rgba } from "polished";
import * as allDesignSystem from "basis";
import * as allOptionallyControlled from "../../components/optionally-controlled";
import { getPlaygroundUrl, getPlaygroundDataFromUrl } from "../../utils/url";
import {
  getReactLiveNoInline,
  annotateCodeForPlayground
} from "../../utils/ast";
import { formatCode } from "../../utils/formatting";
import { reactLiveEditorTheme } from "../../utils/constants";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import useLocalStorage from "../../hooks/useLocalStorage";
import useCanary from "../../hooks/useCanary";
import ComponentPreview from "../../components/ComponentPreview";
import DemoBlock from "../../components/DemoBlock";
import InspectIcon from "../../components/icons/inspect";

import "../../utils/meta";

const {
  designTokens,
  useTheme,
  Flex,
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
    <Text as="h1" textStyle="heading5" textStyle-sm="heading3" textStyle-md="heading2">
      Hello World
    </Text>
  </Container>
`);

const scope = {
  ...allDesignSystem,
  ...allOptionallyControlled,
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

function PlaygroundScreenOverlay() {
  return (
    <div
      css={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255,0,0,0.2)"
      }}
    ></div>
  );
}

function PlaygroundScreen({ id, width, setDocument, isInspectMode }) {
  const _setDocument = useCallback(
    document => {
      setDocument(id, document);
    },
    [setDocument, id]
  );

  return (
    <div
      css={{
        position: "relative",
        width: "100%",
        backgroundColor: designTokens.colors.white,
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }}
    >
      <ComponentPreview
        iframeTitle={`Preview at ${width}px`}
        hasBodyMargin={false}
        setDocument={_setDocument}
      />
      {isInspectMode && <PlaygroundScreenOverlay />}
    </div>
  );
}

PlaygroundScreen.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  setDocument: PropTypes.func.isRequired,
  isInspectMode: PropTypes.bool.isRequired
};

function PlaygroundSettings({ screens, setScreens }) {
  const [newScreen, setNewScreen] = useState({
    id: "new-screen",
    name: "",
    width: ""
  });
  const [newScreenError, setNewScreenError] = useState(null);
  const onScreenChange = (id, key, value) => {
    setScreens(screens => {
      const screenIndex = screens.findIndex(screen => screen.id === id);

      if (screenIndex === -1) {
        return;
      }

      const before = screens.slice(0, screenIndex);
      const updatedScreen = {
        ...screens[screenIndex],
        [key]: value
      };
      const after = screens.slice(screenIndex + 1);

      return before.concat(updatedScreen, after);
    });
  };
  const onScreenRemove = id => {
    setScreens(screens => {
      const screenIndex = screens.findIndex(screen => screen.id === id);

      if (screenIndex === -1) {
        return;
      }

      const before = screens.slice(0, screenIndex);
      const after = screens.slice(screenIndex + 1);

      return before.concat(after);
    });
  };
  const onScreenAdd = e => {
    e.preventDefault();

    const { name, width } = newScreen;
    const cleanName = name.trim();

    if (cleanName === "") {
      setNewScreenError("name is missing");
      return;
    }

    if (screens.find(screen => screen.name === cleanName)) {
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

    if (screens.find(screen => screen.width === widthInt)) {
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

    setNewScreen(newScreen => ({
      ...newScreen,
      name: "",
      width: ""
    }));

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
              onChange={e => onScreenChange(id, "name", e.target.value)}
            />
            <input
              css={{ width: 50 }}
              type="number"
              value={width}
              onChange={e =>
                onScreenChange(id, "width", Number(e.target.value))
              }
            />
            <button
              aria-label="Remove Screen"
              onClick={() => onScreenRemove(id)}
            >
              ✕
            </button>
          </li>
        ))}
        <li key={newScreen.id}>
          <form onSubmit={onScreenAdd}>
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
              <Text textStyle="body2" color="conditional.negative.text">
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
  const isCanary = useCanary();
  const [code, setCode] = useState("");
  const noInline = useMemo(() => getReactLiveNoInline(code), [code]);
  const [height, setHeight] = useLocalStorage(
    "playground-code-panel-height",
    "40vh"
  );
  const [isInspectMode, setIsInspectMode] = useState(false);
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const settingsRef = useRef();
  const [screens, setScreens] = useState([]);
  const setScreenDocument = useCallback((id, document) => {
    setScreens(screens => {
      const screenIndex = screens.findIndex(screen => screen.id === id);

      if (screenIndex === -1) {
        return;
      }

      const before = screens.slice(0, screenIndex);
      const updatedScreen = {
        ...screens[screenIndex],
        document
      };
      const after = screens.slice(screenIndex + 1);

      return before.concat(updatedScreen, after);
    });
  }, []);
  const [isShareSuccessful, copyShareUrlToClipboard] = useCopyToClipboard(() =>
    getPlaygroundUrl(location, {
      code: prettify(code),
      settings: {
        screens: screens.map(({ name, width }) => [name, width])
      }
    })
  );
  const calculateBoundingRectangles = () => {
    const screen = screens[0];
    const { document } = screen;
    const components = document.querySelectorAll(`[data-testid^="playground"]`);

    components.forEach(component => {
      const { top, left, right, bottom } = component.getBoundingClientRect();

      console.log(component, { top, left, right, bottom });
    });
  };

  useEffect(() => {
    const dataFromUrl = getPlaygroundDataFromUrl(location);
    const initialCode = dataFromUrl.code ?? defaultCode;
    const initialScreens =
      dataFromUrl.settings?.screens ?? Object.entries(theme.breakpoints);

    setCode(initialCode);
    setScreens(
      initialScreens.map(([bp, width]) => ({
        id: bp,
        name: bp,
        width: parseInt(width, 10)
      }))
    );
  }, [location, theme.breakpoints]);

  return (
    <div css={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <LiveProvider
        code={code}
        transformCode={annotateCodeForPlayground}
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
                  <PlaygroundScreen
                    id={id}
                    width={width}
                    setDocument={setScreenDocument}
                    isInspectMode={isInspectMode}
                  />
                </div>
                <Text color="grey.t75" margin="1 1 0">
                  <strong>{name}</strong> – {width}px
                </Text>
              </div>
            ))}
          </div>
          <PlaygroundError />
        </div>
        {height && (
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
              setHeight(
                `${(((parseInt(height, 10) / 100) * window.innerHeight +
                  d.height) /
                  window.innerHeight) *
                  100}vh`
              );
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
                <Flex gutter="4">
                  {isCanary && (
                    <Button
                      variant="icon"
                      onClick={() => {
                        setIsInspectMode(isInspectMode => !isInspectMode);
                        calculateBoundingRectangles();
                      }}
                    >
                      <InspectIcon
                        color={isInspectMode ? "highlight.blue.t100" : null}
                      />
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setCode(prettify(code));
                    }}
                  >
                    Prettify
                  </Button>
                  <Button
                    variant="secondary"
                    isDisabled={isShareSuccessful}
                    onClick={copyShareUrlToClipboard}
                  >
                    {isShareSuccessful ? "Copied!" : "Share"}
                  </Button>
                </Flex>
                <Button
                  margin="0 0 0 auto"
                  variant="secondary"
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
        )}
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
