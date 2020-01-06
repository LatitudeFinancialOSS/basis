import React from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Frequency from "./Frequency";
import Container from "./Container";

function App(props) {
  const [salary, setSalary] = React.useState({
    value: {
      input: "",
      frequency: ""
    }
  });

  return <Frequency data={salary} onChange={setSalary} {...props} />;
}

describe("Frequency", () => {
  it("renders label, input and frequency options", () => {
    const { container, getByText, queryByText, getByPlaceholderText } = render(
      <App label="Salary" placeholder="0.00" />
    );
    const label = getByText("Salary");
    const inputsContainer = container.querySelector("[aria-labelledby]");
    const labelId = label.getAttribute("id");

    expect(labelId).toBeTruthy();
    expect(inputsContainer.getAttribute("aria-labelledby")).toBe(labelId);

    const amountInput = getByPlaceholderText("0.00");

    expect(amountInput.getAttribute("type")).toBe("number");

    getByText("Annually");
    expect(queryByText("Quarterly")).not.toBeInTheDocument();
    getByText("Monthly");
    getByText("Fortnightly");
    getByText("Weekly");
  });

  it("renders help text", () => {
    const { container } = render(
      <App label="Salary" helpText="Some help text" />
    );
    const inputsContainer = container.querySelector("[aria-labelledby]");
    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    expect(errorMessage).toHaveTextContent("Some help text");
  });

  it("renders error message", () => {
    const { container, queryByText, getByPlaceholderText } = render(
      <App label="Salary" placeholder="0.00" helpText="Some help text" />
    );

    const amountInput = getByPlaceholderText("0.00");

    amountInput.focus();
    amountInput.blur();

    const inputsContainer = container.querySelector("[aria-labelledby]");

    expect(queryByText("Some help text")).not.toBeInTheDocument();

    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    expect(errorMessage).toHaveTextContent("Please enter a valid amount.");
  });

  it("renders multiple error messages", () => {
    const { container, getByPlaceholderText, getByDisplayValue } = render(
      <App label="Salary" placeholder="0.00" />
    );

    const amountInput = getByPlaceholderText("0.00");
    const annuallyInput = getByDisplayValue("annually");

    amountInput.focus();
    amountInput.blur();

    annuallyInput.focus();
    annuallyInput.blur();

    const inputsContainer = container.querySelector("[aria-labelledby]");
    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    expect(errorMessage).toHaveTextContent(
      ["Please enter a valid amount.", "Please select a frequency."].join("")
    );
  });

  it("hides options", () => {
    const { queryByText } = render(
      <App
        label="Salary"
        annually={false}
        monthly={false}
        fortnightly={false}
        weekly={false}
      />
    );

    expect(queryByText("Annually")).not.toBeInTheDocument();
    expect(queryByText("Monthly")).not.toBeInTheDocument();
    expect(queryByText("Fortnightly")).not.toBeInTheDocument();
    expect(queryByText("Weekly")).not.toBeInTheDocument();
  });

  it("inside dark container", () => {
    const { getByPlaceholderText, getByText } = render(
      <Container bg="primary.blue.t100">
        <App label="Salary" placeholder="0.00" />
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
});
