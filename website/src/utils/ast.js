import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";

function getASTfromCode(code) {
  return parse(code, { plugins: ["jsx"] });
}

export function getReactLiveNoInline(code) {
  try {
    const ast = getASTfromCode(code);

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

export function addTestIds(code) {
  const ast = getASTfromCode(code);
  let count = 0;

  traverse(ast, {
    JSXOpeningElement: path => {
      path.pushContainer(
        "attributes",
        t.jsxAttribute(
          t.jsxIdentifier("testId"),
          t.stringLiteral(`auto-generated:${count}`)
        )
      );

      count++;
    }
  });

  return generate(ast).code;
}

export function removeTestIds(code) {
  // TODO
  return code;
}
