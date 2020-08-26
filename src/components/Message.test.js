import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Message from "./Message";
import { render } from "../utils/test";

describe("Message", () => {
  it("with testId", () => {
    const { container } = render(
      <Message severity="info-or-minor" testId="my-message">
        Something went wrong.
      </Message>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-message");
  });
});
