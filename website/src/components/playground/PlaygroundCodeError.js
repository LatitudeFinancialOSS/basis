import React from "react";
import { LiveError, withLive } from "react-live";
import { useTheme } from "basis";

const PlaygroundCodeError = withLive(({ live }) => {
  const theme = useTheme();

  if (typeof window === "undefined" || !live.error || live.code.trim() === "") {
    return null;
  }

  return (
    <div
      css={{
        position: "absolute",
        left: 0,
        right: 0,
        top: -200,
        height: 200,
        overflowY: "auto",
        boxSizing: "border-box",
        padding: `${theme.space[4]} ${theme.space[8]}`,
        backgroundColor: theme.colors.white,
        boxShadow: "0 -4px 0 0 rgba(207, 0, 14, 0.8)",
        color: theme.colors.conditional.negative.text,
        "> pre": {
          margin: 0,
        },
      }}
    >
      <LiveError />
    </div>
  );
});

export default PlaygroundCodeError;
