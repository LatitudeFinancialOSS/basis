import React from "react";
import { useRecoilState } from "recoil";
import { List, arrayMove } from "react-movable";
import { Container, Text } from "basis";
import PlaygroundScreenSettings from "./PlaygroundScreenSettings";
import { screensState } from "./index";

function PlaygroundSettings() {
  const [screens, setScreens] = useRecoilState(screensState);

  return (
    <Container bg="grey.t03" height="100%" padding="4 6">
      <Text textStyle="subtitle2">Screens</Text>
      <List
        lockVertically
        values={screens}
        onChange={({ oldIndex, newIndex }) =>
          setScreens(arrayMove(screens, oldIndex, newIndex))
        }
        renderList={({ children, props }) => (
          <ul css={{ margin: 0, padding: 0 }} {...props}>
            {children}
          </ul>
        )}
        renderItem={({ isDragged, value, props }) => (
          <PlaygroundScreenSettings
            isDragged={isDragged}
            id={value.id}
            name={value.name}
            width={value.width}
            {...props}
          />
        )}
      />
    </Container>
  );
}

export default PlaygroundSettings;
