<template>
  <div class="infobody">
    <div class="grid-content bg-purple">
      <i class="el-icon-s-order" /><span>全生命周期管理</span>
    </div>
    <div class="app-container">
      <div class="show">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">IP 资源申请</div>
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
              @click="search()"
            >搜索</el-button
            >
          </el-col>
        </el-row>
        <el-table
          v-loading="listLoading"
          :data="list_network"
          element-loading-text="Loading"
          border
          highlight-current-row
          stripe
        >
          <el-table-column align="center" type="index" :index="typeIndex" show-overflow-tooltip/>
          <af-table-column
            v-for="(value, key, index) in labels"
            :key="index"
            align="center"
            :label="value"
            width="180px"
          >
            <template slot-scope="scope">
              <el-form :ref="labels" :model="labels">
                <el-form-item style="height:20px">
                  <el-input v-if="scope.row.isEdit && (key ==='ip_address' || key ==='switch_info')" v-model="scope.row[key]" placeholder="请输入">
                  </el-input>
                  <span v-else>{{ scope.row[key] }}</span>
                </el-form-item>
              </el-form>
            </template>
          </af-table-column>
          <el-table-column align="center" label="操作" width="200px"  fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                :style="{ display: scope.row.isEdit==false?'none':'' }"
                @click="handleDetail(scope.$index, scope.row)"
              >{{scope.row.isEdit ? '取消' : '详情'}}</el-button
              >
              <el-button
                size="mini"
                @click="handleMove(scope.$index, scope.row)"
              >{{scope.row.isEdit ? '提交' : '申请'}}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :page-size="limit"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="total_N"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { hunhe1 } from '@/layout/mixin/IP_address_Mix'
import { updateBasicInfoNetwork } from '@/api/IP_address'
import user from '@/store/modules/user'
import { getMachineRoom,getCabinet } from '@/api/select'

import {validateIP, validateMAC} from '@/api/validate'

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
      visiblePublish:false,
      machineRoomAll: [],
      cabinetAll: [],
      start:0,
      limit:10,
      isEdit:false,
      tempIndex:0,
      tab_name: '0',
      list: null,
      list_network:null,
      total: 0,
      total_N:0,
      currentPage: 1,
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
          value: 'postName',
          label: '所属单位'
        },
        {
          value: 'departmentName',
          label: '所属部门'
        },
        {
          value: 'equipmentId',
          label: '设备编号'
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
          value: 'network_card_name',
          label: '网卡名'
        },
        {
          value: 'ip_address',
          label: 'IP 地址'
        },
        {
          value: 'mAC_address',
          label: 'MAC 地址'
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
          value: 'hostName',
          label: '主机名'
        },
        {
          value: 'guaranteePeriod',
          label: '保修期'
        },
      ],
      value: '',
      labels: {
        postName: '所属单位',
        departmentName: '所属部门',
        basic_info_id:'设备编号',
        equipmentTypeName: '设备类型',
        equipmentName: '设备名',
        ip_address: 'ip 地址',
        switch_info: 'MAC 地址',
        brandName: '设备品牌',
        onlineTime: '上线时间',
        hostName: '主机名',
        guaranteePeriod: '保修期',
        network_card_name:'网卡名',
        machineRoomName: '安装位置',
        cabinetName: '机柜编号',
      }
    }
  },
  async created() {
    this.fetchData()
    let a = 0
    a = await this.handleAsync(a)
    // console.log(a);
    // console.log(this.list_network)
    // console.log(this.list)
  },
  methods: {
    search(){
      this.start = 0
      this.currentPage=1
      this.fetchData()
    },
    async handleAsync(val){
      return new Promise((resolve,reject)=>{
        let arr = [1,2,3]
        for (let i = 0; i < arr.length; i++) {
          const e = arr[i];
          setTimeout(() => {
            if (e == 2) {
              val = e;
              console.log(val);
              resolve(val)
            }

          }, 1000);
        }
      })
    },
    handleDetail(index, row) {
      this.visiblePublish=false
      console.log(row.isEdit)
      if (row.isEdit) {
        row.isEdit = !row.isEdit;
      }
      this.fetchData()
    },
    handleMove(index, row) {
      this.visiblePublish=true
      row.isEdit = !row.isEdit;
      console.log(row.isEdit)
      if (!row.isEdit) {
        const params = {
          equipmentId: row.equipmentId,
          ip_address:row.ip_address,
          switch_info: row.switch_info,
          cabinetUStart: row.cabinetUStart,
          cabinetUEnd: row.cabinetUEnd
        };
        const checkIp = validateIP(params.ip_address)
        const checkSwitch = validateMAC(params.switch_info)
        if(checkIp && checkSwitch){
          updateBasicInfoNetwork(params).then( res=>{
          console.log(res);
          this.$message({
            message: '申请成功',
            type: 'success'
          })
        } )}
        else if(checkIp == false || checkSwitch == false){
          this.$message({
          message: '申请失败，IP地址或MAC地址有误',
          type: 'error'
        });
        this.fetchData()}
        else {};
      }else{
        //
        // getMachineRoom(row.postId).then(response => {
        //   this.machineRoomAll = response.data.items
        //   this.fetchCabinet(row.machineRoomName)
        // })

      }
    },
    handleCurrentChange(val) {
      this.start = (val - 1) * this.limit
      this.currentPage=val
      this.fetchData()
    },
    async changeRoom(row) {
      // let val = row.machineRoomName
      // await this.fetchCabinet(val)
      // console.log(this.cabinetAll[0].cabinetName);
      // row.cabinetName = this.cabinetAll[0].cabinetName
    },
    async fetchCabinet(val) {
      return new Promise((resolve,reject) => {
        this.machineRoomAll.forEach(element => {
          if (element.machineRoomName === val) {
            getCabinet(element.machineRoomId).then(response => {
              this.cabinetAll = response.data.items
              console.log(this.cabinetAll[0].cabinetName);
              resolve()
            })
          }
        })
      })
    },
    //分页连续展示   currentPage页码  limit每页数量
    typeIndex(index){
      return index+(this.currentPage-1)*this.limit + 1
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
  // height: 380px;
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
