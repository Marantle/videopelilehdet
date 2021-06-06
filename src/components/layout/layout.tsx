import React from 'react'
// import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import './layout.css'
// const Main = styled.main``

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
interface Props {
  children: React.ReactChild
  path: string | ''
  title: string
}

export default function Layout({ children, path, title }: Props) {
  return (
    <Main
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>{'Videopelilehdet - ' + String(title)}</title>
        <link
          rel="canonical"
          href={`https://videopelilehdet.fi/${String(path)}`}
        />
      </Helmet>
      {children}
    </Main>
  )
}
