import React from "react";
import { Container, Placeholder } from "basis";
import Layout from "./Layout";

function KitchenSinkPlaceholder() {
  return (
    <Layout name="Placeholder">
      <Container padding="6">
        <Placeholder />
      </Container>

      <Container padding="6">
        <Placeholder label="Custom label" />
      </Container>

      <Container padding="6">
        <Placeholder label="Custom size" width="320" height="112" />
      </Container>
    </Layout>
  );
}

export default KitchenSinkPlaceholder;
