import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LinkContext } from "../providers/LinkProvider";
import useTheme from "../hooks/useTheme";
import useBackground, { mapResponsiveValues } from "../hooks/useBackground";
import {
  responsiveMarginType,
  responsivePaddingType,
  responsiveWidthType,
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import {
  responsiveMargin,
  responsivePadding,
  responsiveSize,
} from "../utils/css";
import { mergeProps } from "../utils/component";
import { formatArray } from "../utils/array";

const APPEARANCES = ["text", "primary-button", "secondary-button", "icon"];
const VARIANTS = [
  "light-bg",
  "medium-bg",
  "dark-bg",
  "blue-button",
  "white-button",
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

const DARK_BACKGROUNDS = ["primary.blue.t100", "highlight.pink.t100"];
const MEDIUM_BACKGROUNDS = [
  "grey.t07",
  "secondary.lightBlue.t15",
  "secondary.lightBlue.t25",
];

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
    analyticsClassName,
    __internal__keyboardFocus,
    __internal__hover,
    __internal__active,
  } = mergedProps;
  const variantMap = mapResponsiveValues(
    bgMap,
    (backgroundColor) => {
      const isDarkBackground = DARK_BACKGROUNDS.includes(backgroundColor);
      const isMediumBackground = MEDIUM_BACKGROUNDS.includes(backgroundColor);

      if (appearance === "text") {
        return isDarkBackground
          ? "dark-bg"
          : isMediumBackground
          ? "medium-bg"
          : "light-bg";
      }

      if (["primary-button", "secondary-button"].includes(appearance)) {
        return isDarkBackground ? "white-button" : "blue-button";
      }

      return null;
    },
    theme
  );
  const { InternalLink, isLinkInternal } = useContext(LinkContext);
  const css = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    variant: (_, theme, bp) => {
      const variant = props.variant ?? variantMap[bp];
      const appearance =
        props.appearance ??
        (["blue-button", "white-button", "green-button"].includes(variant)
          ? "primary-button"
          : "text");

      return theme.link.getCSS({
        appearance,
        variant,
        buttonTheme: theme.button,
        __internal__keyboardFocus,
        __internal__hover,
        __internal__active,
      });
    },
    margin: responsiveMargin,
    padding: responsivePadding,
    width: responsiveSize("width"),
  });

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
          * className
          * title
          * onClick
          * data-testid
          * children

      Example: Gatsby `Link` component.
    */
    return (
      <InternalLink
        className={analyticsClassName}
        css={css}
        to={href}
        title={title}
        state={state}
        onClick={onClick}
        data-testid={testId}
      >
        {children}
      </InternalLink>
    );
  }

  return (
    <a
      className={analyticsClassName}
      css={css}
      href={href}
      title={title}
      onClick={onClick}
      data-testid={testId}
      {...newTabProps}
    >
      {children}
    </a>
  );
}

Link.propTypes = {
  ...responsiveMarginType,
  ...responsivePaddingType,
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

    const isButtonAppearance = ["primary-button", "secondary-button"].includes(
      props.appearance
    );
    const isTextVariant = ["light-bg", "medium-bg", "dark-bg"];
    const isButtonVariant = ["blue-button", "white-button", "green-button"];

    if (isButtonAppearance && !isButtonVariant) {
      return new Error(
        `Link: appearance="${
          props.appearance
        }" should be used only with these variants: ${formatArray([
          "blue-button",
          "white-button",
          "green-button",
        ])}`
      );
    }

    if (props.appearance === "text" && !isTextVariant) {
      return new Error(
        `Link: appearance="text" should be used only with these variants: ${formatArray(
          ["light-bg", "medium-bg", "dark-bg"]
        )}`
      );
    }

    if (!isButtonAppearance) {
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
  analyticsClassName: PropTypes.string,
  __internal__keyboardFocus: PropTypes.bool,
  __internal__hover: PropTypes.bool,
  __internal__active: PropTypes.bool,
};

export default Link;
