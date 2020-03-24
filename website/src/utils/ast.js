import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";
import { allComponentNames } from "./meta";

function isClassOrFunction(code) {
  const trimmedCode = code.trim();

  return (
    trimmedCode.startsWith("class") ||
    trimmedCode.startsWith("()") ||
    trimmedCode.startsWith("function")
  );
}

function wrapCodeInFragment(code) {
  return `<>${code}</>`;
}

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
  const codeToParse = isClassOrFunction(code) ? code : wrapCodeInFragment(code);

  const ast = getASTfromCode(codeToParse);
  if (ast === null) {
    return code;
  }

  let count = 0;

  traverse(ast, {
    JSXOpeningElement: (path) => {
      const componentName = path.node.name.name;

      if (!allComponentNames.includes(componentName)) {
        return;
      }

      const testId = `playground:${componentName}:${count}`;

      path.pushContainer(
        "attributes",
        t.jsxAttribute(t.jsxIdentifier("testId"), t.stringLiteral(testId))
      );

      count++;
    },
  });

  return generate(ast).code;
}
