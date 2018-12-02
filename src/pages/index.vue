<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <el-button type='primary' round @click='handleLogin()'>Login</el-button>
  </div>
</template>

<script>
const blockstack = require('blockstack')

export default {
  name: 'Top',
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.replace('/posts')
    }
  },
  data () {
    return {
      msg: 'Markdown app by blockstack'
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('signIn')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
