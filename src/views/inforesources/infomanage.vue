<template>
  <div class="infobody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>信息管理</span></div>
    <div class="app-container">
      <div
        v-show="!ifUpdate"
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
          <!-- <el-col
            :xs="4"
            :sm="4"
            :md="4"
            :lg="4"
            :xl="4"
          > -->
          <!-- el-select里面的v-model必须是对象（A），与el-option里面的:value的值（B）配合使用，A用来初始化在选择框里，B用来结合A间接传值给后台 -->
          <!-- <div class="grid-content bg-purple-light">
              <span>单位</span>
              <el-select
                v-model="postname"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </div>
          </el-col>
          <el-col
            :xs="4"
            :sm="4"
            :md="4"
            :lg="4"
            :xl="4"
          >
            <div class="grid-content bg-purple">
              <span>部门</span>
              <el-select
                v-model="department"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,index) in departments"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select> -->
          <!-- </div>
          </el-col> -->
          <!-- <el-col :xs="4" :sm="5" :md="5" :lg="5" :xl="4">
            <div class="grid-content bg-purple-light">
              <span>详情查询</span>
              <el-cascader :options="options" :show-all-levels="false" placeholder="详情字段查询" />
            </div>
          </el-col> -->
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
      <div v-show="ifUpdate">
        <addinfo @ifUpdateChange="updateIfupdate" />
      </div>
    </div>
  </div>
</template>

<script>
import { getList, getdataCount } from '@/api/table'
import Addinfo from '@/components/Infomanage/addInfo'

export default {
  components: {
    Addinfo
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
      currentPage1: 5,
      DataName: 'all',
      keyname: [],
      initname: ['123'],
      department: '',
      inputValue: '',
      postname: '',
      input3: '',
      ifUpdate: false,
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
        start: 0,
        limit: 5
      }
      const numparams = {
        dataName: this.initname,
        dataValue: this.inputValue
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
      this.ifUpdate = !this.ifUpdate
    },
    handleDetail(index, row) {
      console.log(index, row)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    updateIfupdate(e) {
      this.ifUpdate = e
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      const params = {
        dataName: this.initdata,
        dataValue: this.inputValue,
        start: val,
        limit: 10
      }
      getList(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
//*{
//  font-size: 18px;
//}

.searchInput {
  height: 40px;
  text-align: center;
  color: #0b0c10;
  background-color: #deecff;
}
// .el-scrollbar {
//   overflow: hidden;
//   position: relative;
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
/* //需要覆盖的组件样式 */
// .el-scrollbar /deep/
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
//.el-button--primary {
//  height: 58px;
//  color: #fff;
//  background-color: #409eff;
//  border-color: #409eff;
//}
</style>
