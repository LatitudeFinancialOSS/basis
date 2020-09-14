import React from "react";
import { Button, Container, Flex, Placeholder } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

function KitchenSinkFlex() {
  return (
    <KitchenSinkLayout name="Flex">
      <Container padding="4">
        <Flex height="200">
          <Placeholder label="Flex has" height="100%" />
          <Placeholder label={`direction="row"`} height="100%" />
          <Placeholder label="by default" height="100%" />
          <Placeholder
            label={`This Flex also has height="200"`}
            height="100%"
          />
        </Flex>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Flex direction="column" width="320">
          <Placeholder label="This Flex has" />
          <Placeholder label={`direction="column"`} />
          <Placeholder label="and" />
          <Placeholder label={`width="320"`} />
        </Flex>
      </Container>

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
