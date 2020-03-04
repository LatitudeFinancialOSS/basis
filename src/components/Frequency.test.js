import React from "react";
import { render, wait } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import Frequency from "./Frequency";
import Container from "./Container";

function FormWithFrequency(props) {
  const initialValues = {
    salary: {
      amount: "",
      frequency: ""
    }
  };

  return (
    <Form initialValues={initialValues}>
      <Frequency name="salary" {...props} />
    </Form>
  );
}

describe("Frequency", () => {
  it("renders label, amount and frequency", () => {
    const { container, getByText, getByPlaceholderText } = render(
      <FormWithFrequency label="Salary" amountPlaceholder="0.00" />
    );
    const label = getByText("Salary");
    const inputsContainer = container.querySelector("[aria-labelledby]");
    const labelId = label.getAttribute("id");

    expect(labelId).toBeTruthy();
    expect(inputsContainer).toHaveAttribute("aria-labelledby", labelId);

    const amountInput = getByPlaceholderText("0.00");

    expect(amountInput).toHaveAttribute("type", "number");

    getByText("Annually");
    getByText("Quarterly");
    getByText("Monthly");
    getByText("Fortnightly");
    getByText("Weekly");
  });

  it("select mode", () => {
    const { getByText } = render(
      <FormWithFrequency
        label="Salary"
        mode="select"
        selectPlaceholder="Select frequency"
      />
    );

    const placeholderOption = getByText("Select frequency");

    expect(placeholderOption.parentNode.tagName).toBe("SELECT");
  });

  it("renders help text", () => {
    const { container } = render(
      <FormWithFrequency label="Salary" helpText="Some help text" />
    );
    const inputsContainer = container.querySelector("[aria-labelledby]");
    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const helpText = container.querySelector(`[id="${describedBy}"]`);

    expect(helpText).toHaveTextContent("Some help text");
  });

  it("renders error message", async () => {
    const { container, queryByText, getByPlaceholderText } = render(
      <FormWithFrequency
        label="Salary"
        amountPlaceholder="0.00"
        helpText="Some help text"
      />
    );

    const amountInput = getByPlaceholderText("0.00");

    amountInput.focus();
    amountInput.blur();

    const inputsContainer = container.querySelector("[aria-labelledby]");

    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    await wait(() => {
      expect(errorMessage).toHaveTextContent(
        ["Please enter a valid amount.", "Please select a frequency."].join("")
      );
      expect(queryByText("Some help text")).not.toBeInTheDocument();
    });
  });

  it("hides options", () => {
    const { queryByText } = render(
      <FormWithFrequency
        label="Salary"
        annually={false}
        quarterly={false}
        monthly={false}
        fortnightly={false}
        weekly={false}
      />
    );

    expect(queryByText("Annually")).not.toBeInTheDocument();
    expect(queryByText("Quarterly")).not.toBeInTheDocument();
    expect(queryByText("Monthly")).not.toBeInTheDocument();
    expect(queryByText("Fortnightly")).not.toBeInTheDocument();
    expect(queryByText("Weekly")).not.toBeInTheDocument();
  });

  it("inside dark container", () => {
    const { getByPlaceholderText, getByText } = render(
      <Container bg="primary.blue.t100">
        <FormWithFrequency label="Salary" amountPlaceholder="0.00" />
      </Container>
    );
    const amountInput = getByPlaceholderText("0.00");
    const annuallyLabel = getByText("Annually");

    expect(amountInput).toHaveStyle(`
      background-color: #ffffff;
    `);
    expect(annuallyLabel).toHaveStyle(`
      background-color: #ffffff;
    `);
  });

  it("with testId", () => {
    const { container } = render(
      <FormWithFrequency label="Salary" testId="my-frequency" />
    );

    expect(container.querySelector("form").firstChild).toHaveAttribute(
      "data-testid",
      "my-frequency"
    );
  });
});
