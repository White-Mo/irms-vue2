<template>
  <div class="infobody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>信息资源管理</span></div>
    <div class="app-container">
      <div
        class="show"
      >
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">信息数据导入</div>
          </el-col>
        </el-row>
        <el-row
          :gutter="10"
          class="bg-condition"
        >
          <el-col
            :xs="2"
            :sm="2"
            :md="2"
            :lg="2"
            :xl="2"
          >
            <el-button type="primary" size="large" @click="dialogFormVisible = true">导入Excel文件</el-button>
          </el-col><el-col
            :xs="2"
            :sm="2"
            :md="2"
            :lg="2"
            :xl="2"
          >
          <el-button type="success" size="large" @click="downloadFile()">下载模板</el-button>
          </el-col>
        </el-row>
<!--        <el-table-->
<!--          v-loading="listLoading"-->
<!--          :diisable="true"-->
<!--          :data="list"-->
<!--          element-loading-text="Loading"-->
<!--          border-->
<!--          highlight-current-row-->
<!--          stripe-->
<!--        >-->
<!--          <el-table-column type="index" />-->
<!--          <af-table-column-->
<!--            v-for="(value,key,index) in labels"-->
<!--            :key="index"-->
<!--            align="center"-->
<!--            :label="value"-->
<!--          >-->
<!--            <template slot-scope="scope">-->
<!--              {{ scope.row[key] }}-->
<!--            </template>-->
<!--          </af-table-column>-->
<!--          <el-table-column-->
<!--            align="center"-->
<!--            label="操作"-->
<!--            width="250px"-->
<!--          >-->
<!--            <template slot-scope="scope">-->
<!--              <el-button-->
<!--                size="mini"-->
<!--                @click="handleDetail(scope.$index, scope.row)"-->
<!--              >详情</el-button>-->
<!--              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
<!--              <el-button-->
<!--                size="mini"-->
<!--                type="danger"-->
<!--                text-->
<!--                @click="handleDelete(scope.row)"-->
<!--              >删除</el-button>-->
<!--              &lt;!&ndash;              <el-dialog&ndash;&gt;-->
<!--              &lt;!&ndash;                :append-to-body="true"&ndash;&gt;-->
<!--              &lt;!&ndash;                title="删除提示"&ndash;&gt;-->
<!--              &lt;!&ndash;                :visible.sync="dialogVisible"&ndash;&gt;-->
<!--              &lt;!&ndash;                width="30%"&ndash;&gt;-->
<!--              &lt;!&ndash;              >&ndash;&gt;-->
<!--              &lt;!&ndash;                <span>&ndash;&gt;-->
<!--              &lt;!&ndash;                  你确定要永久删除这条数据吗？&ndash;&gt;-->
<!--              &lt;!&ndash;                </span>&ndash;&gt;-->
<!--              &lt;!&ndash;                <template #footer>&ndash;&gt;-->
<!--              &lt;!&ndash;                  <span class="dialog-footer">&ndash;&gt;-->
<!--              &lt;!&ndash;                    <el-button @click="dialogVisible = false">Cancel</el-button>&ndash;&gt;-->
<!--              &lt;!&ndash;                    <el-button&ndash;&gt;-->
<!--              &lt;!&ndash;                      type="primary"&ndash;&gt;-->
<!--              &lt;!&ndash;                      @click="handleDelete(scope.row)"&ndash;&gt;-->
<!--              &lt;!&ndash;                    >&ndash;&gt;-->
<!--              &lt;!&ndash;                      确认&ndash;&gt;-->
<!--              &lt;!&ndash;                    </el-button>&ndash;&gt;-->
<!--              &lt;!&ndash;                  </span>&ndash;&gt;-->
<!--              &lt;!&ndash;                </template>&ndash;&gt;-->
<!--              &lt;!&ndash;              </el-dialog>&ndash;&gt;-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
      </div>
    </div>
  </div>
</template>

