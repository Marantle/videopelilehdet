import { capitalize } from './string-util'

export const buildNavObject = (
  magazineName?: string,
  year?: string,
  issue?: string,
  page?: string
) => {
  let navs: NavObject[] = [
    {
      title: 'Etusivu',
      path: '/',
    },
  ]

  if (magazineName) {
    navs = [
      ...navs,
      { title: capitalize(magazineName), path: `/${magazineName}/` },
    ]
  }
  if (year) {
    navs = [...navs, { title: year, path: `/${magazineName}/${year}/` }]
  }
  if (issue) {
    navs = [
      ...navs,
      { title: issue, path: `/${magazineName}/${year}/${issue}/` },
    ]
  }
  if (page) {
    navs = [
      ...navs,
      { title: page, path: `/${magazineName}/${year}/${issue}/${page}/` },
    ]
  }
  return navs
}

export interface NavObject {
  title: string
  path: string
}
