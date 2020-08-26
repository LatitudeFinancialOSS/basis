import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";

export function formatCode(code, { printWidth = 56 } = {}) {
  let formattedCode;

  try {
    formattedCode = prettier.format(code.trim(), {
      parser: "babel",
      plugins: [babel],
      printWidth,
      semi: false,
    });
  } catch (_e) {
    formattedCode = code;
  }

  if (formattedCode[0] === ";") {
    return formattedCode.slice(1);
  }

  return formattedCode;
}

export function nonDefaultProps(props) {
  return props
    .filter(({ value, defaultValue }) => value !== defaultValue && value !== "")
    .map(({ prop, value, type = "string" }) => {
      if (type === "number" && value !== "Unspecified") {
        return `${prop}={${value}}`;
      }

      if (type === "boolean" && value === true) {
        return prop;
      }

      if (
        (type === "boolean" && value === false) ||
        type === "function" ||
        type === "jsx"
      ) {
        return `${prop}={${value}}`;
      }

      return `${prop}="${value}"`;
    })
    .join(" ");
}
