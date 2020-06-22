import React from "react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { useTheme } from "basis";
import { screensState } from "./index";
import { replaceItemAtIndex, removeItemAtIndex } from "./utils";

function PlaygroundScreenSettings(
  { isDragged, id, name, width, ...props },
  ref
) {
  const theme = useTheme();
  const [screens, setScreens] = useRecoilState(screensState);
  const screenIndex = screens.findIndex((screen) => screen.id === id);
  const onChange = (key, value) => {
    const newScreens = replaceItemAtIndex(screens, screenIndex, {
      ...screens[screenIndex],
      [key]: value,
    });

    setScreens(newScreens);
  };

  return (
    <li
      css={{
        display: "flex",
        alignItems: "center",
        listStyleType: "none",
        height: "36px",
      }}
      ref={ref}
      {...props}
    >
      <button
        css={{
          display: "flex",
          backgroundColor: "transparent",
          border: 0,
          padding: 0,
          cursor: isDragged ? "grabbing" : "grab",
        }}
        data-movable-handle
        tabIndex={-1}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="#777"
            d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          />
        </svg>
      </button>
      <input
        css={{ width: "100px", marginLeft: theme.space[1] }}
        type="text"
        value={name}
        onChange={(e) => onChange("name", e.target.value)}
        aria-label={`screen-${screenIndex + 1}-name`}
      />
      <input
        css={{ width: "50px", marginLeft: theme.space[2] }}
        type="number"
        value={width}
        onChange={(e) => onChange("width", Number(e.target.value))}
        aria-label={`screen-${screenIndex + 1}-width`}
      />
      <button
        css={{ marginLeft: theme.space[2] }}
        onClick={() => {
          setScreens(removeItemAtIndex(screens, screenIndex));
        }}
        aria-label="Remove screen"
      >
        ✕
      </button>
    </li>
  );
}

PlaygroundScreenSettings.propTypes = {
  isDragged: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default React.forwardRef(PlaygroundScreenSettings);
