import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Grid from "./Grid";
import { render, screen } from "../utils/test";

describe("Grid", () => {
  it("with margin", () => {
    render(<Grid margin="6 0 0 0">Hello</Grid>);

    expect(screen.getByText("Hello")).toHaveStyle({
      margin: "24px 0 0 0",
    });
  });

  it("with height", () => {
    render(<Grid height="300">Hello</Grid>);

    expect(screen.getByText("Hello")).toHaveStyle({
      height: "300px",
    });
  });

  it("with testId", () => {
    render(
      <Grid testId="my-grid">
        <Grid.Item testId="my-grid-item">Hello</Grid.Item>
      </Grid>
    );

    const gridItem = screen.getByText("Hello");

    expect(gridItem).toHaveAttribute("data-testid", "my-grid-item");
    expect(gridItem.parentElement).toHaveAttribute("data-testid", "my-grid");
  });
});
