import React from "react";
import { Container, Text, Link, Footer } from "basis";

function KitchenSinkFooter() {
  return (
    <Container>
      <Container bg="primary.blue.t100" padding="6">
        <Text intent="h2" align="center">
          Footer
        </Text>
      </Container>

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
    </Container>
  );
}

export default KitchenSinkFooter;
