// module 'utils.js'
function asynchRequest (URL, HEADERS = {}, BODY = '', METHOD = 'post') {
  return fetch(URL, {
    method: METHOD,
    headers: HEADERS,
    body: JSON.stringify(BODY)
  }).then(async response => {
    let data = await response.json()

    data = {
      ...data,
      status: response.status,
      statusText: response.statusText
    }

    // eslint-disable-next-line
    if (response.status == 200) {
      return Promise.resolve(data)
    } else {
      return Promise.reject(data)
    }
  })
}

export { asynchRequest }
