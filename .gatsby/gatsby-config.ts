import { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'videopelilehdet',
    siteUrl: 'https://videopelilehdet.fi',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-prettier-eslint',
      options: {
        prettier: {
          patterns: [
            // the pattern "**/*.{js,jsx,ts,tsx}" is not used because we will rely on 'eslint --fix'
            '**/*.{css,scss,less}',
            '**/*.{json,json5}',
            '**/*.{graphql}',
            '**/*.{md,mdx}',
            '**/*.{html}',
            '**/*.{yaml,yml}',
          ],
        },
        eslint: {
          patterns: '**/*.{js,jsx,ts,tsx}',
          emitWarning: false,
          customOptions: {
            fix: true,
            cache: true,
          },
          version: 'detect',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*' }],
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        codegen: true,
        documentPaths: [
          './.gatsby/**/*.ts',
          // './src/**/*.{ts,tsx}',
          // './.cache/fragments/*.js',
          './node_modules/gatsby-transformer-sharp/!(node_modules)/**/*.js',
          './node_modules/gatsby-plugin-image/!(node_modules)/**/*.js',
          './node_modules/gatsby-plugin-sharp/!(node_modules)/**/*.js',
        ],
        codegenConfig: {
          hooks: {
            afterAllFileWrite: 'prettier --write',
          },
        },
        fileName: 'graphql-types.ts',
      },
    },
    { resolve: 'gatsby-plugin-sharp' },
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
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
    'gatsby-plugin-react-helmet',
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
          console.log(JSON.stringify({ allFileMap }, null, 2))
          console.log(JSON.stringify({ t: pages }, null, 2))
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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'magazines',
        path: 'src/images/magazines/',
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
      resolve: 'gatsby-plugin-offline',
    },
  ],
}

export default config
