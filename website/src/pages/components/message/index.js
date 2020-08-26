import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions,
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Message } = allDesignSystem;
const { SEVERITIES, BACKGROUNDS, TEXT_STYLES, DEFAULT_PROPS } = Message;
const scope = allDesignSystem;

const severityOptions = getRadioOptions(SEVERITIES);
const bgOptions = getRadioOptions(BACKGROUNDS);
const textStyleOptions = getRadioOptions(TEXT_STYLES);
const hasTitleOptions = getCheckboxOptions();
const hasCallToActionOptions = getCheckboxOptions();

function ButtonPage() {
  const theme = useTheme();
  const [severity, setSeverity] = useState("info-or-minor");
  const [bg, setBg] = useState(DEFAULT_PROPS.bg);
  const [textStyle, setTextStyle] = useState(DEFAULT_PROPS.textStyle);
  const [hasTitle, setHasTitle] = useState(false);
  const [hasCallToAction, setHasCallToAction] = useState(false);
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
      prop: "textStyle",
      value: textStyle,
      defaultValue: DEFAULT_PROPS.textStyle,
    },
    {
      prop: "title",
      value: hasTitle
        ? "Optional title"
        : DEFAULT_PROPS.title,
      defaultValue: DEFAULT_PROPS.title,
    },
    {
      prop: "callToAction",
      value: hasCallToAction
        ? `<Link variant="secondary-blue-button" href="#" newTab>Action</Link>`
        : DEFAULT_PROPS.callToAction,
      defaultValue: DEFAULT_PROPS.callToAction,
      type: "jsx"
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
          heading="Text style"
          options={textStyleOptions}
          selectedValue={textStyle}
          setSelectedValue={setTextStyle}
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
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        width="md"
        backgroundColor={
          bg === "white"
            ? theme.colors.grey.t05
            : theme.colors.white
        }
      />
    </>
  );
}

export default ButtonPage;
