import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "./Footer";
import Link from "./Link";
import { render, screen } from "../utils/test";

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
            <Footer.Header.Social.YouTube
              href="https://www.youtube.com/channel/UC4OODvUJswoDRTS_xFCCXcw/"
              title="Latitude Financial YouTube"
              testId="my-footer-header-social-youtube"
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
        <Footer.Links testId="my-footer-links">
          <Footer.Links.Section title="Section 1" testId="my-footer-section-1">
            <Link href="#" newTab>
              Link 1
            </Link>
            <Link href="#" newTab>
              Link 2
            </Link>
            <Link href="#" newTab>
              Link 3
            </Link>
            <Link href="#" newTab>
              Link 4
            </Link>
          </Footer.Links.Section>
          <Footer.Links.Section title="Section 2" testId="my-footer-section-2">
            <Link href="#" newTab>
              Link 5
            </Link>
            <Link href="#" newTab>
              Link 6
            </Link>
            <Link href="#" newTab>
              Link 7
            </Link>
            <Link href="#" newTab>
              Link 8
            </Link>
          </Footer.Links.Section>
        </Footer.Links>
        <Footer.Legal testId="my-footer-legal">
          <Footer.Legal.Links testId="my-footer-legal-links">
            <Link href="#" newTab>
              Link 9
            </Link>
            <Link href="#" newTab>
              Link 10
            </Link>
            <Link href="#" newTab>
              Link 11
            </Link>
          </Footer.Legal.Links>
          <Footer.Legal.Copy testId="my-footer-legal-copy">
            Legal copy goes here.
          </Footer.Legal.Copy>
        </Footer.Legal>
      </Footer>
    );

    expect(container.querySelector("footer")).toHaveAttribute(
      "data-testid",
      "my-footer"
    );

    expect(screen.getByTestId("my-footer-header")).toBeInTheDocument();
    expect(screen.getByTestId("my-footer-header-logo")).toBeInTheDocument();

    expect(screen.getByTestId("my-footer-header-social")).toBeInTheDocument();
    expect(
      screen.getByTestId("my-footer-header-social-facebook")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("my-footer-header-social-youtube")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("my-footer-header-social-twitter")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("my-footer-header-social-instagram")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("my-footer-header-social-linkedin")
    ).toBeInTheDocument();

    expect(screen.getByTestId("my-footer-links")).toBeInTheDocument();
    expect(screen.getByTestId("my-footer-section-1")).toBeInTheDocument();
    expect(screen.getByTestId("my-footer-section-2")).toBeInTheDocument();

    expect(screen.getByTestId("my-footer-legal")).toBeInTheDocument();
    expect(screen.getByTestId("my-footer-legal-links")).toBeInTheDocument();
    expect(screen.getByTestId("my-footer-legal-copy")).toBeInTheDocument();
  });
});
