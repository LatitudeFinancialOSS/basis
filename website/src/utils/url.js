import { paramCase } from "param-case";
import lzString from "lz-string";
import queryString from "query-string";

function getTabNames(parts) {
  switch (parts[0]) {
    case "typography": {
      return ["Overview", "Usage"];
    }

    case "spacing": {
      return ["Overview", "Usage"];
    }

    case "colors": {
      return ["Palettes", "Accessibility", "Resources"];
    }

    default: {
      return ["Playground", "Usage", "Resources"];
    }
  }
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
      href: tabIndex === 0 ? basePath : `${basePath}/${slug}`,
      isCurrent: tabIndex === 0 ? isDefaultPath : lastPart === slug,
    };
  });
}

export function getPlaygroundUrl(data) {
  const dataStr = lzString.compressToEncodedURIComponent(JSON.stringify(data));
  const { href, pathname } = window.location;
  const { query } = queryString.parseUrl(href);

  return `${pathname}?${queryString.stringify({
    ...query,
    data: dataStr,
  })}`;
}

export function getPlaygroundDataFromUrl() {
  const { data } = queryString.parse(window.location.search);

  if (!data) {
    return {};
  }

  try {
    return JSON.parse(lzString.decompressFromEncodedURIComponent(data));
  } catch (_e) {
    return {};
  }
}

export function getPreviewUrl(code) {
  return `${
    window.location.origin
  }/preview?code=${lzString.compressToEncodedURIComponent(code)}`;
}

export function getPreviewCodeFromUrl() {
  const { code } = queryString.parse(window.location.search);

  if (!code) {
    return null;
  }

  return lzString.decompressFromEncodedURIComponent(code);
}
