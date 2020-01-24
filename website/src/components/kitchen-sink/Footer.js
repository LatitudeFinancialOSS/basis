import React from "react";
import { Container, Link, Footer } from "basis";
import Layout from "./Layout";

function KitchenSinkFooter() {
  return (
    <Layout name="Footer">
      <Container padding="6 0" bg="grey.t05">
        <Footer>
          <Footer.Header>
            <Footer.Header.Logo name="latitude" />
          </Footer.Header>
          <Footer.Legal>
            <Footer.Legal.Links>
              <Link href="#" newTab>
                Link 1
              </Link>
              <Link href="#" newTab>
                Link 2
              </Link>
              <Link href="#" newTab>
                Link 3
              </Link>
            </Footer.Legal.Links>
            <Footer.Legal.Copy>Legal copy goes here.</Footer.Legal.Copy>
          </Footer.Legal>
        </Footer>
      </Container>
    </Layout>
  );
}

export default KitchenSinkFooter;
