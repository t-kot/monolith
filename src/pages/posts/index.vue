<template>
  <div class="post-list">
    <h1>Post List</h1>
    <el-button @click="$router.push('/posts/new')" round type='primary'>Add</el-button>

    <div class="posts">
      <div class="post-item" v-for='post in posts' :key='post.id'>
        <h1>
          <router-link :to="'/posts/' + post.id">{{ post.title }}</router-link>
        </h1>
        <el-button type="danger" @click="deletePost(post)">削除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('loadPosts')
  },
  computed: {
    posts() {
      return this.$store.state.posts
    }
  },
  methods: {
    deletePost(post) {
      this.$store.dispatch('deletePost', { post })
    }
  }
}
</script>

