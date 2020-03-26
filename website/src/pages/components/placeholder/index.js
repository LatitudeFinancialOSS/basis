import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function PlaceholderPage() {
  const code = formatCode(`
    <Placeholder label="Image goes here" width="320" height="160" />
  `);

  return <ComponentContainer code={code} scope={scope} width="md" />;
}

export default PlaceholderPage;
