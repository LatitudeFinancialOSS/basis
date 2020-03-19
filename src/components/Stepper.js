import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useResponsiveProp, {
  responsivePropType
} from "../hooks/useResponsiveProp";
import { Section, Text, Icon } from ".";

const DEFAULT_ITEM_PROPS = {
  minor: false,
  current: false
};

Item.DEFAULT_PROPS = DEFAULT_ITEM_PROPS;

function Item(_props) {
  const props = { ...DEFAULT_ITEM_PROPS, ..._props };
  const { minor, current, index, total, isPrevious, majorStepNumber } = props;
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
              textStyle="body2"
              color={current ? "primary.blue.t100" : "black"}
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
              ...((isPrevious || current) &&
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
            ...(minor && theme["stepper.itemCircle.minor"]),
            ...(current && theme["stepper.itemCircle.current"]),
            ...(isPrevious && theme["stepper.itemCircle.previous"])
          }}
        >
          {isPrevious && !minor && <Icon name="tick" color="white" />}
          {!isPrevious && !minor && (
            <Text textStyle="subtitle2" color={isPrevious ? "white" : "black"}>
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
  minor: PropTypes.bool,
  current: PropTypes.bool,
  index: PropTypes.number,
  total: PropTypes.number,
  isPrevious: PropTypes.bool,
  majorStepNumber: PropTypes.number
};

const DEFAULT_PROPS = {
  completed: false
};

Stepper.DEFAULT_PROPS = DEFAULT_PROPS;
Stepper.HEIGHT_MAP = {
  default: 100
};

function Stepper(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { completed, children, testId } = props;
  const theme = useTheme();
  const steps = React.Children.toArray(children).filter(
    // Ignore all children that aren't Step.Item
    child => child.type === Item
  );
  const currentStepIndex = steps.findIndex(step => step.props.current === true);

  return (
    <Section bg="grey.t07" testId={testId}>
      <div css={theme.stepper}>
        {
          steps.reduce(
            (acc, step, index) => {
              const minor = step.props.minor === true;

              acc.items.push(
                React.cloneElement(step, {
                  index: index,
                  total: steps.length,
                  isPrevious: completed || index < currentStepIndex,
                  majorStepNumber: minor ? null : acc.majorStepNumber
                })
              );

              if (!minor) {
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
    </Section>
  );
}

Stepper.propTypes = {
  completed: PropTypes.bool,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

Stepper.Item = Item;

export default Stepper;
