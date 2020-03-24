import React from "react";
import { render } from "../utils/test";
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
    const { getByText, getByDisplayValue } = render(
      <FormWithSelect label="Relationship status" />
    );
    const label = getByText("Relationship status");

    const select = getByDisplayValue("Please select");
    expect(select.tagName).toBe("SELECT");

    const selectId = select.getAttribute("id");

    expect(selectId).toBeTruthy();
    expect(label).toHaveAttribute("for", selectId);

    const placeholder = getByText("Please select");

    expect(placeholder.tagName).toBe("OPTION");
    expect(placeholder.value).toBe("");
    expect(placeholder).toBeDisabled();

    expect(getByText("Single").tagName).toBe("OPTION");
    expect(getByText("Married").tagName).toBe("OPTION");
    expect(getByText("Other").tagName).toBe("OPTION");

    expect(select).toHaveStyle(`
      display: inline-block;
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      font-family: 'Roboto',sans-serif;
      color: #000000;
      height: 48px;
      padding-left: 16px;
      padding-right: 40px;
      margin: 0;
      border: 0;
      border-radius: 0;
      appearance: none;
      background-image: url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' hei…1.495.802.874.874 0 01-.253.607z' fill='%23414141'%3E%3C/path%3E%3C/svg%3E);
      background-repeat: no-repeat;
      background-position: right 8px top 50%;
      width: 100%;
      background-color: #f2f2f2;
    `);
  });

  it("not full width", () => {
    const { getByDisplayValue } = render(
      <FormWithSelect label="Relationship status" fullWidth={false} />
    );
    const select = getByDisplayValue("Please select");

    expect(select).not.toHaveStyle(`
      width: 100%;
    `);
  });

  it("custom placeholder", () => {
    const { queryByText, getByText } = render(
      <FormWithSelect
        label="Relationship status"
        placeholder="Choose something"
      />
    );

    expect(queryByText("Please select")).not.toBeInTheDocument();

    getByText("Choose something");
  });

  it("inside dark container", () => {
    const { getByDisplayValue } = render(
      <Container bg="primary.blue.t100">
        <FormWithSelect label="Relationship status" />
      </Container>
    );
    const select = getByDisplayValue("Please select");

    expect(select).toHaveStyle(`
      background-color: #ffffff;
    `);
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
