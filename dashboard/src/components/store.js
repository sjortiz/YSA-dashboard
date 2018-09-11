import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  accessToken: '',
  refreshToken: '',
  tokenState: ''
}

const getters = {
  retrieveToken () {
    return state.accessToken
  }
}

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const actions = {
  requestInitialTokens ({ commit }, params) {
    return new Promise((resolve, reject) => {
      fetch(params.url, {
        method: 'post',
        headers: HEADERS,
        body: JSON.stringify(params.credentialsDict)
      }).then(response => {
        this.tokenState = 'requesting'
        // eslint-disable-next-line
        if (response.status == 200) {
          this.hasError = false
        } else {
          this.hasError = true
        }
        return response.json()
      }).then(data => {
        if (this.hasError) {
          return reject(data.errors[0])
        } else {
          commit('setAccessToken', data.access_token)
          commit('setRefreshToken', data.refresh_token)
          commit('setTokenStatus', 'set')
          resolve()
        }
      })
    })
  },
  refreshAccessToken ({ commit }, params) {
    return new Promise((resolve, reject) => {
      fetch(params.url, {
        method: 'put',
        headers: { ...HEADERS, 'Authorization': 'Bearer ' + state.refreshToken },
        body: '{}'
      }).then(response => {
        this.tokenState = 'requesting'
        // eslint-disable-next-line
        if (response.status == 200) {
          this.hasError = false
        } else {
          this.hasError = true
        }
        return response.json()
      }).then(data => {
        if (this.hasError) {
          console.log(data)
          return reject(data)
        } else {
          commit('setAccessToken', data.access_token)
          commit('setTokenStatus', 'set')
          resolve()
        }
      })
    })
  }
}

const mutations = {
  setAccessToken (state, token) {
    state.accessToken = token
  },
  setRefreshToken (state, token) {
    state.refreshToken = token
  },
  setTokenStatus (state, status) {
    state.tokenState = status
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
