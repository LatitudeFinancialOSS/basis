const path = require("path");

module.exports = {
  siteMetadata: {
    siteUrl: "https://basis.now.sh",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: `${__dirname}/src/layouts/Page.js`,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        basis: path.join(__dirname, "../src"),
      },
    },
    `gatsby-plugin-react-helmet-async`,
    /*
      Note: 
      The order of the `gatsby-source-filesystem` objects matter!
      Most specific ones should come first.       
    */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `usage`,
        path: `${__dirname}/src/pages`,
        ignore: [`**/!(usage).mdx`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resources`,
        path: `${__dirname}/src/pages`,
        ignore: [`**/!(resources).mdx`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      // This is required by gatsby-plugin-mdx.
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          usage: `${__dirname}/src/layouts/Usage.js`,
          resources: `${__dirname}/src/layouts/Resources.js`,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        env: {
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }],
          },
          production: {
            policy: [{ userAgent: "*", allow: "/" }],
          },
        },
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Basis`,
        short_name: `Basis`,
        start_url: `/`,
        background_color: `#0046AA`,
        theme_color: `#0046AA`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
