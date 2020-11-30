import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, userEvent } from "../utils/test";
import Accordion from "./Accordion";
import Container from "./Container";
import Text from "./Text";

describe("Accordion", () => {
  it("default", () => {
    render(
      <Accordion>
        <Accordion.Item testId="accordion-item-1">
          <Accordion.Item.Header testId="accordion-item-1-header">
            Header 1
          </Accordion.Item.Header>
          <Accordion.Item.Content>
            <Text>Content 1</Text>
          </Accordion.Item.Content>
        </Accordion.Item>
        <Accordion.Item testId="accordion-item-2">
          <Accordion.Item.Header>Header 2</Accordion.Item.Header>
          <Accordion.Item.Content>
            <Text>Content 2</Text>
          </Accordion.Item.Content>
        </Accordion.Item>
        <Accordion.Item testId="accordion-item-3">
          <Accordion.Item.Header>Header 3</Accordion.Item.Header>
          <Accordion.Item.Content>
            <Text>Content 3</Text>
          </Accordion.Item.Content>
        </Accordion.Item>
      </Accordion>
    );

    const item1 = screen.getByTestId("accordion-item-1");
    const item1header = screen.getByTestId("accordion-item-1-header");
    const item1HeaderButton = item1header.querySelector("[aria-controls]");
    const item1Content = item1.querySelector(`[role="region"]`);
    const item2 = screen.getByTestId("accordion-item-2");
    const item3 = screen.getByTestId("accordion-item-3");

    expect(item1).not.toHaveStyle({
      marginTop: "4px",
    });
    expect(item1header.tagName).toBe("H3");
    expect(item1header).toHaveTextContent("Header 1");
    expect(item1HeaderButton).toHaveStyle({
      padding: "12px 16px 12px 24px",
      backgroundColor: "#ececec",
      color: "#000000",
    });
    expect(item1HeaderButton).toHaveAttribute("type", "button");
    expect(item1Content).toHaveTextContent("Content 1");
    expect(item1Content).toHaveStyle({
      textAlign: "left",
    });

    expect(item2).toHaveStyle({
      marginTop: "4px",
    });

    expect(item3).toHaveStyle({
      marginTop: "4px",
    });
  });

  it("aria attributes", () => {
    const { container } = render(
      <Accordion>
        <Accordion.Item>
          <Accordion.Item.Header>My header</Accordion.Item.Header>
          <Accordion.Item.Content>
            <Text>My content</Text>
          </Accordion.Item.Content>
        </Accordion.Item>
      </Accordion>
    );
    const itemHeaderButton = container.querySelector("[aria-controls]");
    const buttonId = itemHeaderButton.getAttribute("id");
    const ariaControls = itemHeaderButton.getAttribute("aria-controls");
    const content = container.querySelector(`[role="region"]`);

    expect(itemHeaderButton).toHaveAttribute("aria-expanded", "false");
    expect(content).toHaveAttribute("id", ariaControls);
    expect(content).toHaveAttribute("aria-labelledby", buttonId);
    expect(content).toHaveAttribute("hidden");
  });

  it("initiallyOpen", () => {
    const { container } = render(
      <Accordion>
        <Accordion.Item initiallyOpen>
          <Accordion.Item.Header>My header</Accordion.Item.Header>
          <Accordion.Item.Content>
            <Text>My content</Text>
          </Accordion.Item.Content>
        </Accordion.Item>
      </Accordion>
    );
    const itemHeaderButton = container.querySelector("[aria-controls]");
    const content = container.querySelector(`[role="region"]`);

    expect(itemHeaderButton).toHaveAttribute("aria-expanded", "true");
    expect(content).not.toHaveAttribute("hidden");
  });

  it("opening and closing", () => {
    const { container } = render(
      <Accordion>
        <Accordion.Item>
          <Accordion.Item.Header>My header</Accordion.Item.Header>
          <Accordion.Item.Content>
            <Text>My content</Text>
          </Accordion.Item.Content>
        </Accordion.Item>
      </Accordion>
    );
    const itemHeaderButton = container.querySelector("[aria-controls]");
    const content = container.querySelector(`[role="region"]`);

    // Open
    userEvent.click(itemHeaderButton);

    expect(itemHeaderButton).toHaveAttribute("aria-expanded", "true");
    expect(content).not.toHaveAttribute("hidden");

    // Close
    userEvent.click(itemHeaderButton);

    expect(itemHeaderButton).toHaveAttribute("aria-expanded", "false");
    expect(content).toHaveAttribute("hidden");
  });

  it("doesn't autoclose", () => {
    render(
      <Accordion>
        <Accordion.Item testId="accordion-item-1">
          <Accordion.Item.Header>Header 1</Accordion.Item.Header>
          <Accordion.Item.Content>
            <Text>Content 1</Text>
          </Accordion.Item.Content>
        </Accordion.Item>
        <Accordion.Item testId="accordion-item-2">
          <Accordion.Item.Header>Header 2</Accordion.Item.Header>
          <Accordion.Item.Content>
            <Text>Content 2</Text>
          </Accordion.Item.Content>
        </Accordion.Item>
      </Accordion>
    );

    const item1 = screen.getByTestId("accordion-item-1");
    const item2 = screen.getByTestId("accordion-item-2");
    const item1HeaderButton = item1.querySelector("[aria-controls]");
    const item2HeaderButton = item2.querySelector("[aria-controls]");

    // Open item 1
    userEvent.click(item1HeaderButton);

    // Open item 2
    userEvent.click(item2HeaderButton);

    expect(item1HeaderButton).toHaveAttribute("aria-expanded", "true");
  });

  it("with color", () => {
    render(
      <Accordion color="secondary.lightBlue.t25">
        <Accordion.Item>
          <Accordion.Item.Header>My header</Accordion.Item.Header>
        </Accordion.Item>
      </Accordion>
    );

    const headerButton = screen.getByRole("button", { name: /My header/ });

    expect(headerButton).toHaveStyle({
      backgroundColor: "#d8edff",
    });
  });

  it("with textColor", () => {
    render(
      <Accordion textColor="primary.blue.t100">
        <Accordion.Item>
          <Accordion.Item.Header>My header</Accordion.Item.Header>
        </Accordion.Item>
      </Accordion>
    );

    const headerButton = screen.getByRole("button", { name: /My header/ });

    expect(headerButton).toHaveStyle({
      color: "#0046aa",
    });
  });

  it("with itemHeaderAs", () => {
    render(
      <Accordion itemHeaderAs="h2">
        <Accordion.Item>
          <Accordion.Item.Header testId="my-accordion-item-header">
            My header
          </Accordion.Item.Header>
        </Accordion.Item>
      </Accordion>
    );

    const accordionItemHeader = screen.getByTestId("my-accordion-item-header");

    expect(accordionItemHeader.tagName).toBe("H2");
  });

  it("with itemGap", () => {
    render(
      <Accordion itemGap="small">
        <Accordion.Item testId="accordion-item-1">
          <Accordion.Item.Header>Header 1</Accordion.Item.Header>
        </Accordion.Item>
        <Accordion.Item testId="accordion-item-2">
          <Accordion.Item.Header>Header 2</Accordion.Item.Header>
        </Accordion.Item>
        <Accordion.Item testId="accordion-item-3">
          <Accordion.Item.Header>Header 3</Accordion.Item.Header>
        </Accordion.Item>
      </Accordion>
    );

    const item1 = screen.getByTestId("accordion-item-1");
    const item2 = screen.getByTestId("accordion-item-2");
    const item3 = screen.getByTestId("accordion-item-3");

    expect(item1).not.toHaveStyle({
      marginTop: "1px",
    });
    expect(item2).toHaveStyle({
      marginTop: "1px",
    });
    expect(item3).toHaveStyle({
      marginTop: "1px",
    });
  });

  it("with onItemToggle", () => {
    const onItemToggle = jest.fn();

    render(
      <Accordion onItemToggle={onItemToggle}>
        <Accordion.Item testId="accordion-item-1">
          <Accordion.Item.Header>Header 1</Accordion.Item.Header>
        </Accordion.Item>
        <Accordion.Item testId="accordion-item-2">
          <Accordion.Item.Header>
            <Accordion.Item.Header.Icon name="calculator" />
            Header with icon
          </Accordion.Item.Header>
        </Accordion.Item>
        <Accordion.Item testId="accordion-item-3">
          <Accordion.Item.Header>
            Header with dynamic number {5}
          </Accordion.Item.Header>
        </Accordion.Item>
      </Accordion>
    );

    const item1 = screen.getByTestId("accordion-item-1");
    const item2 = screen.getByTestId("accordion-item-2");
    const item3 = screen.getByTestId("accordion-item-3");
    const item1HeaderButton = item1.querySelector("[aria-controls]");
    const item2HeaderButton = item2.querySelector("[aria-controls]");
    const item3HeaderButton = item3.querySelector("[aria-controls]");

    // Open item 1
    userEvent.click(item1HeaderButton);

    expect(onItemToggle).toHaveBeenCalledTimes(1);
    expect(onItemToggle).toBeCalledWith({
      isOpen: true,
      itemHeaderChildren: "Header 1",
    });

    // Close item 1
    onItemToggle.mockClear();
    userEvent.click(item1HeaderButton);

    expect(onItemToggle).toHaveBeenCalledTimes(1);
    expect(onItemToggle).toBeCalledWith({
      isOpen: false,
      itemHeaderChildren: "Header 1",
    });

    // Open item 2
    userEvent.click(item2HeaderButton);

    expect(onItemToggle).toBeCalledWith({
      isOpen: true,
      itemHeaderChildren: [
        // eslint-disable-next-line react/jsx-key
        <Accordion.Item.Header.Icon name="calculator" />,
        "Header with icon",
      ],
    });

    // Open item 3
    userEvent.click(item3HeaderButton);

    expect(onItemToggle).toBeCalledWith({
      isOpen: true,
      itemHeaderChildren: ["Header with dynamic number ", 5],
    });
  });

  it("with custom content padding", () => {
    render(
      <Accordion>
        <Accordion.Item testId="accordion-item-1">
          <Accordion.Item.Header>Header 1</Accordion.Item.Header>
          <Accordion.Item.Content padding="0">
            <Text>Content 1</Text>
          </Accordion.Item.Content>
        </Accordion.Item>
      </Accordion>
    );

    const item1 = screen.getByTestId("accordion-item-1");
    const item1Content = item1.querySelector(`[role="region"]`);

    expect(item1Content).toHaveStyle({
      padding: 0,
    });
  });

  it("inside dark container", () => {
    render(
      <Container bg="grey.t07">
        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header>Header 1</Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>Content 1</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>
      </Container>
    );

    const headerButton = screen.getByRole("button", { name: /Header 1/ });

    expect(headerButton).toHaveStyle({
      backgroundColor: "#ffffff",
      color: "#000000",
    });
  });

  it("inside nested container", () => {
    render(
      <Container bg="grey.t07">
        <Container>
          <Accordion>
            <Accordion.Item>
              <Accordion.Item.Header>Header 1</Accordion.Item.Header>
              <Accordion.Item.Content>
                <Text>Content 1</Text>
              </Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
        </Container>
      </Container>
    );

    const headerButton = screen.getByRole("button", { name: /Header 1/ });

    expect(headerButton).toHaveStyle({
      backgroundColor: "#ffffff",
      color: "#000000",
    });
  });

  it("with testId", () => {
    const { container } = render(
      <Accordion testId="my-accordion">
        <Accordion.Item>
          <Accordion.Item.Header>No icon</Accordion.Item.Header>
          <Accordion.Item.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
              massa.
            </Text>
          </Accordion.Item.Content>
        </Accordion.Item>
        <Accordion.Item testId="my-accordion-item">
          <Accordion.Item.Header testId="my-accordion-item-header">
            <Accordion.Item.Header.Icon
              name="calculator"
              testId="my-accordion-item-header-icon"
            />
            With icon
          </Accordion.Item.Header>
          <Accordion.Item.Content testId="my-accordion-item-content">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
              massa.
            </Text>
          </Accordion.Item.Content>
        </Accordion.Item>
        <Accordion.Item initiallyOpen>
          <Accordion.Item.Header>Initially open</Accordion.Item.Header>
          <Accordion.Item.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
              massa.
            </Text>
          </Accordion.Item.Content>
        </Accordion.Item>
      </Accordion>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-accordion");
    expect(screen.getByTestId("my-accordion-item")).toBeInTheDocument();
    expect(screen.getByTestId("my-accordion-item-header")).toBeInTheDocument();
    expect(screen.getByTestId("my-accordion-item-content")).toBeInTheDocument();
    expect(
      screen.getByTestId("my-accordion-item-header-icon")
    ).toBeInTheDocument();
  });
});
