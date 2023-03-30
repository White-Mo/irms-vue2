<template>
  <div class="addFirstLevelBusinessSystem-panel">
    <div class="add-business-system">
      <el-page-header content="添加一级业务系统" @back="back" />
    </div>
    <div class="add-business-system">
      <el-row>
        <el-form ref="addInformation" :model="addInformation" label-width="140px" :inline="false" :rules="rules">
          <el-form-item label="一级业务系统名称" prop="businessSystemFirstName">
            <el-col :span="10">
              <el-input v-model="addInformation.businessSystemFirstName" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('addInformation')">添加一级业务系统</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import {checkFirstLevelBusinessSystemName, createFirstLevelBusinessSystem} from '@/api/baseparameter'
export default {
  name:'addFirstLevelBusinessSystem',
  data(){
    const checkName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('一级业务系统不能为空'))
      } else {
        await this.getNameRules()
        if (!this.nameRules) {
          callback(new Error('该一级业务系统已存在，请重新输入'))
        } else {
          callback()
        }
      }
      callback()
    };
    return{
      roleId:this.$store.state.user.roleid,
      addInformation:{
        businessSystemFirstName:'',
        postId:this.roleId
      },
      rules: {
        businessSystemFirstName:[
          { required: true, message: '请输入一级业务系统名称', trigger: 'blur' },
          {validator: checkName, trigger: 'blur'}
        ]
      }

    }
  },
  created() {
    console.log("单位：",this.roleId);

  },
  methods:{
    back() {
      this.$emit('changeDiv', '0')
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addInformation.postId = this.roleId
          const params = this.addInformation
          console.log("-----",params)
          createFirstLevelBusinessSystem(params).then(res => {
            console.log("--------------------",res)
            this.$alert("提交成功", '提示', {
              confirmButtonText: '确定',
              type: 'info',
              showClose: false
            }).then(() => {
              this.back()
            })
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false;
        }
      });
    },

    // 验证添加的业务系统是否存在
    async getNameRules() {
      const businessSystemFirstName = this.addInformation.businessSystemFirstName
      await checkFirstLevelBusinessSystemName(businessSystemFirstName).then((res) => {
        console.log(res)
        if (res.data.valid === true) {
          this.nameRules = true
        } else {
          this.nameRules = false
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.add-business-system{
  padding: 24px;
}
</style>
