import { GatsbyNode } from 'gatsby'
import path from 'path'
import { Props as MagazinePageProps } from './src/templates/magazine-page'
import { Props as MagazineIssueProps } from './src/templates/magazine-issue'
import { Props as MagazineCoverProps } from './src/templates/magazine-covers'
import { Props as IndexProps } from './src/templates/index'
import { createFilePath } from 'gatsby-source-filesystem'
import { IGatsbyImageData, ImageDataLike } from 'gatsby-plugin-image'

export interface PageFile {
  large: { gatsbyImageData: IGatsbyImageData }
  small: { gatsbyImageData: IGatsbyImageData }
}

export type ImageNode = Queries.AllMagazinePagesQuery['allFile']['nodes'][number]
interface MagazineObject {
  magazineName: string
  years: {
    yearNumber: string
    issues: {
      issueNumber: string
      pageCount: number
      pages: {
        pageNumber: string
        image: ImageNode
      }[]
    }[]
  }[]
}
interface MagazineData {
  magazine: string
  year: string
  issue: string
  page: {
    pageNumber: string
    image: ImageNode
  }
}

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions
//   // Ensures we are processing only markdown files
//   if (node.internal.type === 'ImageSharp') {
//     const relativeFilePath = createFilePath({
//       node,
//       getNode,
//       basePath: 'data/faqs/',
//     })

//     // Creates new query'able field with name of 'slug'
//     createNodeField({
//       node,
//       name: 'slug',
//       value: `/faqs${relativeFilePath}`,
//     })
//   }
// }

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  const result = await graphql<Queries.AllMagazinePagesQuery>(`
  query AllMagazinePages {
    allFile(sort: {name: ASC}, filter: {sourceInstanceName: {eq: "magazines"}}) {
      nodes {
        name
        relativeDirectory
        large: childImageSharp {
          gatsbyImageData(
            height: 1400
            transformOptions: {fit: OUTSIDE }
            placeholder: BLURRED
            layout: CONSTRAINED
            formats: [AUTO, WEBP, AVIF]
          )
        }
        small: childImageSharp {
          gatsbyImageData(
            height: 300
            transformOptions: {fit: OUTSIDE }
            placeholder: BLURRED
            layout: FIXED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
  `)
  if (!result.data) return
  const {
    data: {
      allFile: { nodes: files },
    },
  } = result
  const allPages = files.map((file) => extractMagData(file))

  const coverPages = allPages.filter((page) => page.page.pageNumber === '1' || page.page.pageNumber === '01')
  const magObjects = buildMagObjects(allPages)

  createPage<IndexProps>({
    path: '/',
    component: path.resolve('./src/templates/index.tsx'),
    context: {
      coverPages: coverPages,
    },
  })
  magObjects.forEach((magazine) => {
    const { magazineName, years } = magazine
    const namePath = `${magazineName}/`
    console.log('creating page', { namePath })
    createPage<MagazineCoverProps>({
      path: namePath,
      component: path.resolve('./src/templates/magazine-covers.tsx'),
      context: {
        magazineName,
        coverPages: coverPages.filter((cp) => cp.magazine === magazineName),
      },
    })
    years.forEach((year) => {
      const { yearNumber, issues } = year
      const yearPath = `${magazineName}/${yearNumber}/`
      console.log('creating page', { yearPath })
      createPage<MagazineCoverProps>({
        path: yearPath,
        component: path.resolve('./src/templates/magazine-covers.tsx'),
        context: {
          magazineName,
          yearNumber,
          coverPages: coverPages.filter(
            (cp) => cp.magazine === magazineName && cp.year === yearNumber
          ),
        },
      })
      issues.forEach((issue) => {
        const { issueNumber, pages } = issue
        const issuePath = `${magazineName}/${yearNumber}/${issueNumber}/`
        console.log('creating page', { issuePath })

        createPage<MagazineIssueProps>({
          path: issuePath,
          component: path.resolve('./src/templates/magazine-issue.tsx'),
          context: {
            images: pages.map((page) => page.image),
            magazine: magazine.magazineName,
            year: year.yearNumber,
            issue: issue.issueNumber,
          },
        })
        pages.forEach((page, i, ar) => {
          const { pageNumber } = page
          const pagePath = `${magazineName}/${yearNumber}/${issueNumber}/${pageNumber}/`
          console.log('creating page', { pagePath })
          createPage<MagazinePageProps>({
            path: pagePath,
            component: path.resolve('./src/templates/magazine-page.tsx'),
            context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              image: page?.image,
              nextImage: ar[i+1]?.image,
              magazineName: magazine.magazineName,
              year: year.yearNumber,
              issueNumber: issue.issueNumber,
              pageCount: issue.pageCount,
              pageNumber: page.pageNumber,
            },
          })
        })
      })
    })
  })
}

const extractMagData = (file: ImageNode): MagazineData => {
  const regex = /^(\w+)\/(\w+)\/(\w+)$/gm
  const match = regex.exec(file.relativeDirectory)
  const [, magazine, year, issue] = match as RegExpExecArray
  return {
    magazine,
    year,
    issue,
    page: {
      pageNumber: file.name,
      image: file,
    },
  }
}

const buildMagObjects = (magazines: ReturnType<typeof extractMagData>[]) => {
  const magNames = [
    ...magazines.reduce((set, val) => set.add(val.magazine), new Set<string>()),
  ]

  const magObjects: MagazineObject[] = magNames.map((name) => {
    const magYears = magazines
      .filter((m) => m.magazine === name)
      .map((m) => m.year)
      .filter((v, i, a) => a.indexOf(v) === i)
    return {
      magazineName: name,
      years: magYears.map((year) => {
        const magIssues = magazines
          .filter((m) => m.magazine === name && m.year === year)
          .map((m) => m.issue)
          .filter((v, i, a) => a.indexOf(v) === i)
        return {
          yearNumber: year,
          issues: magIssues.map((issue) => {
            const magPages = magazines
              .filter(
                (m) =>
                  m.magazine === name && m.year === year && m.issue === issue
              )
              .map((m) => m.page)
              .filter((v, i, a) => a.indexOf(v) === i)
            return {
              issueNumber: issue,
              pageCount: magPages.length,
              pages: [...magPages].sort(),
            }
          }),
        }
      }),
    }
  })
  return magObjects
}
