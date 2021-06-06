import React from 'react'
import { Link, PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout/layout'
import { buildPath, capitalize } from '../util/string-util'
import Nav from '../components/nav.tsx/nav'
import { buildNavObject } from '../util/nav-util'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { PageFile } from '../../.gatsby/gatsby-node'

// const Row = styled.div``
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: 15px 0;
  justify-content: center;
`

// const StyledImg = styled.img``
export interface Props {
  magazineName: string
  yearNumber?: string
  coverPages: {
    magazine: string
    year: string
    issue: string
    page: {
      pageNumber: string
      image: PageFile
    }
  }[]
}

export default function MagazineIssue(data: PageProps<{}, Props>) {
  const { coverPages, magazineName, yearNumber } = data.pageContext
  const title = `${capitalize(magazineName)} ${yearNumber}`
  return (
    <Layout title={title} path={data.path}>
      <>
        <Nav navs={buildNavObject(magazineName, yearNumber)}></Nav>

        <section>
          <Wrapper>
            {coverPages.map((coverPage, i) => (
              <div key={coverPage.magazine + i}>
                <Link
                  to={buildPath(
                    coverPage.magazine,
                    coverPage.year,
                    coverPage.issue
                  )}
                >
                  <GatsbyImage
                    image={getImage(coverPage.page.image.small.gatsbyImageData)}
                    alt={`${magazineName} ${yearNumber} ${coverPage.issue}`}
                  />
                </Link>
              </div>
            ))}
          </Wrapper>
        </section>
      </>
    </Layout>
  )
}
