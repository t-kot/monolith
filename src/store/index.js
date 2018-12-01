import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const blockstack = require('blockstack')

const createStore = () => {
  return new Vuex.Store({
    state: {
      postForm: {
        title: '',
        body: '',
      },
      auth: {
        status: 'not', // pending, signin
        person: null,
      },
    },
    getters: {
      isAuthenticated(state) {
        return state.auth.status === 'signin'
      }
    },
    mutations: {
      setAuthPerson(state, person) {
        state.auth.person = person
      },
      setAuthStatus(state, status) {
        state.auth.status = status
      },
    },
    actions: {
      init({ commit }) {
        if (blockstack.isUserSignedIn()) {
          const userData = blockstack.loadUserData()
          const person = new blockstack.Person(userData.profile)
          commit('setAuthPerson', person)
          commit('setAuthStatus', 'signin')
        } else if (blockstack.isSignInPending()) {
          commit('setAuthStatus', 'pending')
          blockstack.handlePendingSignIn().then(userdata => {
            debugger
            window.location = window.location.origin
          })
        }
      },
      authenticate({ commit }) {
        const redirectURI = `${window.location.origin}`
        const manifestURI = `${window.location.origin}/static/manifest.json`
        const scope = ['store_write']
        blockstack.redirectToSignIn(redirectURI, manifestURI, scope)
      },
    }
  })
}

export default createStore
