import React from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import LoadingIcon from "./LoadingIcon";

describe("LoadingIcon", () => {
  it("with testId", () => {
    const { container } = render(<LoadingIcon testId="my-loading-icon" />);

    expect(container.firstChild).toHaveAttribute(
      "data-testid",
      "my-loading-icon"
    );
  });
});
