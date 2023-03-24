<template>
  <div class="infoBody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>基础信息管理</span></div>
    <div class="app-container">
      <div v-if="ifShow === '0'"
           class="show"
      >
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <span style="color: #ffffff">业务系统管理</span>
            </div>
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
            查询条件：
          </el-col>
          <el-col
            :xs="3"
            :sm="3"
            :md="3"
            :lg="3"
            :xl="3"
          >
            <el-select
              v-model="searchCondition"
              placeholder="详细字段查询"
              multiple
              size="medium"
            >
              <el-option
                v-for="(item,index) in header"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col
            :xs="3"
            :sm="3"
            :md="3"
            :lg="3"
            :xl="3"
          >
            <el-input
              v-model="inputValue"
              placeholder="输入查询内容"
              clearable
              size="medium"
            />
          </el-col>
          <el-col
            :xs="2"
            :sm="2"
            :md="2"
            :lg="2"
            :xl="2"
          >
            <el-button
              size="medium"
              type="primary"
              icon="el-icon-search"
              clearable="true"
              @click=""
            >搜索</el-button>
          </el-col>
          <el-col
            :xs="1"
            :sm="1"
            :md="1"
            :lg="1"
            :xl="1"
          >
            <el-button
              size="medium"
              type="primary"
              @click="addFirstLevelBusinessSystem()"
            >添加一级业务系统</el-button>
          </el-col>
          </el-row>
        <el-table
          height="68vh"
          :row-style="{height:'6.26vh'}"
          :cell-style="{padding:'0px'}"
          v-loading="listLoading"
          :data="tableData"
          element-loading-text="Loading"
          highlight-current-row
          border
          stripe
        >
          <el-table-column align="center" type="index" :index="typeIndex"/>
          <el-table-column
            v-for="(item,index) in header"
            :key="index"
            :label="item.label"
            :prop="item.value"
            :formatter="item.formatter"
            align="center"
          >
          </el-table-column>
          <el-table-column align="center" label="操作" width="350px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
      <div v-if="ifShow === '1'">
        <add-first-level-business-system @changeDiv="changeDiv"></add-first-level-business-system>
      </div>
    </div>
  </div>
</template>

<script>
import {getFirstLevelBusinessSystemByPage} from "@/api/baseparameter";
import addFirstLevelBusinessSystem
  from "@/components/Baseparameter/FirstLevelBusinessSystem/addFirstLevelBusinessSystem";

export default {
  name: 'business_system_first',
  components:{addFirstLevelBusinessSystem},
  data(){
    return{
      ifShow:'0',
      listLoading: false,
      tableData:[],
      searchCondition:'', //查询条件
      inputValue:'',
      currentPage: 1,
      limit:10,
      header: [ //表头
        {
          value: 'businessSystemFirstName',
          label: '一级业务系统名称',
        }
      ],
    }
  },
  created() {
    this.showData() //渲染表格数据
  },
  methods:{
    showData(){
      this.listLoading = true
      const params = {
        start: this.currentPage-1,
        limit: this.limit,
        status:"0"
      }
      //调用接口获取数据
      getFirstLevelBusinessSystemByPage(params).then(response=>{
        this.tableData = response.data.items
        console.log(response)
      })
      this.listLoading = false
    },
    //弹出添加一级业务系统页面
    addFirstLevelBusinessSystem(){
      this.ifShow = '1'
    },
    handleEdit(index, row) {
      this.row = row
    },
    handleDelete(index, row) {
      console.log(row)
    },
    typeIndex(index){
      return index+(this.currentPage-1)*this.limit + 1
    },
    changeDiv(value) {
      this.ifShow = value
      this.showData()
    },
  }
}
</script>


<style lang="less" scoped>
.bg-purple-dark {
  background: #304156;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}
.app-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.bg-condition {
  line-height: 50px;
  text-align: center;
  height: 54px;
  margin: 0px !important;
  background: #d3dce6;
}
</style>
