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
              @change="handleSelectChange"
              v-model="DataName"
              placeholder="详细字段查询"
              multiple
              size="medium"
            >
              <el-option
                v-for="(item,index) in dataname_option"
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

            <el-autocomplete
              style="width: 240px;"
              autosize
              type="text"
              class="inline-input"
              v-model="inputValue"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>

            <!-- <el-input

              v-model="inputValue"
              placeholder="输入式查询"
              clearable
              size="medium"
            /> -->

          </el-col>
          <el-col
            :xs="4"
            :sm="4"
            :md="4"
            :lg="4"
            :xl="4"
          >

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
<!--          <el-col-->
<!--            :xs="2"-->
<!--            :sm="2"-->
<!--            :md="2"-->
<!--            :lg="2"-->
<!--            :xl="2"-->
<!--          >-->
<!--            <el-button-->
<!--              size="medium"-->
<!--              type="primary"-->
<!--              icon="el-icon-download"-->
<!--            >导出</el-button>-->
<!--          </el-col>-->
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
          v-loading="listLoading"
          :diisable="true"
          :data="list"
          element-loading-text="Loading"
          height="70vh"
          :row-style="{height:'6.26vh'}"
          :cell-style="{padding:'0px'}"
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
                type="success" plain
                size="mini"
                @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button>
              <el-button
                type="primary" plain
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>

<!--              <el-button-->
<!--                size="mini"-->
<!--                type="danger"-->
<!--                text-->
<!--                @click=handleDelete(scope.row)-->
<!--              >删除</el-button>-->

<!--              <el-button-->
<!--                研究发现，好像只是写了个删除键，仅此而已-->
<!--              >删除</el-button>-->

              <template>
                <el-popconfirm
                  confirm-button-text='确定'
                  cancel-button-text='不用了'
                  icon="el-icon-info"
                  icon-color="red"
                  title="请问这一行数据确定删除吗？"
                  @confirm="handleDelete(scope.row)"
                >
                  <el-button slot="reference" type="danger" plain size="mini" style="position: relative;left: 10px" >删除</el-button>
                </el-popconfirm>
              </template>

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
        <updateInfo
          :row="row"
          :current-show="ifUpdate"
          @changeDiv="changeDiv"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getList, getdataCount, delEquipment, InitValue } from '@/api/table'
