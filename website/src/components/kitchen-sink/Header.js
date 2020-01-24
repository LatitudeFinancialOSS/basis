import React from "react";
import { Container, Header } from "basis";
import Layout from "./Layout";

function KitchenSinkHeader() {
  return (
    <Layout name="Header">
      <Container padding="6 0" bg="grey.t05">
        <Header __internal__notFixed={true}>
          <Header.Logo name="gem" />
        </Header>
      </Container>
    </Layout>
  );
}

export default KitchenSinkHeader;
