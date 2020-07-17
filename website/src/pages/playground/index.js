import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRecoilState } from "recoil";
import { Resizable } from "re-resizable";
import { LiveProvider } from "react-live";
import * as allDesignSystem from "basis";
import PlaygroundCodePanel from "../../components/playground/PlaygroundCodePanel";
import PlaygroundScreen from "../../components/playground/PlaygroundScreen";
import useLocalStorageValue from "../../components/playground/useLocalStorageValue";
import {
  prettify,
  heightToVh,
  vhToHeight,
} from "../../components/playground/utils";
import {
  codeState,
  screensState,
} from "../../components/playground/recoilState";
import useDebounce from "../../hooks/useDebounce";
import {
  getReactLiveNoInline,
  annotateCodeForPlayground,
} from "../../utils/ast";
import { reactLiveEditorTheme } from "../../utils/constants";
import { getPlaygroundDataFromUrl } from "../../utils/url";

const { useTheme, Container, Grid } = allDesignSystem;

const defaultCode = prettify(`
  <>
    <Header>
      <Header.Logo name="latitude" />
    </Header>
    <Container hasBreakpointWidth margin="6 auto" margin-lg="7 auto">
      <Text
        as="h1"
        textStyle="heading5"
        textStyle-sm="heading4"
        textStyle-lg="heading3"
      >
        Welcome to basis playground!
      </Text>
    </Container>
    <Container hasBreakpointWidth>
      <Container bg="secondary.lightBlue.t25" width="100%" width-sm="420" width-lg="580" padding="5">
        <Container bg="white" padding="6" padding-sm="7">
          <Text textStyle="heading5" textStyle-sm="heading4" margin="0 0 3 0" margin-lg="0 0 4 0">
            Who's behind this?
          </Text>
          <List>
            <List.Item>
              We are a small and passionate team at
              <Link href="https://www.latitudefinancial.com.au" newTab>
                Latitude
              </Link>
              .
            </List.Item>
            <List.Item>
              Interested in working with us? Please contact
              <Link href="https://twitter.com/moroshko" newTab>Misha Moroshko</Link>
              .
            </List.Item>
          </List>
        </Container>
      </Container>
    </Container>
  </>
`);

const LOCAL_STORAGE_CODE_PANEL_HEIGHT_KEY = "playground-code-panel-height";

function Playground() {
  const theme = useTheme();
  const [code, setCode] = useRecoilState(codeState);
  const debouncedCode = useDebounce(code, 500);
  const liveProviderProps = useMemo(
    () => ({
      code: debouncedCode,
      noInline: getReactLiveNoInline(debouncedCode),
    }),
    [debouncedCode]
  );
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
  }, [theme, setCode, setScreens]);

  if (codePanelHeight === null) {
    return null;
  }

  return (
    <LiveProvider
      {...liveProviderProps}
      transformCode={annotateCodeForPlayground}
      scope={allDesignSystem}
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
              {screens.map(
                ({ id, name, width, document, componentsLocation }, index) => (
                  <div
                    css={{
                      display: "flex",
                      marginLeft: index === 0 ? null : theme.space[8],
                    }}
                    key={id}
                  >
                    <PlaygroundScreen
                      id={id}
                      name={name}
                      width={width}
                      document={document}
                      componentsLocation={componentsLocation}
                    />
                  </div>
                )
              )}
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

export default Playground;
