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

      {[
        "primary-blue-button",
        "primary-green-button",
        "secondary-blue-button",
      ].map((variant) => (
        <Container padding="4" key={variant}>
          <Stack direction="horizontal" gap="8">
            <Link variant={variant} href="#" newTab={false}>
              {variant}
            </Link>
            <Link variant={variant} href="#" newTab={false} __internal__hover>
              Hover
            </Link>
            <Link variant={variant} href="#" newTab={false} __internal__active>
              Active
            </Link>
            <Link
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
        <Link variant="primary-blue-button" href="#" newTab={false} width="300">
          300px width
        </Link>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkLink;
