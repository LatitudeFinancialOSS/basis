import React from "react";
import { RadioGroup } from "basis";
import { withConstantsFrom } from "../../utils/component";

const options = [
  {
    label: "Option 1",
    value: "option-1"
  },
  {
    label: "Option 2",
    value: "option-2"
  },
  {
    label: "Option 3",
    value: "option-3"
  }
];

function OptionallyControlledRadioGroup(props) {
  const [data, setData] = React.useState({
    value: ""
  });

  return (
    <RadioGroup options={options} data={data} onChange={setData} {...props} />
  );
}

export default withConstantsFrom(RadioGroup, OptionallyControlledRadioGroup);
