export const capitalize = (str: string) => {
  const lower = str.toLowerCase()
  return str.charAt(0).toUpperCase() + lower.slice(1)
}

export const buildPath = (
  magazineName?: string,
  year?: string,
  issue?: string,
  page?: string
) => {
  let path = '/'

  if (magazineName) {
    path = `${[path]}${magazineName}/`
  }
  if (year) {
    path = `${[path]}${year}/`
  }
  if (issue) {
    path = `${[path]}${issue}/`
  }
  if (page) {
    path = `${[path]}${page}/`
  }
  return path
}
