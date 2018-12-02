<style lang='css'>
.button {
  text-align: right;
}

</style>

<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/posts' }">記事一覧</el-breadcrumb-item>
        <el-breadcrumb-item>新規作成</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>New Post</h1>
    </el-header>
    <el-main>
      <el-row type='flex' justify="space-between">
        <el-col :span=15>
          <el-form>
            <el-form-item>
              <el-input placeholder="title" v-model='title'></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span=2 class='button'>
          <el-button primary @click="createPost">Save</el-button>
        </el-col>
      </el-row>
      <mavon-editor v-model='body' language='en'></mavon-editor>
    </el-main>
  </el-container>
</template>

<script>
export default {
  computed: {
    title: {
      get() {
        return this.$store.state.postForm.title
      },
      set (val) {
        this.$store.commit('updatePostForm', { attr: 'title', val })
      }
    },
    body: {
      get() {
        return this.$store.state.postForm.body
      },
      set (val) {
        this.$store.commit('updatePostForm', { attr: 'body', val })
      }
    }
  },
  methods: {
    async createPost() {
      try {
        const post = await this.$store.dispatch('createPost')
        this.$message.info('作成しました')
        this.$router.push(`/posts/${post.id}`)
      } catch (e) {
        console.error(e)
        this.$message.error('失敗しました')
      }
    }
  }
}
</script>
