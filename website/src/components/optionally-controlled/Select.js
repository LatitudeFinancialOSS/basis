import React from "react";
import { Select } from "basis";
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

function OptionallyControlledSelect(props) {
  const [data, setData] = React.useState({
    value: ""
  });

  return <Select options={options} data={data} onChange={setData} {...props} />;
}

export default withConstantsFrom(Select, OptionallyControlledSelect);
