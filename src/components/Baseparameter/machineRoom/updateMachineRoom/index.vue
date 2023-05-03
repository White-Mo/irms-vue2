<template>
  <div>
    <div style='height:30px'>
      <el-page-header content='修改机房' @back='back'/>
    </div>
    <div>
      <el-row>
        <el-form ref='machineRoomFrom' :model='machineRoomFrom = this.machineRoom' label-width='120px' :rules='rules' :inline='false'>
          <el-form-item label='机房名称' prop='machineRoomName'>
            <el-col>
              <el-input v-model='machineRoomFrom.machineRoomName'/>
            </el-col>
          </el-form-item>
          <el-form-item label='所属单位' prop='postName'>
            <el-col>
              <el-select v-model='machineRoomFrom.postName' @change='changePost'>
                <el-option
                  v-for='item in postAll'
                  :key='item.value'
                  :value='item.postName'
                  >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label='机房占地面积' prop='machineArea'>
            <el-col>
              <el-input v-model='machineRoomFrom.machineArea'/>
            </el-col>
          </el-form-item>
          <el-form-item label='机房地址' prop='machineLocation'>
            <el-col>
              <el-input v-model='machineRoomFrom.machineLocation'/>
            </el-col>
          </el-form-item>
          <el-form-item label='机房管理员' prop='machineAdministrator'>
            <el-col>
              <el-input v-model='machineRoomFrom.machineAdministrator'/>
            </el-col>
          </el-form-item>
          <el-form-item v-show="currentShow === '3'">
            <el-button type='primary' @click="onSubmit('machineRoomFrom')">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getPost } from "@/api/select";
import { checkMachineRoomName } from "@/api/baseparameter"
import { updataMachineRoomAction } from "@/api/baseparameter"

export default {
  name: "updateMachineRoom",
  components:{

  },
  props: {
    row: {
      type: Object,
      required: true
    },
    currentShow: {
      type: String,
      required: true
    }
  },
  created() {
    this.initMachineRoom()
    getPost().then(response => {
      console.log(response)
      this.postAll = response.data.items
      console.log(this.postAll, 2)
    })
  },
  data() {
    var checkName = async (rule, value, callback) => {
      if(!value) {
        return callback(new Error('机房不能为空'))
      } else {
        await this.getNameRules()
        if (!this.nameRules) {
          callback(new Error('机房已存在，请重新输入'))
        } else {
          callback()
        }
      }
      callback()
    }
    return {
      nameRules: false,
      postAll: [],
      machineRoom: {
        MachineRoomName:"",
        machineRoomId:"",
        postId: "",
        status: "",
        machineArea:'',
        machineLocation:'',
        machineAdministrator:'',
      },
      rules: {
        machineRoomName: [
          {required: true, message: '请输入机房名称', trigger: 'blur'},
          {
            // validator : checkName, trigger: 'blur'
          }
        ],
        postName: [
          {required: true, message: '请选择单位名称', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    back() {
      this.$emit('changeDiv', '0')
    },
    onSubmit(formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const machineRoom = {...this.machineRoom }
          updataMachineRoomAction(machineRoom).then(res => {
            this.$alert("更新成功",'提示', {
              confirmButtonText: '确定',
              type: 'info',
              showClose: false
            }).then(() => {
              this.back()
            })
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!!');
          return false
        }
      })
    },
    changePost(val) {
      this.postAll.forEach(element => {
        if (element.postName == val) {
          this.machineRoom.postId=element.postId
        }
      })
    },
    initMachineRoom() {
      this.machineRoom=this.row
    },
    async getNameRules() {
      const machineRoom = {...this.machineRoom}
      await checkMachineRoomName(machineRoom).then((res) => {
        console.log(res)
        if (res.data.valid === true) {
          this.nameRules = true
        } else {
          this.nameRules = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
