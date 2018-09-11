import Vue from 'vue'
import Vuex from 'vuex'
import { asynchRequest } from '../utils/utils'

Vue.use(Vuex)

const state = {
  accessToken: '',
  refreshToken: '',
  tokenState: '',
  HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

const getters = {
  retrieveToken () {
    return { 'Authorization': `Bearer ${state.accessToken}` }
  },
  retrieveRefresh () {
    return { 'Authorization': `Bearer ${state.refreshToken}` }
  },
  retrieveHeaders () {
    return state.HEADERS
  },
  retrieveHeadersWithToken () {
    return { ...getters.retrieveHeaders(), ...getters.retrieveToken() }
  },
  retrievieHeadersWithRefres () {
    return { ...getters.retrieveHeaders(), ...getters.retrieveRefresh() }
  }
}

const actions = {
  requestInitialTokens ({ commit }, { url, credentialsDict }) {
    return asynchRequest(url, getters.retrieveHeaders(), credentialsDict).then(data => {
      commit('setAccessToken', data.access_token)
      commit('setRefreshToken', data.refresh_token)
      commit('setTokenStatus', 'set')
      return Promise.resolve()
    }).catch(data => {
      return Promise.reject(data)
    })
  },
  refreshAccessToken ({ commit }, { url }) {
    return asynchRequest(url, getters.retrievieHeadersWithRefres(), '', 'put').then(data => {
      commit('setAccessToken', data.access_token)
      commit('setTokenStatus', 'set')
      return Promise.resolve()
    }).catch(data => {
      return Promise.reject(data)
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
