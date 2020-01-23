import React from "react";
import { Container, Grid, Flex, Text, Button } from "basis";
import { VARIANTS, COLORS } from "../../../../src/components/Button";

function KitchenSinkButton() {
  return (
    <Container>
      <Container bg="primary.blue.t100" padding="6">
        <Text intent="h2" align="center">
          Button
        </Text>
      </Container>

      <Grid>
        <Container padding="4">
          <Button>Default</Button>
        </Container>

        {VARIANTS.map(variant =>
          COLORS.map(color => (
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
                  __internal__keyboardFocused={true}
                >
                  Keyboard focused
                </Button>
                <Button variant={variant} color={color} isDisabled={true}>
                  Disabled
                </Button>
              </Flex>
            </Container>
          ))
        )}

        <Container padding="4">
          <Button isFullWidth={true}>Full width</Button>
        </Container>
      </Grid>
    </Container>
  );
}

export default KitchenSinkButton;
