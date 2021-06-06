import React from 'react'
import { PageProps, Link } from 'gatsby'
import Layout from '../components/layout/layout'
// import styled from 'styled-components'
import { capitalize } from '../util/string-util'
import Nav from '../components/nav.tsx/nav'
import { buildNavObject } from '../util/nav-util'

export interface Props {
  src: string
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

export default function MagazinePage({ pageContext, path }: InternalProps) {
  const { src, pageCount, pageNumber, magazineName, year, issueNumber } =
    pageContext
  const currentPage = Number(pageNumber)
  const next =
    currentPage < Number(pageCount)
      ? buildUrl(pageContext, `${currentPage + 1}`)
      : buildUrl(pageContext)
  const title = `${capitalize(
    magazineName
  )} ${issueNumber}/${year} Sivu ${pageNumber}`

  return (
    <Layout title={title} path={path}>
      <>
        <Nav navs={buildNavObject(magazineName, year, issueNumber, pageNumber)}></Nav>
        <div>
          <Link to={next}>
            <img height={'877px'} src={src} />
          </Link>
        </div>
      </>
    </Layout>
  )
}
