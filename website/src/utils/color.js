function str2rgb(str) {
  return {
    r: parseInt(str.slice(1, 3), 16),
    g: parseInt(str.slice(3, 5), 16),
    b: parseInt(str.slice(5, 7), 16),
  };
}

// http://www.w3.org/WAI/GL/wiki/Relative_luminance
function relativeLuminance({ r, g, b }) {
  [r, g, b] = [r, g, b].map((c) => {
    c = c / 255;

    if (c <= 0.03928) {
      return c / 12.92;
    }

    return Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#key-terms
export function colorContrast(str1, str2) {
  const L1 = relativeLuminance(str2rgb(str1));
  const L2 = relativeLuminance(str2rgb(str2));

  if (L1 < L2) {
    return (L2 + 0.05) / (L1 + 0.05);
  }

  return (L1 + 0.05) / (L2 + 0.05);
}

// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#larger-scaledef
function isLargeScale(fontSize, isBold) {
  const points = fontSize / 1.333; // 1pt = 1.333px according to http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#visual-audio-contrast-contrast-73-head

  return isBold ? points >= 14 : points >= 18;
}

export function accessibleContrast(accessibilityLevel, fontSize, isBold) {
  switch (accessibilityLevel) {
    // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast
    case "AA": {
      return isLargeScale(fontSize, isBold) ? 3 : 4.5;
    }

    // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast7
    case "AAA": {
      return isLargeScale(fontSize, isBold) ? 4.5 : 7;
    }

    default: {
      return null;
    }
  }
}
