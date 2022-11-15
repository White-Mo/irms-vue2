<template>
  <div class="infobody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>系统信息管理</span></div>
    <div class="app-container">
      <div  v-loading="loading">
        <div class="show">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">角色权限组列表</div>
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
              <el-button type="primary" size="large" @click="addDialog = true" icon="el-icon-plus">添加角色</el-button>
            </el-col>
          </el-row>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="名字"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prep="isdel"
              label="状态"
              width="180">
              <tag></tag>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
            </el-table>
        </div>
      </div>
    </div>
    <el-dialog title="添加角色" :visible.sync="addDialog">
      <el-form :model="addForm">
        <el-form-item label="用户名称"  :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off" style="width: 40%"></el-input>
        </el-form-item>
        <el-form-item label="用户状态" :label-width="formLabelWidth" >
          <el-select v-model="addForm.status" placeholder="请选择">
            <el-option label="激活" value="激活"></el-option>
            <el-option label="冻结" value="冻结"></el-option>
          </el-select>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getAuthorData} from "@/api/Sys_info_manage";
import {getAutherCount} from "@/api/Sys_info_manage";

export default {
  name: 'Dashboard',
  data(){
    return {
      addDialog:false,
      formLabelWidth: '120px',
      addForm:{
        name: '',
        status:''
      },
      tableData: []
    }
  },
  mounted() {
    getAutherCount().then((res) => {
      console.log(res)
    })
    var data = {
      start:0,
      limit:20
    }
    getAuthorData(data).then((res)=> {
      console.log(res)
      this.tableData = res
    })
  }
}
</script>

<style lang="scss" scoped>

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
