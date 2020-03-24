import React from "react";
import { theme } from "./test";
import { getStickyItemInfo } from "./sticky";
import { Text } from "..";

describe("getStickyItemInfo", () => {
  it("empty item", () => {
    expect(() => getStickyItemInfo(undefined, theme)).toThrowError(
      /cannot be empty/
    );
  });

  it("multiple children", () => {
    expect(() =>
      getStickyItemInfo(
        [<Text key="0">Hello</Text>, <Text key="1">World</Text>],
        theme
      )
    ).toThrowError(/must have a single child/);
  });

  it("doesn't expose an ID", () => {
    expect(() => getStickyItemInfo(<Text>Hello</Text>, theme)).toThrowError(
      /must expose a unique ID/
    );
  });

  it("doesn't expose a HEIGHT_MAP object", () => {
    function HeroText(children) {
      return <Text textStyle="hero">{children}</Text>;
    }

    HeroText.ID = "HeroText";

    expect(() =>
      getStickyItemInfo(<HeroText>Hello</HeroText>, theme)
    ).toThrowError(/must expose a HEIGHT_MAP object/);
  });

  it("HEIGHT_MAP doesn't have a default height", () => {
    function HeroText(children) {
      return <Text textStyle="hero">{children}</Text>;
    }

    HeroText.ID = "HeroText";
    HeroText.HEIGHT_MAP = {};

    expect(() =>
      getStickyItemInfo(<HeroText>Hello</HeroText>, theme)
    ).toThrowError(/the object is missing a `default` property/);
  });

  it("HEIGHT_MAP default height is invalid", () => {
    function HeroText(children) {
      return <Text textStyle="hero">{children}</Text>;
    }

    HeroText.ID = "HeroText";
    HeroText.HEIGHT_MAP = {
      default: "80", // must be a number
    };

    expect(() =>
      getStickyItemInfo(<HeroText>Hello</HeroText>, theme)
    ).toThrowError(/object's `default` value is not a positive integer/);
  });

  it("HEIGHT_MAP breakpoint height is invalid", () => {
    function HeroText(children) {
      return <Text textStyle="hero">{children}</Text>;
    }

    HeroText.ID = "HeroText";
    HeroText.HEIGHT_MAP = {
      default: 80,
      lg: "100", // must be a number
    };

    expect(() =>
      getStickyItemInfo(<HeroText>Hello</HeroText>, theme)
    ).toThrowError(/object's `lg` value is not a positive integer/);
  });

  it("ID and HEIGHT_MAP are valid", () => {
    function HeroText(children) {
      return <Text textStyle="hero">{children}</Text>;
    }

    HeroText.ID = "HeroText";
    HeroText.HEIGHT_MAP = {
      default: 80,
      md: 100,
      xl: 120,
    };

    expect(getStickyItemInfo(<HeroText>Hello</HeroText>, theme)).toStrictEqual({
      id: "HeroText",
      heightMap: {
        default: 80,
        xs: 80,
        sm: 80,
        md: 100,
        lg: 100,
        xl: 120,
      },
    });
  });
});
