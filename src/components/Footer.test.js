import React from "react";
import { getByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import Footer from "./Footer";
import Link from "./Link";
import { render } from "../utils/test";

describe("Footer", () => {
  it("with testId", () => {
    const { container } = render(
      <Footer testId="my-footer">
        <Footer.Header testId="my-footer-header">
          <Footer.Header.Logo name="latitude" testId="my-footer-header-logo" />
        </Footer.Header>
        <Footer.Legal testId="my-footer-legal">
          <Footer.Legal.Links testId="my-footer-legal-links">
            <Link href="#" newTab>
              Link 1
            </Link>
            <Link href="#" newTab>
              Link 2
            </Link>
            <Link href="#" newTab>
              Link 3
            </Link>
          </Footer.Legal.Links>
          <Footer.Legal.Copy testId="my-footer-legal-copy">
            Legal copy goes here.
          </Footer.Legal.Copy>
        </Footer.Legal>
      </Footer>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-footer");

    const footerHeader = getByTestId(container, "my-footer-header");
    getByTestId(footerHeader, "my-footer-header-logo");

    const footerLegal = getByTestId(container, "my-footer-legal");
    getByTestId(footerLegal, "my-footer-legal-links");
    getByTestId(footerLegal, "my-footer-legal-copy");
  });
});
