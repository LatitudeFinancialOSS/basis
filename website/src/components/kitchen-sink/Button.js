import React from "react";
import { Container, Grid, Flex, Button } from "basis";
import Layout from "./Layout";

function KitchenSinkButton() {
  return (
    <Layout name="Button">
      <Grid>
        <Container padding="4">
          <Button>Default</Button>
        </Container>

        {Button.VARIANTS.map(variant =>
          Button.COLORS.map(color => (
            <Container
              padding="4"
              bg={color === "white" ? "primary.blue.t100" : null}
              key={color}
            >
              <Flex gutter="6">
                <Button variant={variant} color={color}>
                  {variant} {color}
                </Button>

                <Button
                  variant={variant}
                  color={color}
                  __internal__hover={true}
                >
                  Hover
                </Button>

                <Button
                  variant={variant}
                  color={color}
                  __internal__active={true}
                >
                  Active
                </Button>

                <Button
                  variant={variant}
                  color={color}
                  __internal__keyboardFocus={true}
                >
                  Keyboard focus
                </Button>

                <Button variant={variant} color={color} disabled={true}>
                  Disabled
                </Button>
              </Flex>
            </Container>
          ))
        )}

        <Container padding="4">
          <Button fullWidth>Full width</Button>
        </Container>
      </Grid>
    </Layout>
  );
}

export default KitchenSinkButton;
