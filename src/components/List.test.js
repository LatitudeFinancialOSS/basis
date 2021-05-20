import React from "react";
import { render, screen } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import List from "./List";

describe("List", () => {
  it("unordered", () => {
    render(
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

    const lists = screen.getAllByRole("list");

    expect(lists[0].tagName).toBe("UL");
    expect(lists[1].tagName).toBe("UL");

    expect(screen.getByText("First Item")).toBeInTheDocument();
    expect(screen.getByText("Second Item")).toBeInTheDocument();
    expect(screen.getByText("Nested First Item")).toBeInTheDocument();
    expect(screen.getByText("Nested Second Item")).toBeInTheDocument();
    expect(screen.getByText("Last Item")).toBeInTheDocument();
  });

  it("ordered", () => {
    render(
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

    const lists = screen.getAllByRole("list");

    expect(lists[0].tagName).toBe("OL");
    expect(lists[1].tagName).toBe("OL");

    expect(screen.getByText("First Item")).toBeInTheDocument();
    expect(screen.getByText("Second Item")).toBeInTheDocument();
    expect(screen.getByText("Nested First Item")).toBeInTheDocument();
    expect(screen.getByText("Nested Second Item")).toBeInTheDocument();
    expect(screen.getByText("Last Item")).toBeInTheDocument();
  });

  it("steps", () => {
    render(
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

    const lists = screen.getAllByRole("list");

    expect(lists[0].tagName).toBe("OL");
    expect(lists[1].tagName).toBe("OL");

    expect(screen.getByText("First Item")).toBeInTheDocument();
    expect(screen.getByText("Second Item")).toBeInTheDocument();
    expect(screen.getByText("Nested First Item")).toBeInTheDocument();
    expect(screen.getByText("Nested Second Item")).toBeInTheDocument();
    expect(screen.getByText("Last Item")).toBeInTheDocument();
  });

  it("with testId", () => {
    render(
      <List testId="my-list">
        <List.Item>First Item</List.Item>
        <List.Item>Second Item</List.Item>
        <List.Item>Third Item</List.Item>
      </List>
    );

    expect(screen.getByRole("list")).toHaveAttribute("data-testid", "my-list");
  });
});
