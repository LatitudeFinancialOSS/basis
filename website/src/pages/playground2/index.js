import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { atom, useRecoilState } from "recoil";
import { Resizable } from "re-resizable";
import { useTheme, Container, Grid } from "basis";
import PlaygroundScreen from "./PlaygroundScreen";
import PlaygroundCodePanel from "./PlaygroundCodePanel";
import useLocalStorageValue from "./useLocalStorageValue";
import { getPlaygroundDataFromUrl } from "../../utils/url";

function heightToVh(height) {
  return (height / window.innerHeight) * 100 + "vh";
}

function vhToHeight(vh) {
  return (parseFloat(vh, 10) * window.innerHeight) / 100;
}

const LOCAL_STORAGE_CODE_PANEL_HEIGHT_KEY = "playground-code-panel-height";

export const screensState = atom({
  key: "screensState",
  default: [],
});

function Playground({ location }) {
  const theme = useTheme();
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
    //const initialCode = dataFromUrl.code ?? defaultCode;
    const initialScreens =
      dataFromUrl.settings?.screens ?? Object.entries(theme.breakpoints);

    //setCode(initialCode);
    setScreens(
      initialScreens.map(([bp, width]) => ({
        id: bp,
        name: bp,
        width: parseInt(width, 10),
      }))
    );
  }, [location, theme, setScreens]);

  if (codePanelHeight === null) {
    return null;
  }

  return (
    <Grid height="100vh" rows={`1fr ${codePanelHeight}`}>
      <Grid.Item>
        <Container height="100%" bg="grey.t03" overflow="auto">
          <div
            css={{
              display: "flex",
              boxSizing: "border-box",
              padding: theme.space[8],
              width: "min-content", // Without it, right padding is not visible.
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
  );
}

Playground.propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default Playground;