import addInfo from '@/components/Infomanage/addInfo'
import updateInfo from '@/components/Infomanage/updateInfo'
import { all } from 'q'
import { delPostDepartment } from '@/api/baseparameter'

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
      guaranteePeriodID: '保修期:',
      editionID: '中间件版本:',
      typeID: 'CPU类型:',
      type: 0,
      edition: 0,
      guaranteePeriod: 0,
      restaurants: [],
      foad: [],
      cpu_middle_guar: 'all',
      initdata: [],
      dialogVisible: false,
      row: {},
      list: null,
      total: 0,
      start: 0,
      limit: 10,
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
      initval: [],
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
        // {
        //   value: 'businessSystemName',
        //   label: '业务系统',
        //   width: '200px'
        // },
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
          formatter: function (row) {
            var time = row.onlineTime
            if(time == null){
              return "无"
            }else{
              //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
              var date = new Date(time)
              var year = date.getFullYear()
              /* 在日期格式中，月份是从0开始的，因此要加0
               * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
               * */
              var month =
                date.getMonth() + 1 < 10
                  ? '0' + (date.getMonth() + 1)
                  : date.getMonth() + 1
              var day =
                date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
              var hours =
                date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
              var minutes =
                date.getMinutes() < 10
                  ? '0' + date.getMinutes()
                  : date.getMinutes()
              var seconds =
                date.getSeconds() < 10
                  ? '0' + date.getSeconds()
                  : date.getSeconds()
              // 拼接
              // return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
              row.onlineTime = year + '-' + month + '-' + day
              return year + '-' + month + '-' + day
            }
          },
          width: '200px'
        },
        {
          value: 'offlineTime',
          label: '下线时间',
          formatter: function (row) {
            var time = row.offlineTime
            if(time == null){
              return "无"
            }else {
              //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
              var date = new Date(time)
              var year = date.getFullYear()
              /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
              var month =
                date.getMonth() + 1 < 10
                  ? '0' + (date.getMonth() + 1)
                  : date.getMonth() + 1
              var day =
                date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
              var hours =
                date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
              var minutes =
                date.getMinutes() < 10
                  ? '0' + date.getMinutes()
                  : date.getMinutes()
              var seconds =
                date.getSeconds() < 10
                  ? '0' + date.getSeconds()
                  : date.getSeconds()
              // 拼接
              // return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
              row.offlineTime = year + '-' + month + '-' + day
              return year + '-' + month + '-' + day
            }
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
        },  {
          value: 'guaranteePeriod',
          label: '保修期',
          width: '200px'
        },
        {
          value: 'type',
          label: 'CPU类型',
          width: '200px'
        },
        {
          value: 'edition',
          label: '中间件版本',
          width: '200px'
        },
      ],
      // 解决下拉框的部分字段数据顺序和表格中不一致的需求
      dataname_option: [
        {
          value: 'guaranteePeriod',
          label: '保修期',
          width: '200px'
        },
        {
          value: 'type',
          label: 'CPU类型',
          width: '200px'
        },
        {
          value: 'edition',
          label: '中间件版本',
          width: '200px'
        },
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
          width: '200px'
        },
        {
          value: 'offlineTime',
          label: '下线时间',

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
        }
      ],
      value: '',
    }
  },
  created() {
    //console.log(this.initname)
    this.fetchData()
    // this.getInitValue(this.initdata)
  },
  mounted() {
    this.restaurants = this.loadAll()
    // console.log(this.initval);
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      //console.log(restaurants)
      //console.log(queryString)
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      //console.log(results)
      cb(results)
    },
    createFilter(queryString) {
      //console.log(queryString)
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      //console.log(this.foad)
      return this.foad
    },

    handleSelect(item) {
      //console.log(item)
    },

    // change的处理事件

    handleSelectChange(val) {

      //当特殊字段选择框的值被取消勾选的时候，需要清空下拉框初始化的值
      if (val.indexOf('type') == -1 && this.type == 1) {
        // console.log("删除CPU类型");
        this.deleteSelect(this.typeID)
        this.type = 0
      } else if (val.indexOf('edition') == -1 && this.edition == 1) {
        // console.log("删除中间件版本");
        this.deleteSelect(this.editionID)
        this.edition = 0
      } else if (
        val.indexOf('guaranteePeriod') == -1 &&
        this.guaranteePeriod == 1
      ) {
        // console.log("删除保修期");
        this.deleteSelect(this.guaranteePeriodID)
        this.guaranteePeriod = 0
      }
// 特殊字段下拉框进行初始化
      var key = 0
      for (key = 0; key < val.length; key++) {
        if (val[key] == 'type' && this.type == 0) {
          this.getInitValue(this.typeID, 'type')
          this.type = 1
        } else if (val[key] == 'edition' && this.edition == 0) {
          this.getInitValue(this.editionID, 'edition')
          this.edition = 1
        } else if (val[key] == 'guaranteePeriod' && this.guaranteePeriod == 0) {
          this.getInitValue(this.guaranteePeriodID, 'guarantee_period')
          this.guaranteePeriod = 1
        }
      }
    },

    getInitValue(name, initdatas) {
      InitValue(initdatas).then((response) => {
        this.initval = response.data.items

        for (let i = 0; i < this.initval.length; i++) {
          this.foad.push({label: name, value: name + this.initval[i]})
        }

        this.listLoading = false
      })
    },
    //清空下拉框的值
    deleteSelect(deleteName) {
      let dfata = JSON.parse(JSON.stringify(this.foad))
      //console.log(dfata)
      let num = 0
      let flag = 0
      for (let index = 0; index < dfata.length; index++) {
        if (dfata[index].label == deleteName) {
          num++
          if (num == 1) {
            flag = index
          }
        }
      }
      dfata.splice(flag, num)
      this.foad = dfata
      // console.log(this.foad)
      this.restaurants = this.loadAll()
    },
    tbCellDoubleClick(row, column, cell, event) {
      //console.log(cell)
      this.$alert(row[column.property], '单元格值', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
    },
    // 综合数据管理展示与查询--lry
    fetchData() {
      this.listLoading = true
      // console.log(this.basicValue)
      // 判断处理---解决空值与后台逻辑不符合问题----时间紧待优化
      if (this.DataName === 'all' || this.DataName.length === 0) {
        //console.log(this.DataName)
        this.initname = ['111']
      } else {
        // console.log(JSON.parse(JSON.stringify(this.DataName)))
        if (this.eselect == true) {
          this.initname = JSON.parse(JSON.stringify(this.cpu_middle_guar))
        }
        this.initname = JSON.parse(JSON.stringify(this.DataName))
      }
      const params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: "0",
        start: this.start,
        limit: this.limit
      }
      // console.log(this.initdata)
      getList(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        //console.log("List---------");
        //console.log(this.list)
        this.listLoading = false
      })
    },

    addInfo() {
      this.ifUpdate = '1'
    },
    handleDetail(index, row) {
      //console.log(index, row)
      this.row = row
      this.ifUpdate = '2'
    },
    handleEdit(index, row) {
      //console.log(index, row)
      this.row = row
      this.ifUpdate = '3'
    },
    handleDelete(row) {
      delPostDepartment(row.equipmentId).then((response) => {
        this.$alert(response.data, '提示', {
          confirmButtonText: '确定',
          type: 'info',
          showClose: false
        }).then(() => {
          this.fetchData()
        })
      })
    },

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
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`)
      this.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      const params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: "0",
        start: (val - 1) * this.limit,
        // start: val - 1,
        limit: this.limit
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
.el-select-dropdown .el-scrollbar {
  position: relative;
}
.tile-content {
  padding: 9px;
  margin-bottom: 20px;
}
.shadows {
  box-shadow: 0 0 4px #0000004d !important;
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

// .searchSelect {
//   height: 40px;
//   text-align: center;
//   color: #0b0c10;
//   background-color: #deecff;
// }
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
//覆盖样式

.el-autocomplete-suggestion.el-scrollbar {
  //  height: 420px;
  //  overflow: hidden;
  overflow-y: scroll;
  position: relative;
}
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

.el-scrollbar .el-scrollbar__wrap {
  overflow: auto;
  height: 100%;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: #1d1e1f;
  background-color: #d2d2d2;
  .el-select-dropdown__wrap {
    max-height: none;
  }
}
.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.searchInput[data-v-35ac1005] {

    background-color: #d3dce6;
}
</style>
