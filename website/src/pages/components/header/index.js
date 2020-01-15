import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function HeaderPage() {
  const code = formatCode(`
    <Header>
      <Header.Logo name="gem" />
    </Header>
  `);

  return (
    <ComponentContainer
      code={code}
      scope={scope}
      width="md"
      hasBodyMargin={false}
    />
  );
}

export default HeaderPage;
