import { paramCase } from "param-case";

function getTabNames(parts) {
  if (parts[0] === "color") {
    return ["Palettes", "Accessibility", "Resources"];
  }

  return ["Playground", "Usage", "Resources"];
}

export function getTabsUrls(location) {
  const parts = location.pathname.split("/").filter(Boolean);

  if (parts.length === 0) {
    return [];
  }

  const lastPart = parts[parts.length - 1];
  const tabNames = getTabNames(parts);
  const tabSlugs = tabNames.map(paramCase);
  const isDefaultPath = !tabSlugs.slice(1).includes(lastPart);
  const coreParts = isDefaultPath ? parts : parts.slice(0, -1);
  const basePath = `/${coreParts.join("/")}`;

  return tabNames.map((tabName, tabIndex) => {
    const slug = paramCase(tabName);

    return {
      name: tabName,
      to: tabIndex === 0 ? basePath : `${basePath}/${slug}`,
      isCurrent: tabIndex === 0 ? isDefaultPath : lastPart === slug
    };
  });
}
