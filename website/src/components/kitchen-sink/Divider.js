import React from "react";
import { Container, Divider } from "basis";
import KitchenSinkLayout from "./KitchenSinkLayout";

function KitchenSinkDivider() {
  return (
    <KitchenSinkLayout name="Divider">
      <Container padding="6 0" bg="grey.t03">
        <Divider />
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkDivider;
