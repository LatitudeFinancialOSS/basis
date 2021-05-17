import "@testing-library/jest-dom/extend-expect";
import React from "react";
import Header from "./Header";
import { render, screen } from "../utils/test";

describe("Header", () => {
  it("exposes an ID", () => {
    expect(Header.ID).toBe("Header");
  });

  it("exposes a HEIGHT_MAP", () => {
    expect(Header.HEIGHT_MAP).toStrictEqual({
      default: 56,
      lg: 80,
    });
  });

  it("with testId", () => {
    render(
      <Header testId="my-header">
        <Header.Logo name="gem" testId="my-header-logo" />
      </Header>
    );

    expect(screen.getByRole("banner")).toHaveAttribute(
      "data-testid",
      "my-header"
    );
    expect(screen.getByTestId("my-header-logo")).toBeInTheDocument();
  });
});
