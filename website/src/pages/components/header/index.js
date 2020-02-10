import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const { useTheme } = allDesignSystem;
const scope = allDesignSystem;

function HeaderPage() {
  const theme = useTheme();
  const code = formatCode(`
    <Header>
      <Header.Logo name="latitude" />
    </Header>
  `);

  return (
    <ComponentContainer
      code={code}
      scope={scope}
      width="md"
      hasBodyMargin={false}
      backgroundColor={theme.colors.grey.t07}
    />
  );
}

export default HeaderPage;
