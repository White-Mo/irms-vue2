<template>
  <div class='app-container'>
    <div class='show'>
      <el-row>
        <el-col :span='24'>
          <div class='grid-content bg-purple-dark'>信息数据导入</div>
        </el-col>
      </el-row>
      <el-row
        :gutter='10'
        class='bg-condition'
      >
        <el-row class='grid-content'>
          <el-col :span='22'>
            <el-upload
              ref='upload'
              class='upload-demo'
              action='/api/upload'
              :multiple='false'
              :on-change='handleChange'
              :on-remove='handleRemove'
              :file-list='fileList'
              :auto-upload='false'
            >
              <el-button slot='trigger' size='large' type='primary' icon='el-icon-printer'>导入综合表文件</el-button>
              <el-button style='margin-left:10px' size='large' type='primary' @click='downloadFile()'
                         icon='el-icon-download'>下载模板
              </el-button>
              <el-button size='large' type='success' @click='checkoutFile' icon='el-icon-upload el-icon--right'>
                上传文件
              </el-button>
              <div slot='tip' class='el-upload__tip'>只能上传Excel文件</div>
            </el-upload>
          </el-col>
          <el-col :span='1'>
            <el-button size='larger' type='info' @click='switchPage' icon='el-icon-s-release'>详情表导入</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-row>
            <div class='grid-content'>
              上传进度
              <el-progress
                :percentage='percent'
                :text-inside='true'
                :stroke-width='20'
              ></el-progress>
            </div>
          </el-row>
        </el-row>
      </el-row>
      <el-row>
        <el-table
          :data='this.tableData'
          style='width: 100%'>
          <el-table-column
            align='center'
            prop='equipmentId'
            label='设备编号'
          >
          </el-table-column>
          <el-table-column
            align='center'
            prop='errorType'
            label='错误类型'
          >
          </el-table-column>
          <el-table-column
            align='center'
            prop='errorData'
            label='错误内容'
          >
          </el-table-column>
        </el-table>
      </el-row>
    </div>
  </div>

</template>


<script>

import { getEquipment, getRowEquipment, importfile } from '@/utils/xlsx'
import { addEquipment, AddExcel } from '@/api/table'

export default {
  name: 'horizontalTable',
  data() {
    return {
      value: '资产统计综合表',
      fileList: [],
      checkList: [],
      tableData: [],
      repalyInfo: [],
      uploadResult: {
        success: 0,
        fail: 0,
        noReturn: 0,
        total: 0
      },
      percent: 0
    }
  },
  methods: {
    switchPage() {
      this.$parent.switchPage()
    },
    handleChange(file) {
      this.fileList = []
      this.repalyInfo = []
      const types = file.name.split('.')[1]
      this.fileTemp = file.raw
      if (this.fileTemp) {
        if ((types === 'xlsx') || (types === 'xls') || (types === 'csv')) {
          let obj = {
            name: file.name,
            value: file.raw
          }
          this.fileList.push(obj)
          // console.log(this.fileList)
        } else {
          this.$message({
            type: 'warning',
            message: '附件格式错误，请重新上传！'
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请上传附件！'
        })
      }
    },
    handleRemove(fileList) {
      this.fileList = fileList
    },
    // 确认文件
    checkoutFile() {
      this.checkList = this.fileList
      this.submitUpload()
      this.fileList = []
      this.uploadResult.fail = 0
      this.uploadResult.success = 0
      this.uploadResult.noReturn = 0
      this.uploadResult.total = 0
    },

    /**
     * 读取文件并发送请求
     * @returns {Promise<void>}
     */
    async submitUpload() {
      let start = new Date().getTime()
      // let submitSuccess = []
      let submitFail = []
      if (this.checkList.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择文件！'
        })
      } else {
        const outdata = await importfile(this.checkList[0].value, this.value)
        //console.log("@",this.checkList[index].value.name)
        // console.log('文件内容', outdata)


        for (let index = 1; index < outdata.length; index++) {
          const replayInfoRow = {
            equipmentId: '',
            errorType: '',
            errorData: ''
          }
          const { equipment, readStatus } = getRowEquipment([outdata[index]])
          // console.log(equipment)
          if (readStatus.length == 0) {
            const equipments = [equipment]
            await AddExcel({ equipments: equipments }).then((res) => {
              this.loading = false
              if (res.status === 200) {
                this.uploadResult.success = this.uploadResult.success + 1
              } else {
                this.uploadResult.fail = this.uploadResult.fail + 1
                replayInfoRow.equipmentId = equipment.equipmentBaseInfo.basicInfoId
                replayInfoRow.errorType = res.message
                replayInfoRow.errorData = JSON.stringify(res.data)
                this.repalyInfo[index - 1] = replayInfoRow
              }
            }).catch((error) => {
              this.uploadResult.noReturn = this.uploadResult.noReturn + 1
              replayInfoRow.equipmentId = equipment.equipmentBaseInfo.basicInfoId
              replayInfoRow.errorType = '未知错误'
              replayInfoRow.errorData = '未知错误'
              this.repalyInfo[index - 1] = replayInfoRow
            })
          } else {
            this.uploadResult.fail = this.uploadResult.fail + 1
            replayInfoRow.equipmentId = equipment.equipmentBaseInfo.basicInfoId
            replayInfoRow.errorData = JSON.stringify(readStatus)
            this.repalyInfo[index - 1] = replayInfoRow
          }
          this.uploadResult.total = this.uploadResult.total + 1
          this.percent = parseFloat((this.uploadResult.total * 100 / (outdata.length - 1)).toFixed(2))
        }
        console.log(this.uploadResult)
        console.log('repaly', this.repalyInfo)
        let useTime = (new Date().getTime() - start) / 1000

        this.$alert('总上传数据' + this.uploadResult.total + '条\n ' +
          '成功' + this.uploadResult.success + '条\n' +
          '失败' + this.uploadResult.fail + '条\n' +
          '未知错误' + this.uploadResult.noReturn + '条\n' +
          '用时' + useTime + '秒', '上传结果统计', {
          confirmButtonText: '确定',
          callback: action => {
            this.percent = 0
            this.tableData = this.repalyInfo
          }
        })
      }
    },
    /**
     * 下载模板
     */
    downloadFile() {
      // templatefile.xlsx存储在public文件夹下
      let a = document.createElement('a')
      a.href = './static/templatefile_row.xlsx'
      a.download = '资产统计综合表(模板).xlsx'
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
  }
}
</script>

<style lang='less' scoped>
.statusTg {
  font-size: 16px;
}

.tile-content {
  padding: 9px;
  margin-bottom: 20px;
}

.shadows {
  box-shadow: 0 0 4px #0000004d !important;
}

.searchInput {
  height: 40px;
  text-align: center;
  color: #0b0c10;
  background-color: #deecff;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-condition {
  line-height: 50px;
  margin: 0px !important;
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.app-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.grid-content {
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}

.font {
  font-size: 18px;
}

.el-cascader .el-input {
  width: 130px;
}

.el-pagination > * {
  font-size: 18px;
}

.block {
  text-align: center;
}
</style>
<style lang='less'>

.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.myel_row {
  margin-bottom: 2px !important;
  background-color: #d3dce6;
  margin-left: 0px !important;
  margin-right: 0px !important;
}

.radio_class {
  display: inline-block;
  height: 2rem;
  width: 100%;
}

</style>
