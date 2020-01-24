import React from "react";
import { Input } from "basis";
import { withConstantsFrom } from "../../utils/component";

function OptionallyControlledInput(props) {
  const [data, setData] = React.useState({
    value: ""
  });

  return <Input data={data} onChange={setData} {...props} />;
}

export default withConstantsFrom(Input, OptionallyControlledInput);
