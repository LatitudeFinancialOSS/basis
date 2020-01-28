import React from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";

describe("Header", () => {
  it("with testId", () => {
    const { container } = render(
      <Header testId="my-header">
        <Header.Logo name="gem" />
      </Header>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-header");
  });
});
