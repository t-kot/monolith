<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<style scoped>
.header {
  border-bottom: 1px solid #eee;
  padding: 5px 10px;
}
.header-signin {
  text-align: right;
}
.header-signin .avatar {
  border: 1px solid #eee;
  border-radius: 50%;
}
</style>


<template>
  <div id="app">
    <el-container>
      <el-header class='header' height='auto'>
        <div class="header-signin" v-if='this.$store.getters.isAuthenticated'>
          <img class='avatar' :src='$store.getters.authUser.imageUrl' alt="avatar" :width='48' :height='48'>
          <a href="#" @click="$store.dispatch('signOut')">sign out</a>
        </div>
        <div class="header-guest" v-else>
          <a href="#" @click="$store.dispatch('signIn')">sign in</a>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
  },
}
</script>
