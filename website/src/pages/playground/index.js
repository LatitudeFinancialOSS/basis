/* eslint-disable */
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import PropTypes from "prop-types";
import { LiveProvider, LiveEditor, LiveError, withLive } from "react-live";
import { Resizable } from "re-resizable";
import { rgba } from "polished";
import useMousePosition from "@react-hook/mouse-position";
import * as allDesignSystem from "basis";
import { getPlaygroundUrl, getPlaygroundDataFromUrl } from "../../utils/url";
import {
  getReactLiveNoInline,
  annotateCodeForPlayground,
} from "../../utils/ast";
import { formatCode } from "../../utils/formatting";
import { reactLiveEditorTheme } from "../../utils/constants";
import { getComponentsAtPoint } from "../../utils/playground";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import useLocalStorage from "../../hooks/useLocalStorage";
import useCanary from "../../hooks/useCanary";
import useDebounce from "../../hooks/useDebounce";
import ComponentPreview from "../../components/ComponentPreview";

import "../../utils/meta";

const { useTheme, Stack, VisuallyHidden, Text, Button, Icon } = allDesignSystem;

const topOnly = {
  top: true,
  right: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

const prettify = (code) =>
  formatCode(code, {
    printWidth: 81,
  });

const defaultCode = prettify(`
  <Container bg="secondary.lightBlue.t25" padding="2 4" padding-sm="3 5" padding-md="5 7">
    <Text as="h1" textStyle="heading5" textStyle-sm="heading3" textStyle-md="heading2">
      Hello World
    </Text>
  </Container>
`);

const scope = allDesignSystem;

const PlaygroundError = withLive(({ live }) => {
  const theme = useTheme();

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
        maxHeight: "224px",
        overflowY: "auto",
        padding: `${theme.space[4]} ${theme.space[8]}`,
        backgroundColor: theme.colors.white,
        borderTop: `${theme.borderWidths[0]} solid ${theme.colors.grey.t10}`,
        color: theme.colors.conditional.negative.text,
        "> pre": {
          margin: 0,
        },
      }}
    >
      <LiveError />
    </div>
  );
});

