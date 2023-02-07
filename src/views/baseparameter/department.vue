<!--
<template>
  <div class="infobody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>基础信息管理</span></div>
    <div class="app-container">
      <div v-show="ifUpdate === '0'"
        class="show"
      >
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <span style="color: #ffffff">部门管理</span>
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
            <span>查询条件：</span>
          </el-col>
          <el-col
            :xs="3"
            :sm="3"
            :md="3"
            :lg="3"
            :xl="3"
          >
            <el-select
              v-model="dataName"
              placeholder="详细字段查询"
              multiple
              size="medium"
            >
              <el-option
                v-for="(item,index) in basicvalue"
                :key="index"
                :label="item.label"
                :value="item.value"
                class="searchInput"
              />
            </el-select>
          </el-col>
          <el-col
            :xs="4"
            :sm="4"
            :md="4"
            :lg="4"
            :xl="4"
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
              @click="fetchData()"
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
              type="info"
              @click="addDepartment()"
            >添加部门</el-button>
          </el-col>
        </el-row>
        <el-table
          height="70vh"
          :row-style="{height:'6.26vh'}"
          :cell-style="{padding:'0px'}"
          v-loading="listLoading"
          :disable="true"
          :data="list"
          element-loading-text="Loading"
          border
          highlight-current-row
          stripe
        >
          <el-table-column align="center" type="index" />
          <el-table-column
            v-for="(item,index) in basicvalue"
            :key="index"
            :label="item.label"
            :prop="item.value"
            :formatter="item.formatter"
            align="center"
          >
          </el-table-column>
          <el-table-column align="center" label="操作" width="250px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div v-if="ifUpdate === '1'">
        <addDepartment @changeDiv="changeDiv" />
      </div>
      <div v-if="ifUpdate === '2' || ifUpdate === '3'">
        <updateDepartment :row="row" :current-show="ifUpdate" @changeDiv="changeDiv"></updateDepartment>
      </div>
    </div>
  </div>
</template>

<script>
import {delPostDepartment, getPostDepartmentByPage} from '@/api/baseparameter'
import addDepartment from '@/components/Baseparameter/department/addDepartment'
import updateDepartment from '@/components/Baseparameter/department/updateDepartment'


