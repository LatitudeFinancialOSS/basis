import React from "react";
import { render, wait, userEvent } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import DatePicker from "./DatePicker";
import Container from "./Container";

function FormWithDatePicker(props) {
  const initialValues = {
    birthDate: {
      day: "",
      month: "",
      year: ""
    }
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
    const { container, getByText, getByPlaceholderText } = render(
      <FormWithDatePicker label="Expiry date" />
    );
    const label = getByText("Expiry date");
    const inputsContainer = container.querySelector("[aria-labelledby]");

    expect(label.tagName).toBe("LABEL");

    const labelId = label.getAttribute("id");

    expect(labelId).toBeTruthy();
    expect(inputsContainer.getAttribute("aria-labelledby")).toBe(labelId);

    const dayInput = getByPlaceholderText("DD");
    const monthInput = getByPlaceholderText("MM");
    const yearInput = getByPlaceholderText("YYYY");

    expect(dayInput.getAttribute("type")).toBe("number");
    expect(monthInput.getAttribute("type")).toBe("number");
    expect(yearInput.getAttribute("type")).toBe("number");
  });

  it("doesn't render the day field when day={false}", () => {
    const { queryByPlaceholderText } = render(
      <FormWithDatePicker label="Expiry date" day={false} />
    );

    expect(queryByPlaceholderText("DD")).not.toBeInTheDocument();
  });

  it("renders the date as help text", async () => {
    const { container, getByPlaceholderText } = render(
      <FormWithDatePicker label="Expiry date" />
    );

    await userEvent.type(getByPlaceholderText("DD"), "6");
    await userEvent.type(getByPlaceholderText("MM"), "4");
    await userEvent.type(getByPlaceholderText("YYYY"), "2017");

    expect(getHelpText(container)).toBe("6 April, 2017");
  });

  it("renders the date as help text when day={false}", async () => {
    const { container, getByPlaceholderText } = render(
      <FormWithDatePicker label="Expiry date" day={false} />
    );

    await userEvent.type(getByPlaceholderText("MM"), "4");
    await userEvent.type(getByPlaceholderText("YYYY"), "2017");

    expect(getHelpText(container)).toBe("April, 2017");
  });

  it("renders help text", () => {
    const { container } = render(
      <FormWithDatePicker label="Expiry date" helpText="Some help text" />
    );

    expect(getHelpText(container)).toBe("Some help text");
  });

  it("renders error messages", async () => {
    const { container, queryByText, getByPlaceholderText } = render(
      <FormWithDatePicker label="Expiry date" helpText="Some help text" />
    );

    const dayInput = getByPlaceholderText("DD");

    dayInput.focus();
    dayInput.blur();

    const inputsContainer = container.querySelector("[aria-labelledby]");
    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    await wait(() => {
      expect(errorMessage).toHaveTextContent(
        [
          "Day must be within 1-31.",
          "Month must be within 1-12.",
          "Year must be within 1800-2200."
        ].join("")
      );
      expect(queryByText("Some help text")).not.toBeInTheDocument();
    });
  });

  it("inside dark container", () => {
    const { getByPlaceholderText } = render(
      <Container bg="primary.blue.t100">
        <FormWithDatePicker label="Expiry date" />
      </Container>
    );
    const dayInput = getByPlaceholderText("DD");
    const monthInput = getByPlaceholderText("MM");
    const yearInput = getByPlaceholderText("YYYY");

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
