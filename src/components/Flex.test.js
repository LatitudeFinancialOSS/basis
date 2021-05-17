import React from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Flex from "./Flex";

describe("Flex", () => {
  it("with width", () => {
    const { container } = render(<Flex width="320">Content goes here</Flex>);

    expect(container.firstChild.firstChild).toHaveStyle({
      width: "320px",
    });
  });

  it("with height", () => {
    const { container } = render(<Flex height="100%">Content goes here</Flex>);

    expect(container.firstChild.firstChild).toHaveStyle({
      height: "100%",
    });
  });

  it("with testId", () => {
    const { container } = render(
      <Flex testId="my-flex">Content goes here</Flex>
    );

    expect(container.firstChild.firstChild).toHaveAttribute(
      "data-testid",
      "my-flex"
    );
  });
});
