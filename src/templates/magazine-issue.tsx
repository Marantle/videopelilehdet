import React from 'react'
import { Link, PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout/layout'
import { buildPath, capitalize } from '../util/string-util'
import Nav from '../components/nav.tsx/nav'
import { buildNavObject } from '../util/nav-util'

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
  srcs: string[]
  magazine: string
  year: string
  issue: string
}

export default function MagazineIssue(data: PageProps<{}, Props>) {
  const { srcs, magazine, year, issue } = data.pageContext
  const title = `${capitalize(magazine)} ${issue}/${year}`
  return (
    <Layout title={title} path={data.path}>
      <>
        <Nav
          navs={buildNavObject(magazine, year, issue)}
        ></Nav>

        <Wrapper>
          {srcs.map((src, i) => (
            <Item key={src}>
              <Link to={buildPath(magazine, year, issue, `${i + 1}`)}>
                <img src={src} />
              </Link>
            </Item>
          ))}
        </Wrapper>
      </>
    </Layout>
  )
}
