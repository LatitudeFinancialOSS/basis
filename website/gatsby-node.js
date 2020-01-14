const path = require("path");
const { pascalCase } = require("pascal-case");
const { siteMetadata } = require("./gatsby-config");

const alias = {
  react: path.resolve("./node_modules/react"), // Resolves to [REPO_LOCATION]/website/node_modules/react
  "@emotion": path.resolve("./node_modules/@emotion")
};

/*
  See: https://github.com/facebook/react/issues/13991#issuecomment-435587809
       https://stackoverflow.com/a/57538055/247243
*/
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias
    }
  });
};

const COMPONENT_PAGE_REGEX = /^\/components\/([^/]*)\//;

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.startsWith("/playground/")) {
    page.context.header = "Playground";
    page.context.layout = "empty";
  } else if (page.path.startsWith("/colors/")) {
    page.context.header = "Colors";
  } else {
    const match = page.path.match(COMPONENT_PAGE_REGEX);

    if (match) {
      const componentName = pascalCase(match[1]);

      page.context.header = componentName;
      page.context.status = siteMetadata.components[componentName].status;
    }
  }

  createPage(page);
};
