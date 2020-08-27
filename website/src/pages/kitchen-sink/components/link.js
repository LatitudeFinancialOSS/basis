import React from "react";
import { Container, Stack, Link } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

const backgrounds = [
  "white",
  "grey.t03",
  "grey.t05",
  "grey.t07",
  "secondary.lightBlue.t15",
  "secondary.lightBlue.t25",
  "primary.blue.t100",
];

function KitchenSinkLink() {
  return (
    <KitchenSinkLayout name="Link">
      {backgrounds.map((bg) => (
        <Container padding="4" bg={bg} key={bg}>
          <Stack direction="horizontal" gap="8">
            <Link href="#" newTab={false}>
              {bg}
            </Link>
            <Link href="#" newTab={false} __internal__hover>
              Hover
            </Link>
            <Link href="#" newTab={false} __internal__active>
              Active
            </Link>
            <Link href="#" newTab={false} __internal__keyboardFocus>
              Keyboard focus
            </Link>
          </Stack>
        </Container>
      ))}

      {["blue-button", "white-button", "green-button"].map((variant) => (
        <Container
          bg={variant === "white-button" ? "primary.blue.t100" : "white"}
          padding="4"
          key={variant}
        >
          <Stack direction="horizontal" gap="8">
            <Link
              appearance="primary-button"
              variant={variant}
              href="#"
              newTab={false}
            >
              {variant}
            </Link>
            <Link
              appearance="primary-button"
              variant={variant}
              href="#"
              newTab={false}
              __internal__hover
            >
              Hover
            </Link>
            <Link
              appearance="primary-button"
              variant={variant}
              href="#"
              newTab={false}
              __internal__active
            >
              Active
            </Link>
            <Link
              appearance="primary-button"
              variant={variant}
              href="#"
              newTab={false}
              __internal__keyboardFocus
            >
              Keyboard focus
            </Link>
          </Stack>
        </Container>
      ))}

      {["blue-button", "white-button"].map((variant) => (
        <Container
          bg={variant === "white-button" ? "primary.blue.t100" : "white"}
          padding="4"
          key={variant}
        >
          <Stack direction="horizontal" gap="8">
            <Link
              appearance="secondary-button"
              variant={variant}
              href="#"
              newTab={false}
            >
              {variant}
            </Link>
            <Link
              appearance="secondary-button"
              variant={variant}
              href="#"
              newTab={false}
              __internal__hover
            >
              Hover
            </Link>
            <Link
              appearance="secondary-button"
              variant={variant}
              href="#"
              newTab={false}
              __internal__active
            >
              Active
            </Link>
            <Link
              appearance="secondary-button"
              variant={variant}
              href="#"
              newTab={false}
              __internal__keyboardFocus
            >
              Keyboard focus
            </Link>
          </Stack>
        </Container>
      ))}

      <Container padding="4">
        <Stack direction="horizontal" gap="8">
          <Link
            appearance="primary-button"
            variant="green-button"
            width="300"
            href="#"
            newTab={false}
          >
            300px width
          </Link>
          <Link
            appearance="secondary-button"
            width="500"
            href="#"
            newTab={false}
          >
            500px width
          </Link>
        </Stack>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkLink;
