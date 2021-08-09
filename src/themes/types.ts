import { CSSObject } from "@emotion/react";
import { CSSProperties } from "react";
import { ValidPath } from "../components/Field/types";
import { InternalInputVariants } from "../components/internal/InternalInput";
import { Breakpoint } from "../types";

type PixelValue = `${number}px`;

type Collection<T> = T[] | Readonly<T[]>;

type FocusStyle = {
  boxShadow: string;
  zIndex: number;
} & Required<Pick<CSSProperties, "position">>;

export type Breakpoints = {
  xs: PixelValue;
  sm: PixelValue;
  md: PixelValue;
  lg: PixelValue;
  xl: PixelValue;
};

type ThemeTextStyle = {
  fontFamily: string;
  fontWeight: number;
  fontSize: PixelValue;
  lineHeight: PixelValue;
  letterSpacing: PixelValue;
};

export type TextStyleNames =
  | "hero"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "legal"
  | "overline";

type TextStyle = Record<TextStyleNames, ThemeTextStyle> &
  Record<`${TextStyleNames}.bold`, { fontWeight: number }>;

type ThemeColors = {
  black: string;
  grey: {
    t75: string;
    t65: string;
    t30: string;
    t16: string;
    t10: string;
    t07: string;
    t05: string;
    t03: string;
  };
  white: string;
  primary: {
    blue: {
      t100: string;
      t80: string;
      t60: string;
      t30: string;
      t10: string;
    };
  };
  secondary: {
    lightBlue: {
      t100: string;
      t80: string;
      t60: string;
      t25: string;
      t15: string;
    };
    pink: {
      t100: string;
      t80: string;
      t60: string;
      t30: string;
      t15: string;
    };
    purple: {
      t100: string;
      t80: string;
      t60: string;
      t30: string;
      t15: string;
    };
    turquoise: {
      t100: string;
      t80: string;
      t60: string;
      t30: string;
      t10: string;
    };
  };
  highlight: {
    blue: {
      t100: string;
      t80: string;
      t50: string;
      t30: string;
      t15: string;
    };
    pink: {
      t100: string;
      t80: string;
      t50: string;
      t30: string;
      t15: string;
    };
    purple: {
      t100: string;
      t80: string;
      t50: string;
      t30: string;
      t15: string;
    };
  };
  conditional: {
    positive: {
      graphics: string;
      text: string;
    };
    attention: {
      graphics: string;
      text: string;
    };
    negative: {
      graphics: string;
      text: string;
    };
  };
};

export type Color = ValidPath<ThemeColors, string>;

type ComponentTheme<T> = {
  getCSS: (options: T) => CSSObject;
};

type ButtonCssOptions =
  | {
      targetElement: "loadingIcon";
    }
  | {
      targetElement: "content";
      showLoadingIcon?: boolean;
    }
  | {
      targetElement: "button";
      variant: "primary" | "secondary" | "icon";
      color: Color | "green";
      showLoadingIcon?: boolean;
      __internal__keyboardFocus?: boolean;
      __internal__hover?: boolean;
      __internal__active?: boolean;
    };

export type ButtonTheme = ComponentTheme<ButtonCssOptions>;

type TextareaCssOptions = {
  color: Color;
  __internal__focus: boolean;
};

export type TextareaTheme = ComponentTheme<TextareaCssOptions>;

export type TextCssOptions = {
  color: Color;
  wrap: boolean;
  align: Pick<CSSProperties, "textAlign">["textAlign"];
};

export type TextTheme = ComponentTheme<TextCssOptions>;

export type StepperCssOptions =
  | {
      targetElement: "container" | "labelContainer" | "label" | "itemContent";
    }
  | {
      targetElement: "item";
      stepsCount: number;
    }
  | {
      targetElement: "progressRight";
      isPrevious: boolean;
    }
  | {
      targetElement: "progressLeft";
      isPrevious: boolean;
      isCurrent: boolean;
    }
  | {
      targetElement: "circle";
      isMinor: boolean;
      isCurrent: boolean;
      isPrevious: boolean;
    };

export type StepperTheme = ComponentTheme<StepperCssOptions>;

type SelectCssOptions = {
  color: Color;
  fullWidth: boolean;
  __internal__focus: boolean;
};

export type SelectTheme = ComponentTheme<SelectCssOptions>;

type RadioGroupOptions =
  | {
      targetElement:
        | "radio"
        | "radioInput"
        | "circleSvg"
        | "innerCircle"
        | "description";
    }
  | {
      targetElement: "outerCircle";
      color: Color;
      isChecked: boolean;
    }
  | {
      targetElement: "radioLabel";
      color: Color;
    };

export type RadioGroupTheme = ComponentTheme<RadioGroupOptions>;

type ListCssOptions =
  | {
      targetElement: "list";
      type: "unordered" | "ordered" | "steps";
      textStyle: TextStyleNames;
    }
  | {
      targetElement: "item";
      type: "unordered" | "ordered" | "steps";
      variant: "danger" | "default";
      textStyle: TextStyleNames;
    };

export type ListTheme = ComponentTheme<ListCssOptions>;

type LinkCssOptions =
  | {
      targetElement: "span";
      appearance: "primary-button" | "secondary-button" | "icon";
      variant:
        | "light-bg"
        | "medium-bg"
        | "dark-bg"
        | "blue-button"
        | "white-button"
        | "black-button"
        | "green-button";
      buttonTheme: ButtonTheme;
      __internal__hover: boolean;
      __internal__active: boolean;
    }
  | {
      targetElement: "anchor";
      appearance: "primary-button" | "secondary-button" | "icon";
      __internal__keyboardFocus: boolean;
    };

