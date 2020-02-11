import React from "react";
import { Container, Flex, Link } from "basis";
import Layout from "./Layout";

function KitchenSinkLink() {
  return (
    <Layout name="Link">
      <Container padding="6 0" bg="grey.t05">
        {Link.COLORS.map(color => (
          <Container
            padding="4"
            bg={
              color === "secondary.turquoise.t60"
                ? "primary.blue.t100"
                : color === "secondary.lightBlue.t100"
                ? "__exception__:black"
                : "white"
            }
            key={color}
          >
            <Flex gutter="8">
              <Link href="#" newTab={false} color={color}>
                {color}
              </Link>
              <Link href="#" newTab={false} color={color} __internal__hover>
                Hover
              </Link>
              <Link href="#" newTab={false} color={color} __internal__active>
                Active
              </Link>
              <Link
                href="#"
                newTab={false}
                color={color}
                __internal__keyboardFocus
              >
                Keyboard focus
              </Link>
            </Flex>
          </Container>
        ))}
      </Container>
    </Layout>
  );
}

export default KitchenSinkLink;
