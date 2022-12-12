<template>
  <div class="infobody">
    <div class="grid-content bg-purple">
      <i class="el-icon-s-order" /><span>全生命周期管理</span>
    </div>
    <div class="app-container">
      <div class="show">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">设备调拨</div>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="bg-condition">
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <span>查询条件：</span>
          </el-col>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
            <el-select
              v-model="DataName"
              placeholder="详细字段查询"
              multiple
              size="medium"
            >
              <el-option
                v-for="(item, index) in dataname"
                :key="index"
                :label="item.label"
                :value="item.value"
                class="searchInput"
              />
            </el-select>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-input
              v-model="inputValue"
              placeholder="输入查询内容"
              clearable
              size="medium"
            />
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <el-button
              size="medium"
              type="primary"
              icon="el-icon-search"
              clearable="true"
              @click="fetchData()"
              >搜索</el-button
            >
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
            v-for="(value, key, index) in labels"
            :key="index"
            align="center"
            :label="value"
          >
            <template slot-scope="scope">
                <el-select v-if="scope.row.isEdit && key ==='departmentName'" v-model="scope.row[key]" placeholder="请选择">
                  <el-option
                    v-for="item in departmentAll"
                    :key="item.value"
                    :value="item.departmentName"
                  />
                </el-select>
                <span v-else>{{ scope.row[key] }}</span>
            </template>
          </af-table-column>
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="scope">
              <el-button v-if="scope.row.isEdit"
                size="mini"
                @click="handleDetail(scope.$index, scope.row)"
                >{{scope.row.isEdit ? '取消' : '详情'}}</el-button
              >
              <el-button
                size="mini"
                @click="handleMove(scope.$index, scope.row)"
                >{{scope.row.isEdit ? '提交' : '调拨'}}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :page-size="limit"
            layout="total, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { hunhe1 } from '@/layout/mixin/cycleMix'
import { updateDepartment } from '@/api/cycleInfo'
import user from '@/store/modules/user'
import { getDepartment } from '@/api/select'

export default {
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
  mixins: [hunhe1],
  data() {
    return {
      roleid: user.state.roleid,
      departmentAll: [],
      start:0,
      limit:10,
      isEdit:false,
      tab_name: '0',
      list: null,
      total: 0,
      currentPage1: 5,
      DataName: 'all',
      initname: ['123'],
      department: '',
      inputValue: '',
      postname: '',
      input3: '',
      listLoading: true,
      singalInfo: {},
      dataname: [
        {
          value: 'basicInfoId',
          label: '设备编号'
        },
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
          label: '设备名称'
        },
        {
          value: 'hostName',
          label: '主机名称'
        },

      ],
      value: '',
      labels: {
        basicInfoId: '设备编号',
        postName: '所属单位',
        departmentName: '所属部门',
        equipmentName: "设备名称",
        hostName:"主机名称"
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleDetail(index, row) {
      if (row.isEdit) {
        row.isEdit = !row.isEdit;
      }
    },
    handleMove(index, row) {
      row.isEdit = !row.isEdit;
      if (!row.isEdit) {
        let departmentId = ''
        //这里存在两个部门值一样的情况，以下写法就无法规避这种情况，后期再考虑
        this.departmentAll.forEach(element => {
          if (element.departmentName === row.departmentName) {
              departmentId = element.departmentId;
            }
          })
        const params = {
          equipmentId: row.equipmentId,
          departmentId
        }
        updateDepartment(params).then( res=>{
          //console.log(res);
        } )
      }else{
        getDepartment(row.postId).then(response => {
          this.departmentAll = response.data.items
        })
      }
    },
    handleCurrentChange(val) {
      this.start = (val - 1) * this.limit
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
<style  lang="less" scoped>
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
//.el-button--primary {
//  height: 58px;
//  color: #fff;
//  background-color: #409eff;
//  border-color: #409eff;
//}
</style>
