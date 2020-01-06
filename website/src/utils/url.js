export function getTabsUrls(location) {
  const parts = location.pathname.split("/").filter(Boolean);

  if (parts.length === 0) {
    return [];
  }

  const lastPart = parts[parts.length - 1];
  const coreParts =
    lastPart === "usage" || lastPart === "resources"
      ? parts.slice(0, -1)
      : parts;
  const playgroundPathname = `/${coreParts.join("/")}`;

  return [
    {
      name: "Playground",
      to: playgroundPathname,
      isCurrent: lastPart !== "usage" && lastPart !== "resources"
    },
    {
      name: "Usage",
      to: `${playgroundPathname}/usage`,
      isCurrent: lastPart === "usage"
    },
    {
      name: "Resources",
      to: `${playgroundPathname}/resources`,
      isCurrent: lastPart === "resources"
    }
  ];
}
