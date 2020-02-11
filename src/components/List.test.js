import React from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import List from "./List";

describe("List", () => {
  it("unordered", () => {
    const { container, getByText } = render(
      <List>
        <List.Item>First Item</List.Item>
        <List.Item>Second Item</List.Item>
        <List.Item>
          <List>
            <List.Item>Nested First Item</List.Item>
            <List.Item>Nested Second Item</List.Item>
          </List>
        </List.Item>
        <List.Item>Last Item</List.Item>
      </List>
    );

    expect(container.firstChild.tagName).toBe("UL");

    getByText("First Item");
    getByText("Second Item");
    getByText("Nested First Item");
    getByText("Nested Second Item");
    getByText("Last Item");
  });

  it("ordered", () => {
    const { container, getByText } = render(
      <List type="ordered">
        <List.Item>First Item</List.Item>
        <List.Item>Second Item</List.Item>
        <List.Item>
          <List>
            <List.Item>Nested First Item</List.Item>
            <List.Item>Nested Second Item</List.Item>
          </List>
        </List.Item>
        <List.Item>Last Item</List.Item>
      </List>
    );

    expect(container.firstChild.tagName).toBe("OL");

    getByText("First Item");
    getByText("Second Item");
    getByText("Nested First Item");
    getByText("Nested Second Item");
    getByText("Last Item");
  });

  it("steps", () => {
    const { container, getByText } = render(
      <List type="steps">
        <List.Item>First Item</List.Item>
        <List.Item>Second Item</List.Item>
        <List.Item>
          <List>
            <List.Item>Nested First Item</List.Item>
            <List.Item>Nested Second Item</List.Item>
          </List>
        </List.Item>
        <List.Item>Last Item</List.Item>
      </List>
    );

    expect(container.firstChild.tagName).toBe("OL");

    getByText("First Item");
    getByText("Second Item");
    getByText("Nested First Item");
    getByText("Nested Second Item");
    getByText("Last Item");
  });

  it("ignores children that are not List.Item", () => {
    const { queryByText } = render(
      <List>
        <p>Hello</p>
        <List.Item>First Item</List.Item>
        <List.Item>Second Item</List.Item>
        <div>World</div>
        <List.Item>Third Item</List.Item>
      </List>
    );

    expect(queryByText("Hello")).not.toBeInTheDocument();
    expect(queryByText("World")).not.toBeInTheDocument();
  });

  it("with testId", () => {
    const { container } = render(
      <List testId="my-list">
        <List.Item>First Item</List.Item>
        <List.Item>Second Item</List.Item>
        <List.Item>Third Item</List.Item>
      </List>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-list");
  });
});
