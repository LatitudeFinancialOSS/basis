import React from "react";
import { Container, Text } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

function KitchenSinkContainer() {
  return (
    <KitchenSinkLayout name="Container">
      {Container.BACKGROUNDS.map((bg) => (
        <Container bg={bg} margin="4" padding="6" key={bg}>
          <Text>{bg}</Text>
        </Container>
      ))}

      {Container.BACKGROUNDS.map((bg) => (
        <Container bg={bg} hasBorder margin="4" padding="6" key={bg}>
          <Text>{bg} with border</Text>
        </Container>
      ))}

      <Container hasBreakpointWidth bg="primary.blue.t100">
        <Text>Has breakpoint width</Text>
      </Container>

      <Container margin="4" height="60" bg="grey.t07" textAlign="left">
        <Text>Left aligned</Text>
      </Container>

      <Container margin="4" height="60" bg="grey.t07" textAlign="center">
        <Text>Center aligned</Text>
      </Container>

      <Container margin="4" height="60" bg="grey.t07" textAlign="right">
        <Text>Right aligned</Text>
      </Container>

      {Container.BOX_SHADOWS.map((boxShadow) => (
        <Container boxShadow={boxShadow} padding="4" key={boxShadow}>
          <Container height="40" padding="0 6">
            Box shadow: {boxShadow}
          </Container>
        </Container>
      ))}
    </KitchenSinkLayout>
  );
}

export default KitchenSinkContainer;
