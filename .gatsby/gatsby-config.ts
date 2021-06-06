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
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: ' UA-198097627-1 ',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'magazines',
        path: 'src/images/magazines/',
      },
    },
  ],
}

export default config
