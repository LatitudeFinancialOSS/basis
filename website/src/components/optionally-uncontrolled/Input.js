import React from "react";
import { Input } from "basis";

function UncontrolledInput(props) {
  const [data, setData] = React.useState({
    value: ""
  });

  return <Input data={data} onChange={setData} {...props} />;
}

export default UncontrolledInput;
