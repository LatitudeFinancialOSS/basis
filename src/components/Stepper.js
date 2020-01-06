import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useResponsiveProp, {
  responsivePropType
} from "../hooks/useResponsiveProp";
import Text from "./Text";
import Icon from "./Icon";

export const DEFAULT_ITEM_PROPS = {
  isMinor: false,
  isCurrent: false
};

function Item(_props) {
  const props = { ...DEFAULT_ITEM_PROPS, ..._props };
  const {
    isMinor,
    isCurrent,
    index,
    total,
    isPrevious,
    majorStepNumber
  } = props;
  const theme = useTheme();
  const label = useResponsiveProp(props, "label");
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div
      css={{
        ...theme["stepper.item"],
        width: `${100 / total}%`
      }}
    >
      <div css={theme["stepper.itemLabelContainer"]}>
        <div css={theme["stepper.itemLabel"]}>
          {label && (
            <Text
              intent="body2"
              color={isCurrent ? "primary.blue.t100" : "black"}
              align="center"
            >
              <strong>{label}</strong>
            </Text>
          )}
        </div>
      </div>
      <div css={theme["stepper.itemContent"]}>
        {!isFirst && (
          <div
            css={{
              ...theme["stepper.progress.left"],
              ...((isPrevious || isCurrent) &&
                theme["stepper.progress.completed"])
            }}
          />
        )}
        {!isLast && (
          <div
            css={{
              ...theme["stepper.progress.right"],
              ...(isPrevious && theme["stepper.progress.completed"])
            }}
          />
        )}
        <div
          css={{
            ...theme["stepper.itemCircle"],
            ...(isMinor && theme["stepper.itemCircle.minor"]),
            ...(isCurrent && theme["stepper.itemCircle.current"]),
            ...(isPrevious && theme["stepper.itemCircle.previous"])
          }}
        >
          {isPrevious && !isMinor && <Icon name="tick" color="white" />}
          {!isPrevious && !isMinor && (
            <Text intent="subtitle2" color={isPrevious ? "white" : "black"}>
              <strong>{majorStepNumber}</strong>
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  ...responsivePropType("label", PropTypes.node),
  isMinor: PropTypes.bool,
  isCurrent: PropTypes.bool,
  index: PropTypes.number,
  total: PropTypes.number,
  isPrevious: PropTypes.bool,
  majorStepNumber: PropTypes.number
};

export const DEFAULT_PROPS = {
  isCompleted: false
};

function Stepper(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { isCompleted, children } = props;
  const theme = useTheme();
  const steps = React.Children.toArray(children).filter(
    // Ignore all children that aren't Step.Item
    child => child.type === Item
  );
  const currentStepIndex = steps.findIndex(
    step => step.props.isCurrent === true
  );

  return (
    <div css={theme.stepper}>
      {
        steps.reduce(
          (acc, step, index) => {
            const isMinor = step.props.isMinor === true;

            acc.items.push(
              React.cloneElement(step, {
                index: index,
                total: steps.length,
                isPrevious: isCompleted || index < currentStepIndex,
                majorStepNumber: isMinor ? null : acc.majorStepNumber
              })
            );

            if (!isMinor) {
              acc.majorStepNumber += 1;
            }

            return acc;
          },
          {
            items: [],
            majorStepNumber: 1
          }
        ).items
      }
    </div>
  );
}

Stepper.propTypes = {
  isCompleted: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Stepper.Item = Item;

export default Stepper;
