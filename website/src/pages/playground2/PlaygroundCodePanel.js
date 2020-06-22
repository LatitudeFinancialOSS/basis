import React, { useState } from "react";
import { useTheme, Button } from "basis";
import PlaygroundSettings from "./PlaygroundSettings";

function PlaygroundCodePanel() {
  const theme = useTheme();
  const [areSettingsOpen, setAreSettingsOpen] = useState(true);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        css={{
          display: "flex",
          flexShrink: 0,
          padding: `${theme.space[2]} ${theme.space[8]}`,
          backgroundColor: theme.colors.grey.t05,
          borderTop: `${theme.borderWidths[0]} solid ${theme.colors.grey.t16}`,
          borderBottom: `${theme.borderWidths[0]} solid ${theme.colors.grey.t16}`,
        }}
      >
        <div css={{ flexShrink: 0 }}>
          <Button variant="secondary" margin="0 4 0 0">
            Prettify
          </Button>
        </div>
        <div css={{ flexShrink: 0 }}>
          <Button variant="secondary" margin="0 4 0 0">
            Share
          </Button>
        </div>
        <div css={{ flexShrink: 0, marginLeft: "auto" }}>
          <Button
            variant="secondary"
            onClick={() => {
              setAreSettingsOpen((areSettingsOpen) => !areSettingsOpen);
            }}
          >
            Settings
          </Button>
        </div>
      </div>
      <div
        css={{
          display: "flex",
          position: "relative",
          flexGrow: 1,
        }}
      >
        {areSettingsOpen && (
          <div
            css={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: theme.colors.white,
            }}
          >
            <div
              css={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                width: "320px",
                maxWidth: "100vw",
                boxSizing: "border-box",
                borderLeft: `${theme.borderWidths[0]} solid ${theme.colors.grey.t16}`,
              }}
            >
              <PlaygroundSettings />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaygroundCodePanel;
