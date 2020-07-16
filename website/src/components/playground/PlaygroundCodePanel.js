import React, { useState, useEffect, useCallback, useRef } from "react";
import { navigate } from "gatsby";
import { useRecoilState } from "recoil";
import { useTheme, Stack, Button, Icon, VisuallyHidden } from "basis";
import { LiveEditor } from "react-live";
import PlaygroundCodeError from "./PlaygroundCodeError";
import PlaygroundSettings from "./PlaygroundSettings";
import { prettify, getComponentsLocation } from "./utils";
import { codeState, screensState, isInspectModeState } from "./recoilState";
import { getPlaygroundUrl, getPreviewUrl } from "../../utils/url";
import useCanary from "../../hooks/useCanary";

function PlaygroundCodePanel() {
  const theme = useTheme();
  const isCanary = useCanary();
  const [isInspectMode, setIsInspectMode] = useRecoilState(isInspectModeState);
  const [code, setCode] = useRecoilState(codeState);
  const [screens, setScreens] = useRecoilState(screensState);
  const [isSaved, setIsSaved] = useState(false);
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const settingsRef = useRef();
  const updateComponentsLocation = useCallback(() => {
    setScreens((screens) =>
      screens.map((screen) => ({
        ...screen,
        componentsLocation: getComponentsLocation(screen.document),
      }))
    );
  }, [setScreens]);

  useEffect(() => {
    if (isInspectMode) {
      updateComponentsLocation();
    }
  }, [isInspectMode, updateComponentsLocation]);

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
        <Stack direction="horizontal" gap="4">
          {isCanary && (
            <Button
              variant="icon"
              onClick={() => {
                setIsInspectMode((isInspectMode) => !isInspectMode);
              }}
            >
              <Icon
                name="select-object"
                size="24px"
                color={isInspectMode ? "highlight.blue.t100" : "grey.t75"}
                hoverColor={isInspectMode ? "highlight.blue.t100" : "black"}
              />
            </Button>
          )}
          <Button
            variant="secondary"
            width="88"
            onClick={() => {
              setCode(prettify(code));
            }}
          >
            Prettify
          </Button>
          <Button
            variant="secondary"
            width="88"
            disabled={isSaved}
            onClick={() => {
              navigate(
                getPlaygroundUrl({
                  code,
                  settings: {
                    screens: screens.map(({ name, width }) => [name, width]),
                  },
                })
              );

              setIsSaved(true);

              setTimeout(() => {
                setIsSaved(false);
              }, 1000);
            }}
          >
            {isSaved ? "Saved!" : "Save"}
          </Button>
          <Button
            variant="secondary"
            width="88"
            onClick={() => {
              const previewUrl = getPreviewUrl(code);

              window.open(previewUrl, "_blank");
            }}
          >
            Preview
          </Button>
        </Stack>
        <div css={{ flexShrink: 0, marginLeft: "auto" }}>
          <Button
            variant="secondary"
            width="88"
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
          <LiveEditor
            textareaId="code-editor"
            padding={0}
            style={{ minHeight: "100%" }}
            onChange={setCode}
          />
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
              if (
                e.target === e.currentTarget &&
                (e.key === " " || e.key === "Enter")
              ) {
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
