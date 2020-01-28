import React from "react";
import { getByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import Grid from "./Grid";
import { render } from "../utils/test";

describe("Grid", () => {
  it("with testId", () => {
    const { container } = render(
      <Grid
        cols={4}
        cols-md={12}
        rowsGutter={4}
        colsGutter="30px"
        testId="my-grid"
      >
        <Grid.Item colSpan="all" colSpan-md="0-3">
          First
        </Grid.Item>
        <Grid.Item colSpan="all" colSpan-md="4-7" testId="my-grid-item">
          Second
        </Grid.Item>
        <Grid.Item colSpan="all" colSpan-md="8-11">
          Third
        </Grid.Item>
      </Grid>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-grid");
    getByTestId(container, "my-grid-item");
  });
});
