<template>
  <div>
    <div class="source">
      <el-page-header content="设备信息" @back="back" />
    </div>
    <div class="temp-container">
      <div
        v-show="ifUpdate === '0'"
        class="show"
      >
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
import { getList } from '@/api/table'
import addInfo from '@/components/Infomanage/addInfo'
import updateInfo from '@/components/Infomanage/updateInfo'
import { delPostDepartment } from '@/api/baseparameter'

export default {
  // 引用vue reload方法
  inject: ['reload'],
  props: {
    preRow: {
      type: Object,
      required: true
    }
  },
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
    back() {
      this.$emit('changeDiv', '0')
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
      console.log(this.preRow)
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
      this.initname=['cabinetId']
      const params = {
        dataName: this.initname,
        dataValue: this.preRow.cabinetId,
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
.source {
  padding: 24px;
}
</style>
