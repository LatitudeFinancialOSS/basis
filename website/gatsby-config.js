const path = require("path");
const { COMPONENT_STATUS } = require("./src/utils/constants");

module.exports = {
  siteMetadata: {
    siteUrl: "https://basis.now.sh",
    components: {
      Accordion: {
        status: COMPONENT_STATUS.READY,
      },
      Button: {
        status: COMPONENT_STATUS.READY,
      },
      Checkbox: {
        status: COMPONENT_STATUS.READY,
      },
      Container: {
        status: COMPONENT_STATUS.READY,
      },
      DatePicker: {
        status: COMPONENT_STATUS.READY,
      },
      Divider: {
        status: COMPONENT_STATUS.READY,
      },
      Dropdown: {
        status: COMPONENT_STATUS.READY,
      },
      Flex: {
        status: COMPONENT_STATUS.READY,
      },
      Footer: {
        status: COMPONENT_STATUS.READY,
      },
      Form: {
        status: COMPONENT_STATUS.READY,
      },
      Frequency: {
        status: COMPONENT_STATUS.READY,
      },
      Grid: {
        status: COMPONENT_STATUS.READY,
      },
      Header: {
        status: COMPONENT_STATUS.READY,
      },
      Icon: {
        status: COMPONENT_STATUS.DRAFT,
      },
      Input: {
        status: COMPONENT_STATUS.READY,
      },
      Link: {
        status: COMPONENT_STATUS.READY,
      },
      List: {
        status: COMPONENT_STATUS.READY,
      },
      LoadingIcon: {
        status: COMPONENT_STATUS.DRAFT,
      },
      Message: {
        status: COMPONENT_STATUS.READY,
      },
      Placeholder: {
        status: COMPONENT_STATUS.READY,
      },
      RadioGroup: {
        status: COMPONENT_STATUS.READY,
      },
      Select: {
        status: COMPONENT_STATUS.READY,
      },
      ShadowContainer: {
        status: COMPONENT_STATUS.READY,
      },
      Stack: {
        status: COMPONENT_STATUS.READY,
      },
      Stepper: {
        status: COMPONENT_STATUS.READY,
      },
      Sticky: {
        status: COMPONENT_STATUS.READY,
      },
      Text: {
        status: COMPONENT_STATUS.READY,
      },
      Textarea: {
        status: COMPONENT_STATUS.READY,
      },
      TimeSpan: {
        status: COMPONENT_STATUS.READY,
      },
    },
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
