import React from 'react'
import { PageProps, Link } from 'gatsby'
import Layout from '../components/layout/layout'
// import styled from 'styled-components'
import { capitalize } from '../util/string-util'
import Nav from '../components/nav.tsx/nav'
import { buildNavObject } from '../util/nav-util'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { PageFile } from '../../.gatsby/gatsby-node'
import styled from 'styled-components'

export interface Props {
  image: PageFile
  magazineName: string
  year: string
  issueNumber: string
  pageNumber: string
  pageCount: number
}

type InternalProps = PageProps<{}, Props>

const buildUrl = (
  context: InternalProps['pageContext'],
  pageNumber?: string
) => {
  const { magazineName, year, issueNumber } = context
  let url = `/${magazineName}/${year}/${issueNumber}/`
  if (pageNumber) {
    url = url + `${pageNumber}/`
  }
  return url
}

export default function MagazinePage({
  pageContext,
  path,
  location: { pathname },
}: InternalProps) {
  const {
    image,
    pageCount,
    pageNumber,
    magazineName,
    year,
    issueNumber,
    // nextPage,
  } = pageContext

  const currentPage = Number(pageNumber)
  const next =
    currentPage < Number(pageCount)
      ? buildUrl(pageContext, `${currentPage + 1}`)
      : buildUrl(pageContext)
  const title = `${capitalize(
    magazineName
  )} ${issueNumber}/${year} Sivu ${pageNumber}`

  // useEffect(() => {
  //   if (nextPage) {
  //     const image = new Image()
  //     image.src = nextPage
  //   }
  // }, [])

  const StyledGI = styled.div`
    max-width: 100vw;
    display: flex;
    align-items: 'center';
    justify-content: 'center';
  `
  return (
    <Layout
      title={title}
      path={path}
      ogUrl={pathname}
      ogImage={image.large.gatsbyImageData.images.fallback.src}
    >
      <>
        <Nav
          navs={buildNavObject(magazineName, year, issueNumber, pageNumber)}
        ></Nav>
        <StyledGI>
          <Link to={next}>
            <GatsbyImage
              image={getImage(image.large.gatsbyImageData)}
              alt={magazineName}
            />
          </Link>
        </StyledGI>
      </>
    </Layout>
  )
}
