<template>
  <div class="addBusinessSystem-panel">
    <div class="add-business-system">
      <el-page-header content="添加业务系统" @back="back" />
    </div>
    <div class="add-business-system">
      <el-row>
        <el-form ref="addInformation" :model="addInformation" label-width="140px" :inline="false" :rules="rules">
          <el-form-item label="所属单位" prop="postName">
            <el-col :span="10">
              <el-select v-model="addInformation.postName" @change="changePost">
                <el-option
                  v-for="item in postAll"
                  :key="item.value"
                  :value="item.postName"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="所属部门" prop="departmentName">
            <el-col :span="10">
              <el-select v-model="addInformation.departmentName" placeholder="请选择">
                <el-option
                  v-for="item in departmentAll"
                  :key="item.value"
                  :value="item.departmentName"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="所属一级业务系统" prop="businessSystemFirstName">
            <el-col :span="10">
              <el-select v-model="addInformation.businessSystemFirstName" placeholder="请选择">
                <el-option
                  v-for="item in businessSystemFirst"
                  :key="item.value"
                  :value="item.businessSystemFirstName"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="业务系统等级" prop="businessSystemLevel">
            <el-col :span="10">
              <el-input v-model="addInformation.businessSystemLevel" />
            </el-col>
          </el-form-item>
          <el-form-item label="业务系统名称" prop="businessSystemName">
            <el-col :span="10">
              <el-input v-model="addInformation.businessSystemName" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('addInformation')">添加业务系统</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import {checkBusinessSystemName, createBusinessSystem, getAllFirstLevelBusinessSystem} from '@/api/baseparameter'
import {getDepartment, getPost} from "@/api/select";
import user from "@/store/modules/user";

export default {
  name:'addBusinessSystem',
  data(){
    const checkName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('业务系统不能为空'))
      } else {
        await this.getNameRules()
        if (!this.nameRules) {
          callback(new Error('该业务系统已存在，请重新输入'))
        } else {
          callback()
        }
      }
      callback()
    };
    return{
      roleid: user.state.roleid,
      postAll: [],
      departmentAll: [],
      businessSystemFirst:[],
      addInformation:{
        postName:'',
        departmentName:'',
        businessSystemLevel:'',
        businessSystemName:'',
        businessSystemFirstName:'',
      },
      rules: {
        postName: [
          {required:true,message: '请选择单位',trigger:'blur'},
        ],
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
        ],
        businessSystemLevel: [
          { required: true, message: '请输入业务系统等级', trigger: 'blur' },
        ],
        businessSystemName:[
          { required: true, message: '请输入业务系统名称', trigger: 'blur' },
          {
            validator: checkName, trigger: 'blur'
          }
        ],
        businessSystemFirstName:[
          { required: true, message: '请输入一级业务系统名称', trigger: 'blur' },
        ]
      }

    }
  },
  created() {
    getPost().then(response => {
      this.postAll = response.data.items
      this.postAll.forEach(element => {
        if (element.postId === this.roleid) {
          this.addInformation.postName = element.postName
        }
      })
    })
    getDepartment(this.roleid).then(response => {
      this.departmentAll = response.data.items
      this.addInformation.departmentName = this.departmentAll[0].departmentName
    })
    getAllFirstLevelBusinessSystem().then(response=>{
      this.businessSystemFirst = response.data.items
    })

  },
  methods:{
    back() {
      this.$emit('changeDiv', '0')
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const addInformation = { ...this.addInformation }
          console.log(addInformation)
          createBusinessSystem(addInformation).then(res => {
            this.$alert("提交成功", '提示', {
              confirmButtonText: '确定',
              type: 'info',
              showClose: false
            }).then(() => {
              this.back()
            })
            //console.log(res)
          }).catch(err => {
            //console.log(err)
          })
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },

    // 验证添加的业务系统是否存在
    async getNameRules() {
      const addInformation = { ...this.addInformation }
      await checkBusinessSystemName(addInformation).then((res) => {
        if (res.data.valid === true) {
          this.nameRules = true
        } else {
          this.nameRules = false
        }
      })
    },

    changePost(val) {
      //console.log(val)
      this.postAll.forEach(element => {
        if (element.postName === val) {
          getDepartment(element.postId).then(response => {
            this.departmentAll = response.data.items
            this.addInformation.departmentName = this.departmentAll[0].departmentName
          })
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
