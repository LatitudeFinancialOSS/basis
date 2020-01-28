import React from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Flex from "./Flex";

describe("Flex", () => {
  it("with testId", () => {
    const { container } = render(
      <Flex gutter="2" testId="my-flex">
        Content goes here
      </Flex>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-flex");
  });
});
