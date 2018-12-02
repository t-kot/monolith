import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const blockstack = require('blockstack')
const uuidv4 = require('uuid/v4');
const POSTS_FILE = 'posts.json'

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
      posts: [],
    },
    getters: {
      isAuthenticated(state) {
        return state.auth.status === 'signin'
      },
      authUser(state) {
        const profile = state.auth.person._profile
        return {
          name: profile.name,
          imageUrl: profile.image[0].contentUrl,
          description: profile.description,
        }
      },
      findPost: (state) => (id) => {
        return state.posts.find(post => post.id === id)
      }
    },
    mutations: {
      setAuthPerson(state, person) {
        state.auth.person = person
      },
      setAuthStatus(state, status) {
        state.auth.status = status
      },
      setPosts(state, posts) {
        state.posts = posts
      },
      updatePostForm(state, { attr, val }) {
        state.postForm[attr] = val
      },
      addPost(state, post) {
        state.posts.push(post)
      },
      deletePost(state, post) {
        const idx = state.posts.findIndex(p => p.id === post.id)
        state.posts.splice(state.posts.indexOf(idx), 1)
      }
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
      signIn({ commit }) {
        const redirectURI = `${window.location.origin}`
        const manifestURI = `${window.location.origin}/static/manifest.json`
        const scope = ['store_write']
        blockstack.redirectToSignIn(redirectURI, manifestURI, scope)
      },
      signOut({ commit }) {
        blockstack.signUserOut(window.location.href)
      },
      loadPosts({ commit }) {
        blockstack.getFile(POSTS_FILE).then(postsText => {
          const posts = JSON.parse(postsText || '[]')
          commit('setPosts', posts)
        })
      },
      createPost({ commit, dispatch }) {
        const post = {
          title: this.state.postForm.title,
          body: this.state.postForm.body,
          id: uuidv4(),
        }
        commit('addPost', post)
        dispatch('syncPosts')

        return post
      },
      deletePost({ commit, dispatch }, { post }) {
        commit('deletePost', post)
        dispatch('syncPosts')
      },
      syncPosts({ commit }) {
        blockstack.putFile(POSTS_FILE, JSON.stringify(this.state.posts))
      }
    }
  })
}

export default createStore
