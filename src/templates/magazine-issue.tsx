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
const Item = styled.div`
  &:first-child {
    grid-column: span 2;
    display: flex;
    justify-content: center;
  }
  &:last-child {
    display: flex;
    justify-content: center;
    grid-column: span 2;
  }
`

// const StyledImg = styled.img``
export interface Props {
  images: PageFile[]
  magazine: string
  year: string
  issue: string
}

export default function MagazineIssue(props: PageProps<{}, Props>) {
  const { images: images, magazine, year, issue } = props.pageContext
  const {
    location: { pathname },
  } = props
  const title = `${capitalize(magazine)} ${issue}/${year}`
  return (
    <Layout
      title={title}
      path={props.path}
      ogUrl={pathname}
      ogImage={images[0].small.gatsbyImageData.images.fallback.src}
    >
      <>
        <Nav navs={buildNavObject(magazine, year, issue)}></Nav>

        <Wrapper>
          {images.map((image, i) => (
            <Item key={`page${i}`}>
              <Link to={buildPath(magazine, year, issue, `${i + 1}`)}>
                <GatsbyImage
                  image={getImage(image.small.gatsbyImageData)}
                  alt={`${magazine} ${year} ${issue}`}
                />
              </Link>
            </Item>
          ))}
        </Wrapper>
      </>
    </Layout>
  )
}
