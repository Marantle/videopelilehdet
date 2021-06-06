import * as React from 'react'
import { PageProps } from 'gatsby'
import MagazinePage from '../templates/magazine-page'

const Test = (props: PageProps) => {
  props
  const inputProps = {
    location: props.location,
    path: '/test/',
    pageContext: {
      magazineName: 'Super power',
      issueNumber: '1',
      pageCount: 10,
      pageNumber: '5',
      year: '1993',
      src: 'https://upload.wikimedia.org/wikipedia/en/4/47/Pelit-cover.jpg',
    },
  } as any
  return <MagazinePage {...inputProps} />
}

export default Test
