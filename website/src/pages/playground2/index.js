import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { atom, useRecoilState } from "recoil";
import { useTheme, Container, Grid } from "basis";
import PlaygroundScreen from "./PlaygroundScreen";
import PlaygroundSettings from "./PlaygroundSettings";
import useResizable from "./useResizable";
import { getPlaygroundDataFromUrl } from "../../utils/url";

function useLocalStorageValue(localStorageKey, fallbackValue) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const value = localStorage?.getItem(localStorageKey);

    // value is undefined when localStorage doesn't exist, and null when the key doesn't exist.
    if (value == null) {
      setValue(fallbackValue);
    } else {
      try {
        setValue(JSON.parse(value));
      } catch {
        console.error(`useLocalStorageValue: Couldn't parse: ${value}`);

        setValue(fallbackValue);
      }
    }
  }, [localStorageKey, fallbackValue]);

  return value;
}

const LOCAL_STORAGE_SETTINGS_HEIGHT_KEY = "playground-code-panel-height";

const screensState = atom({
  key: "screensState",
  default: [],
});

function Playground({ location }) {
  const theme = useTheme();
  const [screens, setScreens] = useRecoilState(screensState);
  const initialSettingsHeight = useLocalStorageValue(
    LOCAL_STORAGE_SETTINGS_HEIGHT_KEY,
    "40vh"
  );
  const [
    settingsSize,
    { height: settingsHeightWhenResizing },
    ResizableSettings,
  ] = useResizable({
    resizeTop: true,
    defaultHeight: initialSettingsHeight,
    minHeight: "10vh",
    maxHeight: "90vh",
  });
  const onSettingsResizeStop = ({ height }) => {
    try {
      localStorage &&
        localStorage.setItem(
          LOCAL_STORAGE_SETTINGS_HEIGHT_KEY,
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
        initialSettingsHeight === null ? "" : settingsHeightWhenResizing
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
      {initialSettingsHeight !== null && (
        <Grid.Item>
          <ResizableSettings
            size={settingsSize}
            onResizeStop={onSettingsResizeStop}
          >
            <PlaygroundSettings />
          </ResizableSettings>
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
