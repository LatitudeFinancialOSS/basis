import React from "react";
import PropTypes from "prop-types";
import { Container, Stack, Button, Icon } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

function ButtonStates({ variant, color }) {
  return (
    <Container
      padding="4"
      bg={
        color === "black"
          ? "secondary.lightBlue.t25"
          : color === "white"
          ? "primary.blue.t100"
          : null
      }
    >
      <Stack direction="horizontal" gap="6">
        <Button variant={variant} color={color}>
          {variant === "icon" ? <Icon name="cross" /> : `${variant} ${color}`}
        </Button>

        <Button variant={variant} color={color} __internal__hover>
          {variant === "icon" ? <Icon name="cross" /> : "Hover"}
        </Button>

        <Button variant={variant} color={color} __internal__active>
          {variant === "icon" ? <Icon name="cross" /> : "Active"}
        </Button>

        <Button variant={variant} color={color} __internal__keyboardFocus>
          {variant === "icon" ? <Icon name="cross" /> : "Keyboard focus"}
        </Button>

        <Button variant={variant} color={color} disabled>
          {variant === "icon" ? <Icon name="cross" /> : "Disabled"}
        </Button>

        <Button variant={variant} color={color} loading>
          {variant === "icon" ? <Icon name="cross" /> : "Loading"}
        </Button>
      </Stack>
    </Container>
  );
}

ButtonStates.propTypes = {
  variant: PropTypes.oneOf(Button.VARIANTS),
  color: PropTypes.oneOf(Button.COLORS),
};

function KitchenSinkButton() {
  return (
    <KitchenSinkLayout name="Button">
      <Container padding="4">
        <Stack direction="horizontal" gap="8">
          <Button>Default</Button>
          <Button width="256">256px wide</Button>
        </Stack>
      </Container>

      <Container padding="4" width="500">
        <Button width="100%">100%</Button>
        <Button variant="secondary" width="50%" margin="4 0 0 0">
          50%
        </Button>
      </Container>

      <ButtonStates variant="primary" color="highlight.blue.t100" />
      <ButtonStates variant="primary" color="white" />
      <ButtonStates variant="primary" color="green" />

      <ButtonStates variant="secondary" color="highlight.blue.t100" />
      <ButtonStates variant="secondary" color="black" />
      <ButtonStates variant="secondary" color="white" />

      <ButtonStates variant="icon" color="highlight.blue.t100" />
    </KitchenSinkLayout>
  );
}

export default KitchenSinkButton;
