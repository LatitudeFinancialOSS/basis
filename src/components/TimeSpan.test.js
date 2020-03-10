import React from "react";
import { render, fireEvent, wait } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import TimeSpan from "./TimeSpan";
import Container from "./Container";

function FormWithTimeSpan(props) {
  const initialValues = {
    age: {
      years: "",
      months: ""
    }
  };

  return (
    <Form initialValues={initialValues}>
      <TimeSpan name="age" {...props} />
    </Form>
  );
}

describe("TimeSpan", () => {
  it("renders label and 2 fields", () => {
    const { container, getByText, getByPlaceholderText } = render(
      <FormWithTimeSpan label="How long do you live in the current address?" />
    );
    const label = getByText("How long do you live in the current address?");
    const inputsContainer = container.querySelector("[aria-labelledby]");
    const labelId = label.getAttribute("id");

    expect(labelId).toBeTruthy();
    expect(inputsContainer).toHaveAttribute("aria-labelledby", labelId);

    const yearsInput = getByPlaceholderText("Years");
    const monthsInput = getByPlaceholderText("Months");

    expect(yearsInput).toHaveAttribute("type", "number");
    expect(monthsInput).toHaveAttribute("type", "number");
  });

  it("renders default help text", () => {
    const { container } = render(
      <FormWithTimeSpan
        label="How long do you live in the current address?"
        helpText="Please be as accurate as possible."
      />
    );
    const inputsContainer = container.querySelector("[aria-labelledby]");
    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    expect(errorMessage).toHaveTextContent(
      "Please be as accurate as possible."
    );
  });

  it("renders help text that describes the input", () => {
    const { container, getByPlaceholderText } = render(
      <FormWithTimeSpan
        label="How long do you live in the current address?"
        helpText="Please be as accurate as possible."
      />
    );
    const inputsContainer = container.querySelector("[aria-labelledby]");
    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const helpText = container.querySelector(`[id="${describedBy}"]`);
    const yearsInput = getByPlaceholderText("Years");
    const monthsInput = getByPlaceholderText("Months");

    yearsInput.focus();
    fireEvent.change(yearsInput, { target: { value: "1" } });

    expect(helpText).toHaveTextContent("1 year");

    yearsInput.blur();
    monthsInput.focus();
    fireEvent.change(monthsInput, { target: { value: "11" } });

    expect(helpText).toHaveTextContent("1 year and 11 months");
  });

  it("renders error message", async () => {
    const { container, queryByText, getByPlaceholderText } = render(
      <FormWithTimeSpan
        label="How long do you live in the current address?"
        helpText="Please be as accurate as possible."
      />
    );

    const yearsInput = getByPlaceholderText("Years");

    yearsInput.focus();
    yearsInput.blur();

    const inputsContainer = container.querySelector("[aria-labelledby]");
    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    await wait(() => {
      expect(errorMessage).toHaveTextContent("Must be at least 1 month.");
      expect(
        queryByText("Please be as accurate as possible.")
      ).not.toBeInTheDocument();
    });
  });

  it("inside dark container", () => {
    const { getByPlaceholderText } = render(
      <Container bg="primary.blue.t100">
        <FormWithTimeSpan label="How long do you live in the current address?" />
      </Container>
    );
    const yearsInput = getByPlaceholderText("Years");
    const monthsInput = getByPlaceholderText("Months");

    expect(yearsInput).toHaveStyle(`
      background-color: #ffffff;
    `);
    expect(monthsInput).toHaveStyle(`
      background-color: #ffffff;
    `);
  });

  it("with testId", () => {
    const { container } = render(
      <FormWithTimeSpan
        label="How long do you live in the current address?"
        testId="my-time-span"
      />
    );

    expect(container.querySelector("form").firstChild).toHaveAttribute(
      "data-testid",
      "my-time-span"
    );
  });
});
