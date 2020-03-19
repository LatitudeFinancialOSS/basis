import React from "react";
import { theme } from "./test";
import { getStickyItemHeightMap, getStickyItemsCSS } from "./sticky";
import { Sticky, Text } from "..";

describe("getStickyItemHeightMap", () => {
  it("empty item", () => {
    expect(() =>
      getStickyItemHeightMap(<Sticky.Item></Sticky.Item>, theme)
    ).toThrowError(/cannot be empty/);
  });

  it("multiple children", () => {
    expect(() =>
      getStickyItemHeightMap(
        <Sticky.Item>
          <Text>Hello</Text>
          <Text>World</Text>
        </Sticky.Item>,
        theme
      )
    ).toThrowError(/must have a single child/);
  });

  it("doesn't expose a HEIGHT_MAP object", () => {
    expect(() =>
      getStickyItemHeightMap(
        <Sticky.Item>
          <Text>Hello</Text>
        </Sticky.Item>,
        theme
      )
    ).toThrowError(/must expose a HEIGHT_MAP object/);
  });

  it("HEIGHT_MAP doesn't have a default height", () => {
    function HeroText(children) {
      return <Text textStyle="hero">{children}</Text>;
    }

    HeroText.HEIGHT_MAP = {};

    expect(() =>
      getStickyItemHeightMap(
        <Sticky.Item>
          <HeroText>Hello</HeroText>
        </Sticky.Item>,
        theme
      )
    ).toThrowError(/the object is missing a `default` property/);
  });

  it("HEIGHT_MAP default height is invalid", () => {
    function HeroText(children) {
      return <Text textStyle="hero">{children}</Text>;
    }

    HeroText.HEIGHT_MAP = {
      default: "80" // must be a number
    };

    expect(() =>
      getStickyItemHeightMap(
        <Sticky.Item>
          <HeroText>Hello</HeroText>
        </Sticky.Item>,
        theme
      )
    ).toThrowError(/object's `default` value is not a positive integer/);
  });

  it("HEIGHT_MAP breakpoint height is invalid", () => {
    function HeroText(children) {
      return <Text textStyle="hero">{children}</Text>;
    }

    HeroText.HEIGHT_MAP = {
      default: 80,
      lg: "100" // must be a number
    };

    expect(() =>
      getStickyItemHeightMap(
        <Sticky.Item>
          <HeroText>Hello</HeroText>
        </Sticky.Item>,
        theme
      )
    ).toThrowError(/object's `lg` value is not a positive integer/);
  });

  it("HEIGHT_MAP is valid", () => {
    function HeroText(children) {
      return <Text textStyle="hero">{children}</Text>;
    }

    HeroText.HEIGHT_MAP = {
      default: 80,
      md: 100,
      xl: 120
    };

    expect(
      getStickyItemHeightMap(
        <Sticky.Item>
          <HeroText>Hello</HeroText>
        </Sticky.Item>,
        theme
      )
    ).toStrictEqual({
      default: 80,
      xs: 80,
      sm: 80,
      md: 100,
      lg: 100,
      xl: 120
    });
  });
});

describe("getStickyItemsCSS", () => {
  it("calculates CSS for all items", () => {
    expect(
      getStickyItemsCSS(
        [
          {
            default: 80,
            xs: 80,
            sm: 80,
            md: 100,
            lg: 100,
            xl: 120
          },
          {
            default: 20,
            xs: 40,
            sm: 60,
            md: 20,
            lg: 20,
            xl: 120
          },
          {
            default: 120,
            xs: 80,
            sm: 80,
            md: 80,
            lg: 40,
            xl: 60
          }
        ],
        theme
      )
    ).toStrictEqual([
      {
        height: "80px",
        position: "sticky",
        top: "0px",
        "@media (min-width: 768px)": { height: "100px" },
        "@media (min-width: 1200px)": { height: "120px" }
      },
      {
        height: "20px",
        position: "sticky",
        top: "80px",
        "@media (min-width: 375px)": { height: "40px" },
        "@media (min-width: 576px)": { height: "60px" },
        "@media (min-width: 768px)": { height: "20px", top: "100px" },
        "@media (min-width: 1200px)": { height: "120px", top: "120px" }
      },
      {
        height: "120px",
        position: "sticky",
        top: "100px",
        "@media (min-width: 375px)": { height: "80px", top: "120px" },
        "@media (min-width: 576px)": { top: "140px" },
        "@media (min-width: 768px)": { top: "120px" },
        "@media (min-width: 992px)": { height: "40px" },
        "@media (min-width: 1200px)": { height: "60px", top: "240px" }
      }
    ]);
  });
});
