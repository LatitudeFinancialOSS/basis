import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import useTheme from "../hooks/useTheme";
import useBackground, {
  BackgroundProvider,
  mapResponsiveValues,
} from "../hooks/useBackground";
import useAccordion, { AccordionProvider } from "../hooks/useAccordion";
import useAccordionItem, {
  AccordionItemProvider,
} from "../hooks/useAccordionItem";
import { responsivePaddingType } from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsivePadding } from "../utils/css";
import { mergeProps } from "../utils/component";
import { hasOwnProperty } from "../utils/core";
import Icon from "./Icon";

const COLORS = ["grey.t07", "secondary.lightBlue.t25", "white"];
const TEXT_COLORS = ["black", "primary.blue.t100"];
const ITEM_GAP = ["small", "large"];
const ITEM_HEADER_AS = ["h2", "h3", "h4", "h5", "h6"];

const DEFAULT_PROPS = {
  color: "grey.t07",
  textColor: "black",
  itemHeaderAs: "h3",
  itemGap: "large",
};

Accordion.COLORS = COLORS;
Accordion.TEXT_COLORS = TEXT_COLORS;
Accordion.ITEM_GAP = ITEM_GAP;
Accordion.ITEM_HEADER_AS = ITEM_HEADER_AS;
Accordion.DEFAULT_PROPS = DEFAULT_PROPS;

function Header({ children, testId, __internal__keyboardFocus = false }) {
  const theme = useTheme();
  const {
    colorMap,
    textColor,
    itemHeaderAs: HeaderComponent,
    onItemToggle,
  } = useAccordion();
  const buttonCSS = useResponsivePropsCSS(
    {},
    {},
    {
      backgroundColor: (propsAtBreakpoint, theme, bp) => {
        return theme.accordion.getCSS({
          targetElement: "headerButton",
          color: colorMap[bp],
          textColor,
          __internal__keyboardFocus,
        });
      },
    }
  );
  const {
    headerId,
    contentId,
    isOpen,
    toggleAccordionItem,
  } = useAccordionItem();
  const onClick = useCallback(() => {
    toggleAccordionItem();
    onItemToggle &&
      onItemToggle({ isOpen: !isOpen, itemHeaderChildren: children });
  }, [toggleAccordionItem, onItemToggle, isOpen, children]);

  return (
    <HeaderComponent
      css={theme.accordion.getCSS({ targetElement: "headerContainer" })}
      data-testid={testId}
    >
      <button
        id={headerId}
        css={buttonCSS}
        type="button"
        aria-controls={contentId}
        aria-expanded={isOpen ? "true" : "false"}
        onClick={onClick}
      >
        <div css={theme.accordion.getCSS({ targetElement: "headerContent" })}>
          {children}
        </div>
        <div
          css={theme.accordion.getCSS({
            targetElement: "headerChevron",
            isOpen,
          })}
        >
          <Icon name="chevron-down" color={textColor} />
        </div>
      </button>
    </HeaderComponent>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
  __internal__keyboardFocus: PropTypes.bool,
};

function HeaderIcon({ name, testId }) {
  const theme = useTheme();
  const { textColor } = useAccordion();

  return (
    <div
      css={theme.accordion.getCSS({ targetElement: "headerIcon" })}
      data-testid={testId}
    >
      <Icon name={name} color={textColor} />
    </div>
  );
}

HeaderIcon.propTypes = {
  name: PropTypes.oneOf(Icon.NAMES).isRequired,
  testId: PropTypes.string,
};

function Content(props) {
  const { children, testId } = props;
  const theme = useTheme();
  const { colorMap } = useAccordion();
  const bgMap = mapResponsiveValues(
    colorMap,
    theme.accordion.getContentColor,
    theme
  );
  const css = useResponsivePropsCSS(
    props,
    {},
    {
      backgroundColor: (propsAtBreakpoint, theme, bp) => {
        return theme.accordion.getCSS({
          targetElement: "content",
          color: colorMap[bp],
        });
      },
      /* 
        Note: 
          `padding` needs to come after `backgroundColor` because 
          `backgroundColor` sets a default padding and we want to
          allow users to override it.
      */
      padding: responsivePadding,
    }
  );
  const { headerId, contentId, isOpen } = useAccordionItem();

  return (
    <BackgroundProvider value={bgMap}>
      <div
        id={contentId}
        css={css}
        role="region"
        aria-labelledby={headerId}
        hidden={!isOpen}
        data-testid={testId}
      >
        {children}
      </div>
    </BackgroundProvider>
  );
}

Content.propTypes = {
  ...responsivePaddingType,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

const DEFAULT_ITEM_PROPS = {
  initiallyOpen: false,
};

Item.DEFAULT_PROPS = DEFAULT_ITEM_PROPS;

function Item(props) {
  const theme = useTheme();
  const { itemGap } = useAccordion();
  const [headerId] = useState(() => `accordion-item-header-${nanoid()}`);
  const [contentId] = useState(() => `accordion-item-content-${nanoid()}`);
  const mergedProps = mergeProps(
    props,
    DEFAULT_ITEM_PROPS,
    {},
    {
      initiallyOpen: (initiallyOpen) => typeof initiallyOpen === "boolean",
    }
  );
  const { initiallyOpen, children, testId } = mergedProps;
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const toggleAccordionItem = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);
  const accordionItemInfo = useMemo(
    () => ({
      headerId,
      contentId,
      isOpen,
      toggleAccordionItem,
    }),
    [headerId, contentId, isOpen, toggleAccordionItem]
  );

  return (
    <AccordionItemProvider value={accordionItemInfo}>
      <div
        css={theme.accordion.getCSS({ targetElement: "item", itemGap })}
        data-testid={testId}
      >
        {children}
      </div>
    </AccordionItemProvider>
  );
}

Item.propTypes = {
  initiallyOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

function Accordion(props) {
  const theme = useTheme();
  const { bgMap } = useBackground();
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      color: (color) => COLORS.includes(color),
      textColor: (textColor) => TEXT_COLORS.includes(textColor),
      itemGap: (itemGap) => ITEM_GAP.includes(itemGap),
      itemHeaderAs: (itemHeaderAs) => ITEM_HEADER_AS.includes(itemHeaderAs),
    }
  );
  const {
    color,
    textColor,
    itemHeaderAs,
    itemGap,
    onItemToggle,
    children,
    testId,
  } = mergedProps;
  const colorMap =
    hasOwnProperty(props, "color") && hasOwnProperty(mergedProps, "color")
      ? mapResponsiveValues(bgMap, () => color, theme)
      : mapResponsiveValues(
          bgMap,
          (backgroundColor) => {
            return [undefined, "transparent", "white"].includes(backgroundColor)
              ? DEFAULT_PROPS.color
              : "white";
          },
          theme
        );
  const accordionInfo = useMemo(
    () => ({
      colorMap,
      textColor,
      itemGap,
      itemHeaderAs,
      onItemToggle,
    }),
    [colorMap, textColor, itemGap, itemHeaderAs, onItemToggle]
  );

  return (
    <AccordionProvider value={accordionInfo}>
      <div data-testid={testId}>{children}</div>
    </AccordionProvider>
  );
}

Accordion.propTypes = {
  color: PropTypes.oneOf(COLORS),
  textColor: PropTypes.oneOf(TEXT_COLORS),
  itemGap: PropTypes.oneOf(ITEM_GAP),
  itemHeaderAs: PropTypes.oneOf(ITEM_HEADER_AS),
  onItemToggle: PropTypes.func,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

Header.Icon = HeaderIcon;
Item.Header = Header;
Item.Content = Content;
Accordion.Item = Item;

export default Accordion;
