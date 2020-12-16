import React from "react";
import { render, screen, userEvent } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import Select from "./Select";
import Container from "./Container";

const options = [
  {
    label: "Single",
    value: "single",
  },
  {
    label: "Married",
    value: "married",
  },
  {
    label: "Other",
    value: "other",
  },
];

function FormWithSelect(props) {
  const initialValues = {
    relationshipStatus: "",
  };

  return (
    <Form initialValues={initialValues}>
      <Select name="relationshipStatus" options={options} {...props} />
    </Form>
  );
}

describe("Select", () => {
  it("renders label, placeholder and all options", () => {
    render(<FormWithSelect label="Relationship status" />);

    const label = screen.getByText("Relationship status");

    const select = screen.getByDisplayValue("Please select");
    expect(select.tagName).toBe("SELECT");

    const selectId = select.getAttribute("id");

    expect(selectId).toBeTruthy();
    expect(label).toHaveAttribute("for", selectId);

    const placeholder = screen.getByText("Please select");

    expect(placeholder.tagName).toBe("OPTION");
    expect(placeholder).toHaveValue("");
    expect(placeholder).toBeDisabled();

    expect(screen.getByText("Single").tagName).toBe("OPTION");
    expect(screen.getByText("Married").tagName).toBe("OPTION");
    expect(screen.getByText("Other").tagName).toBe("OPTION");

    expect(select).toHaveStyle({
      display: "inline-block",
      fontSize: "16px",
      fontWeight: "300",
      lineHeight: "24px",
      fontFamily: "'Roboto',sans-serif",
      color: "#000000",
      height: "48px",
      paddingLeft: "16px",
      paddingRight: "40px",
      margin: "0",
      border: "0",
      borderRadius: "0",
      appearance: "none",
      backgroundImage:
        "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' hei…1.495.802.874.874 0 01-.253.607z' fill='%23414141'%3E%3C/path%3E%3C/svg%3E)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 8px top 50%",
      width: "100%",
      backgroundColor: "#f2f2f2",
    });
  });

  it("optional", () => {
    render(<FormWithSelect label="Relationship status" optional />);

    const placeholder = screen.getByText("Please select");

    expect(placeholder).toBeEnabled();
  });

  it("not full width", () => {
    render(<FormWithSelect label="Relationship status" fullWidth={false} />);

    const select = screen.getByDisplayValue("Please select");

    expect(select).not.toHaveStyle({
      width: "100%",
    });
  });

  it("custom placeholder", () => {
    render(
      <FormWithSelect
        label="Relationship status"
        placeholder="Choose something"
      />
    );

    expect(screen.queryByText("Please select")).not.toBeInTheDocument();
    expect(screen.getByText("Choose something")).toBeInTheDocument();
  });

  it("inside dark container", () => {
    render(
      <Container bg="primary.blue.t100">
        <FormWithSelect label="Relationship status" />
      </Container>
    );

    const select = screen.getByDisplayValue("Please select");

    expect(select).toHaveStyle({
      backgroundColor: "#ffffff",
    });
  });

  it("inside nested container", () => {
    render(
      <Container bg="primary.blue.t100">
        <Container>
          <FormWithSelect label="Relationship status" />
        </Container>
      </Container>
    );

    const select = screen.getByDisplayValue("Please select");

    expect(select).toHaveStyle({
      backgroundColor: "#ffffff",
    });
  });

  it("with onChange", () => {
    const onChange = jest.fn();

    render(<FormWithSelect label="Relationship status" onChange={onChange} />);

    const select = screen.getByDisplayValue("Please select");

    userEvent.selectOptions(select, "married");

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith({
      selectedOption: {
        label: "Married",
        value: "married",
      },
    });
  });

  it("with testId", () => {
    const { container } = render(
      <FormWithSelect label="Relationship status" testId="my-select" />
    );

    expect(container.querySelector("form").firstChild).toHaveAttribute(
      "data-testid",
      "my-select"
    );
  });
});
