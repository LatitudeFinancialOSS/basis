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

const VARIANTS = [
  "light-bg",
  "medium-bg",
  "dark-bg",
  "icon",
  "primary-blue-button",
  "primary-green-button",
  "secondary-blue-button",
];

const DEFAULT_PROPS = {
  variant: "light-bg",
  __internal__keyboardFocus: false,
  __internal__hover: false,
  __internal__active: false,
};

Link.VARIANTS = VARIANTS;
Link.DEFAULT_PROPS = DEFAULT_PROPS;

function Link(props) {
  const theme = useTheme();
  const { bgMap } = useBackground();
  const variantMap = mapResponsiveValues(
    bgMap,
    (backgroundColor) => {
      return backgroundColor === "primary.blue.t100"
        ? "dark-bg"
        : [
            "grey.t07",
            "secondary.lightBlue.t15",
            "secondary.lightBlue.t25",
          ].includes(backgroundColor)
        ? "medium-bg"
        : "light-bg";
    },
    theme
  );
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      variant: (variant) => VARIANTS.includes(variant),
      newTab: (newTab) => typeof newTab === "boolean",
    }
  );
  const {
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
  const { InternalLink, isLinkInternal } = useContext(LinkContext);
  const css = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    variant: (propsAtBreakpoint, theme, bp) => {
      const variant = props.variant ?? variantMap[bp];

      return theme.link.getCSS({
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
  variant: (props) => {
    if (props.variant === undefined) {
      for (const prop in props) {
        if (prop.startsWith("width")) {
          return new Error(
            `Link: ${prop} should be used only with these variants: ${[
              "primary-blue-button",
              "primary-green-button",
              "secondary-blue-button",
            ]
              .map((v) => `"${v}"`)
              .join(", ")}`
          );
        }
      }
    } else {
      if (VARIANTS.includes(props.variant) === false) {
        return new Error(
          `Link: variant="${
            props.variant
          }" is not supported. Must be one of: ${VARIANTS.map(
            (v) => `"${v}"`
          ).join(", ")}`
        );
      }
    }
  },
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
