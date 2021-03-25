const path = require("path");
const { pascalCase } = require("pascal-case");
const { siteMetadata } = require("./gatsby-config");

const prodAlias = {
  react: path.resolve("./node_modules/react"), // Resolves to [REPO_LOCATION]/website/node_modules/react
  "@emotion": path.resolve("./node_modules/@emotion"),
  "@basis": path.resolve("./lib/basis-lib"),
};

const devAlias = {
  "react-dom": "@hot-loader/react-dom", // https://github.com/gatsbyjs/gatsby/issues/11934
  "react-error-overlay": path.resolve("./react-error-overlay"), // For react-error-overlay disabling see: https://github.com/gatsbyjs/gatsby/issues/20420
};

/*
  See: https://github.com/facebook/react/issues/13991#issuecomment-435587809
       https://stackoverflow.com/a/57538055/247243
*/
exports.onCreateWebpackConfig = ({ actions, stage }) => {
  let alias = prodAlias;

  if (stage.startsWith("develop")) {
    alias = {
      ...alias,
      ...devAlias,
    };
  }

  actions.setWebpackConfig({
    resolve: {
      alias,
    },
    /**
     * Inspiration from https://github.com/gatsbyjs/gatsby/issues/10965. There seems to be an issue where a couple dependecies are duplicated
     * across each page component and not properly split out into commons chunks (prettier, babel parser are the main ones)
     */
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: `commons`,
            chunks: `all`,
            minChunks: 2,
          },
        },
      },
    },
  });
};

const COMPONENT_PAGE_REGEX = /^\/components\/([^/]*)\//;
const KITCHEN_SINK_COMPONENT_PAGE_REGEX = /^\/kitchen-sink\/components\/([^/]*)\//;

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.startsWith("/playground/")) {
    page.context.header = "Playground";
    page.context.layout = "empty";
  } else if (page.path.startsWith("/preview/")) {
    page.context.header = "Preview";
    page.context.layout = "empty";
  } else if (page.path.startsWith("/kitchen-sink/")) {
    const match = page.path.match(KITCHEN_SINK_COMPONENT_PAGE_REGEX);

    if (match) {
      const componentName = pascalCase(match[1]);

      page.context.header = `Kitchen Sink - ${componentName}`;
      page.context.layout = "empty";
    }
  } else if (page.path.startsWith("/typography/")) {
    page.context.header = "Typography";
  } else if (page.path.startsWith("/spacing/")) {
    page.context.header = "Spacing";
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
