export const fetcher =
  async (URL, method = 'GET', body = null, headers = {}) => {
    if (body) {
      body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    }
    const res = await fetch(URL, {
      method,
      body,
      headers,
    })
    return res
  }
