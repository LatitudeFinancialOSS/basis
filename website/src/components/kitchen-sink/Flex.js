import React from "react";
import { Container, Flex, Button } from "basis";
import Layout from "./Layout";

function KitchenSinkFlex() {
  return (
    <Layout name="Flex">
      <Container padding="4">
        <Flex gutter="10">
          <Button>Horizontal</Button>
          <Button>Stack</Button>
          <Button>With</Button>
          <Button>Large</Button>
          <Button>Gutter</Button>
        </Flex>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Flex direction="column" gutter="1">
          <Button variant="secondary">Vertical</Button>
          <Button variant="secondary">Stack</Button>
          <Button variant="secondary">With</Button>
          <Button variant="secondary">Small</Button>
          <Button variant="secondary">Gutter</Button>
        </Flex>
      </Container>

      <Container padding="4">
        <Flex height="17" placeItems="top center">
          <Button>top center</Button>
        </Flex>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Flex height="17" placeItems="center right">
          <Button>center right</Button>
        </Flex>
      </Container>

      <Container padding="4">
        <Flex height="17" placeItems="center">
          <Button>center</Button>
        </Flex>
      </Container>
    </Layout>
  );
}

export default KitchenSinkFlex;
