// module 'utils.js'
function asynchRequest (URL, HEADERS = {}, BODY = '', METHOD = 'post') {
  let request = {
    method: METHOD.toLowerCase(),
    headers: HEADERS
  }

  if (request.method !== 'get') {
    request.body = JSON.stringify(BODY)
  }

  return fetch(URL, request).then(async response => {
    let data = await response.json()

    data = {
      ...data,
      status: response.status,
      statusText: response.statusText
    }

    // eslint-disable-next-line
    if (response.status == 200 || response.status == 201) {
      return Promise.resolve(data)
    } else {
      return Promise.reject(data)
    }
  })
}

export { asynchRequest }
