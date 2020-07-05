import React from "react";
import PropTypes from "prop-types";
import { useSetRecoilState } from "recoil";
import { useTheme } from "basis";
import { shallowEqualObjects } from "shallow-equal";
import { screensState } from "./index";
import { updateItemWithId, removeItemWithId } from "./utils";

function PlaygroundScreenSettingsRender(
  // eslint-disable-next-line react/prop-types
  { isDragged, id, name, width, ...rest },
  ref
) {
  const { style, ...restWithoutStyle } = rest;
  const theme = useTheme();
  const setScreens = useSetRecoilState(screensState);
  const onChange = (key, value) => {
    setScreens((screens) => updateItemWithId(screens, id, { [key]: value }));
  };

  return (
    <li
      css={{
        ...style,
        display: "flex",
        alignItems: "center",
        listStyleType: "none",
        height: "36px",
      }}
      ref={ref}
      {...restWithoutStyle}
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
        css={{
          width: 100,
          height: 20,
          padding: "0 4px",
          marginLeft: theme.space[1],
        }}
        type="text"
        value={name}
        onChange={(e) => onChange("name", e.target.value)}
        aria-label="Screen name"
      />
      <input
        css={{
          width: 50,
          height: 20,
          padding: "0 4px",
          marginLeft: theme.space[2],
        }}
        type="number"
        value={width}
        onChange={(e) => onChange("width", Number(e.target.value))}
        aria-label="Screen width"
      />
      <button
        css={{
          width: 32,
          height: 24,
          padding: 0,
          marginLeft: theme.space[2],
          boxSizing: "border-box",
        }}
        onClick={() => {
          setScreens((screens) => removeItemWithId(screens, id));
        }}
        aria-label="Remove screen"
      >
        ✕
      </button>
    </li>
  );
}

const PlaygroundScreenSettings = React.forwardRef(
  PlaygroundScreenSettingsRender
);

PlaygroundScreenSettings.propTypes = {
  isDragged: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default React.memo(PlaygroundScreenSettings, (prevProps, nextProps) => {
  const { style: prevStyle, ...restPrevProps } = prevProps;

  for (const prop in restPrevProps) {
    if (restPrevProps[prop] !== nextProps[prop]) {
      return false;
    }
  }

  return shallowEqualObjects(prevStyle, nextProps.style);
});
