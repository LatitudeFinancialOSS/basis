import React from "react";
import { Container, Text } from "basis";
import KitchenSinkLayout from "./KitchenSinkLayout";

function KitchenSinkContainer() {
  return (
    <KitchenSinkLayout name="Container">
      <Container padding="6 0">
        <Container margin="4 8" bg="secondary.lightBlue.t30" textAlign="left">
          <Text>Left aligned</Text>
        </Container>

        <Container
          margin-xs="4 8"
          padding-lg="6"
          bg="grey.t05"
          textAlign="center"
          width="320"
          height="112"
        >
          <Text>Center aligned</Text>
        </Container>

        <Container
          margin-lg="4 8"
          bg="grey.t03"
          textAlign="right"
          width-md="224"
          height-sm="72"
        >
          <Text>Right aligned</Text>
        </Container>

        <Container hasBreakpointWidth bg="primary.blue.t100">
          <Text>Has breakpoint width</Text>
        </Container>

        {Container.BOX_SHADOWS.map(boxShadow => (
          <Container
            boxShadow={boxShadow}
            bg="white"
            width="320"
            height="40"
            margin="8 0 0 8"
            key={boxShadow}
          >
            Box shadow: {boxShadow}
          </Container>
        ))}
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkContainer;
