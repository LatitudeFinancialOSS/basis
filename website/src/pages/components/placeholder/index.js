import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function PlaceholderPage() {
  const code = formatCode(`
    <Placeholder />
  `);

  return <ComponentContainer code={code} scope={scope} width="md" />;
}

export default PlaceholderPage;
