import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  atomFamily,
  // selector,
  // useRecoilState,
  // useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useTheme, Grid } from "basis";
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

const screensStateFamily = atomFamily({
  key: "screen",
  default: null,
});

function Playground({ location }) {
  const theme = useTheme();
  const setScreens = useSetRecoilState(screensStateFamily);
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
      <Grid.Item>Screens</Grid.Item>
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
