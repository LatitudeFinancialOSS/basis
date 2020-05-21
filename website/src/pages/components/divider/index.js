import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const { useTheme } = allDesignSystem;
const scope = allDesignSystem;

function DividerPage() {
  const theme = useTheme();
  const code = formatCode(`
    <Divider margin="6 0" />
  `);

  return (
    <ComponentContainer
      code={code}
      scope={scope}
      backgroundColor={theme.colors.grey.t03}
    />
  );
}

export default DividerPage;
