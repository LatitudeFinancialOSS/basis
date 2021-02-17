import React from "react";
import { render, screen, waitFor, userEvent } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import Textarea from "./Textarea";
import Container from "./Container";

function FormWithTextarea(props) {
  const initialValues = {
    description: "",
  };

  return (
    <Form initialValues={initialValues}>
      <Textarea name="description" {...props} />
    </Form>
  );
}

describe("Textarea", () => {
  it("renders label that is connected to the textarea", () => {
    render(<FormWithTextarea label="Description" />);

    const label = screen.getByText("Description");
    const textarea = screen.getByLabelText("Description");

    expect(label.tagName).toBe("LABEL");
    expect(textarea.tagName).toBe("TEXTAREA");

    const textareaId = textarea.getAttribute("id");

    expect(textareaId).toBeTruthy();
    expect(textarea).toHaveAttribute("autoComplete", "off");
    expect(label).toHaveAttribute("for", textareaId);

    expect(label).toHaveStyle({
      display: "flex",
      fontFamily: "'Roboto',sans-serif",
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "24px",
      color: "#414141",
      marginBottom: "8px",
    });

    expect(textarea).toHaveStyle({
      boxSizing: "border-box",
      fontSize: "16px",
      fontWeight: "300",
      lineHeight: "24px",
      fontFamily: "'Roboto',sans-serif",
      color: "#000000",
      padding: "8px 16px",
      width: "100%",
      minHeight: "60px",
      resize: "vertical",
      border: "0",
      margin: "0",
      backgroundColor: "#f2f2f2",
    });
  });

  it("with maxLength", () => {
    render(<FormWithTextarea label="Description" maxLength="100" />);

    const textarea = screen.getByLabelText("Description");

    expect(textarea).toHaveAttribute("maxLength", "100");
  });

  it("with height", () => {
    render(<FormWithTextarea label="Description" height="200" />);

    const textarea = screen.getByLabelText("Description");

    expect(textarea).toHaveStyle({
      height: "200px",
    });
  });

  it("renders help text that is connected to the textarea", () => {
    const { container } = render(
      <FormWithTextarea label="Description" helpText="Some help text" />
    );
    const textarea = screen.getByLabelText("Description");
    const describedBy = textarea.getAttribute("aria-describedby");
    const helpText = container.querySelector(`[id="${describedBy}"]`);

    expect(helpText).toHaveTextContent("Some help text");
  });

  it("renders error message", async () => {
    render(<FormWithTextarea label="Description" helpText="Some help text" />);

    const textarea = screen.getByLabelText("Description");

    textarea.focus();
    textarea.blur();

    await screen.findByText("Required");
    await waitFor(() => {
      expect(screen.queryByText("Some help text")).not.toBeInTheDocument();
    });
  });

  it("inside dark container", () => {
    render(
      <Container bg="primary.blue.t100">
        <FormWithTextarea label="Description" />
      </Container>
    );

    const textarea = screen.getByLabelText("Description");

    expect(textarea).toHaveStyle({
      backgroundColor: "#ffffff",
    });
  });

  it("inside nested container", () => {
    render(
      <Container bg="primary.blue.t100">
        <Container>
          <FormWithTextarea label="Description" />
        </Container>
      </Container>
    );

    const textarea = screen.getByLabelText("Description");

    expect(textarea).toHaveStyle({
      backgroundColor: "#ffffff",
    });
  });

  it("with onChange", () => {
    const onChange = jest.fn();

    render(<FormWithTextarea label="Description" onChange={onChange} />);

    const textarea = screen.getByLabelText("Description");

    userEvent.type(textarea, "a");

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith({
      value: "a",
    });

    userEvent.type(textarea, "bc");

    expect(onChange).toBeCalledWith({
      value: "abc",
    });
  });

  it("with testId", () => {
    const { container } = render(
      <FormWithTextarea label="Description" testId="my-textarea" />
    );

    expect(container.querySelector("form").firstChild).toHaveAttribute(
      "data-testid",
      "my-textarea"
    );
  });
});
