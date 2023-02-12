<!--<template>
  <div class="infobody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>基础信息管理</span></div>
    <div class="app-container">
      <div v-show="ifUpdate === '0'"
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
&lt;!&ndash;          <el-col&ndash;&gt;
&lt;!&ndash;            :xs="1"&ndash;&gt;
&lt;!&ndash;            :sm="1"&ndash;&gt;
&lt;!&ndash;            :md="1"&ndash;&gt;
&lt;!&ndash;            :lg="1"&ndash;&gt;
&lt;!&ndash;            :xl="1"&ndash;&gt;
&lt;!&ndash;          >&ndash;&gt;
&lt;!&ndash;            <el-button&ndash;&gt;
&lt;!&ndash;              size="medium"&ndash;&gt;
&lt;!&ndash;              type="info"&ndash;&gt;
&lt;!&ndash;              @click="addDepartment()"&ndash;&gt;
&lt;!&ndash;            >添加业务系统</el-button>&ndash;&gt;
&lt;!&ndash;          </el-col>&ndash;&gt;
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
&lt;!&ndash;              <el-button&ndash;&gt;
&lt;!&ndash;                size="mini"&ndash;&gt;
&lt;!&ndash;                @click="handleDetail(scope.$index, scope.row)"&ndash;&gt;
&lt;!&ndash;              >详情</el-button>&ndash;&gt;
&lt;!&ndash;              <el-button&ndash;&gt;
&lt;!&ndash;                size="mini"&ndash;&gt;
&lt;!&ndash;                @click="handleEdit(scope.$index, scope.row)"&ndash;&gt;
&lt;!&ndash;              >编辑</el-button>&ndash;&gt;
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
        <updateDepartment :row="row" :current-show="ifUpdate" @changeDiv="changeDiv" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  delBusinessSystem,
  getBusinessSystemByPage,
} from '@/api/baseparameter'
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
      limit:10,
      basicValue: '',
      initName:'',
      inputValue: '',
      dataName: 'all',
      ifUpdate: '0',
      listLoading: true,
      basicvalue: [

        {
          value: 'businessSystemName',
          label: '业务系统名称',
        },
        {
          value: 'businessSystemLevel',
          label: '业务系统等级',
        },
        {
          value: 'departmentName',
          label: '所属部门',
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
        status:"0"
      }
      // //console.log(this.initdata)
      getBusinessSystemByPage(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },

    addDepartment() {
      this.ifUpdate ='1'
    },
    handleDetail(index, row) {
      this.ifUpdate ='2'
      this.row = row
    },
    handleEdit(index, row) {
      this.ifUpdate ='3'
      this.row = row
    },
    handleDelete(index, row) {
      this.$alert("是否永久删除该系统", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        callback: (action, instance) => {
          if (action === 'confirm') {
            delBusinessSystem(row.departmentId).then((response) => {
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
      this.limit=val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage=val-1
      const params = {
        dataName: this.initName,
        dataValue: this.inputValue,
        start: this.currentPage,
        limit: this.limit,
        status:"0"
      }
      getBusinessSystemByPage(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    changeDiv(value) {
      this.ifUpdate = value
      this.fetchData()
    }
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
</style>-->



















<template>
  <div class="infoBody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>基础信息管理</span></div>
    <div class="app-container">
      <div v-show="ifShow === '0'"
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
              type="primary"
              @click="addBusinessSystem()"
            >添加业务系统</el-button>
          </el-col>
        </el-row>
        <el-table
          height="68vh"
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
            v-for="(item,index) in basicValue"
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
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
              <el-button
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                type="info"
                @click="getEquipmentByBusinessSystemId(scope.$index, scope.row)"
              >查看设备</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="height: 4vh;">
          <el-pagination
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div v-if="ifShow === '1'">
        <addBusinessSystem @changeDiv="changeDiv" />
      </div>
      <div v-if="ifShow === '2'">
        <updateBusinessSystem :row="row" :current-show="ifShow" @changeDiv="changeDiv"></updateBusinessSystem>
      </div>
      <div v-if="ifShow === '3'">
        <searchEquipmentByBusinessSystem :tempBusinessSystemNameId="this.tempBusinessSystemNameId" :current-show="ifShow" @changeDiv="changeDiv"></searchEquipmentByBusinessSystem>
      </div>
    </div>
  </div>
</template>

<script>
import {delBusinessSystem, getBusinessSystemByPage,} from '@/api/baseparameter'
import addBusinessSystem from '@/components/Baseparameter/businessSystem/addBusinessSystem'
import updateBusinessSystem from '@/components/Baseparameter/businessSystem/updateBusinessSystem'
import searchEquipmentByBusinessSystem from '@/components/Baseparameter/businessSystem/searchEquipmentByBusinessSystem'
export default {
  components:{
    addBusinessSystem,
    updateBusinessSystem,
    searchEquipmentByBusinessSystem
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
      tempBusinessSystemNameId:'',
      list: null,
      total: 0,
      currentPage: 0,
      limit:10,
      basicValueName: '',
      initName:'',
      inputValue: '',
      dataName: 'all',
      ifShow: '0',
      listLoading: true,
      businessSystemNameAndId:{
        businessSystem_Name:'',
        businessSystem_Id:''
      },
      basicValue: [

        {
          value: 'businessSystemName',
          label: '业务系统名称',
        },
        {
          value: 'businessSystemLevel',
          label: '业务系统等级',
        },
        {
          value: 'departmentName',
          label: '所属部门',
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
    fetchData() {
      this.listLoading = true
      if (this.dataName === 'all' || this.dataName.length === 0) {
        this.initName = ['111']
      } else {
        this.initName = JSON.parse(JSON.stringify(this.dataName))
      }
      const params = {
        dataName: this.initName,
        dataValue: this.inputValue,
        start: this.currentPage,
        limit: this.limit,
        status:"0"
      }
      getBusinessSystemByPage(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },

    addBusinessSystem(){
      this.ifShow = '1'
    },
    handleEdit(index, row) {
      //console.log(row)
      this.ifShow ='2'
      this.row = row
    },
    handleDelete(index, row) {
      this.businessSystemNameAndId.businessSystem_Name = row.businessSystemName
      this.businessSystemNameAndId.businessSystem_Id = row.businessSystemId
      const businessSystemNameAndId = {...this.businessSystemNameAndId}
      this.$alert(`是否永久删除: \"${businessSystemNameAndId.businessSystem_Name}\"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            delBusinessSystem(businessSystemNameAndId).then((response) => {
              console.log(businessSystemNameAndId)
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

    //通过业务系统搜索设备
    getEquipmentByBusinessSystemId(index, row){
      this.ifShow ='3'
      this.tempBusinessSystemNameId = row.businessSystemId
    },

    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`)
      this.limit=val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage=val-1
      const params = {
        dataName: this.initName,
        dataValue: this.inputValue,
        start: this.currentPage,
        limit: this.limit,
        status:"0"
      }
      getBusinessSystemByPage(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    changeDiv(value) {
      this.ifShow = value
      this.fetchData()
    }
  }
}
</script>

<style lang="less" scoped>
*{
  font-size: 18px;
}
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
