import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Stack, Text } from ".";
import { render, screen } from "../utils/test";

describe("Stack", () => {
  it("renders all children", () => {
    const { container } = render(
      <Stack gap="8">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
        <Text>Item 4</Text>
      </Stack>
    );

    expect(container.firstChild.firstChild.firstChild.childElementCount).toBe(
      4
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
    expect(screen.getByText("Item 4")).toBeInTheDocument();
  });

  it("with margin", () => {
    const { container } = render(
      <Stack margin="4 8">
        <Text>Hello</Text>
        <Text>World</Text>
      </Stack>
    );

    expect(container.firstChild.firstChild).toHaveStyle({
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

    expect(container.firstChild.firstChild).toHaveStyle({
      width: "320px",
    });
  });

  it("with flatten", () => {
    const { container } = render(
      <Stack gap="8" flatten>
        <Text>1</Text>
        <>
          <Text>2</Text>
          <Text>3</Text>
        </>
        <Text>4</Text>
      </Stack>
    );

    expect(container.firstChild.firstChild.firstChild.childElementCount).toBe(
      4
    );
  });

  it("with testId", () => {
    const { container } = render(
      <Stack testId="my-stack">
        <Text>Hello</Text>
        <Text>World</Text>
      </Stack>
    );

    expect(container.firstChild.firstChild).toHaveAttribute(
      "data-testid",
      "my-stack"
    );
  });
});