<script>
import {
  getEquipment,
  importfile
} from '@/utils/xlsx'
import { importExcel } from '@/api/import'
import {mapGetters} from "vuex";
export default {
  name: 'Dashboard',
  data() {
    return {
      value: '信息资产基础信息表',
      loading: false,
      // fileTaypes: [{
      //   value: '信息资产基础信息表',
      //   label: '资产信息表'
      // }, {
      //   value: '汇总表',
      //   label: '汇总表'
      // }],
      name: '',
      dialogFormVisible: false,
      tableData: [{
        date: '1',
        name: 'irms'
      }],
      dialogForm: {},
      formLabelWidth: '120px',
      fileList: [],
      excelData: {
        total: 0,
        equipments: []
      }
    }
  },
  methods: {
    // 选择文件
    handleChange(file) {
      const types = file.name.split('.')[1]
      this.fileTemp = file.raw
      if (this.fileTemp) {
        if ((types === 'xlsx') || (types === 'xls') || (types === 'csv')) {
          this.fileList.push(file.raw)
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
    // 上传文件
    async submitUpload(fileList) {
      if (this.fileList.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择文件！'
        })
      } else {
        for(let index = 0;index < this.fileList.length;index++){
          const outdata = await importfile(this.fileList[index], this.value)
          const postName = this.$store.state.user.roleid
          const {equipment,readStatus} = getEquipment(outdata,postName)
          // console.log(readStatus)
          if(readStatus === 22 || readStatus === 20) {
            this.excelData.equipments.push(equipment)
          }
        }
      }
      this.uploadFunc()
    },
    // 发送请求
    uploadFunc() {
      this.excelData.total = this.excelData.equipments.length
      this.dialogFormVisible = false
      this.loading = true
      // console.log(this.excelData)
      if(this.excelData.equipments.length > 0) {
        importExcel(this.excelData).then((res) => {
          this.loading = false
          this.$message({
            message: '文件上传成功！',
            type: 'success'
          })
        }).finally(() =>{
          this.excelData = {
            total: 0,
            equipments: []
          }
          this.fileList = []
          this.loading = false
        })
      }else{
        this.$message({
          message: '数据读取错误',
          type: 'error'
        })
        this.loading = false
        this.fileList = []
        this.excelData = {
          total: 0,
          equipments: []
        }
      }
    },
    // 手动移除
    handleRemove(fileList) {
      this.fileList = fileList
    },
    // 数量限制
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      this.fileList = []
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.fileList = []
    },
    downloadFile() {
      // templatefile.xlsx存储在public文件夹下
      let a = document.createElement('a')
      a.href = './static/templatefile.xlsx'
      a.download = '信息资产基础信息表(模板).xlsx'
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
  }
}
</script>

<style lang="less" scoped>

.tile-content{
  padding: 9px;
  margin-bottom: 20px;
}
.shadows{
  box-shadow: 0 0 4px #0000004d !important;
}
.searchInput {
  height: 40px;
  text-align: center;
  color: #0b0c10;
  background-color: #deecff;
}
.el-row {
  //margin-bottom: 20px;
  /* &:last-child {
      margin-bottom: 0;
    } */
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
  text-align: center;
  height: 54px;
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
<style  lang="less">
/* //需要覆盖的组件样式 */
// .el-scrollbar /deep/
.el-select-dropdown__item {
  height: 30px;
  flex: 1 0 25%;
  margin: 10px;
}

// 必须给子元素一个上层class名才不会影响到其他页面同名组件
.el-select-dropdown__list {
  margin-right: 20px;
  margin-left: 5px;
  margin-top: 5px;
  height: auto;
  width: 600px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: stretch;
}
.el-scrollbar {
  height: 380px;
  overflow: hidden;
  position: relative;
}
.el-scrollbar .el-scrollbar__wrap {
  overflow: unset;
  height: 100%;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: #1d1e1f;
  background-color: #d2d2d2;
}
.el-scrollbar__bar.is-vertical > div {
  width: 0;
}

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
.radio_class{
  display:inline-block;
  height:2rem;
  width:100%;
}
.el-button--primary {
  height: 40px;
}
</style>

<!--<template>-->
<!--  <div class="dashboard-container">-->
<!--    <el-col :span="24">-->
<!--      <el-card-->
<!--        v-loading="loading"-->
<!--        element-loading-text="文件上传中"-->
<!--        shadow="always"-->
<!--        class="card"-->
<!--      >-->
<!--        <div slot="header" class="clearfix">-->
<!--          <span><i class="el-icon-upload2" /> 数据库管理</span>-->
<!--        </div>-->
<!--        <el-row :gutter="20" style="margin-bottom: 2vh">-->
<!--          <el-col :span="2"><el-button type="primary" size="large" @click="dialogFormVisible = true">导入Excel文件</el-button></el-col>-->
<!--          <el-col :span="4" :offset="0.5"><el-button type="success" size="large" @click="downloadFile()">下载模板</el-button></el-col>-->
<!--        </el-row>-->
<!--        <el-table-->
<!--          :data="tableData"-->
<!--          style="width: 100%"-->
<!--          show-header-->
<!--          border-->
<!--          :header-cell-style="{'text-align':'center'}"-->
<!--          :cell-style="{'text-align':'center'}"-->
<!--        >-->
<!--          <el-table-column-->
<!--            label="序号"-->
<!--            width="250"-->
<!--          >-->
<!--            <template slot-scope="scope">-->
<!--              <span style="margin-left: 10px">{{ scope.row.date }}</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            label="数据库"-->
<!--            width="250"-->
<!--          >-->
<!--            <template slot-scope="scope">-->
<!--              <span style="margin-left: 10px">{{ scope.row.name }}</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="操作">-->
<!--            <template>-->
<!--              <el-button size="mini"><i class="el-icon-edit" />数据同步</el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </el-card>-->
<!--    </el-col>-->
<!--    <el-dialog title=" 文件导入详情" :visible.sync="dialogFormVisible">-->
<!--      <el-form :model="dialogForm">-->
<!--      </el-form>-->
<!--      <div class="uploadCard">-->
<!--        <el-upload-->
<!--          :limit="10"-->
<!--          :on-exceed="handleExceed"-->
<!--          class="upload-demo"-->
<!--          action=""-->
<!--          :multiple="true"-->
<!--          :on-change="handleChange"-->
<!--          :on-remove="handleRemove"-->
<!--          :file-list="fileList"-->
<!--          :auto-upload="false"-->
<!--        >-->
<!--          <el-button slot="trigger" size="larger" type="primary">选取文件</el-button>-->
<!--          <el-button style="margin-left: 10px;" size="larger" type="success" @click="submitUpload">上传文件</el-button>-->
<!--          <div slot="tip" style="font-size: 18px">-->
<!--            <p>注意事项：</p>-->
<!--            <p>1.只能上传填写后的<span style="color: red">模板文件.</span></p>-->
<!--            <p>2.文件后缀必须为<span style="color: red">xlsx、xls、csv</span>其中一个。</p>-->
<!--            <p>3.文件数量不超过<span style="color: red">10个</span>。</p>-->
<!--          </div>-->
<!--        </el-upload>-->
<!--      </div>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="closeDialog()">取 消</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {-->
<!--  getEquipment,-->
<!--  importfile-->
<!--} from '@/utils/xlsx'-->
<!--import { importExcel } from '@/api/import'-->
<!--import {mapGetters} from "vuex";-->
<!--export default {-->
<!--  name: 'Dashboard',-->
<!--  data() {-->
<!--    return {-->
<!--      value: '信息资产基础信息表',-->
<!--      loading: false,-->
<!--      // fileTaypes: [{-->
<!--      //   value: '信息资产基础信息表',-->
<!--      //   label: '资产信息表'-->
<!--      // }, {-->
<!--      //   value: '汇总表',-->
<!--      //   label: '汇总表'-->
<!--      // }],-->
<!--      name: '',-->
<!--      dialogFormVisible: false,-->
<!--      tableData: [{-->
<!--        date: '1',-->
<!--        name: 'irms'-->
<!--      }],-->
<!--      dialogForm: {},-->
<!--      formLabelWidth: '120px',-->
<!--      fileList: [],-->
<!--      excelData: {-->
<!--        total: 0,-->
<!--        equipments: []-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    // 选择文件-->
<!--    handleChange(file) {-->
<!--      const types = file.name.split('.')[1]-->
<!--      this.fileTemp = file.raw-->
<!--      if (this.fileTemp) {-->
<!--        if ((types === 'xlsx') || (types === 'xls') || (types === 'csv')) {-->
<!--          this.fileList.push(file.raw)-->
<!--        } else {-->
<!--          this.$message({-->
<!--            type: 'warning',-->
<!--            message: '附件格式错误，请重新上传！'-->
<!--          })-->
<!--        }-->
<!--      } else {-->
<!--        this.$message({-->
<!--          type: 'warning',-->
<!--          message: '请上传附件！'-->
<!--        })-->
<!--      }-->
<!--    },-->
<!--    // 上传文件-->
<!--    async submitUpload(fileList) {-->
<!--      if (this.fileList.length === 0) {-->
<!--        this.$message({-->
<!--          type: 'error',-->
<!--          message: '请选择文件！'-->
<!--        })-->
<!--      } else {-->
<!--        for(let index = 0;index < this.fileList.length;index++){-->
<!--          const outdata = await importfile(this.fileList[index], this.value)-->
<!--          const postName = this.$store.state.user.roleid-->
<!--          const {equipment,readStatus} = getEquipment(outdata,postName)-->
<!--          // console.log(readStatus)-->
<!--          if(readStatus === 22 || readStatus === 20) {-->
<!--            this.excelData.equipments.push(equipment)-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--      this.uploadFunc()-->
<!--    },-->
<!--    // 发送请求-->
<!--    uploadFunc() {-->
<!--      this.excelData.total = this.excelData.equipments.length-->
<!--      this.dialogFormVisible = false-->
<!--      this.loading = true-->
<!--      // console.log(this.excelData)-->
<!--      if(this.excelData.equipments.length > 0) {-->
<!--        importExcel(this.excelData).then((res) => {-->
<!--          this.loading = false-->
<!--          this.$message({-->
<!--            message: '文件上传成功！',-->
<!--            type: 'success'-->
<!--          })-->
<!--        }).finally(() =>{-->
<!--          this.excelData = {-->
<!--          total: 0,-->
<!--          equipments: []-->
<!--        }-->
<!--          this.fileList = []-->
<!--          this.loading = false-->
<!--        })-->
<!--      }else{-->
<!--        this.$message({-->
<!--          message: '数据读取错误',-->
<!--          type: 'error'-->
<!--        })-->
<!--        this.loading = false-->
<!--        this.fileList = []-->
<!--        this.excelData = {-->
<!--          total: 0,-->
<!--          equipments: []-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    // 手动移除-->
<!--    handleRemove(fileList) {-->
<!--      this.fileList = fileList-->
<!--    },-->
<!--    // 数量限制-->
<!--    handleExceed(files, fileList) {-->
<!--      this.$message.warning(`当前限制选择 10 个文件，共选择了 ${files.length + fileList.length} 个文件`)-->
<!--      this.fileList = []-->
<!--    },-->
<!--    closeDialog() {-->
<!--      this.dialogFormVisible = false-->
<!--      this.fileList = []-->
<!--    },-->
<!--    downloadFile() {-->
<!--      // templatefile.xlsx存储在public文件夹下-->
<!--      let a = document.createElement('a')-->
<!--      a.href = './templatefile.xlsx'-->
<!--      a.download = '信息资产基础信息表(模板).xlsx'-->
<!--      a.style.display = 'none'-->
<!--      document.body.appendChild(a)-->
<!--      a.click()-->
<!--      a.remove()-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.card{-->
<!--  position: absolute;-->
<!--  top: 5vh;-->
<!--  bottom: 5vh;-->
<!--  left: 2vw;-->
<!--  right: 2vw;-->
<!--}-->
<!--.clearfix{-->
<!--  font-size: 20px;-->
<!--}-->
<!--.dashboard {-->
<!--  &-container {-->
<!--    margin: 30px;-->
<!--  }-->
<!--  &-text {-->
<!--    font-size: 30px;-->
<!--    line-height: 46px;-->
<!--  }-->
<!--}-->
<!--.el-table&#45;&#45;border::after,-->
<!--.el-table&#45;&#45;group::after,-->
<!--.el-table::before {-->
<!--  background-color: transparent !important;-->
<!--}-->

<!--.uploadCard{-->
<!--  width: 80%;-->
<!--  padding-left: 7%;-->
<!--}-->
<!--.upload-demo{-->
<!--  height: 80%;-->
<!--}-->

<!--</style>-->
