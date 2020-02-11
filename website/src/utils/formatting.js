import prettier from "prettier/standalone";
import babylon from "prettier/parser-babylon";

export function formatCode(code, { printWidth = 56 } = {}) {
  const formattedCode = prettier.format(code.trim(), {
    parser: "babel",
    plugins: [babylon],
    printWidth,
    semi: false
  });

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

      if (type === "boolean" && value === false) {
        return `${prop}={${value}}`;
      }

      return `${prop}="${value}"`;
    })
    .join(" ");
}
