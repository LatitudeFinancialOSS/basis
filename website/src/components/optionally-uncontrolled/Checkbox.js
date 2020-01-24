import React from "react";
import { Checkbox } from "basis";

function OptionallyControlledCheckbox(props) {
  const [data, setData] = React.useState({
    value: false
  });

  return <Checkbox data={data} onChange={setData} {...props} />;
}

export default OptionallyControlledCheckbox;
