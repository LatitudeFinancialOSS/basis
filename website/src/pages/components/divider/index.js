import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function DividerPage() {
  const code = formatCode(`
    <Divider margin="6 0" />
  `);

  return <ComponentContainer code={code} scope={scope} bg="grey.t03" />;
}

export default DividerPage;
