import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { useTheme } from "basis";
import { shallowEqualObjects } from "shallow-equal";
import { screensState } from "./index";
import {
  isScreenNameValid,
  isScreenWidthValid,
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
  const [localName, setLocalName] = useState(name);
  const [isLocalNameValid, setIsLocalNameValid] = useState(() =>
    isScreenNameValid(name, id, screens)
  );
  const [localWidth, setLocalWidth] = useState(String(width));
  const [isLocalWidthValid, setIsLocalWidthValid] = useState(() =>
    isScreenWidthValid(width)
  );
  const onLocalNameChange = (e) => {
    const newName = e.target.value;
    const isValid = isScreenNameValid(newName, id, screens);

    setLocalName(newName);
    setIsLocalNameValid(isValid);

    if (isValid) {
      setScreens((screens) => updateItemWithId(screens, id, { name: newName }));
    }
  };
  const onLocalWidthChange = (e) => {
    const newWidth = e.target.value;
    const isValid = isScreenWidthValid(newWidth);

    setLocalWidth(newWidth);
    setIsLocalWidthValid(isValid);

    if (isValid) {
      setScreens((screens) =>
        updateItemWithId(screens, id, { width: Number(newWidth) })
      );
    }
  };
  const getInputCSS = (isValid) => ({
    height: 20,
    padding: "0 4px",
    fontSize: "14px",
    fontWeight: "inherit",
    fontFamily: "inherit",
    border: 0,
    outline: `${isValid ? "1px" : "2px"} solid ${
      isValid ? theme.getColor("grey.t65") : "red"
    }`,
    ":focus": {
      border: 0,
      outline: `2px solid ${
        isValid ? theme.getColor("highlight.blue.t100") : "red"
      }`,
      outlineOffset: 0,
    },
  });
  const buttonCSS = {
    boxSizing: "border-box",
    width: 22,
    height: 22,
    padding: 0,
    border: 0,
    backgroundColor: theme.getColor("grey.t10"),
    ":hover": {
      backgroundColor: theme.getColor("grey.t16"),
    },
  };

  useEffect(() => {
    setLocalName(name);
    setIsLocalNameValid(isScreenNameValid(name, id, screens));
  }, [name, id, screens]);

  useEffect(() => {
    setLocalWidth(width);
    setIsLocalWidthValid(isScreenWidthValid(width));
  }, [width]);

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
          ...getInputCSS(isLocalNameValid),
          width: 100,
          marginLeft: theme.space[1],
        }}
        type="text"
        value={localName}
        onChange={onLocalNameChange}
        aria-label="Screen name"
        aria-invalid={!isLocalNameValid}
      />
      <input
        css={{
          ...getInputCSS(isLocalWidthValid),
          width: 50,
          marginLeft: theme.space[2],
        }}
        type="text"
        maxLength="4"
        // See: https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers
        inputMode="numeric"
        pattern="[0-9]*"
        value={localWidth}
        onChange={onLocalWidthChange}
        aria-label="Screen width"
        aria-invalid={!isLocalWidthValid}
      />
      <button
        css={{
          ...buttonCSS,
          marginLeft: theme.space[2],
        }}
        onClick={() => {
          setScreens((screens) => removeItemWithId(screens, id));
        }}
        title="Remove screen"
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
