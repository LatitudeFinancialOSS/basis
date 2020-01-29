import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";
import { getAllComponentNames } from "./meta";

const allComponentNames = getAllComponentNames();

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

export function annotateCodeForPlayground(code) {
  const ast = getASTfromCode(code);

  if (ast === null) {
    return code;
  }

  traverse(ast, {
    JSXOpeningElement: path => {
      const componentName = path.node.name.name;

      if (!allComponentNames.includes(componentName)) {
        return;
      }

      const testId = `playground:${componentName}`;

      path.pushContainer(
        "attributes",
        t.jsxAttribute(t.jsxIdentifier("testId"), t.stringLiteral(testId))
      );
    }
  });

  return generate(ast).code;
}
