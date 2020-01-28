import React from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Footer from "./Footer";
import Link from "./Link";

describe("Footer", () => {
  it("with testId", () => {
    const { container } = render(
      <Footer testId="my-footer">
        <Footer.Header>
          <Footer.Header.Logo name="latitude" />
        </Footer.Header>
        <Footer.Legal>
          <Footer.Legal.Links>
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
          <Footer.Legal.Copy>Legal copy goes here.</Footer.Legal.Copy>
        </Footer.Legal>
      </Footer>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-footer");
  });
});
