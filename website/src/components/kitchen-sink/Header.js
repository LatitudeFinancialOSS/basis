import React from "react";
import { Container, Header } from "basis";
import KitchenSinkLayout from "./KitchenSinkLayout";

function KitchenSinkHeader() {
  return (
    <KitchenSinkLayout name="Header">
      <Container padding="6 0" bg="grey.t05">
        <Header __internal__notFixed>
          <Header.Logo name="gem" />
        </Header>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkHeader;
