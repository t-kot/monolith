<template>
  <div class="posts-show">
    <div class="post-detail" v-if='post'>
      <h1 class='post-title'>{{ post.title }}</h1>
      <div class="post-body" v-html='postBody'>
      </div>
    </div>
  </div>
</template>

<script>
import markdownIt from '../../plugins//markdown-it'
import hljs from '../../plugins/hljs'

const loadScript = (src) => {
  const head = document.querySelector('head')
  const script = document.createElement('script')
  script.src = src
  head.appendChild(script)
}

export default {
  mounted() {
    this.$store.dispatch('loadPosts')
    window.hljs = hljs
  },
  computed: {
    post() {
      const id = this.$route.params.id
      return this.$store.getters.findPost(id)
    },
    postBody() {
      return markdownIt.render(this.post.body)
    }
  }
}
</script>
