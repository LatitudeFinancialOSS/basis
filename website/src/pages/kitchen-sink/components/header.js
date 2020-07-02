import React from "react";
import { Container, Header } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

function KitchenSinkHeader() {
  return (
    <KitchenSinkLayout name="Header">
      <Container padding="6 0" bg="grey.t05">
        <Header>
          <Header.Logo name="gem" />
        </Header>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkHeader;
