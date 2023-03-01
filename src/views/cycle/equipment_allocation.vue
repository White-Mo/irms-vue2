<!--<template>
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
              @click="search()"
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
          <el-table-column align="center" type="index" />
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
    search(){
      this.start = 0
      this.fetchData()
    },
    handleDetail(index, row) {
      if (row.isEdit) {
        row.isEdit = !row.isEdit;
      }
    },
    handleMove(index, row) {
      console.log("&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;")
      console.log(row)
      console.log(row.isEdit)
      console.log("&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;")
      row.isEdit = !row.isEdit;
      if (!row.isEdit) {
        console.log("+++++++++++++++++++************")
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
        console.log("+++++++++++++-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;++++++************")
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
//.el-button&#45;&#45;primary {
//  height: 58px;
//  color: #fff;
//  background-color: #409eff;
//  border-color: #409eff;
//}
</style>-->
















<!--设备调拨--赵长开版-->
<template>
  <div class="infoBody">
    <div class="grid-content bg-purple">
      <i class="el-icon-s-order" /><span>全生命周期管理</span>
    </div>
    <div class="app-container">
      <div class="table_start">
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
              size="medium"
              v-model="inputValue"
              placeholder="输入查询内容"
              clearable />
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="medium"
              clearable="true"
              @click="get_data2()"
            >搜索</el-button>
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <el-button
              type="primary"
              size="medium"
              clearable="true"
              @click="batchAllocation()"
            >批量调拨</el-button>
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
              style="margin-left: 100px"
              @click="search()"
            >筛选</el-button>
          </el-col>
        </el-row>
<!--        多条件搜索对话框，当dialogVisible==true时才弹出显示-->
        <el-dialog
          title="多条件搜索"
          :visible.sync="dialogVisible"
          width="55%"
          style="margin-top: -80px;"
          custom-class="transparent-dialog">
          <!--  调用多条件搜索组件-->
          <equipmentAllocationSearchTemplate @changList="receiveAllSearchData"></equipmentAllocationSearchTemplate>
        </el-dialog>
<!--        批量调拨对话框，当batchAllocationDialogVisible == true时才弹出显示-->
        <el-dialog
          title="批量调拨"
          :visible.sync="batchAllocationDialogVisible"
          width="30%"
          style="margin-top: 70px;"
          custom-class="transparent-dialog">
          <div style="height: 60px">
            <el-span> 所属部门：</el-span>
            <el-select  v-model="departmentValue" placeholder="请选择要调拨的目标部门">
              <el-option
                v-for="(item,index) of departmentAll"
                :value="item.departmentName"
                :key="index"
              ></el-option>
            </el-select>
            <el-button style="margin-left: 20px; " type="primary" @click="handleAllots">一键调拨</el-button>
          </div>
        </el-dialog>
<!--        表格数据渲染 -->
        <div class="grid-content form_table_class" >
          <el-table
            :data="tableData"
            stripe
            height="70vh"
            :row-style="{height:'6.26vh'}"
            :cell-style="{padding:'0px'}"
            border
            :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
            v-loading="listLoading"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" label="" width="40" type="selection" />
            <el-table-column align="center" label="" width="50" type="index" />
            <el-table-column
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
            </el-table-column>
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
          <el-alert v-if="isflag" title="正在努力加载中..." type="success" center :closable="false" show-icon></el-alert>
          <el-alert v-if="isMore" title="没有更多数据" type="warning" center show-icon></el-alert>
        </div>
<!--        统计总数据条数-->
        <div class="tabListPage" style="text-align: center">
          <h3>
            共{{totalCount}}条数据
          </h3>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
//导入多条件搜索接口，用于下拉加载时更新多条件查询返回的数据
import {searchComprehensiveInfoByMultipleConditions} from '@/api/table'
//获取总数据，总数据条数
import { getList, getdataCount } from '@/api/table'
//导入多条件查询搜索组件
import equipmentAllocationSearchTemplate from "@/components/cycle/equipmentAllocationSearchTemplate";
//导入批量调拨接口，单条数据调拨接口
import {batchUpdateDepartment, updateDepartment} from "@/api/cycleInfo";
//导入获取部门数据接口，用于调拨时下拉框选择部门
import {getDepartment} from "@/api/select";
export default {
  data() {
    return {
      listLoading:false,
      dialogVisible: false, //决定多条件查询框是否显示
      batchAllocationDialogVisible:false, //决定批量调拨框是否显示
      isEdit:false,   //决定 调拨 取消 提交 按钮的显示
      departmentAll: [],
      selectData: [],    //接收勾选中的数据
      departmentValue:'',  //绑定批量调拨框里部门的选择值
      tempEquipmentId:[],  //用于接收需要批量调拨的所有数据的设备Id
      tempDepartmentId:'',  //用于接收调拨目标部门的ID
      tableData: [],         // 总数据
      totalCount: 0,   // 总条数
      inputValue: '',
      initname: ['123'],
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
      labels: {
        basicInfoId: '设备编号',
        postName: '所属单位',
        departmentName: '所属部门',
        equipmentName: "设备名称",
        hostName:"主机名称"
      },
      isflag: false,  //决定是否正加载数据
      isMore: false,  //数据到底了
      DataName: 'all',
      ClientHeight:0,
      isMultiline:false,//是否多条件筛选
    }
  },
  components:{
    equipmentAllocationSearchTemplate
  },

  created() {
    this.get_data()
  },
  mounted() {
    document.getElementsByClassName('el-table__body-wrapper')[0].addEventListener('scroll',this.load)
  },
  destroyed() {
    document.removeEventListener('scroll',this.load)
  },
  watch:{  //   watch是一个对象，它有一个属性ClientHeight，它的值是一个函数.  这个函数会在ClientHeight这个数据变化时执行
    //这个函数的作用是根据isMultiline的值，执行不同的逻辑
    'ClientHeight':function(curVal,oldVal){
      this.isflag = true
      //如果isMultiline为true，则调用searchComprehensiveInfoByMultipleConditions方法，获取更多的表格数据，并更新tableData数组
      if(this.isMultiline){
        //把多条件查询组件中传过来的属性字段解析成JSON形式
        const params=JSON.parse(JSON.stringify(this.infoInput));
        params.start=this.tableData.length ? this.tableData.length : 0;
        params.limit=this.totalCount < this.tableData.length + 15 ? this.totalCount - this.tableData.length : 15;
        if(this.tableData.length < this.totalCount){
          this.isMore=false
          searchComprehensiveInfoByMultipleConditions(params).then(response=>{
            response.data.items.forEach(element => {
              element.isEdit = false;
            });
            this.isflag = false
            if(this.tableData.length < this.totalCount){
              let num = this.tableData.length + 1
              for(let i of response.data.items){
                i["num"] = num
                num++
              }
              this.tableData = this.tableData.concat(response.data.items)
              this.listLoading=false;
            }
          })
        }else {
          this.isflag=false
          this.isMore=true
        }

      }
      //如果isMultiline为false，则调用getList方法，根据DataName和inputValue获取更多的表格数据，并更新tableData数组
      else {
        if (this.DataName === 'all' || this.DataName.length === 0) {
          this.initname = ['111']
        } else {
          this.initname = JSON.parse(JSON.stringify(this.DataName))
        }
        const params = {
          dataName: this.initname,
          dataValue: this.inputValue,
          start: this.tableData.length ? this.tableData.length : 0,
          limit: this.totalCount < this.tableData.length + 15 ? this.totalCount - this.tableData.length : 15,
          status: ''
        }
        if(this.tableData.length < this.totalCount){

          this.isMore=false
          getList(params).then((response) => {
            response.data.items.forEach(element => {
              element.isEdit = false;
            });
            this.isflag = false
            if(this.tableData.length < this.totalCount){
              let num = this.tableData.length + 1
              for(let i of response.data.items){
                i["num"] = num
                num++
              }
              this.tableData = this.tableData.concat(response.data.items)
            }
          })
        }else {
          this.isflag=false
          this.isMore=true
        }
      }
    }
  },
  methods: {
    //接收多条件搜索的数据重新渲染
    receiveAllSearchData(searchAllData,infoInput){
      this.dialogVisible = false;
      this.isMultiline=true;
      this.infoInput=infoInput;
      this.listLoading=true;
      this.tableData=[];
      let num = 1
      for(let i of searchAllData.items){
        i["num"] = num
        num++
      }
      this.tableData = this.tableData.concat(searchAllData.items)
      this.totalCount=searchAllData.total;
      this.listLoading=false
    },
    //弹出多条件搜索框
    search(){
      this.dialogVisible = true
    },
    //记录勾选了哪些（条）数据
    handleSelectionChange(val) {
      //用selectData接收所有勾选中的数据
      this.selectData = val
    },
    //点击取消后，隐藏取消按钮
    handleDetail(index, row) {
      console.log(row)
      if (row.isEdit) {
        row.isEdit = !row.isEdit;
      }
    },
    //单挑数据调拨
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
    //获取总数据，渲染表格
    get_data() {
      this.listLoading = true
      this.isMultiline=false
      if (this.DataName === 'all' || this.DataName.length === 0) {
        //console.log(this.DataName)
        this.initname = ['111']
      } else {
        this.initname = JSON.parse(JSON.stringify(this.DataName))
      }
      const params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        start: this.tableData.length ? this.tableData.length : 0,
        limit: 15,
        status: '0'
      }
      const numparams = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: '0'
      }
      getdataCount(numparams).then((response) => {
        this.totalCount = response.data.total
      })
      //console.log("提交请求",params)

      getList(params).then((response) => {
        response.data.items.forEach(element => {
          element.isEdit = false;
        });

        //console.log(response)
        let num = this.tableData.length + 1
        for(let i of response.data.items){
          i["num"] = num
          num++
        }
        this.tableData = this.tableData.concat(response.data.items)
        this.listLoading=false
        this.isEdit = false
      })

    },
    //单条件搜索
    get_data2() {
      this.isMultiline=false
      this.tableData = []
      if (this.DataName === 'all' || this.DataName.length === 0) {
        //console.log(this.DataName)
        this.initname = ['111']
      } else {
        this.initname = JSON.parse(JSON.stringify(this.DataName))
      }

      const numparams = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: '0'
      }
      const params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        start: this.tableData.length ? this.tableData.length : 0,
        limit: 15,
        status: '0'
      }
      getdataCount(numparams).then((response) => {
        this.totalCount = response.data.total
      })
      getList(params).then((response) => {
        response.data.items.forEach(element => {
          element.isEdit = false;
        });
        //console.log(response)
        let num = this.tableData.length + 1
        for(let i of response.data.items){
          i["num"] = num
          num++
        }
        this.tableData = this.tableData.concat(response.data.items)
        this.listLoading=false
      })

    },
    //下拉加载新数据
    load (e) {
/*- load是一个方法，它有一个参数e，表示事件对象
- 这个方法会在某个元素滚动时执行
- 这个方法的作用是判断是否滚动到了元素内容的底部，并更新ClientHeight的值
  - scrollHeight表示元素内容的总高度，包括不可见部分
  - scrollTop表示元素已经滚动过的距离，即不可见部分的高度
  - clientHeight表示元素可见部分的高度，不包括边框、滚动条和外边距
  - 如果scrollHeight减去scrollTop和clientHeight的差值小于等于40，说明已经接近或达到了底部
  - 如果ClientHeight等于scrollHeight，说明没有新内容加载，就设置isflag为true，并在一秒后恢复为false
  - 否则就把scrollHeight赋值给ClientHeight，以便下次比较*/
      if(e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) <= 40){
        if(this.ClientHeight == e.target.scrollHeight){
          this.isflag = true
          setTimeout(()=>{
            this.isflag = false
          },1000)
        }
        this.ClientHeight = e.target.scrollHeight
      }
    },
    //弹出批量调拨框，并进行批量调拨逻辑处理
    batchAllocation(){
      if(this.selectData.length>1){
        let flag = true;
        let FirstPostId = this.selectData[0].postId
        this.selectData.forEach(element=>{
          this.tempEquipmentId.push(element.equipmentId)
          if(element.postId === FirstPostId){
            FirstPostId = element.postId
          }else {
            flag = false
            this.$message.error('要调拨的设备不在同一个单位');
          }
        })
        if(flag ===true){
          this.batchAllocationDialogVisible = true
          getDepartment(FirstPostId).then(response => {
            this.departmentAll = response.data.items
          })

          this.departmentValue = ''

        }
      }
      else if(this.selectData.length===1){
        this.$message.error('请至少选择两条设备信息')
      }
      else {
        this.$message.error('请选择要调拨的信息')
      }

    },
    //批量调拨触发，调接口批量更新部门
    async handleAllots(){
      this.departmentAll.forEach(element => {
        if (element.departmentName === this.departmentValue) {
          this.tempDepartmentId = element.departmentId;
        }
      })
      const params = {
        equipmentId: this.tempEquipmentId,
        departmentId:this.tempDepartmentId
      }
      batchUpdateDepartment(params).then(res=>{
        this.$message.success(res.message)
      })
      this.batchAllocationDialogVisible = false;
      //更新成功，等待2秒后重新刷新数据，重新渲染批量调拨成功后的数据
      await setTimeout(()=>{
        location.reload();
        this.listLoading = false
      },2000)
    }
  }
}
</script>

<style lang="less" scoped>
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
.tabListPage h3 {
  padding-top: 0.1rem;
  padding-bottom: 0.5rem;
  margin: 0.1rem;
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





