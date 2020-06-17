import React from "react";
import { useTheme, Button } from "basis";

function PlaygroundSettings() {
  const theme = useTheme();

  return (
    <div
      css={{
        padding: `${theme.space[2]} ${theme.space[8]}`,
        backgroundColor: theme.colors.grey.t05,
        borderTop: `${theme.borderWidths[0]} solid ${theme.colors.grey.t16}`,
        borderBottom: `${theme.borderWidths[0]} solid ${theme.colors.grey.t16}`,
      }}
    >
      <Button variant="secondary">Prettify</Button>
    </div>
  );
}

export default PlaygroundSettings;
