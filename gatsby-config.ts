//@ts-nocheck 
import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'videopelilehdet',
    siteUrl: 'https://videopelilehdet.fi',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          allFile(filter: {sourceInstanceName: {eq: "magazines"}}) {
            nodes {
              modifiedTime
              relativeDirectory
              name
            }
          }
        }
        
      `,
        resolveSiteUrl: () => 'https://videopelilehdet.fi',
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allFile: { nodes: allFiles },
        }) => {
          const allFileMap = allFiles.reduce((acc, file) => {
            const { relativeDirectory, name } = file
            const path = `/${relativeDirectory}/${name}/`
            acc[path] = {
              path: path,
              modifiedTime: file.modifiedTime,
            }
            return acc
          }, {})

          const pages = allPages.map((page) => {
            return { ...page, ...allFileMap[page.path] }
          })
          // console.log(JSON.stringify({ allFileMap }, null, 2))
          // console.log(JSON.stringify({ t: pages }, null, 2))
          return pages
        },
        serialize: ({ path, modifiedTime }) => {
          return {
            url: path,
            lastmod: modifiedTime,
          }
        },
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-1N2GCTE2PT', // Google Analytics / GA
        ],
        // gtagConfig: {
        //   optimize_id: '',
        //   anonymize_ip: true,
        //   cookie_expires: 0,
        // },
        pluginConfig: {
          head: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
        name: 'Videopelilehdet',
        short_name: 'Lehdet',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#a2466c',
        display: 'standalone',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'magazines',
        path: 'src/images/magazines/',
      },
    },
  ]
};

export default config;
