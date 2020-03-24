import React from "react";
import { render, waitFor } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import Input from "./Input";
import Container from "./Container";

function FormWithInput(props) {
  const initialValues = {
    name: "",
  };

  return (
    <Form initialValues={initialValues}>
      <Input name="name" {...props} />
    </Form>
  );
}

describe("Input", () => {
  it("renders label that is connected to the input", () => {
    const { getByText, getByLabelText } = render(
      <FormWithInput label="First name" />
    );
    const label = getByText("First name");
    const input = getByLabelText("First name");

    expect(label.tagName).toBe("LABEL");
    expect(input.tagName).toBe("INPUT");

    const inputId = input.getAttribute("id");

    expect(inputId).toBeTruthy();
    expect(label).toHaveAttribute("for", inputId);

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
      <FormWithInput label="First name" helpText="Some help text" />
    );
    const input = getByLabelText("First name");
    const describedBy = input.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    expect(errorMessage).toHaveTextContent("Some help text");
  });

  it("renders error message", async () => {
    const { container, queryByText, getByLabelText } = render(
      <FormWithInput label="First name" helpText="Some help text" />
    );
    const input = getByLabelText("First name");

    input.focus();
    input.blur();

    const describedBy = input.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent("Required");
      expect(queryByText("Some help text")).not.toBeInTheDocument();
    });
  });

  it("inside dark container", () => {
    const { getByLabelText } = render(
      <Container bg="primary.blue.t100">
        <FormWithInput label="First name" />
      </Container>
    );
    const input = getByLabelText("First name");

    expect(input).toHaveStyle(`
      background-color: #ffffff;
    `);
  });

  it("with testId", () => {
    const { container } = render(
      <FormWithInput label="First name" testId="my-input" />
    );

    expect(container.querySelector("form").firstChild).toHaveAttribute(
      "data-testid",
      "my-input"
    );
  });
});
