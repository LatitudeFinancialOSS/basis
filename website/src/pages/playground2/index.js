import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { atom, useRecoilState } from "recoil";
import { useTheme, Container, Grid } from "basis";
import PlaygroundScreen from "./PlaygroundScreen";
import PlaygroundCodePanel from "./PlaygroundCodePanel";
import useLocalStorageValue from "./useLocalStorageValue";
import useResizable from "./useResizable";
import { getPlaygroundDataFromUrl } from "../../utils/url";

const LOCAL_STORAGE_CODE_PANEL_HEIGHT_KEY = "playground-code-panel-height";

const screensState = atom({
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
  const {
    size: codePanelSize,
    sizeWhenResizing: codePanelSizeWhenResizing,
    Resizable: ResizableCodePanel,
  } = useResizable({
    resizeTop: true,
    defaultHeight: initialCodePanelHeight,
    minHeight: "10vh",
    maxHeight: "90vh",
  });
  const onCodePanelResizeStop = ({ height }) => {
    try {
      localStorage &&
        localStorage.setItem(
          LOCAL_STORAGE_CODE_PANEL_HEIGHT_KEY,
          JSON.stringify(height)
        );
    } catch (error) {
      console.error(`Saving in localStorage failed: ${error.message}`);
    }
  };

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

  return (
    <Grid
      height="100vh"
      rows={`1fr ${
        initialCodePanelHeight === null ? "" : codePanelSizeWhenResizing.height
      }`}
    >
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
      {initialCodePanelHeight !== null && (
        <Grid.Item>
          <ResizableCodePanel
            size={codePanelSize}
            onResizeStop={onCodePanelResizeStop}
          >
            <PlaygroundCodePanel />
          </ResizableCodePanel>
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
