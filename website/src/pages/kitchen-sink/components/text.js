import React from "react";
import { Container, Text } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

function KitchenSinkText() {
  return (
    <KitchenSinkLayout name="Text">
      <Container padding="4">
        <Text>Default</Text>
      </Container>

      <Container padding="4">
        {Text.TEXT_STYLES.map((textStyle) => (
          <Text textStyle={textStyle} key={textStyle}>
            {textStyle} <strong>bold</strong>
          </Text>
        ))}
      </Container>

      {Text.COLORS.map((color) => (
        <Container
          bg={color === "white" ? "primary.blue.t100" : null}
          padding="4"
          key={color}
        >
          <Text color={color}>{color}</Text>
        </Container>
      ))}

      {Text.ALIGNS.map((align) => (
        <Container padding="4" key={align}>
          <Text align={align}>{align}</Text>
        </Container>
      ))}

      <Container padding="4" width="224" bg="grey.t03">
        <Text wrap>This text should wrap to the next line.</Text>
      </Container>

      <Container padding="4" width="224" bg="grey.t05">
        <Text wrap={false}>This text should NOT wrap to the next line.</Text>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkText;
