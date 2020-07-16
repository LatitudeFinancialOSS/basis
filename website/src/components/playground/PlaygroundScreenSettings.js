import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { useTheme } from "basis";
import { shallowEqualObjects } from "shallow-equal";
import PlaygroundSettingsInput from "./PlaygroundSettingsInput";
import PlaygroundSettingsButton from "./PlaygroundSettingsButton";
import { screensState } from "./recoilState";
import {
  MIN_SCREEN_WIDTH,
  MAX_SCREEN_WIDTH,
  validateScreenName,
  validateScreenWidth,
  updateItemWithId,
  removeItemWithId,
} from "./utils";

function PlaygroundScreenSettingsRender(
  // eslint-disable-next-line react/prop-types
  { isDragged, id, name, width, ...rest },
  ref
) {
  const { style, ...restWithoutStyle } = rest;
  const theme = useTheme();
  const [screens, setScreens] = useRecoilState(screensState);
  const isNameValid = useCallback(
    (name) => validateScreenName(name, id, screens) === null,
    [id, screens]
  );
  const isWidthValid = (width) => validateScreenWidth(width) === null;
  const [localName, setLocalName] = useState(name);
  const [isLocalNameValid, setIsLocalNameValid] = useState(() =>
    isNameValid(name)
  );
  const [localWidth, setLocalWidth] = useState(String(width));
  const [isLocalWidthValid, setIsLocalWidthValid] = useState(() =>
    isWidthValid(localWidth)
  );
  const onLocalNameChange = (e) => {
    const newName = e.target.value;
    const isValid = isNameValid(newName);

    setLocalName(newName);
    setIsLocalNameValid(isValid);

    if (isValid) {
      setScreens((screens) => updateItemWithId(screens, id, { name: newName }));
    }
  };
  const onLocalWidthChange = (e) => {
    const newWidth = e.target.value;
    const isValid = isWidthValid(newWidth);

    setLocalWidth(newWidth);
    setIsLocalWidthValid(isValid);

    if (isValid) {
      setScreens((screens) =>
        updateItemWithId(screens, id, { width: Number(newWidth) })
      );
    }
  };

  useEffect(() => {
    setLocalName(name);
    setIsLocalNameValid(isNameValid(name));
  }, [name, isNameValid]);

  useEffect(() => {
    const newLocalWidth = String(width);

    setLocalWidth(newLocalWidth);
    setIsLocalWidthValid(isWidthValid(newLocalWidth));
  }, [width]);

  return (
    <li
      css={{
        ...style,
        display: "flex",
        alignItems: "center",
        listStyleType: "none",
        height: "36px",
        borderRadius: 2,
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
          margin: 0,
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
      <div css={{ marginLeft: theme.space[1] }}>
        <PlaygroundSettingsInput
          value={localName}
          onChange={onLocalNameChange}
          isValid={isLocalNameValid}
          ariaLabel="Screen name"
          width={100}
        />
      </div>
      <div css={{ marginLeft: theme.space[2] }}>
        <PlaygroundSettingsInput
          value={localWidth}
          onChange={onLocalWidthChange}
          isValid={isLocalWidthValid}
          variant="numeric"
          maxLength="4"
          min={MIN_SCREEN_WIDTH}
          max={MAX_SCREEN_WIDTH}
          ariaLabel="Screen width"
          width={50}
        />
      </div>
      <div css={{ display: "flex", marginLeft: theme.space[2] }}>
        <PlaygroundSettingsButton
          width={22}
          title="Remove screen"
          onClick={() => {
            setScreens((screens) => removeItemWithId(screens, id));
          }}
        >
          ✕
        </PlaygroundSettingsButton>
      </div>
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
