import React, { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { atom, useRecoilState } from "recoil";
import { Resizable } from "re-resizable";
import { LiveProvider } from "react-live";
import * as allDesignSystem from "basis";
import PlaygroundCodePanel from "./PlaygroundCodePanel";
import PlaygroundScreen from "./PlaygroundScreen";
import useLocalStorageValue from "./useLocalStorageValue";
import useDebounce from "../../hooks/useDebounce";
import { getReactLiveNoInline, wrapInFragmentIfNeeded } from "../../utils/ast";
import { reactLiveEditorTheme } from "../../utils/constants";
import { formatCode } from "../../utils/formatting";
import { getPlaygroundDataFromUrl } from "../../utils/url";

const { useTheme, Container, Grid } = allDesignSystem;

function heightToVh(height) {
  return (height / window.innerHeight) * 100 + "vh";
}

function vhToHeight(vh) {
  return (parseFloat(vh, 10) * window.innerHeight) / 100;
}

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

const LOCAL_STORAGE_CODE_PANEL_HEIGHT_KEY = "playground-code-panel-height";

export const codeState = atom({
  key: "playgroundCode",
  default: "",
});

export const screensState = atom({
  key: "playgroundScreens",
  default: [],
});

function Playground({ location }) {
  const theme = useTheme();
  const [code, setCode] = useRecoilState(codeState);
  const debouncedCode = useDebounce(code, 500);
  const noInline = useMemo(() => getReactLiveNoInline(code), [code]);
  const [screens, setScreens] = useRecoilState(screensState);
  const initialCodePanelHeight = useLocalStorageValue(
    LOCAL_STORAGE_CODE_PANEL_HEIGHT_KEY,
    "40vh"
  );
  const [codePanelHeight, setCodePanelHeight] = useState(null);
  const codePanelHeightOnResizeStart = useRef();
  const onCodePanelResizeStop = () => {
    try {
      localStorage &&
        localStorage.setItem(
          LOCAL_STORAGE_CODE_PANEL_HEIGHT_KEY,
          JSON.stringify(codePanelHeight)
        );
    } catch (error) {
      console.error(`Saving in localStorage failed: ${error.message}`);
    }
  };

  useEffect(() => {
    if (initialCodePanelHeight !== null) {
      setCodePanelHeight(initialCodePanelHeight);
    }
  }, [initialCodePanelHeight]);

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
        width: parseInt(width, 10),
      }))
    );
  }, [location, theme, setCode, setScreens]);

  if (codePanelHeight === null) {
    return null;
  }

  return (
    <LiveProvider
      code={debouncedCode}
      transformCode={wrapInFragmentIfNeeded}
      noInline={noInline}
      scope={scope}
      theme={reactLiveEditorTheme}
    >
      <Grid height="100vh" rows={`1fr ${codePanelHeight}`}>
        <Grid.Item>
          <Container height="100%" bg="grey.t03" overflow="auto">
            <div
              css={{
                display: "flex",
                boxSizing: "border-box",
                padding: theme.space[8],
                width: "min-content", // Without it, right padding is not visible. See also: https://stackoverflow.com/q/10054870/247243
                height: "100%",
              }}
            >
              {screens.map(({ id, name, width }, index) => (
                <div
                  css={{
                    display: "flex",
                    marginLeft: index === 0 ? null : theme.space[8],
                  }}
                  key={id}
                >
                  <PlaygroundScreen id={id} name={name} width={width} />
                </div>
              ))}
            </div>
          </Container>
        </Grid.Item>
        {codePanelHeight !== null && (
          <Grid.Item>
            <Resizable
              size={{ height: codePanelHeight }}
              onResizeStart={() => {
                codePanelHeightOnResizeStart.current = codePanelHeight;
              }}
              onResize={(e, direction, ref, d) => {
                setCodePanelHeight(
                  heightToVh(
                    vhToHeight(codePanelHeightOnResizeStart.current) + d.height
                  )
                );
              }}
              onResizeStop={onCodePanelResizeStop}
              minHeight="10vh"
              maxHeight="90vh"
              enable={{
                top: true,
                right: false,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
            >
              <PlaygroundCodePanel />
            </Resizable>
          </Grid.Item>
        )}
      </Grid>
    </LiveProvider>
  );
}

Playground.propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default Playground;
