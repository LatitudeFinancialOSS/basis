import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RangeSetting from "../../../components/RangeSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { designTokens, useTheme, Stepper } = allDesignSystem;
const scope = allDesignSystem;

const STEPS = [
  "(none)",
  "About you",
  "Address and identification",
  "Employment",
  "Expenses",
  "Verify details",
  "Completed!"
];

function StepperPage() {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);
  const code = formatCode(`
    <Stepper ${nonDefaultProps([
      {
        prop: "isCompleted",
        value: progress === 6,
        defaultValue: Stepper.DEFAULT_PROPS.isCompleted,
        type: "boolean"
      }
    ])}>
      <Stepper.Item ${nonDefaultProps([
        {
          prop: "label",
          value: "You"
        },
        {
          prop: "label-md",
          value: "About you"
        },
        {
          prop: "isCurrent",
          value: progress === 1,
          defaultValue: Stepper.Item.DEFAULT_PROPS.isCurrent,
          type: "boolean"
        }
      ])} />
      <Stepper.Item ${nonDefaultProps([
        {
          prop: "label",
          value: "Address"
        },
        {
          prop: "label-sm",
          value: "Address and ID"
        },
        {
          prop: "label-md",
          value: "Address and identification"
        },
        {
          prop: "isCurrent",
          value: progress === 2,
          defaultValue: Stepper.Item.DEFAULT_PROPS.isCurrent,
          type: "boolean"
        },
        {
          prop: "isMinor",
          value: true,
          defaultValue: Stepper.Item.DEFAULT_PROPS.isMinor,
          type: "boolean"
        }
      ])} />
      <Stepper.Item ${nonDefaultProps([
        {
          prop: "label",
          value: "Work"
        },
        {
          prop: "label-xs",
          value: "Employment"
        },
        {
          prop: "isCurrent",
          value: progress === 3,
          defaultValue: Stepper.Item.DEFAULT_PROPS.isCurrent,
          type: "boolean"
        }
      ])} />        
      <Stepper.Item ${nonDefaultProps([
        {
          prop: "label",
          value: "Expenses"
        },
        {
          prop: "isCurrent",
          value: progress === 4,
          defaultValue: Stepper.Item.DEFAULT_PROPS.isCurrent,
          type: "boolean"
        },
        {
          prop: "isMinor",
          value: true,
          defaultValue: Stepper.Item.DEFAULT_PROPS.isMinor,
          type: "boolean"
        }
      ])} />
      <Stepper.Item ${nonDefaultProps([
        {
          prop: "label",
          value: "Verify"
        },
        {
          prop: "label-xs",
          value: "Verify details"
        },
        {
          prop: "isCurrent",
          value: progress === 5,
          defaultValue: Stepper.Item.DEFAULT_PROPS.isCurrent,
          type: "boolean"
        }
      ])} />
    </Stepper>
  `);

  return (
    <>
      <div
        css={{
          display: "flex",
          flexShrink: 0,
          padding: `${designTokens.space[5]} ${designTokens.space[6]}`
        }}
      >
        <RangeSetting
          heading="Progress"
          min={0}
          max={6}
          selectedValue={progress}
          setSelectedValue={setProgress}
          selectedValueText={STEPS[progress]}
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        width="md"
        hasBodyMargin={false}
        backgroundColor={theme.colors.grey.t07}
      />
    </>
  );
}

export default StepperPage;
