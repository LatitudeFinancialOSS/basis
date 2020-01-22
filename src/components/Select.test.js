import React, { useState } from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Select from "./Select";
import Container from "./Container";

const options = [
  {
    label: "Single",
    value: "single"
  },
  {
    label: "Married",
    value: "married"
  },
  {
    label: "Other",
    value: "other"
  }
];

function App(props) {
  const [relationshipStatus, setRelationshipStatus] = useState({
    value: ""
  });

  return (
    <Select
      options={options}
      data={relationshipStatus}
      onChange={setRelationshipStatus}
      {...props}
    />
  );
}

describe("Select", () => {
  it("renders label, placeholder and all options", () => {
    const { getByText, getByDisplayValue } = render(
      <App label="Relationship status" />
    );
    const label = getByText("Relationship status");

    const select = getByDisplayValue("Please select");
    expect(select.tagName).toBe("SELECT");

    const selectId = select.getAttribute("id");

    expect(selectId).toBeTruthy();
    expect(label.getAttribute("for")).toBe(selectId);

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
      align-self: flex-start;
      background-color: #f2f2f2;
    `);
  });

  it("full width", () => {
    const { getByDisplayValue } = render(
      <App label="Relationship status" isFullWidth={true} />
    );
    const select = getByDisplayValue("Please select");

    expect(select).toHaveStyle(`
      align-self: auto;
    `);
  });

  it("custom placeholder", () => {
    const { queryByText, getByText } = render(
      <App label="Relationship status" placeholder="Choose something" />
    );

    expect(queryByText("Please select")).not.toBeInTheDocument();

    getByText("Choose something");
  });

  it("inside dark container", () => {
    const { getByDisplayValue } = render(
      <Container bg="primary.blue.t100">
        <App label="Relationship status" />
      </Container>
    );
    const select = getByDisplayValue("Please select");

    expect(select).toHaveStyle(`
      background-color: #ffffff;
    `);
  });
});
