import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useTheme, Text } from "basis";
import PlaygroundSettingsInput from "./PlaygroundSettingsInput";
import PlaygroundSettingsButton from "./PlaygroundSettingsButton";
import {
  MIN_SCREEN_WIDTH,
  MAX_SCREEN_WIDTH,
  validateScreenName,
  validateScreenWidth,
  getErrorsFrom,
} from "./utils";
import { screensState } from "./recoilState";

function PlaygroundNewScreenSettings() {
  const theme = useTheme();
  const [screens, setScreens] = useRecoilState(screensState);
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [width, setWidth] = useState("");
  const [isWidthValid, setIsWidthValid] = useState(true);
  const [error, setError] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();

    const nameError = validateScreenName(name, null, screens);
    const widthError = validateScreenWidth(width);

    setIsNameValid(nameError === null);
    setIsWidthValid(widthError === null);

    if (nameError === null && widthError === null) {
      const cleanName = name.trim();
      const widthInt = Number(width);

      setScreens((screens) =>
        screens.concat({
          id: cleanName,
          name: cleanName,
          width: widthInt,
        })
      );

      setName("");
      setWidth("");
      setError(null);

      return;
    }

    setError(getErrorsFrom([nameError, widthError]));
  };

  return (
    <form
      css={{
        paddingLeft: theme.space[11],
        paddingRight: theme.space[6],
      }}
      onSubmit={onSubmit}
      noValidate
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          height: "36px",
        }}
      >
        <div css={{ marginLeft: theme.space[1] }}>
          <PlaygroundSettingsInput
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            isValid={isNameValid}
            ariaLabel="New screen name"
            width={100}
          />
        </div>
        <div css={{ marginLeft: theme.space[2] }}>
          <PlaygroundSettingsInput
            value={width}
            onChange={(e) => {
              setWidth(e.target.value);
            }}
            isValid={isWidthValid}
            variant="numeric"
            maxLength="4"
            min={MIN_SCREEN_WIDTH}
            max={MAX_SCREEN_WIDTH}
            ariaLabel="New screen width"
            width={50}
          />
        </div>
        <div css={{ display: "flex", marginLeft: theme.space[2] }}>
          <PlaygroundSettingsButton type="submit" width={48}>
            Add
          </PlaygroundSettingsButton>
        </div>
      </div>
      {error && (
        <div css={{ marginLeft: theme.space[1] }}>
          <Text textStyle="body2" color="conditional.negative.text">
            {error}
          </Text>
        </div>
      )}
    </form>
  );
}

export default PlaygroundNewScreenSettings;
