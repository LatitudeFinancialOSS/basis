import React from "react";
import { Container, Text, Header } from "basis";

function KitchenSinkHeader() {
  return (
    <Container>
      <Container bg="primary.blue.t100" padding="6">
        <Text intent="h2" align="center">
          Header
        </Text>
      </Container>

      <Container padding="6 0" bg="grey.t05">
        <Header __internal__notFixed={true}>
          <Header.Logo name="gem" />
        </Header>
      </Container>
    </Container>
  );
}

export default KitchenSinkHeader;
