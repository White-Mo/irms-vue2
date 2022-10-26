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
          v-loading="listLoading"
          :diisable="true"
          :data="list"
          element-loading-text="Loading"
          border
          highlight-current-row
          stripe
        >
          <el-table-column type="index" />
          <af-table-column
            v-for="(value,key,index) in labels"
            :key="index"
            align="center"
            :label="value"
          >
            <template slot-scope="scope">
              {{ scope.row[key] }}
            </template>
          </af-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="250px"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button>
              <el-button size="mini">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                text
                @click="dialogVisible = true"
              >删除</el-button>
              <el-dialog
                :append-to-body="true"
                title="删除提示"
                :visible.sync="dialogVisible"
                width="30%"
              >
                <span>
                  你确定要永久删除这条数据吗？
                </span>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button
                      type="primary"
                      @click="handleDelete(scope.row)"
                    >
                      确认
                    </el-button>
                  </span>
                </template>
              </el-dialog>
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
        <addinfo @changeDiv="changeDiv" />
      </div>
      <div v-if="ifUpdate === '2' || ifUpdate === '3'">
        <updataInfo :row="row" :current-show="ifUpdate" @changeDiv="changeDiv" />
      </div>
    </div>
  </div>
</template>

<script>
import { getList, getdataCount, delEquipment } from '@/api/table'
import Addinfo from '@/components/Infomanage/addInfo'
import UpdataInfo from '@/components/Infomanage/updateInfo'

export default {
  // 引用vue reload方法
  inject: ['reload'],
  components: {
    Addinfo,
    UpdataInfo
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
      currentPage1: 5,
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
          value: 'postName',
          label: '所属单位'
        },
        {
          value: 'departmentName',
          label: '所属部门'
        },
        {
          value: 'equipmentName',
          label: '设备名'
        },
        {
          value: 'brandName',
          label: '设备品牌'
        },
        {
          value: 'equipmentTypeName',
          label: '设备类型'
        },
        {
          value: 'businessSystemName',
          label: '业务系统'
        },
        {
          value: 'machineRoomName',
          label: '安装位置'
        },
        {
          value: 'cabinetName',
          label: '机柜编号'
        },
        {
          value: 'onlineTime',
          label: '上线时间'
        },
        {
          value: 'offlineTime',
          label: '下线时间'
        },
        {
          value: 'hostName',
          label: '主机名'
        },
        {
          value: 'equipmentAdminName',
          label: '设备管理员'
        },
        {
          value: 'equipmentAdminPhone',
          label: '设备管理员电话'
        },
        {
          value: 'appAdminName',
          label: '应用管理员'
        },
        {
          value: 'appAdminPhone',
          label: '应用管理员电话'
        },
        {
          value: 'brandModelName',
          label: '型号'
        },
        {
          value: 'serialNumber',
          label: '序列号'
        },
        {
          value: 'guaranteePeriod',
          label: '保修期'
        }
      ],
      value: '',
      labels: {
        postName: '所属单位',
        departmentName: '所属部门',
        equipmentTypeName: '设备类型',
        equipmentName: '设备名',
        brandName: '设备品牌',
        businessSystemName: '业务系统',
        machineRoomName: '安装位置',
        cabinetName: '机柜编号',
        onlineTime: '上线时间',
        hostName: '主机名',
        equipmentAdminName: '设备管理员',
        equipmentAdminPhone: '设备管理员电话',
        appAdminName: '应用管理员',
        appAdminPhone: '应用管理员电话',
        brandModelName: '型号',
        serialNumber: '序列号',
        guaranteePeriod: '保修期',
        offlineTime: '下线时间'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
        start: 0,
        limit: 5,
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
      delEquipment(row.equipmentId).then((response) => {
        this.active = 0
        this.$alert(response.data, '提示', {
          confirmButtonText: '确定',
          type: 'info',
          showClose: false
        }).then(() => {
          this.$router.go(0)
        })
        console.log(response)
      })
      this.dialogVisible = false
      console.log(row.equipmentId)
      this.reload()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      const params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: this.t,
        start: val,
        limit: 10,
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
/deep/.el-select-dropdown__list {
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