export default {
  components: {
    addDepartment,
    updateDepartment
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      currentPage: 0,
      limit: 10,
      initName: '',
      inputValue: '',
      dataName: 'all',
      ifUpdate: '0',
      listLoading: true,
      basicvalue: [
        {
          value: 'departmentName',
          label: '部门名称',
        },
        {
          value: 'departmentCode',
          label: '部门代码'
        },
        {
          value: 'postName',
          label: '所属单位'
        }
      ],
      value: '',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 综合数据管理展示与查询&#45;&#45;lry
    fetchData() {
      // //console.log(this.basicValue)
      // 判断处理-&#45;&#45;解决空值与后台逻辑不符合问题&#45;&#45;&#45;&#45;时间紧待优化
      this.listLoading = true
      // //console.log(this.basicValue)
      // 判断处理-&#45;&#45;解决空值与后台逻辑不符合问题&#45;&#45;&#45;&#45;时间紧待优化
      if (this.dataName === 'all' || this.dataName.length === 0) {
        //console.log(this.dataName)
        this.initName = ['111']
      } else {
        // //console.log(JSON.parse(JSON.stringify(this.dataName)))
        this.initName = JSON.parse(JSON.stringify(this.dataName))
      }
      const params = {
        dataName: this.initName,
        dataValue: this.inputValue,
        start: this.currentPage,
        limit: this.limit,
      }
      // //console.log(this.initdata)
      getPostDepartmentByPage(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },

    addDepartment() {
      this.ifUpdate = '1'
    },
    handleDetail(index, row) {
      this.ifUpdate = '2'
      this.row = row
    },
    handleEdit(index, row) {
      this.ifUpdate = '3'
      this.row = row
    },
    handleDelete(index, row) {
      this.$alert("是否永久删除该部门", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        callback: (action, instance) => {
          if (action === 'confirm') {
            delPostDepartment(row.departmentId).then((response) => {
              this.$alert(response.data, '提示', {
                confirmButtonText: '确定',
                type: 'info',
                showClose: false
              }).then(() => {
                this.fetchData()
              })
            })
          }
        }
      })
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`)
      this.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val - 1
      const params = {
        dataName: this.initName,
        dataValue: this.inputValue,
        start: this.currentPage,
        limit: this.limit
      }
      getPostDepartmentByPage(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    changeDiv(value) {
      this.ifUpdate = value
      this.fetchData()
    },

  }
}
</script>

<style lang="less" scoped>
//*{
//  font-size: 18px;
//}
.el-select-dropdown .el-scrollbar {
  position: relative;
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
  background: #304156;
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
.el-pagination > *{
  font-size: 18px;
}
.block{
  text-align: center;
}
</style>
<style  lang="less">
//覆盖样式
.el-select-dropdown__item {
  height: 30px;
  flex: 1 0 25%;
  margin: 10px;
}
.el-select-dropdown__list {
  margin: 5px 20px 20px 5px;
  height: auto;
  width: 600px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: stretch;
}
.el-select-dropdown__wrap{
  max-height: none;
}
.el-scrollbar {
  height: 100%;
  overflow: hidden;
  position: relative;
}
.el-scrollbar .el-scrollbar__wrap {
  overflow: auto;
  height: 100%;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: #1d1e1f;
  background-color: #d2d2d2;
}
.el-scrollbar__bar.is-vertical > div {
  width: 0;
}

.el-button&#45;&#45;primary {
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
-->



















<!--测试版(最终版)-->
<template>
  <div class="info-body">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>基础信息管理</span></div>
    <div class="app-container" >
      <!--  如果ifUpdate === 0 则展示表单页面, 如果ifUpdate===3 则弹出编辑框    -->
      <div v-show="ifUpdate === '0'"
           class="show">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <span style="color: #ffffff">部门管理</span>
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
            <span>查询条件：</span>
          </el-col>
          <el-col
            :xs="3"
            :sm="3"
            :md="3"
            :lg="3"
            :xl="3"
          >
            <!--    multiple属性设置可多选        -->
            <el-select
              v-model="dataName"
              placeholder="详细字段查询"
              multiple
              size="medium"
            >
              <el-option
                v-for="(item,index) in basicValue"
                :key="index"
                :label="item.label"
                :value="item.value"
                class="searchInput"
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
            <!--   clearable属性设置可去除         -->
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
              @click="searchData()"
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
              @click="addDepartment()"
            >添加部门</el-button>
          </el-col>
          <el-col
            :xs="1"
            :sm="1"
            :md="1"
            :lg="1"
            :xl="1">
            <el-button
              size="medium"
              type="primary"
              style="margin-left: 50px"
              @click="Refresh()"
            >返回部门首页</el-button>
          </el-col>
        </el-row>
      <el-table
        :data="tableData"
        height="67vh"
        :row-style="{height:'6.26vh'}"
        v-loading="listLoading"
        element-loading-text="Loading"
        stripe
        highlight-current-row
        border
        show-header
        style="width: 100%">
        <el-table-column align="center" type="index" />
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                :data="props.row.children" cell-style="background-color: pink">
                <el-table-column  align="center" width="48"/>
                <el-table-column  align="center" type="index"/>
                <el-table-column  prop="departmentName" label="部门" width="675"></el-table-column>
                <el-table-column  prop="departmentCode" label="部门代码" width="675" ></el-table-column>
                <el-table-column  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary">编辑</el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row)" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="postName" label="部门所属单位" width="675"></el-table-column>
          <el-table-column prop="postCode" label="单位代码" width="675"></el-table-column>
          <el-table-column prop="operation" label="操作" ></el-table-column>
      </el-table>
        <div class="count"><span class="countPost">单位总数:{{this.postTotal}}</span><span class="countDepartment">部门总数:{{this.departmentTotal}}</span> </div>
      </div>
      <div v-if="ifUpdate === '1'">
        <addDepartment @changeDiv="changeDiv" />
      </div>
      <div v-if="ifUpdate === '3'">
        <updateDepartment :row="row" :current-show="ifUpdate" @changeDiv="changeDiv"></updateDepartment>
      </div>

    </div>
  </div>
</template>

<script>
import {getDepartment, getPost} from "@/api/select";
import addDepartment from "@/components/Baseparameter/department/addDepartment";
import updateDepartment from "@/components/Baseparameter/department/updateDepartment";
import {delPostDepartment} from "@/api/baseparameter";
export default {
  components: {
    addDepartment,
    updateDepartment
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listLoading: true,
      tableData: [],
      tempTableData:[],
      postTotal:'',
      departmentTotal:'',
      inputValue: '',
      dataName: 'all',
      ifUpdate: '0',
      basicValue: [
        {
          value: 'departmentName',
          label: '部门名称',
        },
        {
          value: 'departmentCode',
          label: '部门代码'
        },
        {
          value: 'postName',
          label: '所属单位'
        }
      ],
    }
  },
  mounted() {
    //------------------------------获取数据开始------------------------------------------------------

    getPost().then(response => {
      this.listLoading = true
      this.postTotal = response.data.total
      let total = response.data.total
      let promises = []
      this.departmentTotal=0
      for (let i = 0; i < total; i++) {
        let postId = response.data.items[i].postId
        promises.push(
          getDepartment(postId).then(response => {
            //this.departmentTotal += response.data.items.length
            let item = {
              postName: '',
              postCode: i>=10?i:'0'+i,
              children: []
            }
            if(response.data.items.length > 0){
              item.postName = response.data.items[0].postName
              let departments = response.data.items
              for (let department of departments) {
                item.children.push({
                  postId:response.data.items[0].postId,
                  postName:response.data.items[0].postName,
                  departmentId: department.departmentId,
                  departmentCode:department.departmentCode,
                  departmentName:department.departmentName,
                  edit: this.handleEdit,
                  delete: this.handleDelete
                })
              }
              return item
            }
          })
        )
      }
      //console.log(promises)
      Promise.all(promises).then(results => {
        for (let result of results) {
          this.tableData.push(result)
          this.departmentTotal += result.children.length
        }
        this.listLoading = false
      })
      this.tempTableData = this.tableData
      //console.log(this.tableData)
    })
    //------------------------------获取数据结束------------------------------------------------------
  },
  created() {
    this.fetchData()
    this.searchData()
  },
  methods: {
    //--------------刷新功能开始---------------------
    Refresh(){
      location.reload();
    },
    //--------------刷新功能结束---------------------
    //----------------------搜索功能searchData()实现开始-------------------------------------------------------------
    searchData() {
      this.listLoading = true;
     this.tableData =  this.tempTableData ;
      setTimeout(() => {
        let searchResults = [];
        if (this.inputValue !== '') {
          searchResults = this.tableData.filter(data => {
            return (
              data.postName.includes(this.inputValue) ||
              data.children.some(child => child.departmentName.includes(this.inputValue) || child.departmentCode.includes(this.inputValue))
            );
          });
        } else {
          searchResults = this.tableData;
        }
        //console.log(searchResults)
        this.tableData = searchResults;
        this.listLoading = false;
      }, 200);
    },
    //----------------------搜索功能searchData()实现结束-------------------------------------------------------------

    fetchData() {
      this.listLoading = true
      if (this.dataName === 'all' || this.dataName.length === 0) {
        this.initName = ['111']
      } else {
        this.initName = JSON.parse(JSON.stringify(this.dataName))
      }
      this.listLoading = false
    },
    addDepartment() {
      this.ifUpdate = '1'
    },
    handleEdit(index, row) {
      this.ifUpdate = '3'
      this.row = row
    },
    handleDelete(index, row) {
      this.$alert(`是否永久删除部门:\"${row.departmentName}\"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        callback: (action, instance) => {
          if (action === 'confirm') {
            delPostDepartment(row.departmentId).then((response) => {
              this.$alert(response.data, '提示', {
                confirmButtonText: '确定',
                type: 'info',
                showClose: false
              }).then(() => {
                this.fetchData()
                this.Refresh()
              })
            })
          }
        }
      })
    },
    changeDiv(value) {
      this.ifUpdate = value
      this.fetchData()
      this.Refresh()
    },
  }


}
</script>

<style lang="less" scoped>
*{
  font-size: 18px;
}
.count{
  background-color: #304156;
  color: #ffffff;
  height: 65px;
  line-height: 65px;
  font-size: 20px;
  .countPost{
    margin-left: 100px;
    margin-right: 100px;
  }
  .countDepartment{
    margin-right: 100px;
  }
}

.searchInput {
  height: 40px;
  text-align: center;
  color: #0b0c10;
  background-color: #deecff;
}
.bg-purple-dark {
  background: #304156;
}
.bg-purple {
  background: #d3dce6;
}
.app-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}

.bg-condition {
  line-height: 50px;
  text-align: center;
  height: 54px;
  margin: 0px !important;
  background: #d3dce6;
}

</style>

<style lang="less">
.el-table--border th.el-table__cell, .el-table__fixed-right-patch {
  border-bottom: 1px solid #EBEEF5;
  background-color: beige;
}
</style>
