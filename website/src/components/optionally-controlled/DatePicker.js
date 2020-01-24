import React from "react";
import { DatePicker } from "basis";
import { withConstantsFrom } from "../../utils/component";

function OptionallyControlledDatePicker(props) {
  const [data, setData] = React.useState({
    value: {
      day: "",
      month: "",
      year: ""
    }
  });

  return (
    <DatePicker
      label="Add label to display here"
      data={data}
      onChange={setData}
      {...props}
    />
  );
}

export default withConstantsFrom(DatePicker, OptionallyControlledDatePicker);
