import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";
import Message from "./Message";
import { render, screen } from "../utils/test";

describe("Message", () => {
  it("renders icon", () => {
    render(<Message severity="blocking">Something went wrong.</Message>);

    expect(screen.getByLabelText("Blocking")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(
      <Message severity="critical" title="Something went wrong">
        Please try again later.
      </Message>
    );

    const title = screen.getByText("Something went wrong");

    expect(title.tagName).toBe("STRONG");
  });

  it("renders children", () => {
    render(
      <Message severity="stop">
        We are experiencing an outage at the moment. Please try again later.
      </Message>
    );

    expect(
      screen.getByText(
        "We are experiencing an outage at the moment. Please try again later."
      )
    ).toBeInTheDocument();
  });

  it("renders call to action", () => {
    render(
      <Message severity="assistance" callToAction={<Button>Action</Button>}>
        If you struggle, we can help!
      </Message>
    );

    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });

  it("applies background", () => {
    render(
      <Message
        severity="success"
        bg="secondary.lightBlue.t25"
        testId="my-message"
      >
        Your request was submitted successfully.
      </Message>
    );

    expect(screen.getByTestId("my-message")).toHaveStyle({
      backgroundColor: "#d8edff",
    });
  });

  it("with testId", () => {
    const { container } = render(
      <Message severity="info-or-minor" testId="my-message">
        Something went wrong.
      </Message>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-message");
  });
});
