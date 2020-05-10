import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor, userEvent } from "../utils/test";
import Form from "./Form";
import DatePicker from "./DatePicker";
import Container from "./Container";

function FormWithDatePicker(props) {
  const initialValues = {
    birthDate: {
      day: "",
      month: "",
      year: "",
    },
  };

  return (
    <Form initialValues={initialValues}>
      <DatePicker name="birthDate" {...props} />
    </Form>
  );
}

function getHelpText(container) {
  const inputsContainer = container.querySelector("[aria-labelledby]");
  const describedBy = inputsContainer.getAttribute("aria-describedby");

  return container.querySelector(`[id="${describedBy}"]`).textContent;
}

describe("DatePicker", () => {
  it("renders label and 3 fields", () => {
    const { container } = render(<FormWithDatePicker label="Expiry date" />);
    const label = screen.getByText("Expiry date");
    const inputsContainer = container.querySelector("[aria-labelledby]");

    expect(label.tagName).toBe("LABEL");

    const labelId = label.getAttribute("id");

    expect(labelId).toBeTruthy();
    expect(inputsContainer).toHaveAttribute("aria-labelledby", labelId);

    const dayInput = screen.getByPlaceholderText("DD");
    const monthInput = screen.getByPlaceholderText("MM");
    const yearInput = screen.getByPlaceholderText("YYYY");

    expect(dayInput).toHaveAttribute("type", "number");
    expect(monthInput).toHaveAttribute("type", "number");
    expect(yearInput).toHaveAttribute("type", "number");
  });

  it("doesn't render the day field when day={false}", () => {
    render(<FormWithDatePicker label="Expiry date" day={false} />);

    expect(screen.queryByPlaceholderText("DD")).not.toBeInTheDocument();
  });

  it("renders the date as help text", async () => {
    const { container } = render(<FormWithDatePicker label="Expiry date" />);

    await userEvent.type(screen.getByPlaceholderText("DD"), "6");
    await userEvent.type(screen.getByPlaceholderText("MM"), "4");
    await userEvent.type(screen.getByPlaceholderText("YYYY"), "2017");

    expect(getHelpText(container)).toBe("6 April, 2017");
  });

  it("renders the date as help text when day={false}", async () => {
    const { container } = render(
      <FormWithDatePicker label="Expiry date" day={false} />
    );

    await userEvent.type(screen.getByPlaceholderText("MM"), "4");
    await userEvent.type(screen.getByPlaceholderText("YYYY"), "2017");

    expect(getHelpText(container)).toBe("April, 2017");
  });

  it("renders help text", () => {
    const { container } = render(
      <FormWithDatePicker label="Expiry date" helpText="Some help text" />
    );

    expect(getHelpText(container)).toBe("Some help text");
  });

  it("renders error messages", async () => {
    render(
      <FormWithDatePicker label="Expiry date" helpText="Some help text" />
    );

    const dayInput = screen.getByPlaceholderText("DD");

    dayInput.focus();
    dayInput.blur();

    await screen.findByText("Day must be within 1-31.");
    await screen.findByText("Month must be within 1-12.");
    await screen.findByText("Year must be within 1800-2200.");
    await waitFor(() => {
      expect(screen.queryByText("Some help text")).not.toBeInTheDocument();
    });
  });

  it("inside dark container", () => {
    render(
      <Container bg="primary.blue.t100">
        <FormWithDatePicker label="Expiry date" />
      </Container>
    );

    const dayInput = screen.getByPlaceholderText("DD");
    const monthInput = screen.getByPlaceholderText("MM");
    const yearInput = screen.getByPlaceholderText("YYYY");

    expect(dayInput).toHaveStyle(`
      background-color: #ffffff;
    `);
    expect(monthInput).toHaveStyle(`
      background-color: #ffffff;
    `);
    expect(yearInput).toHaveStyle(`
      background-color: #ffffff;
    `);
  });

  it("with testId", () => {
    const { container } = render(
      <FormWithDatePicker label="Expiry date" testId="my-date-picker" />
    );

    expect(container.querySelector("form").firstChild).toHaveAttribute(
      "data-testid",
      "my-date-picker"
    );
  });
});
