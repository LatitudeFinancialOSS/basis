import React from "react";
import { Container, Grid, Stack, Button, Icon } from "basis";
import KitchenSinkLayout from "./KitchenSinkLayout";

function KitchenSinkButton() {
  return (
    <KitchenSinkLayout name="Button">
      <Grid>
        <Container padding="4">
          <Button>Default</Button>
        </Container>

        {Button.VARIANTS.map((variant) =>
          Button.COLORS.map((color) => (
            <Container
              padding="4"
              bg={color === "white" ? "primary.blue.t100" : null}
              key={color}
            >
              <Stack direction="horizontal" gap="6">
                <Button variant={variant} color={color}>
                  {variant === "icon" ? (
                    <Icon name="cross" />
                  ) : (
                    `${variant} ${color}`
                  )}
                </Button>

                <Button variant={variant} color={color} __internal__hover>
                  {variant === "icon" ? <Icon name="cross" /> : "Hover"}
                </Button>

                <Button variant={variant} color={color} __internal__active>
                  {variant === "icon" ? <Icon name="cross" /> : "Active"}
                </Button>

                <Button
                  variant={variant}
                  color={color}
                  __internal__keyboardFocus
                >
                  {variant === "icon" ? (
                    <Icon name="cross" />
                  ) : (
                    "Keyboard focus"
                  )}
                </Button>

                <Button variant={variant} color={color} disabled>
                  {variant === "icon" ? <Icon name="cross" /> : "Disabled"}
                </Button>
              </Stack>
            </Container>
          ))
        )}

        <Container padding="4">
          <Button fullWidth>Full width</Button>
        </Container>
      </Grid>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkButton;
