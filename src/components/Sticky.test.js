import React from "react";
import { getByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { Section, Container, Sticky, Header, Stepper, Text } from ".";
import { render } from "../utils/test";

describe("Sticky", () => {
  it("applies the right CSS to sticky items", () => {
    function MyStickyNav() {
      return (
        <Section>
          <Container height="120" height-lg="60">
            <Text>My Sticky Navigation</Text>
          </Container>
        </Section>
      );
    }

    MyStickyNav.ID = "MyStickyNav";
    MyStickyNav.HEIGHT_MAP = {
      default: 120,
      lg: 60,
    };

    const { container } = render(
      <Sticky testId="my-sticky">
        <Sticky.Item testId="my-header">
          <Header>
            <Header.Logo name="latitude" />
          </Header>
        </Sticky.Item>
        <Sticky.Item testId="my-stepper">
          <Stepper>
            <Stepper.Item label="Step 1" />
            <Stepper.Item label="Step 2" />
            <Stepper.Item label="Step 3" />
          </Stepper>
        </Sticky.Item>
        <Section>
          <Text>Hello World</Text>
        </Section>
        <Sticky.Item testId="my-sticky-nav">
          <MyStickyNav />
        </Sticky.Item>
      </Sticky>
    );
    const header = getByTestId(container, "my-header");
    const stepper = getByTestId(container, "my-stepper");
    const stickyNav = getByTestId(container, "my-sticky-nav");

    expect(header).toHaveStyle(`
      position: sticky;
      height: 56px;
      top: 0px;
    `);
    expect(stepper).toHaveStyle(`
      position: sticky;
      height: 100px;
      top: 56px;
    `);
    expect(stickyNav).toHaveStyle(`
      position: sticky;
      height: 120px;
      top: 156px;
    `);
  });

  it("with testId", () => {
    const { container } = render(
      <Sticky testId="my-sticky">
        <Sticky.Item testId="my-sticky-item">
          <Header>
            <Header.Logo name="latitude" />
          </Header>
        </Sticky.Item>
      </Sticky>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-sticky");
    getByTestId(container, "my-sticky-item");
  });
});
