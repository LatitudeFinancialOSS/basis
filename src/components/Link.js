import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LinkContext } from "../providers/LinkProvider";
import useTheme from "../hooks/useTheme";
import useBackground, { mapResponsiveValues } from "../hooks/useBackground";
import {
  responsiveMarginType,
  responsiveWidthType,
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsiveMargin, responsiveSize } from "../utils/css";
import { mergeProps } from "../utils/component";
import { formatArray } from "../utils/array";
import { hasOwnProperty } from "../utils/core";

const APPEARANCES = ["text", "primary-button", "secondary-button", "icon"];
const VARIANTS = [
  "light-bg",
  "medium-bg",
  "dark-bg",
  "blue-button",
  "white-button",
  "black-button",
  "green-button",
];

const DEFAULT_PROPS = {
  appearance: "text",
  variant: "light-bg",
  __internal__keyboardFocus: false,
  __internal__hover: false,
  __internal__active: false,
};

Link.APPEARANCES = APPEARANCES;
Link.VARIANTS = VARIANTS;
Link.DEFAULT_PROPS = DEFAULT_PROPS;

const darkColorsMap = {
  "primary.blue.t100": true,
  "highlight.blue.t100": true,
  "highlight.pink.t100": true,
  "highlight.purple.t100": true,
};
const mediumColorsMap = {
  "grey.t07": true,
  "grey.t10": true,
  "grey.t16": true,
  "secondary.lightBlue.t25": true,
  "secondary.pink.t30": true,
  "secondary.pink.t15": true,
  "secondary.purple.t30": true,
  "secondary.purple.t15": true,
  "secondary.turquoise.t30": true,
  "secondary.turquoise.t10": true,
};

function Link(props) {
  const theme = useTheme();
  const { bgMap } = useBackground();
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      appearance: (appearance) => APPEARANCES.includes(appearance),
      variant: (variant) => VARIANTS.includes(variant),
      newTab: (newTab) => typeof newTab === "boolean",
      title: (title) => typeof title === "string",
    }
  );
  const {
    appearance,
    href,
    newTab,
    title,
    state,
    onClick,
    children,
    testId,
    __internal__keyboardFocus,
    __internal__hover,
    __internal__active,
  } = mergedProps;
  const variantMap = mapResponsiveValues(
    bgMap,
    (backgroundColor) => {
      const isDarkBackground = darkColorsMap[backgroundColor] === true;
      const isMediumBackground = mediumColorsMap[backgroundColor] === true;

      if (appearance === "text") {
        return isDarkBackground
          ? "dark-bg"
          : isMediumBackground
          ? "medium-bg"
          : "light-bg";
      }

      if (appearance === "primary-button") {
        return isDarkBackground ? "white-button" : "blue-button";
      }

      if (appearance === "secondary-button") {
        return isDarkBackground
          ? "white-button"
          : isMediumBackground
          ? "black-button"
          : "blue-button";
      }

      return null;
    },
    theme
  );
  const anchorCSS = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    variant: (_, theme) => {
      const { appearance } = mergedProps;

      return theme.link.getCSS({
        targetElement: "anchor",
        appearance,
        __internal__keyboardFocus,
      });
    },
    margin: responsiveMargin,
    width: responsiveSize("width"),
  });
  const spanCSS = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    variant: (_, theme, bp) => {
      const { appearance } = mergedProps;
      const variant = hasOwnProperty(props, "variant")
        ? mergedProps.variant
        : variantMap[bp];

      return theme.link.getCSS({
        targetElement: "span",
        appearance,
        variant,
        buttonTheme: theme.button,
        __internal__keyboardFocus,
        __internal__hover,
        __internal__active,
      });
    },
  });

  const { InternalLink, isLinkInternal } = useContext(LinkContext);
  const newTabProps = newTab
    ? {
        target: "_blank",
        rel: "noreferrer", // See: https://developers.google.com/web/tools/lighthouse/audits/noopener, https://html.spec.whatwg.org/multipage/links.html#link-type-noreferrer
      }
    : {};

  if (!newTab && InternalLink && isLinkInternal(href)) {
    /*
      Note: We assume here that InternalLink respects the following contract:

        - It gets a `state` prop
        - It gets a `to` prop, which gets mapped to <a>'s `href` prop.
        - It gets the following props and sets them on the rendered <a>:
          * title
          * onClick
          * data-testid
          * children

      Example: Gatsby `Link` component.
    */
    return (
      <InternalLink
        css={anchorCSS}
        to={href}
        title={title}
        state={state}
        onClick={onClick}
        data-testid={testId}
      >
        <span css={spanCSS}>{children}</span>
      </InternalLink>
    );
  }

  return (
    <a
      css={anchorCSS}
      href={href}
      title={title}
      onClick={onClick}
      data-testid={testId}
      {...newTabProps}
    >
      <span css={spanCSS}>{children}</span>
    </a>
  );
}

Link.propTypes = {
  ...responsiveMarginType,
  ...responsiveWidthType,
  appearance: (props) => {
    if (props.appearance === undefined) {
      return;
    }

    if (APPEARANCES.includes(props.appearance) === false) {
      return new Error(
        `Link: appearance="${
          props.appearance
        }" is not supported. Must be one of: ${formatArray(APPEARANCES)}`
      );
    }

    if (
      props.appearance === "text" &&
      props.variant &&
      ["light-bg", "medium-bg", "dark-bg"].includes(props.variant) === false
    ) {
      return new Error(
        `Link: appearance="text" should be used only with these variants: ${formatArray(
          ["light-bg", "medium-bg", "dark-bg"]
        )}`
      );
    }

    if (
      props.appearance === "primary-button" &&
      props.variant &&
      ["blue-button", "white-button", "green-button"].includes(
        props.variant
      ) === false
    ) {
      return new Error(
        `Link: appearance="primary-button" should be used only with these variants: ${formatArray(
          ["blue-button", "white-button", "green-button"]
        )}`
      );
    }

    if (
      props.appearance === "secondary-button" &&
      props.variant &&
      ["blue-button", "white-button", "black-button"].includes(
        props.variant
      ) === false
    ) {
      return new Error(
        `Link: appearance="secondary-button" should be used only with these variants: ${formatArray(
          ["blue-button", "white-button", "black-button"]
        )}`
      );
    }

    if (
      ["primary-button", "secondary-button"].includes(props.appearance) ===
      false
    ) {
      for (const prop in props) {
        if (prop.startsWith("width")) {
          return new Error(
            `Link: ${prop} should be used only with these appearances: ${formatArray(
              ["primary-button", "secondary-button"]
            )}`
          );
        }
      }
    }
  },
  variant: PropTypes.oneOf(VARIANTS),
  href: PropTypes.string.isRequired,
  newTab: PropTypes.bool.isRequired,
  title: PropTypes.string,
  state: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node,
  testId: PropTypes.string,
  __internal__keyboardFocus: PropTypes.bool,
  __internal__hover: PropTypes.bool,
  __internal__active: PropTypes.bool,
};

export default Link;
