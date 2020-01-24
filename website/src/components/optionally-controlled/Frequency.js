import React from "react";
import { Frequency } from "basis";

function OptionallyControlledFrequency(props) {
  const [data, setData] = React.useState({
    value: {
      input: "",
      frequency: ""
    }
  });

  return <Frequency data={data} onChange={setData} {...props} />;
}

export default OptionallyControlledFrequency;
