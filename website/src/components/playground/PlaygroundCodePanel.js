import React, { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { useTheme, Button, VisuallyHidden } from "basis";
import { LiveEditor } from "react-live";
import PlaygroundCodeError from "./PlaygroundCodeError";
import PlaygroundSettings from "./PlaygroundSettings";
import { prettify } from "./utils";
import { codeState } from "./recoilState";

function PlaygroundCodePanel() {
  const theme = useTheme();
  const [code, setCode] = useRecoilState(codeState);
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const settingsRef = useRef();

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
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
          <Button
            variant="secondary"
            margin="0 4 0 0"
            onClick={() => {
              setCode(prettify(code));
            }}
          >
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
          minHeight: 0, // This ensures that, when there is a lot of code, this div isn't growing beyond what we want.
        }}
      >
        <div
          css={{
            padding: `${theme.space[4]} ${theme.space[8]}`,
            width: "100%",
            overflow: "auto",
            "textarea:focus": {
              outline: "none",
            },
          }}
        >
          <VisuallyHidden>
            <label htmlFor="code-editor">Code Editor</label>
          </VisuallyHidden>
          <LiveEditor textareaId="code-editor" padding={0} onChange={setCode} />
        </div>
        {areSettingsOpen && (
          <div
            css={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                setAreSettingsOpen(false);
              }
            }}
            onClick={(e) => {
              if (!settingsRef.current.contains(e.target)) {
                setAreSettingsOpen(false);
              }
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
              ref={settingsRef}
            >
              <PlaygroundSettings />
            </div>
          </div>
        )}
      </div>
      <PlaygroundCodeError />
    </div>
  );
}

export default PlaygroundCodePanel;
