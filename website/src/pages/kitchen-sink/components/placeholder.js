import React from "react";
import { Container, Placeholder } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

function KitchenSinkPlaceholder() {
  return (
    <KitchenSinkLayout name="Placeholder">
      <Container padding="6">
        <Placeholder />
      </Container>

      <Container padding="6">
        <Placeholder label="Custom label" />
      </Container>

      <Container padding="6">
        <Placeholder label="Custom size" width="320" height="112" />
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkPlaceholder;
