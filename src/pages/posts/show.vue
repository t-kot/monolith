<template>
  <div class="posts-show">
    <div class="post-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/posts' }">記事一覧</el-breadcrumb-item>
        <el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h1 class='post-title'>{{ post.title }}</h1>
      <p class="created-at">{{ post.createdAt }}</p>
    </div>
    <div class="post-body" v-html='postBody'>
    </div>
    </div>
  </div>
</template>

<script>
import markdownIt from '../../plugins//markdown-it'
import hljs from '../../plugins/hljs'

export default {
  mounted() {
    window.hljs = hljs
  },
  computed: {
    post() {
      const id = this.$route.params.id
      const _post = this.$store.getters.findPost(id)
      if (!_post) {
        return { title: '', body: '' }
      }
      return _post
    },
    postBody() {
      return markdownIt.render(this.post.body)
    }
  }
}
</script>
