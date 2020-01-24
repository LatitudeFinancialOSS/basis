import React from "react";
import { Container, Text } from "basis";
import {
  INTENTS,
  COLORS,
  ALIGNS,
  WEIGHTS
} from "../../../../src/components/Text";
import Layout from "./Layout";

function KitchenSinkText() {
  return (
    <Layout name="Text">
      <Container padding="4">
        <Text>Default</Text>
      </Container>

      <Container padding="4">
        {INTENTS.map(intent => (
          <Text intent={intent} key={intent}>
            {intent} <strong>bold</strong>
          </Text>
        ))}
      </Container>

      <Container padding="4">
        {["1", "2", "3", "4", "5", "6"].map(size => (
          <Text intent="h1" size={size} key={size}>
            h1 size {size}
          </Text>
        ))}
      </Container>

      {COLORS.map(color => (
        <Container
          bg={color === "white" ? "primary.blue.t100" : null}
          padding="4"
          key={color}
        >
          <Text color={color}>{color}</Text>
        </Container>
      ))}

      {ALIGNS.map(align => (
        <Container padding="4" key={align}>
          <Text align={align}>{align}</Text>
        </Container>
      ))}

      {WEIGHTS.map(weight => (
        <Container padding="4" key={weight}>
          <Text weight={weight}>{weight}</Text>
        </Container>
      ))}

      <Container padding="4" width="19" bg="grey.t03">
        <Text wrap={true}>This text should wrap to the next line.</Text>
      </Container>

      <Container padding="4" width="19" bg="grey.t05">
        <Text wrap={false}>This text should NOT wrap to the next line.</Text>
      </Container>
    </Layout>
  );
}

export default KitchenSinkText;
