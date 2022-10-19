<template>
  <div>
    <div class="source">
      <el-page-header content="添加单位" @back="back" />
    </div>
    <div>
      <el-row>
        <el-form ref="form" :model="form = post" label-width="120px" :inline="false" class="demo-form-inline">
          <el-form-item label="单位名称">
            <el-input v-model="form.postName" />
          </el-form-item>
          <el-form-item label="单位代码">
            <el-input v-model="form.postCode" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加单位</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { createPost } from '@/api/baseparameter'

export default {
  name: 'AddPost',
  data() {
    return {
      post: {
        postName: '',
        postCode: ''
      }
    }
  },
  methods: {
    back() {
      this.$emit('ifUpdateChange', false)
    },
    onSubmit() {
      createPost({ post }).then(res => {
        // this.$router.go(0)
        this.$alert(res.data, '提示', {
          confirmButtonText: '确定',
          type: 'info',
          showClose: false
        }).then(() => {
          this.$router.go(0)
        })
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.source {
  padding: 24px;
}
</style>
