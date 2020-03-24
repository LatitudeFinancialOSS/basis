import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RangeSetting from "../../../components/RangeSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Stepper } = allDesignSystem;
const scope = allDesignSystem;

const STEPS = [
  "(none)",
  "About you",
  "Address and identification",
  "Employment",
  "Expenses",
  "Verify details",
  "Completed!",
];

function StepperPage() {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);
  const code = formatCode(`
    <Stepper ${nonDefaultProps([
      {
        prop: "completed",
        value: progress === 6,
        defaultValue: Stepper.DEFAULT_PROPS.completed,
        type: "boolean",
      },
    ])}>
      <Stepper.Item ${nonDefaultProps([
        {
          prop: "label",
          value: "You",
        },
        {
          prop: "label-md",
          value: "About you",
        },
        {
          prop: "current",
          value: progress === 1,
          defaultValue: Stepper.Item.DEFAULT_PROPS.current,
          type: "boolean",
        },
      ])} />
      <Stepper.Item ${nonDefaultProps([
        {
          prop: "label",
          value: "Address",
        },
        {
          prop: "label-sm",
          value: "Address and ID",
        },
        {
          prop: "label-md",
          value: "Address and identification",
        },
        {
          prop: "current",
          value: progress === 2,
          defaultValue: Stepper.Item.DEFAULT_PROPS.current,
          type: "boolean",
        },
        {
          prop: "minor",
          value: true,
          defaultValue: Stepper.Item.DEFAULT_PROPS.minor,
          type: "boolean",
        },
      ])} />
      <Stepper.Item ${nonDefaultProps([
        {
          prop: "label",
          value: "Work",
        },
        {
          prop: "label-xs",
          value: "Employment",
        },
        {
          prop: "current",
          value: progress === 3,
          defaultValue: Stepper.Item.DEFAULT_PROPS.current,
          type: "boolean",
        },
      ])} />        
      <Stepper.Item ${nonDefaultProps([
        {
          prop: "label",
          value: "Expenses",
        },
        {
          prop: "current",
          value: progress === 4,
          defaultValue: Stepper.Item.DEFAULT_PROPS.current,
          type: "boolean",
        },
        {
          prop: "minor",
          value: true,
          defaultValue: Stepper.Item.DEFAULT_PROPS.minor,
          type: "boolean",
        },
      ])} />
      <Stepper.Item ${nonDefaultProps([
        {
          prop: "label",
          value: "Verify",
        },
        {
          prop: "label-xs",
          value: "Verify details",
        },
        {
          prop: "current",
          value: progress === 5,
          defaultValue: Stepper.Item.DEFAULT_PROPS.current,
          type: "boolean",
        },
      ])} />
    </Stepper>
  `);

  return (
    <>
      <div
        css={{
          display: "flex",
          flexShrink: 0,
          padding: `${theme.space[5]} ${theme.space[6]}`,
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
      />
    </>
  );
}

export default StepperPage;
