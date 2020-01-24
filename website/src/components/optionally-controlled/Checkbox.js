import React from "react";
import { Checkbox } from "basis";
import { withConstantsFrom } from "../../utils/component";

function OptionallyControlledCheckbox(props) {
  const [data, setData] = React.useState({
    value: false
  });

  return (
    <Checkbox
      children="Add children to display here"
      data={data}
      onChange={setData}
      {...props}
    />
  );
}

export default withConstantsFrom(Checkbox, OptionallyControlledCheckbox);
