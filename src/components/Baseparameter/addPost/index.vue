<template>
  <div>
    <div class="source">
      <el-page-header content="添加单位" @back="back" />
    </div>
    <div class="source">
      <el-row>
        <el-form ref="postForm" :model="postForm = post" label-width="120px" :inline="false" class="demo-form-inline" :rules="rules">
          <el-form-item label="单位名称" prop="postName">
            <el-col :span="10">
              <el-input v-model="postForm.postName" />
            </el-col>
          </el-form-item>
          <el-form-item label="单位代码" prop="postCode">
            <el-col :span="10">
              <el-input v-model="postForm.postCode" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(postForm)">添加单位</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { createPost, checkPostName, checkPostCode } from '@/api/baseparameter'

export default {
  name: 'AddPost',
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('单位不能为空'))
      } else {
        this.getNameRules()
        if (!this.nameRules) {
          callback(new Error('单位已存在，请重新输入'))
          this.post.postName = ''
        } else {
          callback()
        }
      }
      callback()
    }
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('单位代码不能为空'))
      } else {
        this.getCodeRules()
        if (!this.codeRules) {
          callback(new Error('单位代码已存在，请重新输入'))
          this.post.postCode = ''
        } else {
          callback()
        }
      }
      callback()
    }
    return {
      nameRules: false,
      codeRules: false,
      post: {
        postName: '',
        postCode: ''
      },
      rules: {
        postName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
          {
            validator: checkName, trigger: 'blur'
          }
        ],
        postCode: [
          { required: true, message: '请输入单位代码', trigger: 'blur' },
          {
            validator: checkCode, trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    back() {
      this.$emit('ifUpdateChange', false)
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const post = { ...this.post }
          createPost(post).then(res => {
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 验证用户名是否存在
    getNameRules() {
      const params = {
        postName: this.post.postName
      }
      checkPostName(params).then((res) => {
        if (res.data.valid === true) {
          this.nameRules = true
        } else {
          this.nameRules = false
        }
      })
    },
    getCodeRules() {
      const params = {
        postCode: this.post.postCode
      }
      checkPostCode(params).then((res) => {
        if (res.data.valid === true) {
          this.codeRules = true
        } else {
          this.codeRules = false
        }
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
