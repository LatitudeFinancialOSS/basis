import React from "react";
import { render, fireEvent } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import TimeSpan from "./TimeSpan";
import Container from "./Container";

function App(props) {
  const [currentAddressTimeSpan, setCurrentAddressTimeSpan] = React.useState({
    value: {
      years: "",
      months: ""
    }
  });

  return (
    <TimeSpan
      data={currentAddressTimeSpan}
      onChange={setCurrentAddressTimeSpan}
      {...props}
    />
  );
}

describe("TimeSpan", () => {
  it("renders label and 2 fields", () => {
    const { container, getByText, getByPlaceholderText } = render(
      <App label="How long do you live in the current address?" />
    );
    const label = getByText("How long do you live in the current address?");
    const inputsContainer = container.querySelector("[aria-labelledby]");
    const labelId = label.getAttribute("id");

    expect(labelId).toBeTruthy();
    expect(inputsContainer.getAttribute("aria-labelledby")).toBe(labelId);

    const yearsInput = getByPlaceholderText("Years");
    const monthsInput = getByPlaceholderText("Months");

    expect(yearsInput.getAttribute("type")).toBe("number");
    expect(monthsInput.getAttribute("type")).toBe("number");
  });

  it("renders default help text", () => {
    const { container } = render(
      <App
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
      <App
        label="How long do you live in the current address?"
        helpText="Please be as accurate as possible."
      />
    );
    const inputsContainer = container.querySelector("[aria-labelledby]");
    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);
    const yearsInput = getByPlaceholderText("Years");
    const monthsInput = getByPlaceholderText("Months");

    yearsInput.focus();
    fireEvent.change(yearsInput, { target: { value: "1" } });

    expect(errorMessage).toHaveTextContent("1 year");

    yearsInput.blur();
    monthsInput.focus();
    fireEvent.change(monthsInput, { target: { value: "11" } });

    expect(errorMessage).toHaveTextContent("1 year and 11 months");
  });

  it("renders error message", () => {
    const { container, queryByText, getByPlaceholderText } = render(
      <App
        label="How long do you live in the current address?"
        helpText="Please be as accurate as possible."
      />
    );

    const yearsInput = getByPlaceholderText("Years");

    yearsInput.focus();
    yearsInput.blur();

    const inputsContainer = container.querySelector("[aria-labelledby]");

    expect(
      queryByText("Please be as accurate as possible.")
    ).not.toBeInTheDocument();

    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    expect(errorMessage).toHaveTextContent("Must be at least 1 month.");
  });

  it("inside dark container", () => {
    const { getByPlaceholderText } = render(
      <Container bg="primary.blue.t100">
        <App label="How long do you live in the current address?" />
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
      <App
        label="How long do you live in the current address?"
        testId="my-time-span"
      />
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-time-span");
  });
});
