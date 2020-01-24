import React from "react";
import { TimeSpan } from "basis";

function OptionallyControlledTimeSpan(props) {
  const [data, setData] = React.useState({
    value: {
      years: "",
      months: ""
    }
  });

  return (
    <TimeSpan
      label="Add label to display here"
      data={data}
      onChange={setData}
      {...props}
    />
  );
}

export default OptionallyControlledTimeSpan;
