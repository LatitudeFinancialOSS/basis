import React, { useState } from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Input from "./Input";
import Container from "./Container";

function App(props) {
  const [name, setName] = useState({
    value: ""
  });

  return <Input data={name} onChange={setName} {...props} />;
}

describe("Input", () => {
  it("renders label that is connected to the input", () => {
    const { getByText, getByLabelText } = render(<App label="First name" />);
    const label = getByText("First name");
    const input = getByLabelText("First name");

    expect(label.tagName).toBe("LABEL");
    expect(input.tagName).toBe("INPUT");

    const inputId = input.getAttribute("id");

    expect(inputId).toBeTruthy();
    expect(label.getAttribute("for")).toBe(inputId);

    expect(input).toHaveStyle(`
      box-sizing: border-box;
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      font-family: 'Roboto',sans-serif;
      padding: 0 16px;
      color: #000000;
      width: 100%;
      height: 48px;
      border: 0;
      margin: 0;
      background-color: #f2f2f2;
    `);

    expect(label).toHaveStyle(`
      display: flex;
      font-family: 'Roboto',sans-serif;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: #414141;
      margin-bottom: 8px;
    `);
  });

  it("renders help text that is connected to the input", () => {
    const { container, getByLabelText } = render(
      <App label="First name" helpText="Some help text" />
    );
    const input = getByLabelText("First name");
    const describedBy = input.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    expect(errorMessage).toHaveTextContent("Some help text");
  });

  it("renders error message", () => {
    const { container, queryByText, getByLabelText } = render(
      <App label="First name" helpText="Some help text" />
    );
    const input = getByLabelText("First name");

    input.focus();
    input.blur();

    expect(queryByText("Some help text")).not.toBeInTheDocument();

    const describedBy = input.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    expect(errorMessage).toHaveTextContent("Required");
  });

  it("inside dark container", () => {
    const { getByLabelText } = render(
      <Container bg="primary.blue.t100">
        <App label="First name" />
      </Container>
    );
    const input = getByLabelText("First name");

    expect(input).toHaveStyle(`
      background-color: #ffffff;
    `);
  });

  it("with testId", () => {
    const { container } = render(<App label="First name" testId="my-input" />);

    expect(container.firstChild).toHaveAttribute("data-testid", "my-input");
  });
});
