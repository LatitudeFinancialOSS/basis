import prettier from "prettier/standalone";
import babylon from "prettier/parser-babylon";

export function formatCode(code) {
  const formattedCode = prettier.format(code, {
    parser: "babel",
    plugins: [babylon],
    printWidth: 56,
    semi: false
  });

  if (formattedCode[0] === ";") {
    return formattedCode.slice(1);
  }

  return formattedCode;
}

export function nonDefaultProps(props) {
  return props
    .filter(({ value, defaultValue }) => value !== defaultValue)
    .map(({ prop, value, type = "string" }) => {
      if (
        (type === "boolean" || type === "number") &&
        value !== "Unspecified"
      ) {
        return `${prop}={${value}}`;
      }

      return `${prop}="${value}"`;
    })
    .join(" ");
}
