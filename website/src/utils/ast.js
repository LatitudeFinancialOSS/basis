import { parse } from "@babel/parser";

function getASTfromCode(code) {
  try {
    return parse(code, { plugins: ["jsx"] });
  } catch (_e) {
    return null;
  }
}

export function getReactLiveNoInline(code) {
  try {
    const ast = getASTfromCode(code);

    if (ast === null) {
      return false;
    }

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
