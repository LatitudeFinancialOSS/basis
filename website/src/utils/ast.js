import { parse } from "@babel/parser";

export function getReactLiveNoInline(code) {
  try {
    const ast = parse(code, { plugins: ["jsx"] });

    const { body } = ast.program;
    const lastItem = body[body.length - 1];

    if (!lastItem) {
      return false;
    }

    const { expression } = lastItem;

    if (expression.type !== "CallExpression") {
      return false;
    }

    return lastItem.expression.callee.name === "render";
  } catch (_e) {
    return false;
  }
}
