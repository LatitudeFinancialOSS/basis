import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions,
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Message } = allDesignSystem;
const { SEVERITIES, BACKGROUNDS, DEFAULT_PROPS } = Message;
const scope = allDesignSystem;

const severityOptions = getRadioOptions(SEVERITIES);
const bgOptions = getRadioOptions(BACKGROUNDS);
const hasTitleOptions = getCheckboxOptions();
const hasCallToActionOptions = getCheckboxOptions();
const hasBreakpointWidthOptions = getCheckboxOptions();

function ButtonPage() {
  const theme = useTheme();
  const [severity, setSeverity] = useState("info-or-minor");
  const [bg, setBg] = useState(DEFAULT_PROPS.bg);
  const [hasTitle, setHasTitle] = useState(false);
  const [hasCallToAction, setHasCallToAction] = useState(false);
  const [hasBreakpointWidth, setHasBreakpointWidth] = useState(
    DEFAULT_PROPS.hasBreakpointWidth
  );
  const code = formatCode(`<Message ${nonDefaultProps([
    {
      prop: "severity",
      value: severity,
    },
    {
      prop: "bg",
      value: bg,
      defaultValue: DEFAULT_PROPS.bg,
    },
    {
      prop: "title",
      value: hasTitle ? "Optional title" : DEFAULT_PROPS.title,
      defaultValue: DEFAULT_PROPS.title,
    },
    {
      prop: "callToAction",
      value: hasCallToAction
        ? `<Link appearance="secondary-button" href="#" newTab>Action</Link>`
        : DEFAULT_PROPS.callToAction,
      defaultValue: DEFAULT_PROPS.callToAction,
      type: "jsx",
    },
    {
      prop: "hasBreakpointWidth",
      value: hasBreakpointWidth,
      defaultValue: DEFAULT_PROPS.hasBreakpointWidth,
      type: "boolean",
    },
  ])}
>
  We can help you ease the financial stress of COVID-19. <Link href="https://www.latitudefinancial.com.au/covid-19" newTab>Find out how.</Link>
</Message>`);

  return (
    <>
      <div
        css={{
          display: "flex",
          flexShrink: 0,
          padding: `${theme.space[5]} ${theme.space[6]}`,
        }}
      >
        <RadioGroupSetting
          heading="Severity"
          options={severityOptions}
          selectedValue={severity}
          setSelectedValue={setSeverity}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Background"
          options={bgOptions}
          selectedValue={bg}
          setSelectedValue={setBg}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Title"
          options={hasTitleOptions}
          selectedValue={hasTitle}
          setSelectedValue={setHasTitle}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Call to action"
          options={hasCallToActionOptions}
          selectedValue={hasCallToAction}
          setSelectedValue={setHasCallToAction}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Has breakpoint width"
          options={hasBreakpointWidthOptions}
          selectedValue={hasBreakpointWidth}
          setSelectedValue={setHasBreakpointWidth}
          type="boolean"
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        width="md"
        bg={bg === "white" ? "grey.t05" : "white"}
      />
    </>
  );
}

export default ButtonPage;