export type LinkTheme = ComponentTheme<LinkCssOptions>;

type InputCssOptions =
  | {
      targetElement: "input";
      variant: InternalInputVariants;
      prefix?: string;
      suffix?: string;
      color: Color;
      __internal__focus: boolean;
      hasSuffixButton?: boolean;
      isLoading?: boolean;
    }
  | {
      targetElement: "inputContainer";
      variant: InternalInputVariants;
      prefix?: string;
      suffix?: string;
    };

export type InputTheme = ComponentTheme<InputCssOptions>;

type FieldCssOptions =
  | {
      targetElement: "label" | "optionalTag" | "helpText" | "errorsContainer";
    }
  | {
      targetElement: "fieldContainer";
      fullWidth: boolean;
      disabled: boolean;
    };

export type FieldTheme = ComponentTheme<FieldCssOptions>;

type DropdownCssOptions =
  | {
      targetElement:
        | "container"
        | "buttonContent"
        | "buttonChevron"
        | "options";
    }
  | {
      targetElement: "option";
      isHighlighted: boolean;
    }
  | {
      targetElement: "button";
      color: Color;
      isPlaceholder: boolean;
      __internal__focus: boolean;
    };

export type DropdownTheme = ComponentTheme<DropdownCssOptions>;

type CheckboxCssOptions =
  | {
      targetElement: "container" | "input" | "svg" | "svgPath";
    }
  | {
      targetElement: "label" | "svgRect";
      color: Color;
      isChecked?: boolean;
      __internal__keyboardFocus?: boolean;
    };

export type CheckboxTheme = ComponentTheme<CheckboxCssOptions>;

type AccordionCssOptions =
  | {
      targetElement: "headerContainer" | "headerContent" | "headerIcon";
    }
  | {
      targetElement: "headerButton";
      color: Color;
      textColor: Color;
      __internal__keyboardFocus: boolean;
    }
  | {
      targetElement: "headerChevron";
      isOpen: boolean;
    }
  | {
      targetElement: "content";
      color: Color;
    }
  | {
      targetElement: "item";
      itemGap: string;
    };

export type AccordionTheme = ComponentTheme<AccordionCssOptions> & {
  getContentColor: (
    headerColor: Color
  ) => "grey.t03" | "secondary.lightBlue.t15" | "white";
};

type AutoCompleteCssOptions =
  | {
      targetElement:
        | "container"
        | "searchIcon"
        | "clearIcon"
        | "right"
        | "listItemContent";
    }
  | {
      targetElement: "li";
      isHighlighted: boolean;
    }
  | {
      targetElement: "ul";
    }
  | {
      targetElement: "clearIcon";
      showClearIcon: boolean;
    };

export type AutoCompleteTheme = ComponentTheme<AutoCompleteCssOptions>;

export type ThemeHelpers = {
  getColor: (color: Color) => string;
  getTextStyle: ({
    name,
    mode,
  }: {
    name: TextStyleNames;
    mode: "self" | "self-bold" | "container";
  }) => ThemeTextStyle | null;
};

export type BasisTheme = {
  space: Collection<PixelValue>;
  fontSizes: Collection<PixelValue>;
  lineHeights: Collection<PixelValue>;
  letterSpacings: {
    hero: PixelValue;
    heading1: PixelValue;
    heading2: PixelValue;
    heading3: PixelValue;
    heading4: PixelValue;
    heading5: PixelValue;
    heading6: PixelValue;
    body: PixelValue;
    overline: PixelValue;
  };
  fonts: {
    heading: string;
    body: string;
  };
  fontWeights: {
    light: number;
    medium: number;
    semiBold: number;
    bold: number;
  };
  colors: ThemeColors;
  borderWidths: Collection<PixelValue>;
  radii: Collection<string>;
  breakpoints: Breakpoints;
  breakpointMaxWidths: {
    sm: PixelValue;
    md: PixelValue;
    lg: PixelValue;
    xl: PixelValue;
  };
  transitions: {
    button: string;
    link: string;
    icon: string;
  };
  zIndices: {
    aboveNormalFlow: number;
    stickyItem: number;
    dropdown: number;
  };
  textStyles: TextStyle;
  shadows: {
    header: string;
    focus: string;
  };
  focusStyles: {
    focusVisible: {
      ":focus": {
        '[data-basis-keyboard-mode="true"] &': FocusStyle;
      };
    };
    focusVisibleAdjacentLabel: {
      ":focus + label": {
        '[data-basis-keyboard-mode="true"] &': FocusStyle;
      };
    };
    __keyboardFocus: FocusStyle;
    __keyboardFocusAdjacentLabel: FocusStyle;
  };
  button: ButtonTheme;
  textarea: TextareaTheme;
  text: TextTheme;
  stepper: StepperTheme;
  select: SelectTheme;
  radioGroup: RadioGroupTheme;
  list: ListTheme;
  link: LinkTheme;
  input: InputTheme;
  field: FieldTheme;
  dropdown: DropdownTheme;
  checkbox: CheckboxTheme;
  accordion: AccordionTheme;
  autoComplete: AutoCompleteTheme;
};

export type EnhancedTheme = BasisTheme & {
  minMediaQueries: Record<Breakpoint, string>;
  exclusiveMediaQueries: Record<Breakpoint, string>;
  getColor: (color: Color) => string | null;
  getTextStyleCSS: (textStyle: TextStyleNames | undefined) => CSSObject | null;
  getSpaceValue: (spcae: string | number | undefined) => string | null;
};
