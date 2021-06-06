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
  ogUrl: string
  ogImage: string
}

export default function Layout({
  children,
  path,
  title,
  ogUrl = '',
  ogImage = '',
}: Props) {
  return (
    <Main
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Helmet
        htmlAttributes={{
          lang: 'fi',
        }}
      >
        <meta charSet="utf-8" />
        <title>{'Videopelilehdet - ' + title}</title>
        <link rel="canonical" href={`https://videopelilehdet.fi${path}`} />

        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content={title} />
        <meta name="description" content={title} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:image" content={ogImage} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={ogUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={title} />
        <meta property="twitter:image" content={ogImage} />
      </Helmet>
      {children}
    </Main>
  )
}
