import React from "react";
import { Container, ShadowContainer, Stack, Text } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

function KitchenSinkShadowContainer() {
  return (
    <KitchenSinkLayout name="ShadowContainer">
      <Container padding="0 0 10 0">
        {ShadowContainer.SHADOW_DIRECTIONS.map((shadowDirection) => (
          <Stack direction="horizontal" key={shadowDirection}>
            {ShadowContainer.SHADOW_SIZES.map((shadowSize) => (
              <Container width="320" key={shadowSize}>
                <ShadowContainer
                  shadowSize={shadowSize}
                  shadowDirection={shadowDirection}
                  margin="14"
                  padding="4"
                >
                  <Text>
                    {shadowSize} {shadowDirection}
                  </Text>
                </ShadowContainer>
              </Container>
            ))}
          </Stack>
        ))}

        {ShadowContainer.SHADOW_CONTRASTS.map((shadowContrast) => (
          <Stack direction="horizontal" key={shadowContrast}>
            {ShadowContainer.SHADOW_COLORS.map((shadowColor) => (
              <Container width="320" key={shadowColor}>
                <ShadowContainer
                  shadowColor={shadowColor}
                  shadowContrast={shadowContrast}
                  margin="14"
                  padding="4"
                >
                  <Text>
                    {shadowColor} {shadowContrast}
                  </Text>
                </ShadowContainer>
              </Container>
            ))}
          </Stack>
        ))}
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkShadowContainer;
