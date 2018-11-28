<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    // const blockstack = this.blockstack
    // if (blockstack.isUserSignedIn()) {
    //   const userData = blockstack.loadUserData()
    //   this.user = new blockstack.Person(userData.profile)
    //   console.log(userData)
    // } else if (blockstack.isSignInPending()) {
    //   blockstack.handlePendingSignIn().then(userdata => {
    //     window.location = window.location.origin
    //   })
    // }
  },
  data () {
    return {
      blockstack: window.blockstack,
      user: null,
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
