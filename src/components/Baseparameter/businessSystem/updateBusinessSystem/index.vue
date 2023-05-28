<template>
  <div class="editBusinessSystem-panel">
    <div class="edit-business-system">
      <el-page-header content="编辑业务系统" @back="back" />
    </div>
    <div class="edit-business-system">
      <el-row>
        <el-form ref="editInBusinessSystemFormation" :model="editInBusinessSystemFormation" label-width="150px" :inline="false" :rules="rules">
          <el-form-item label="所属单位" prop="postName">
            <el-col :span="10">
              <el-select v-model="editInBusinessSystemFormation.postName" @change="changePost":popper-append-to-body ="false">
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
              <el-select v-model="editInBusinessSystemFormation.departmentName" placeholder="请选择">
                <el-option
                  v-for="item in departmentAll"
                  :key="item.value"
                  :value="item.departmentName"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="所属业务系统" prop="businessSystemFirstName">
            <el-col :span="10">
              <el-select v-model="editInBusinessSystemFormation.businessSystemFirstName" filterable placeholder="请选择":popper-append-to-body ="false">
                <el-option
                  v-for="item in businessSystemFirst"
                  :key="item.value"
                  :value="item.businessSystemFirstName"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="业务子系统等级" prop="businessSystemLevel">
            <el-col :span="10">
              <el-select v-model="editInBusinessSystemFormation.businessSystemLevel">
                <el-option
                  v-for="item in level"
                  :value="item.sonSystemLevel"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="业务子系统名称" prop="businessSystemName">
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
import {
  checkBusinessSystemName,
  getAllFirstLevelBusinessSystem,
  getFirstLevelBusinessSystemByPostId,
  updateBusinessSystemAction
} from '@/api/baseparameter'
import {getDepartment, getPost} from "@/api/select";
import user from "@/store/modules/user";

export default {
  name:'addBusinessSystem',
  props: ['row'],
  data(){
    const checkName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('业务系统不能为空'))
      }  else {
          callback()
        }
    };
    return{
      roleid: user.state.roleid,
      postAll: [],
      departmentAll: [],
      businessSystemFirst:[],
      level:[{
        sonSystemLevel: '一级'
      },{
        sonSystemLevel: '二级'
      },{
        sonSystemLevel: '三级'
      },{
        sonSystemLevel: '未定级'
      },],
      editInBusinessSystemFormation:{
        postName:this.row.postName,
        departmentName:this.row.departmentName,
        businessSystemLevel:this.row.businessSystemLevel,
        businessSystemName:this.row.businessSystemName,
        oldBusinessSystemName:this.row.businessSystemName,
        oldBusinessSystemId:this.row.businessSystemId,
        businessSystemFirstName:this.row.businessSystemFirstName,

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
          {validator: checkName, trigger: 'blur'}
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
    })
    getDepartment(this.roleid).then(response => {
      this.departmentAll = response.data.items
    })
    getFirstLevelBusinessSystemByPostId(this.roleid).then(response =>{
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
          const editInBusinessSystemFormation = { ...this.editInBusinessSystemFormation }
          console.log("*****---",editInBusinessSystemFormation)
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
      this.editInBusinessSystemFormation.businessSystemFirstName = ''
      this.postAll.forEach(element => {
        if (element.postName === val) {
          getDepartment(element.postId).then(response => {
            this.departmentAll = response.data.items
            this.editInBusinessSystemFormation.departmentName = this.departmentAll[0].departmentName
          })
          getFirstLevelBusinessSystemByPostId(element.postId).then(response =>{
            this.businessSystemFirst = response.data.items
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
/deep/.el-select-dropdown__list{
  width: 900px;
}
/deep/.el-select-dropdown__item{
  height: 27px;
}
/deep/ .el-popper{
  top: -120px !important;
}

</style>
