import store from '../components/store'

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

// retry the request after updating the token if it fails with 401
function retryRequestIfToken (URL, HEADERS = {}, BODY = '', METHOD = 'post', RETRY = 1) {
  return asynchRequest(URL, HEADERS, BODY, METHOD).then(data => {
    return Promise.resolve(data)
  }).catch(function (error) {
    RETRY -= 1
    if (RETRY < 0) {
      return Promise.reject(error)
    }
    // eslint-disable-next-line
    if (error.status == 401) {
      store.dispatch('refreshAccessToken', { url: 'http://localhost:8080/login' }).then(() => {
        return retryRequestIfToken(URL, HEADERS, BODY, METHOD, RETRY)
      }).catch(error => {
        return Promise.reject(error)
      })
    } else {
      return Promise.reject(error)
    }
  })
}

export { asynchRequest, retryRequestIfToken }
