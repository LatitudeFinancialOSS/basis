import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";
import { allComponentNames } from "./meta";

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

function getComponentName(nameObj) {
  switch (nameObj.type) {
    case "JSXIdentifier": {
      return nameObj.name;
    }

    case "JSXMemberExpression": {
      return `${getComponentName(nameObj.object)}.${getComponentName(
        nameObj.property
      )}`;
    }

    default: {
      return null;
    }
  }
}

export function annotateCodeForPlayground(code) {
  const ast = getASTfromCode(code);

  if (ast === null) {
    return code;
  }

  let count = 0;

  traverse(ast, {
    JSXOpeningElement: (path) => {
      const componentName = getComponentName(path.node.name);

      if (allComponentNames.includes(componentName) === false) {
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
