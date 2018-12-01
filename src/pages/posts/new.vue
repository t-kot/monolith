<style lang='css'>
.button {
  text-align: right;
}

</style>

<template>
  <el-container>
    <el-header>
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
          <el-button primary @click='onSaveBody'>Save</el-button>
        </el-col>
      </el-row>
      <mavon-editor v-model='body' language='en'></mavon-editor>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      body: '',
    }
  },
  methods: {
    onSaveBody() {
      const filepath = 'posts1.json'
      const blockstack = global.blockstack

      blockstack.putFile(filepath, JSON.stringify({
        title: this.title,
        body: this.body,
      }))
    }
  }
}
</script>
