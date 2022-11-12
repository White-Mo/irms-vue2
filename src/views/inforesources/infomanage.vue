<template>
  <div class="infobody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>信息资源管理</span></div>
    <div class="app-container">
      <div
        v-show="ifUpdate === '0'"
        class="show"
      >
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">综合信息管理</div>
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
              v-model="DataName"
              placeholder="详细字段查询"
              multiple
              size="medium"
            >
              <el-option
                v-for="(item,index) in dataname"
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
            :xs="2"
            :sm="2"
            :md="2"
            :lg="2"
            :xl="2"
          >
            <el-button
              size="medium"
              type="primary"
              icon="el-icon-download"
            >导出</el-button>
          </el-col>
          <el-col
            :xs="1"
            :sm="1"
            :md="1"
            :lg="3"
            :xl="1"
          >
            <el-button
              size="medium"
              type="info"
              @click="addInfo()"
            >添加设备信息</el-button>
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
            @cell-dblclick="tbCellDoubleClick"
          >
            <el-table-column
              type="index"
              align="center"
            />
            <el-table-column
              v-for="(item,index) in dataname"
              :key="index"
              :label="item.label"
              :prop="item.value"
              :formatter="item.formatter"
              :width="item.width"
              align="center"
              show-overflow-tooltip
            >

            </el-table-column>
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="250px"
            >
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
                  text
                  @click=handleDelete(scope.row)
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
        <addInfo @changeDiv="changeDiv" />
      </div>
      <div v-if="ifUpdate === '2' || ifUpdate === '3'">
        <updateInfo :row="row" :current-show="ifUpdate" @changeDiv="changeDiv" />
      </div>
    </div>
  </div>
</template>

<script>
import { getList, getdataCount, delEquipment } from '@/api/table'
import addInfo from '@/components/Infomanage/addInfo'
import updateInfo from '@/components/Infomanage/updateInfo'

export default {
  // 引用vue reload方法
  inject: ['reload'],
  components: {
    addInfo,
    updateInfo
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
      dialogVisible: false,
      row: {},
      list: null,
      total: 0,
      start: 0,
      limit:10,
      DataName: 'all',
      keyname: [],
      initname: ['123'],
      department: '',
      inputValue: '',
      postname: '',
      input3: '',
      ifUpdate: '0',
      listLoading: true,
      singalInfo: {},
      dataname: [
        {
          value: 'basicInfoId',
          label: '设备编号',
          width: '200px'
        },
        {
          value: 'postName',
          label: '所属单位',
          width: '200px'
        },
        {
          value: 'departmentName',
          label: '所属部门',
          width: '200px'
        },
        {
          value: 'equipmentName',
          label: '设备名',
          width: '200px'
        },
        {
          value: 'brandName',
          label: '设备品牌',
          width: '200px'
        },
        {
          value: 'equipmentTypeName',
          label: '设备类型',
          width: '200px'
        },
        {
          value: 'businessSystemName',
          label: '业务系统',
          width: '200px'
        },
        {
          value: 'machineRoomName',
          label: '安装位置',
          width: '200px'
        },
        {
          value: 'cabinetName',
          label: '机柜编号',
          width: '200px'
        },
        {
          value: 'onlineTime',
          label: '上线时间',
          formatter:function (row) {
            var time=row.onlineTime
            //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
              var date=new Date(time);
              var year=date.getFullYear();
              /* 在日期格式中，月份是从0开始的，因此要加0
               * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
               * */
              var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
              var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
              var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
              var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
              var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
              // 拼接
              // return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
              row.onlineTime=year+"-"+month+"-"+day;
              return year+"-"+month+"-"+day;
            },
          width: '200px'
        },
        {
          value: 'offlineTime',
          label: '下线时间',
          formatter:function (row) {
            var time=row.offlineTime
            //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
            var date=new Date(time);
            var year=date.getFullYear();
            /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
            var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
            var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
            var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
            var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
            var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
            // 拼接
            // return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
            row.offlineTime=year+"-"+month+"-"+day;
            return year+"-"+month+"-"+day;
          },
          width: '200px'
        },
        {
          value: 'hostName',
          label: '主机名',
          width: '200px'
        },
        {
          value: 'equipmentAdminName',
          label: '设备管理员',
          width: '200px'
        },
        {
          value: 'equipmentAdminPhone',
          label: '设备管理员电话',
          width: '200px'
        },
        {
          value: 'appAdminName',
          label: '应用管理员',
          width: '200px'
        },
        {
          value: 'appAdminPhone',
          label: '应用管理员电话',
          width: '200px'
        },
        {
          value: 'brandModelName',
          label: '型号',
          width: '200px'
        },
        {
          value: 'serialNumber',
          label: '序列号',
          width: '200px'
        },
        {
          value: 'guaranteePeriod',
          label: '保修期',
          width: '200px'
        }
      ],
      value: '',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    tbCellDoubleClick(row, column, cell, event){
      console.log(cell)
      this.$alert(row[column.property], '单元格值', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
      })
    },
    // 综合数据管理展示与查询--lry
    fetchData() {
      this.listLoading = true
      // console.log(this.basicValue)
      // 判断处理---解决空值与后台逻辑不符合问题----时间紧待优化
      if (this.DataName === 'all' || this.DataName.length === 0) {
        console.log(this.DataName)
        this.initname = ['111']
      } else {
        // console.log(JSON.parse(JSON.stringify(this.DataName)))
        this.initname = JSON.parse(JSON.stringify(this.DataName))
      }
      const params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: '',
        start: this.start,
        limit: this.limit,
      }
      const numparams = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: ''
      }
      getdataCount(numparams).then((response) => {
        this.total = response.data.total
        console.log(this.total)
        this.listLoading = false
      })
      // console.log(this.initdata)
      getList(params).then((response) => {
        this.list = response.data.items
        console.log(this.list)
        this.listLoading = false
      })
    },
    addInfo() {
      this.ifUpdate = '1'
    },
    handleDetail(index, row) {
      console.log(index, row)
      this.row = row
      this.ifUpdate = '2'
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.row = row
      this.ifUpdate = '3'
    },
    handleDelete(row) {
      console.log(row)
      this.$alert("是否永久删除该设备", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        callback: (action, instance) => {
          if (action === 'confirm') {
            delEquipment(row.equipmentId).then((response) => {
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
      // this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      //   center: true
      // }).then(() => {
      //   delEquipment(row.equipmentId).then((response) => {
      //     this.active = 0
      //     this.$alert(response.data, '提示', {
      //       confirmButtonText: '确定',
      //       type: 'info',
      //       showClose: false
      //     }).then(() => {
      //       this.fetchData()
      //     })
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   });
      // });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.limit=val
      this.fetchData()
    },
    handleCurrentChange(val) {
      const params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        // status: "this.t",
        status: '',
        start: (val-1)*this.limit,
        limit: this.limit,
      }
      getList(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    changeDiv(value) {
      this.ifUpdate = value
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
.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
</style>
