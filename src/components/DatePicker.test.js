import React from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import DatePicker from "./DatePicker";
import Container from "./Container";

function App(props) {
  const [date, setDate] = React.useState({
    value: {
      day: "",
      month: "",
      year: ""
    }
  });

  return <DatePicker data={date} onChange={setDate} {...props} />;
}

describe("DatePicker", () => {
  it("renders label and 3 fields", () => {
    const { container, getByText, getByPlaceholderText } = render(
      <App label="Expiry date" />
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

  it("renders help text", () => {
    const { container } = render(
      <App label="Expiry date" helpText="Some help text" />
    );
    const inputsContainer = container.querySelector("[aria-labelledby]");
    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    expect(errorMessage).toHaveTextContent("Some help text");
  });

  it("renders error message", () => {
    const { container, queryByText, getByPlaceholderText } = render(
      <App label="Expiry date" helpText="Some help text" />
    );

    const dayInput = getByPlaceholderText("DD");

    dayInput.focus();
    dayInput.blur();

    const inputsContainer = container.querySelector("[aria-labelledby]");

    expect(queryByText("Some help text")).not.toBeInTheDocument();

    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    expect(errorMessage).toHaveTextContent("Day must be within 1-31.");
  });

  it("renders multiple error messages", () => {
    const { container, getByPlaceholderText } = render(
      <App label="Expiry date" helpText="Some help text" />
    );

    const monthInput = getByPlaceholderText("MM");
    const yearInput = getByPlaceholderText("YYYY");

    monthInput.focus();
    monthInput.blur();

    yearInput.focus();
    yearInput.blur();

    const inputsContainer = container.querySelector("[aria-labelledby]");
    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    expect(errorMessage).toHaveTextContent(
      ["Month must be within 1-12.", "Year must be within 1800-2200."].join("")
    );
  });

  it("inside dark container", () => {
    const { getByPlaceholderText } = render(
      <Container bg="primary.blue.t100">
        <App label="Expiry date" />
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
      <App label="Expiry date" testId="my-date-picker" />
    );

    expect(container.firstChild).toHaveAttribute(
      "data-testid",
      "my-date-picker"
    );
  });
});
