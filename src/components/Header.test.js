import React from "react";
import { getByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";
import { render } from "../utils/test";

describe("Header", () => {
  it("with testId", () => {
    const { container } = render(
      <Header testId="my-header">
        <Header.Logo name="gem" testId="my-header-logo" />
      </Header>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-header");
    getByTestId(container, "my-header-logo");
  });
});
