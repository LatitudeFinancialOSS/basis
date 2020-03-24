import React from "react";
import { useTheme, Container, Stack, Text } from "basis";

function SpacingPage() {
  const theme = useTheme();

  return (
    <Container padding="6">
      <Text margin="0 0 8">
        We use the following scale for padding and margin:
      </Text>
      <Stack direction="horizontal" gap="10 6">
        {theme.space.map((spacePx, index) => {
          if (spacePx === "0px") {
            return null;
          }

          return (
            <Container width="40" textAlign="center" key={spacePx}>
              <Text>{index}</Text>
              <div
                css={{
                  width: "24px",
                  height: spacePx,
                  margin: "12px auto",
                  backgroundColor: theme.colors.grey.t75,
                }}
              />
              <Text>{spacePx}</Text>
            </Container>
          );
        })}
      </Stack>
    </Container>
  );
}

export default SpacingPage;
