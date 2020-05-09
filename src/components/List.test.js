import React from "react";
import { render, screen } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import List from "./List";

describe("List", () => {
  it("unordered", () => {
    const { container } = render(
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

    screen.getByText("First Item");
    screen.getByText("Second Item");
    screen.getByText("Nested First Item");
    screen.getByText("Nested Second Item");
    screen.getByText("Last Item");
  });

  it("ordered", () => {
    const { container } = render(
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

    screen.getByText("First Item");
    screen.getByText("Second Item");
    screen.getByText("Nested First Item");
    screen.getByText("Nested Second Item");
    screen.getByText("Last Item");
  });

  it("steps", () => {
    const { container } = render(
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

    screen.getByText("First Item");
    screen.getByText("Second Item");
    screen.getByText("Nested First Item");
    screen.getByText("Nested Second Item");
    screen.getByText("Last Item");
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
