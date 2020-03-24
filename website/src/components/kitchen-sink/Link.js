import React from "react";
import { Container, Stack, Link } from "basis";
import KitchenSinkLayout from "./KitchenSinkLayout";

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
      <Container padding="6 0">
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
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkLink;
