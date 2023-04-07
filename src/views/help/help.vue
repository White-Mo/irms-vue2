<template>
  <div>
    <div class="grid-content bg-purple">
      <i class="el-icon-s-order" /><span>帮助信息</span>
    </div>
    <div class="app-container" style="height: 47rem">
        <el-row>
          <el-col>
            <div class="grid-content bg-purple-dark">帮助信息</div>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="bg-condition">
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
           <el-button type="primary" style="margin-left: 15px; line-height:10px" @click="DownHelpDocument()">点击下载用户手册</el-button>
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <el-button type="primary" style="margin-left: 15px; line-height:10px" @click="checkSecretKey()">{{ ShowHidden ? '隐藏密钥' : '显示密钥' }}</el-button>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-input v-if="ShowHidden" size="medium" v-model="this.SecretKey" placeholder="密钥"/>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-button type="primary" style="margin-left: 15px; line-height:10px" @click="copySecretKey(SecretKey)">复制密钥</el-button>
          </el-col>
        </el-row>
    </div>
    <footer>
      <p style="text-align: center">软件信息-中国地震台网中心信息资源管理系统v1.0 Beta</p>
    </footer>
  </div>
</template>

<script>

import { getSecret } from '@/api/select'

import { helpInfoLogRecord } from '@/api/Sys_info_manage'

export default {
  name: 'help',
  data() {
    return {
      ShowHidden: false,
      SecretKey: '',
    }
  },
  created() {
    this.getSecretKey()
  },
  methods:{
    getSecretKey(){
      getSecret().then(res=>{
        if (res.data == 'A9sf2se3f4sfeN3fJ1|5'){
          this.SecretKey = res.data
        }else {
          this.SecretKey = res.data.secretKey
        }
      })
    },
    checkSecretKey(){
      this.ShowHidden=!this.ShowHidden
    },
    copySecretKey(val) {
      // 模拟 输入框
      var cInput = document.createElement("input");
      cInput.value = process.env.VUE_APP_BASE_API+"/api/"+val+"/equipments/status/0";
      // cInput.value = val;
      document.body.appendChild(cInput);
      cInput.select(); // 选取文本框内容
      // 执行浏览器复制命令
      // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签）
      // Input要在正常的编辑状态下原生复制方法才会生效

      document.execCommand("copy");

      this.$message({
        type: "success",
        message: "复制成功"
      });
      // 复制成功后再将构造的标签 移除
      document.body.removeChild(cInput);
    },
    //点击下载使用说明文档
    DownHelpDocument() {
      // specification.docx文件存储在public文件夹下
      let a = document.createElement('a')
      a.href = './static/specification.docx'  //下载链接
      a.download = '使用说明.docx'  //下载后文件名
      // a.style.display = 'none'
      document.body.appendChild(a)
      a.click() //点击下载
      a.remove() //下载完成移除元素
      helpInfoLogRecord().then(res=>{
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-condition {
  line-height: 50px;

  height: 54px;
  margin: 0px !important;
  background: #d3dce6;
}
</style>









