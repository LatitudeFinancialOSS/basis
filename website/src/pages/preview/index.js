import React, { useState, useEffect, useMemo } from "react";
import { LiveProvider } from "react-live";
import * as allDesignSystem from "basis";
import ComponentPreview from "../../components/ComponentPreview";
import { getReactLiveNoInline } from "../../utils/ast";
import { getPreviewCodeFromUrl } from "../../utils/url";

const scope = allDesignSystem;

function Preview() {
  const [code, setCode] = useState(null);
  const noInline = useMemo(() => getReactLiveNoInline(code), [code]);

  useEffect(() => {
    setCode(getPreviewCodeFromUrl());
  }, []);

  if (code === null) {
    return null;
  }

  return (
    <LiveProvider code={code} noInline={noInline} scope={scope}>
      <ComponentPreview
        iframeTitle="Preview"
        iframeStyle={{
          height: "100vh",
        }}
        hasBodyMargin={false}
      />
    </LiveProvider>
  );
}

export default Preview;
