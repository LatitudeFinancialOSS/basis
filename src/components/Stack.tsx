import React from "react";
import flattenChildren from "react-keyed-flatten-children";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import useResponsiveProp from "../hooks/useResponsiveProp";
import {
  responsiveMargin,
  responsiveSize,
  getGapValues,
  mergeResponsiveCSS,
} from "../utils/css";
import { ResponsiveProp, SizeValue } from "../types";
import { useMergedProps } from "../hooks/useMergedProps";
import { Interpolation } from "@emotion/serialize";
import { Theme } from "@emotion/react";

const DIRECTIONS = ["vertical", "horizontal"] as const;
const ALIGNMENTS = ["normal", "left", "center", "right"] as const;

const DEFAULT_PROPS = {
  direction: "vertical",
  align: "normal",
  gap: "0",
  flatten: false,
} as const;

Stack.DIRECTIONS = DIRECTIONS;
Stack.ALIGNMENTS = ALIGNMENTS;
Stack.DEFAULT_PROPS = DEFAULT_PROPS;

type StackDirection = "vertical" | "horizontal";

type StackAlignment = "normal" | "left" | "center" | "right";

type StackProps = {
  flatten?: boolean;
  children: React.ReactNode;
  testId?: string;
} & ResponsiveProp<"margin", string> &
  ResponsiveProp<"width", SizeValue> &
  ResponsiveProp<"direction", StackDirection> &
  ResponsiveProp<"align", StackAlignment> &
  ResponsiveProp<"gap">;

function Stack(props: StackProps) {
  const mergedProps = useMergedProps(props, DEFAULT_PROPS);

  const { flatten, children, testId } = mergedProps;
  const maybeFlattenedChildren = flatten
    ? flattenChildren(children)
    : React.Children.toArray(children);
  const direction = useResponsiveProp(mergedProps, "direction");
  const flexWrapperCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin,
    width: responsiveSize("width"),
    gap: ({ gap }, theme) => {
      const gapValues = getGapValues(gap, theme);

      if (gapValues === null) {
        return {};
      }

      const { rowGap } = gapValues;

      return {
        "::before": {
          marginTop: `-${parseInt(rowGap, 10) + 1}px`,
        },
      };
    },
  });
  const flexCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    align: ({ direction, align }) => {
      if (!align) {
        return {};
      }

      return {
        [direction === "horizontal" ? "justifyContent" : "alignItems"]: [
          "normal",
          "center",
        ].includes(align)
          ? align
          : align === "right"
          ? "flex-end"
          : "flex-start",
      };
    },
    gap: ({ gap }, theme) => {
      const gapValues = getGapValues(gap, theme);

      if (gapValues === null) {
        return {};
      }

      const { columnGap } = gapValues;

      return {
        marginLeft: `-${columnGap}`,
      };
    },
  });
  const childCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    gap: ({ gap }, theme) => {
      const gapValues = getGapValues(gap, theme);

      if (gapValues === null) {
        return {};
      }

      const { rowGap, columnGap } = gapValues;

      return {
        marginTop: rowGap,
        marginLeft: columnGap,
      };
    },
  });

  return (
    <div
      css={
        mergeResponsiveCSS(
          {
            paddingTop: "1px",
            "::before": {
              content: '""',
              display: "block",
            },
          },
          flexWrapperCSS
        ) as Interpolation<Theme>
      }
      data-testid={testId}
    >
      <div
        css={{
          display: "flex",
          flexDirection: direction === "horizontal" ? undefined : "column",
          flexWrap: direction === "horizontal" ? "wrap" : undefined,
          ...flexCSS,
        }}
      >
        {maybeFlattenedChildren
          .filter((child) => child != null)
          .map((child, index) => (
            <div
              css={{
                ":empty": {
                  display: "none",
                },
                ...childCSS,
              }}
              key={index}
            >
              {child}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Stack;
