<template>
  <div class="app-container">
    <div class="show">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">信息数据导入</div>
        </el-col>
      </el-row>
      <el-row
        :gutter="10"
        class="bg-condition"
      >
        <el-col :span="21">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="/api/upload"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :auto-upload="false"
          >
              <el-button slot="trigger" size="large" type="primary">选取文件</el-button>
              <el-button size="large" type="success" @click="upload">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传Excel文件</div>
          </el-upload>
        </el-col>
        <el-col :span="1.8">
          <el-button size="larger" type="info" @click="switchPage" icon='el-icon-s-release'>详情表导入</el-button>
        </el-col>
      </el-row>
    </div>
    </div>
</template>



<script>

export default {
  name:"horizontalTable",
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    switchPage() {
      this.$parent.switchPage()
    },
    handleSuccess(response, file, fileList) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json =utils.sheet_to_json(worksheet)
        console.log(json) // do something with the JSON data
      }
      reader.readAsArrayBuffer(file.raw)
      this.$message.success('上传成功')
    },
    handleError(error, file, fileList) {
      this.$message.error('上传失败')
    },
    beforeUpload(file) {
      const isExcel = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isExcel) {
        this.$message.error('只能上传Excel文件')
      }else{
            const XLSX = require('xlsx')
            const reader = new FileReader();
            reader.onload = (e) => {

              const data = e.target.result;
              const workbook = XLSX.read(data, { type: 'binary' });
              const sheetName = workbook.SheetNames[0];
              const sheet = workbook.Sheets[sheetName];
              const json = XLSX.utils.sheet_to_json(sheet);
              console.log(json); // 打印JSON格式的数据
            };
            reader.readAsBinaryString(file);
      }
      return isExcel
    },
    upload() {
      this.$refs.upload.submit()

    }
  }
}
</script>

<style lang="less" scoped>
.statusTg{
  font-size: 16px;
}
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

</style>
