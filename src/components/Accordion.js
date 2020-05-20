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
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
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
  const { colorMap, textColor, itemHeaderAs: HeaderComponent } = useAccordion();
  const responsiveCSS = useResponsivePropsCSS(
    {},
    {},
    {
      backgroundColor: (propsAtBreakpoint, theme, bp) => {
        return {
          backgroundColor: theme.getColor(colorMap[bp]),
        };
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
  }, [toggleAccordionItem]);

  return (
    <HeaderComponent css={theme.accordionHeader} data-testid={testId}>
      <button
        id={headerId}
        css={{
          ...theme.accordionHeaderButton,
          ...(__internal__keyboardFocus && theme.focusStyles.__keyboardFocus),
          ...responsiveCSS,
          color: theme.getColor(textColor),
        }}
        type="button"
        aria-controls={contentId}
        aria-expanded={isOpen ? "true" : "false"}
        onClick={onClick}
      >
        <div css={theme.accordionHeaderContent}>{children}</div>
        <div
          css={{
            ...theme.accordionHeaderChevron,
            ...(isOpen && theme["accordionHeaderChevron.open"]),
          }}
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
    <div css={theme.accordionHeaderIcon} data-testid={testId}>
      <Icon name={name} color={textColor} />
    </div>
  );
}

HeaderIcon.propTypes = {
  name: PropTypes.oneOf(Icon.NAMES).isRequired,
  testId: PropTypes.string,
};

function Content({ children, testId }) {
  const theme = useTheme();
  const { colorMap } = useAccordion();
  const bgMap = mapResponsiveValues(
    colorMap,
    (headerColor) => {
      return headerColor === "grey.t07"
        ? "grey.t03"
        : headerColor === "secondary.lightBlue.t25"
        ? "secondary.lightBlue.t15"
        : "white";
    },
    theme
  );
  const responsiveCSS = useResponsivePropsCSS(
    {},
    {},
    {
      backgroundColor: (propsAtBreakpoint, theme, bp) => {
        return {
          backgroundColor: theme.getColor(bgMap[bp]),
        };
      },
    }
  );
  const { headerId, contentId, isOpen } = useAccordionItem();

  return (
    <BackgroundProvider value={bgMap}>
      <div
        id={contentId}
        css={{
          ...theme.accordionContent,
          ...responsiveCSS,
        }}
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
      <div css={theme[`accordionItem.${itemGap}`]} data-testid={testId}>
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
    }),
    [colorMap, textColor, itemGap, itemHeaderAs]
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
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

Header.Icon = HeaderIcon;
Item.Header = Header;
Item.Content = Content;
Accordion.Item = Item;

export default Accordion;
