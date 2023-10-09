import React from 'react'
import { Link, PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout/layout'
import { buildPath, capitalize } from '../util/string-util'
import Nav from '../components/nav.tsx/nav'
import { buildNavObject } from '../util/nav-util'
import { GatsbyImage, IGatsbyImageData, getImage, getSrc } from 'gatsby-plugin-image'
import { PageFile } from '../../gatsby-node'

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
      image: Queries.AllMagazinePagesQuery['allFile']['nodes'][number]
    }
  }[]
}

export default function MagazineIssue(props: PageProps<{}, Props>) {
  const { coverPages, magazineName, yearNumber } = props.pageContext
  const {
    location: { pathname },
  } = props
  const title = `${capitalize(magazineName)} ${yearNumber}`
  return (
    <Layout
      title={title}
      path={props.path}
      ogUrl={pathname}
      ogImage={
        getSrc(coverPages[0].page.image.small.gatsbyImageData)
      }
    >
      <>
        <Nav navs={buildNavObject(magazineName, yearNumber)}></Nav>

        <section>
          <Wrapper>
            {coverPages.map((coverPage, i) => {
              const t = getImage(coverPage.page.image.small.gatsbyImageData) as IGatsbyImageData 
              return (
                <div key={coverPage.magazine + i}>
                  <Link
                    to={buildPath(
                      coverPage.magazine,
                      coverPage.year,
                      coverPage.issue
                    )}
                    
                  >
                    <GatsbyImage
                      image={t}
                      alt={`${magazineName} ${coverPage.year} ${coverPage.issue}`} />
                  </Link>
                </div>
              )
            })}
          </Wrapper>
        </section>
      </>
    </Layout>
  )
}
