import React from 'react'
import { PageProps, Link } from 'gatsby'
import Layout from '../components/layout/layout'
// import styled from 'styled-components'
import { capitalize } from '../util/string-util'
import Nav from '../components/nav.tsx/nav'
import { buildNavObject } from '../util/nav-util'
import { GatsbyImage, IGatsbyImageData, getImage, getSrc } from 'gatsby-plugin-image'
import { ImageNode, PageFile } from '../../gatsby-node'
import styled from 'styled-components'

export interface Props {
  image: ImageNode
  nextImage?: ImageNode
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
    nextImage,
    pageCount,
    pageNumber,
    magazineName,
    year,
    issueNumber,
    // nextPage,
  } = pageContext

  const currentPage = pageNumber
  const nextPage = nextImage?.name
  const next =
    nextPage
      ? buildUrl(pageContext, nextPage)
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
      ogImage={image.small ? getSrc(image.small) : ""}
    >
      <>
        <Nav
          navs={buildNavObject(magazineName, year, issueNumber, pageNumber)}
        ></Nav>
        <StyledGI>
          <Link to={next}>
            {/* @ts-ignore*/}
              <GatsbyImage
                image={getImage(image.large) as IGatsbyImageData }
                alt={magazineName}
              />
          </Link>
        </StyledGI>
      </>
    </Layout>
  )
}
