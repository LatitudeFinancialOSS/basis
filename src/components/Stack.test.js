import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Stack, Text } from ".";
import { render } from "../utils/test";

describe("Stack", () => {
  it("with margin", () => {
    const { container } = render(
      <Stack margin="4 8">
        <Text>Hello</Text>
        <Text>World</Text>
      </Stack>
    );

    expect(container.firstChild).toHaveStyle({
      margin: "16px 32px",
    });
  });

  it("with width", () => {
    const { container } = render(
      <Stack width="320">
        <Text>Hello</Text>
        <Text>World</Text>
      </Stack>
    );

    expect(container.firstChild).toHaveStyle({
      width: "320px",
    });
  });

  it("with testId", () => {
    const { container } = render(
      <Stack testId="my-stack">
        <Text>Hello</Text>
        <Text>World</Text>
      </Stack>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-stack");
  });
});