function PlaygroundScreen({
  id,
  width,
  setDocument,
  isInspectMode,
  onInspectMouseMove,
  onMouseLeave,
  highlightedComponents,
}) {
  const theme = useTheme();
  const _setDocument = useCallback(
    (document) => {
      setDocument(id, document);
    },
    [setDocument, id]
  );
  const [mousePosition, mouseMoveRef] = useMousePosition(
    0, // enterDelay
    0, // leaveDelay
    10 // fps
  );
  const lastMousePosition = useRef();

  useEffect(() => {
    const { x, y } = mousePosition;

    if (
      x !== null &&
      y !== null &&
      (!lastMousePosition.current ||
        lastMousePosition.current.x !== x ||
        lastMousePosition.current.y !== y)
    ) {
      onInspectMouseMove(id, { x, y });
    }

    lastMousePosition.current = mousePosition;
  }, [onInspectMouseMove, id, mousePosition]);

  return (
    <div
      css={{
        position: "relative",
        width: "100%",
        backgroundColor: theme.colors.white,
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
      onMouseLeave={onMouseLeave}
    >
      <ComponentPreview
        iframeTitle={`Preview at ${width}px`}
        hasBodyMargin={false}
        setDocument={_setDocument}
        containerRef={isInspectMode ? mouseMoveRef : undefined}
        highlightedComponents={highlightedComponents}
      />
    </div>
  );
}

PlaygroundScreen.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  setDocument: PropTypes.func.isRequired,
  isInspectMode: PropTypes.bool.isRequired,
  onInspectMouseMove: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  highlightedComponents: PropTypes.object.isRequired,
};

function PlaygroundSettings({ screens, setScreens }) {
  const theme = useTheme();
  const [newScreen, setNewScreen] = useState({
    id: "new-screen",
    name: "",
    width: "",
  });
  const [newScreenError, setNewScreenError] = useState(null);
  const onScreenChange = (id, key, value) => {
    setScreens((screens) => {
      const screenIndex = screens.findIndex((screen) => screen.id === id);

      if (screenIndex === -1) {
        return;
      }

      const before = screens.slice(0, screenIndex);
      const updatedScreen = {
        ...screens[screenIndex],
        [key]: value,
      };
      const after = screens.slice(screenIndex + 1);

      return before.concat(updatedScreen, after);
    });
  };
  const onScreenRemove = (id) => {
    setScreens((screens) => {
      const screenIndex = screens.findIndex((screen) => screen.id === id);

      if (screenIndex === -1) {
        return;
      }

      const before = screens.slice(0, screenIndex);
      const after = screens.slice(screenIndex + 1);

      return before.concat(after);
    });
  };
  const onScreenAdd = (e) => {
    e.preventDefault();

    const { name, width } = newScreen;
    const cleanName = name.trim();

    if (cleanName === "") {
      setNewScreenError("name is missing");
      return;
    }

    if (screens.find((screen) => screen.name === cleanName)) {
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

    if (screens.find((screen) => screen.width === widthInt)) {
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
        width: widthInt,
      })
    );

    setNewScreen((newScreen) => ({
      ...newScreen,
      name: "",
      width: "",
    }));

    setNewScreenError(null);
  };

  return (
    <div
      css={{
        height: "100%",
        boxSizing: "border-box",
        padding: `${theme.space[4]} ${theme.space[8]}`,
        backgroundColor: theme.colors.grey.t03,
      }}
    >
      <label>Screens</label>
      <ul css={{ listStyleType: "none", margin: 0, padding: 0 }}>
        {screens.map(({ id, name, width }) => (
          <li key={id}>
            <input
              css={{ width: "100px" }}
              type="text"
              value={name}
              onChange={(e) => onScreenChange(id, "name", e.target.value)}
            />
            <input
              css={{ width: "50px" }}
              type="number"
              value={width}
              onChange={(e) =>
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
              css={{ width: "100px" }}
              type="text"
              value={newScreen.name}
              placeholder="name"
              onChange={(e) =>
                setNewScreen({
                  ...newScreen,
                  name: e.target.value,
                })
              }
            />
            <input
              css={{ width: "50px" }}
              type="number"
              value={newScreen.width}
              placeholder="width"
              onChange={(e) =>
                setNewScreen({
                  ...newScreen,
                  width: Number(e.target.value),
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
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  setScreens: PropTypes.func.isRequired,
};

function Playground() {
  const theme = useTheme();
  const isCanary = useCanary();
  const [code, setCode] = useState("");
  const debouncedCode = useDebounce(code, 500);
  const noInline = useMemo(() => getReactLiveNoInline(code), [code]);
  const [height, setHeight] = useLocalStorage(
    "playground-code-panel-height",
    "40vh"
  );
  const [isInspectMode, setIsInspectMode] = useState(false);
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const settingsRef = useRef();
  const [screens, setScreens] = useState([]);
  const [inspectInfo, setInspectInfo] = useState({
    screenId: null,
    componentsAtMouse: {},
  });
  const setScreenDocument = useCallback((screenId, document) => {
    setScreens((screens) => {
      const screenIndex = screens.findIndex((screen) => screen.id === screenId);

      if (screenIndex === -1) {
        return;
      }

      const before = screens.slice(0, screenIndex);
      const updatedScreen = {
        ...screens[screenIndex],
        document,
      };
      const after = screens.slice(screenIndex + 1);

      return before.concat(updatedScreen, after);
    });
  }, []);
  const onInspectMouseMove = useCallback(
    (screenId, { x, y }) => {
      const screenIndex = screens.findIndex((screen) => screen.id === screenId);

      if (screenIndex === -1) {
        return;
      }

      const screen = screens[screenIndex];
      const { scrollX, scrollY } = screen.document.defaultView;
      const componentsAtMouse = getComponentsAtPoint(
        {
          x: x - scrollX,
          y: y - scrollY,
        },
        screen.componentsLocation
      );

      setInspectInfo({
        screenId,
        componentsAtMouse,
      });
    },
    [screens]
  );
  const [isShareSuccessful, copyShareUrlToClipboard] = useCopyToClipboard(() =>
    getPlaygroundUrl({
      code,
      settings: {
        screens: screens.map(({ name, width }) => [name, width]),
      },
    })
  );
  const calculateComponentsLocation = () => {
    setScreens((screens) =>
      screens.map((screen) => {
        const { document } = screen;
        const { scrollX, scrollY } = document.defaultView;
        const components = document.querySelectorAll(
          `[data-testid^="playground"]`
        );
        const componentsLocation = {};

        components.forEach((component) => {
          const {
            left,
            top,
            right,
            bottom,
          } = component.getBoundingClientRect();

          componentsLocation[component.dataset.testid] = {
            left: left + scrollX,
            top: top + scrollY,
            right: right + scrollX,
            bottom: bottom + scrollY,
          };
        });

        return {
          ...screen,
          componentsLocation,
        };
      })
    );
  };

  useEffect(() => {
    const dataFromUrl = getPlaygroundDataFromUrl();
    const initialCode = dataFromUrl.code ?? defaultCode;
    const initialScreens =
      dataFromUrl.settings?.screens ?? Object.entries(theme.breakpoints);

    setCode(initialCode);
    setScreens(
      initialScreens.map(([bp, width]) => ({
        id: bp,
        name: bp,
        width: parseInt(width, 10),
      }))
    );
  }, [theme.breakpoints]);

  useEffect(() => {
    setInspectInfo({
      screenId: null,
      componentsAtMouse: {},
    });

    if (isInspectMode) {
      calculateComponentsLocation();
    }
  }, [isInspectMode]);

  return (
    <div css={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <LiveProvider
        code={debouncedCode}
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
            backgroundColor: theme.colors.grey.t03,
          }}
        >
          <div
            css={{
              display: "flex",
              padding: theme.space[8],
              width: "min-content", // Without it, right padding is not visible. See also: https://stackoverflow.com/q/10054870/247243
            }}
          >
            {screens.map(({ id, name, width }, index) => (
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: index === 0 ? null : theme.space[8],
                  width,
                }}
                key={id}
              >
                <div css={{ flexGrow: 1, display: "flex" }}>
                  <PlaygroundScreen
                    id={id}
                    width={width}
                    setDocument={setScreenDocument}
                    isInspectMode={isInspectMode}
                    onInspectMouseMove={onInspectMouseMove}
                    onMouseLeave={() => {
                      if (isInspectMode) {
                        setInspectInfo({
                          screenId: null,
                          componentsAtMouse: {},
                        });
                      }
                    }}
                    highlightedComponents={
                      isInspectMode && id === inspectInfo.screenId
                        ? inspectInfo.componentsAtMouse
                        : {}
                    }
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
              flexShrink: 0,
            }}
            enable={topOnly}
            minHeight="10vh"
            maxHeight="90vh"
            size={{
              width: "100%",
              height,
            }}
            onResizeStop={(_e, _direction, _ref, d) => {
              setHeight(
                `${
                  (((parseInt(height, 10) / 100) * window.innerHeight +
                    d.height) /
                    window.innerHeight) *
                  100
                }vh`
              );
            }}
          >
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                css={{
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  padding: `${theme.space[2]} ${theme.space[8]}`,
                  backgroundColor: theme.colors.grey.t05,
                  borderTop: `${theme.borderWidths[0]} solid ${theme.colors.grey.t10}`,
                  borderBottom: `${theme.borderWidths[0]} solid ${theme.colors.grey.t10}`,
                }}
              >
                <Stack direction="horizontal" gap="4">
                  {isCanary && (
                    <Button
                      variant="icon"
                      onClick={() => {
                        setIsInspectMode((isInspectMode) => !isInspectMode);
                      }}
                    >
                      <Icon
                        name="select-object"
                        size="24px"
                        color={
                          isInspectMode ? "highlight.blue.t100" : "grey.t75"
                        }
                        hoverColor={
                          isInspectMode ? "highlight.blue.t100" : "black"
                        }
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
                    disabled={isShareSuccessful}
                    onClick={copyShareUrlToClipboard}
                  >
                    {isShareSuccessful ? "Copied!" : "Share"}
                  </Button>
                </Stack>
                <Button
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
                  minHeight: 0,
                }}
              >
                <div
                  css={{
                    padding: `${theme.space[4]} ${theme.space[8]}`,
                    width: "100%",
                    overflow: "auto",
                    "textarea:focus": {
                      outline: "none",
                    },
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
                      top: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: rgba(theme.colors.white, 0.7),
                    }}
                    onClick={(e) => {
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
                        width: "320px",
                        maxWidth: "100vw",
                        boxSizing: "border-box",
                        borderLeft: `${theme.borderWidths[0]} solid ${theme.colors.grey.t10}`,
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

export default Playground;
