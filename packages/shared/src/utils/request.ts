export const parseCookie = (cookieString: string, key: string) => {
  const cookies: Record<string, string> = cookieString.split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      // @ts-expect-error string
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    }, {})
  return cookies[key]
}
