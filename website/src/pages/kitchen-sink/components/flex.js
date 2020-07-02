import React from "react";
import { Container, Flex, Button } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

function KitchenSinkFlex() {
  return (
    <KitchenSinkLayout name="Flex">
      <Container padding="4">
        <Flex height="128" placeItems="top center">
          <Button>top center</Button>
        </Flex>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Flex height="128" placeItems="center right">
          <Button>center right</Button>
        </Flex>
      </Container>

      <Container padding="4">
        <Flex height="128" placeItems="center">
          <Button>center</Button>
        </Flex>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkFlex;
