<!--<template>
  <div class="editBusinessSystem-panel">
    <div class="edit-business-system">
      <el-page-header content="业务系统信息" @back="back" />
    </div>
    <div class="edit-business-system">
      <el-row>
        <el-form ref="editInBusinessSystemFormation" :model="editInBusinessSystemFormation" label-width="120px" :inline="false" class="demo-form-inline" :rules="rules">
          <el-form-item label="所属单位" prop="postName">
            <el-col :span="10">
              <el-select v-model="editInBusinessSystemFormation.postName" @change="changePost">
                <el-option
                  v-for="item in postAll"
                  :key="item.value"
                  :value="item.postName"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="部门名称" prop="departmentName">
            <el-col :span="10">
              <el-select v-model="editInBusinessSystemFormation.departmentName" placeholder="请选择">
                <el-option
                  v-for="item in departmentAll"
                  :key="item.value"
                  :value="item.departmentName"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="业务系统等级" prop="businessSystemLevel">
            <el-col :span="10">
              <el-input v-model="editInBusinessSystemFormation.businessSystemLevel" />
            </el-col>
          </el-form-item>
          <el-form-item label="业务系统名称" prop="businessSystemName">
            <el-col :span="10">
              <el-input v-model="editInBusinessSystemFormation.businessSystemName" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('editInBusinessSystemFormation')">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>

  </div>
</template>

<script>
import {updateBusinessSystemAction} from "@/api/baseparameter";
import {getDepartment, getPost} from "@/api/select";
import user from "@/store/modules/user";

export default {
  name:'updateBusinessSystem',
  created() {
    getPost().then(response => {
      this.postAll = response.data.items
      console.log(this.postAll)
      this.postAll.forEach(element => {
        if (element.postId === this.roleid) {
          //console.log(element.postName)
          this.editInBusinessSystemFormation.postName = element.postName
        }
      })
    })
    getDepartment(this.roleid).then(response => {
      this.departmentAll = response.data.items
      this.editInBusinessSystemFormation.departmentName = this.departmentAll[0].departmentName
    })
  },
  data(){
    return{
      roleid: user.state.roleid,
      postAll: [],
      departmentAll: [],
      editInBusinessSystemFormation:{
        postName:'',
        departmentName:'',
        businessSystemLevel:'',
        businessSystemName:''
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
        ]
      }

    }
  },
  methods:{
    back() {
      this.$emit('changeDiv', '0')
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const editInBusinessSystemFormation = { ...this.editInBusinessSystemFormation }
          updateBusinessSystemAction(editInBusinessSystemFormation).then(res => {
            this.$alert("修改成功", '提示', {
              confirmButtonText: '确定',
              type: 'info',
              showClose: false
            }).then(() => {
              this.back()
            })
            //console.log(res)
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('提交失败!');
          return false;
        }
      });
    },

    changePost(val) {
      //console.log(val)
      this.postAll.forEach(element => {
        if (element.postName === val) {
          getDepartment(element.postId).then(response => {
            this.departmentAll = response.data.items
            this.editInBusinessSystemFormation.departmentName = this.departmentAll[0].departmentName
          })
        }
      })
    },
  }
}
</script>



<style>
.edit-business-system {
  padding: 24px;
}
</style>-->










<template>
  <div class="editBusinessSystem-panel">
    <div class="edit-business-system">
      <el-page-header content="编辑业务系统" @back="back" />
    </div>
    <div class="edit-business-system">
      <el-row>
        <el-form ref="editInBusinessSystemFormation" :model="editInBusinessSystemFormation" label-width="120px" :inline="false" :rules="rules">
          <el-form-item label="所属单位" prop="postName">
            <el-col :span="10">
              <el-select v-model="editInBusinessSystemFormation.postName" @change="changePost">
                <el-option
                  v-for="item in postAll"
                  :key="item.value"
                  :value="item.postName"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="部门名称" prop="departmentName">
            <el-col :span="10">
              <el-select v-model="editInBusinessSystemFormation.departmentName" placeholder="请选择">
                <el-option
                  v-for="item in departmentAll"
                  :key="item.value"
                  :value="item.departmentName"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="业务系统等级" prop="businessSystemLevel">
            <el-col :span="10">
              <el-input v-model="editInBusinessSystemFormation.businessSystemLevel"  placeholder="请选择"/>
            </el-col>
          </el-form-item>
          <el-form-item label="业务系统名称" prop="businessSystemName">
            <el-col :span="10">
              <el-input v-model="editInBusinessSystemFormation.businessSystemName" />
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('editInBusinessSystemFormation')">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import {updateBusinessSystemAction} from '@/api/baseparameter'
import {getDepartment, getPost} from "@/api/select";
import user from "@/store/modules/user";

export default {
  name:'addBusinessSystem',
  props: ['row'],
  created() {
    getPost().then(response => {
      this.postAll = response.data.items
      console.log(this.postAll)
      this.postAll.forEach(element => {
        if (element.postId === this.roleid) {
          //console.log(element.postName)
          this.editInBusinessSystemFormation.postName = element.postName
        }
      })
    })
    getDepartment(this.roleid).then(response => {
      this.departmentAll = response.data.items
      this.editInBusinessSystemFormation.departmentName = this.departmentAll[0].departmentName
    })
  },

  mounted() {

  },

  data(){
    return{
      roleid: user.state.roleid,
      postAll: [],
      departmentAll: [],
      editInBusinessSystemFormation:{
        postName:'',
        departmentName:'',
        businessSystemLevel:this.row.businessSystemLevel,
        businessSystemName:this.row.businessSystemName,
        oldBusinessSystemName:this.row.businessSystemName,
        oldBusinessSystemId:this.row.businessSystemId
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
        ]
      }

    }
  },
  methods:{
    back() {
      this.$emit('changeDiv', '0')
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const editInBusinessSystemFormation = { ...this.editInBusinessSystemFormation }
          updateBusinessSystemAction(editInBusinessSystemFormation).then(res => {
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

    changePost(val) {
      //console.log(val)
      this.postAll.forEach(element => {
        if (element.postName === val) {
          getDepartment(element.postId).then(response => {
            this.departmentAll = response.data.items
            this.editInBusinessSystemFormation.departmentName = this.departmentAll[0].departmentName
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.edit-business-system{
  padding: 24px;
}
</style>
