import React from "react";
import { Container, Flex, Button, Text } from "basis";
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
          <Text>Vertical</Text>
          <Text>Stack</Text>
          <Text>With</Text>
          <Text>Small</Text>
          <Text>Gutter</Text>
        </Flex>
      </Container>

      <Container padding="4" height="160">
        <Flex fullHeight placeItems="top center">
          <Button>top center</Button>
        </Flex>
      </Container>

      <Container padding="4" height="160" bg="grey.t05">
        <Flex fullHeight placeItems="center right">
          <Button>center right</Button>
        </Flex>
      </Container>

      <Container padding="4" height="160">
        <Flex fullHeight placeItems="center">
          <Button>center</Button>
        </Flex>
      </Container>
    </Layout>
  );
}

export default KitchenSinkFlex;
