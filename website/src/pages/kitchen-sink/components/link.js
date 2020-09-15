import React from "react";
import { Container, Stack, Link, Icon, Text } from "basis";
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
          <Container>
            <Text>In stack:</Text>
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
          <Container margin="6 0 0 0">
            <Text>With margins:</Text>
            <Link href="#" newTab={false}>
              {bg}
            </Link>
            <Link href="#" newTab={false} __internal__hover margin="0 0 0 8">
              Hover
            </Link>
            <Link href="#" newTab={false} __internal__active margin="0 0 0 8">
              Active
            </Link>
            <Link
              href="#"
              newTab={false}
              __internal__keyboardFocus
              margin="0 0 0 8"
            >
              Keyboard focus
            </Link>
          </Container>
        </Container>
      ))}

      {["blue-button", "white-button", "green-button"].map((variant) => (
        <Container
          bg={variant === "white-button" ? "primary.blue.t100" : "white"}
          padding="4"
          key={variant}
        >
          <Container>
            <Text>In stack:</Text>
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
          <Container margin="6 0 0 0">
            <Text>With margins:</Text>
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
              margin="0 0 0 8"
            >
              Hover
            </Link>
            <Link
              appearance="primary-button"
              variant={variant}
              href="#"
              newTab={false}
              __internal__active
              margin="0 0 0 8"
            >
              Active
            </Link>
            <Link
              appearance="primary-button"
              variant={variant}
              href="#"
              newTab={false}
              __internal__keyboardFocus
              margin="0 0 0 8"
            >
              Keyboard focus
            </Link>
          </Container>
        </Container>
      ))}

      {["blue-button", "white-button", "black-button"].map((variant) => (
        <Container
          bg={
            variant === "white-button"
              ? "primary.blue.t100"
              : variant === "black-button"
              ? "secondary.lightBlue.t25"
              : "white"
          }
          padding="4"
          key={variant}
        >
          <Container>
            <Text>In stack:</Text>
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
          <Container margin="6 0 0 0">
            <Text>With margins:</Text>
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
              margin="0 0 0 8"
            >
              Hover
            </Link>
            <Link
              appearance="secondary-button"
              variant={variant}
              href="#"
              newTab={false}
              __internal__active
              margin="0 0 0 8"
            >
              Active
            </Link>
            <Link
              appearance="secondary-button"
              variant={variant}
              href="#"
              newTab={false}
              __internal__keyboardFocus
              margin="0 0 0 8"
            >
              Keyboard focus
            </Link>
          </Container>
        </Container>
      ))}

      <Container padding="4">
        <Stack direction="horizontal" gap="8">
          <Link appearance="icon" href="#" newTab={false}>
            <Icon name="github" color="grey.t75" hoverColor="black" />
          </Link>
          <Link
            appearance="icon"
            href="#"
            newTab={false}
            __internal__keyboardFocus
          >
            <Icon name="github" color="grey.t75" hoverColor="black" />
          </Link>
        </Stack>
      </Container>

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

      <Container bg="grey.t07" padding="4" width="400">
        <Link appearance="primary-button" width="100%" href="#" newTab={false}>
          100% width
        </Link>
        <Link
          appearance="secondary-button"
          width="50%"
          href="#"
          newTab={false}
          margin="4 0 0 0"
        >
          50% width
        </Link>
      </Container>

      <Container width="200" padding="4">
        <Stack>
          <Link href="#" newTab={false}>
            This multi-line link is to ensure that the underline appears under
            each line.
          </Link>
        </Stack>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkLink;
