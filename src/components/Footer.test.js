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
          <Footer.Header.Social testId="my-footer-header-social">
            <Footer.Header.Social.Facebook
              href="https://www.facebook.com/latitudefinancialservices/"
              title="Latitude Financial Facebook"
              testId="my-footer-header-social-facebook"
            />
            <Footer.Header.Social.Twitter
              href="https://twitter.com/Latitude_FS/"
              title="Latitude Financial Twitter"
              testId="my-footer-header-social-twitter"
            />
            <Footer.Header.Social.Instagram
              href="https://www.instagram.com/Latitude_FS/"
              title="Latitude Financial Instagram"
              testId="my-footer-header-social-instagram"
            />
            <Footer.Header.Social.LinkedIn
              href="https://www.linkedin.com/company/latitude-financial-services/"
              title="Latitude Financial LinkedIn"
              testId="my-footer-header-social-linkedin"
            />
          </Footer.Header.Social>
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

    const footerHeaderSocial = getByTestId(
      footerHeader,
      "my-footer-header-social"
    );
    getByTestId(footerHeaderSocial, "my-footer-header-social-facebook");
    getByTestId(footerHeaderSocial, "my-footer-header-social-twitter");
    getByTestId(footerHeaderSocial, "my-footer-header-social-instagram");
    getByTestId(footerHeaderSocial, "my-footer-header-social-linkedin");

    const footerLegal = getByTestId(container, "my-footer-legal");
    getByTestId(footerLegal, "my-footer-legal-links");
    getByTestId(footerLegal, "my-footer-legal-copy");
  });
});
