import React from "react";
import { useRecoilState } from "recoil";
import { List, arrayMove } from "react-movable";
import { useTheme, Container, Text } from "basis";
import PlaygroundScreenSettings from "./PlaygroundScreenSettings";
import { screensState } from "./index";

function PlaygroundSettings() {
  const theme = useTheme();
  const [screens, setScreens] = useRecoilState(screensState);

  return (
    <Container bg="grey.t03" height="100%">
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Text textStyle="subtitle2" margin="4 6 0">
          Screens
        </Text>
        <div css={{ flexGrow: 1, minHeight: 0 }}>
          <List
            lockVertically
            values={screens}
            onChange={({ oldIndex, newIndex }) =>
              setScreens(arrayMove(screens, oldIndex, newIndex))
            }
            renderList={({ children, props }) => (
              <ul
                css={{
                  boxSizing: "border-box",
                  margin: 0,
                  padding: `${theme.space[1]} ${theme.space[6]} ${theme.space[4]}`,
                  height: "100%",
                  overflowY: "auto",
                }}
                {...props}
              >
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
        </div>
      </div>
    </Container>
  );
}

export default PlaygroundSettings;
