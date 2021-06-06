import * as React from 'react'
import { Link, PageProps } from 'gatsby'
import { PageFile } from '../../.gatsby/gatsby-node'
import styled from 'styled-components'
import { buildPath } from '../util/string-util'
import Layout from '../components/layout/layout'

export interface Props {
  coverPages: {
    magazine: string
    year: string
    issue: string
    page: {
      pageNumber: string
      file: PageFile
    }
  }[]
}
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 15px 0;
  justify-content: center;
`
type InternalProps = PageProps<{}, Props>

const StyledHeader = styled.div`
  color: #b4a5a5;
`
const IndexPage = (props: InternalProps) => {
  const { coverPages } = props.pageContext
  return (
    <Layout path="/" title="Videopelilehdet">
      <>
        <StyledHeader>
          <title>Home Page</title>
          <h1>Tervetuloa selaamaan historiaa!</h1>
          <p>
            Sivustolle yritetään kerätä mahdollisimman paljon vanhoja
            suomalaisia videopelilehtiä, alta pääset selaamaan jo löytyviä
          </p>
        </StyledHeader>
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
                  <img src={coverPage.page.file.childImageSharp.small.src} />
                </Link>
              </div>
            ))}
          </Wrapper>
        </section>
      </>
    </Layout>
  )
}
export default IndexPage
