<template>
  <div class="infobody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>全生命周期管理</span></div>
    <div class="app-container">
      <div
        class="show"
      >
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">设备报废</div>
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
              @click="get_data2()"
            >搜索</el-button>
<!--              rxr-->
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
              clearable="true"
              @click="batchScrap()"
            >批量报废</el-button>
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
              clearable="true"
              @click="batchRecoverNormal()"
            >批量恢复正常</el-button>
          </el-col>
        </el-row>
        <el-tabs v-model="tab_name" type="border-card" >
<!--          @tab-click="changeTab"-->
          <el-tab-pane label="正常设备" name="0">
            <el-table
              v-loading="listLoading"
              :data="tableData"
              element-loading-text="Loading"
              border
              highlight-current-row
              stripe
              :row-key="rowKey"
              @selection-change="handleSelectionChange"
            >
<!--              shang xia rxr-->
              <el-table-column align="center" type="selection" :reserve-selection="true" />
              <el-table-column align="center" type="index"  show-overflow-tooltip/>
<!--              :index="typeIndex"-->
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
              <el-table-column prop="tag" align="center" label="标签" width="100">
                <el-tag type="primary">正常</el-tag>
              </el-table-column>
              <el-table-column  fixed="right" align="center" label="操作" width="200px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleScrap(scope.$index, scope.row)"
                  >报废</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="报废设备" name="2">
            <el-table
              v-loading="listLoading"
              :data="tableData"
              element-loading-text="Loading"
              border
              highlight-current-row
              stripe
              @selection-change="handleSelectionChange"
            >
              <el-table-column align="center" type="selection" />
<!--              :index="typeIndex"-->
              <el-table-column align="center" type="index"  show-overflow-tooltip/>
              <af-table-column v-for="(value,key,index) in labels" :key="index" align="center" :label="value">
                <template slot-scope="scope">
                  {{ scope.row[key] }}
                </template>
              </af-table-column>
              <el-table-column prop="tag" align="center" label="标签" width="100">
                <el-tag type="danger">报废</el-tag>
              </el-table-column>
              <el-table-column fixed="right" align="center" label="操作" width="200px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleRecover(scope.$index, scope.row)"
                  >正常</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div class="block">
<!--          rxr-->
          <el-alert v-if="isflag" title="正在努力加载中..." type="success" center :closable="false" show-icon></el-alert>
          <el-alert v-if="isMore" title="没有更多数据" type="warning" center show-icon></el-alert>
        </div>
        <!--        统计总数据条数-->
        <div class="tabListPage" style="text-align: center">
          <h3>
            共{{totalCount}}条数据
          </h3>
        </div>
<!--          <el-pagination-->
<!--            :page-size="limit"-->
<!--            :current-page="currentPage"-->
<!--            layout="total, prev, pager, next, jumper"-->
<!--            :total="total"-->
<!--            @current-change="handleCurrentChange"-->
<!--          />-->
      </div>
    </div>
  </div>
</template>

<script>
import { hunhe1 } from '@/layout/mixin/cycleMix'
import {
  batchChangeEquipmentStatus,
  changeStatus, getdataCount,
  getList,
  searchComprehensiveInfoByMultipleConditions
} from '@/api/table'

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
      start:0,
      limit:10,
      tab_name: '0',
      total: 0,
      currentPage: 1,
      department: '',
      postname: '',
      input3: '',
      listLoading: false,
      // rxr
      selectedData: [],    //接收勾选中的数据
      totalCount: 0,   // 总条数
      tableData: [],         // 总数据
      isflag: false,  //决定是否正加载数据
      isMore: false,  //数据到底了
      DataName: 'all',
      ClientHeight:0,
      isMultiline:false,//是否多条件筛选
      inputValue: '',
      initname: ['123'],
      isEdit:false,   //按钮的显示

      singalInfo: {},
      dataname: [
        {
          value: 'basicInfoId',
          label: '设备ID'
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
        }
      ],
      value: '',
      labels: {
        basicInfoId:'设备ID',
        postName: '所属单位',
        departmentName: '所属部门',
        equipmentTypeName: '设备类型',
        equipmentName: '设备名',
        brandName: '设备品牌',
        machineRoomName: '安装位置',
        cabinetName: '机柜编号',
        onlineTime: '上线时间',
        guaranteePeriod: '保修期',
      },
      tempEquipmentId:[],
    }
  },
  created() {
    //console.log('=======')
    // this.fetchData()
    // rxr
    this.get_data()

  },
  // rxr
  mounted() {
    document.getElementsByClassName('el-table__body-wrapper')[0].addEventListener('scroll',this.load)
  },
  destroyed() {
    document.removeEventListener('scroll',this.load)
  },
  watch:{
    //   watch是一个对象，它有一个属性ClientHeight，它的值是一个函数.  这个函数会在ClientHeight这个数据变化时执行
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
    // rxr
    //接收多条件搜索的数据重新渲染
    // receiveAllSearchData(searchAllData,infoInput,postNameReturn){
    //   this.dialogVisible = false;
    //   this.isMultiline=true;
    //   this.infoInput=infoInput;
    //   this.infoInput.postName=postNameReturn;
    //   this.listLoading=true;
    //   this.tableData=[];
    //   let num = 1
    //   for(let i of searchAllData.items){
    //     i["num"] = num
    //     num++
    //   }
    //   this.tableData = this.tableData.concat(searchAllData.items)
    //   this.totalCount=searchAllData.total;
    //   this.listLoading=false
    // },
    load (e) {
      // rxr
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
          this.isflag = false
          setTimeout(()=>{
            this.isflag = true
          },10)
        }
        this.ClientHeight = e.target.scrollHeight
        // console.log(this.selectedData);
      }
    },

// rxr
    // search(){
    //   this.start = 0
    //   // rxr
    //   // this.currentPage=1
    //   this.fetchData()
    // },

    // rxr
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

      this.totalCount=0;
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
        console.log("nml",this.tableData.length)
        this.listLoading=false
        getdataCount(numparams).then((response) => {
          this.totalCount = response.data.total
        })
      })

    },
    rowKey(row) {
      // console.log(this.selectedData);
      return row.equipmentId
    },
    //记录勾选了哪些（条）数据
    handleSelectionChange(val) {
      //用selectedData接收所有勾选中的数据
      this.selectedData = val
      console.log(this.selectedData);
    },

    //点击取消后，隐藏取消按钮
    handleDetail(index, row) {
      //console.log(index, row)
    },
    handleScrap(index, row) {
      // console.log(row)
      changeStatus({ id: row.equipmentId, status: '2' }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fetchData()
      }).catch(err => {
        //console.log(err)
      })
    },
    handleRecover(index, row) {
      console.log(row)
      //console.log(index, row)
      changeStatus({ id: row.equipmentId, status: '0' }).then(res => {
        // this.$router.go(0)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fetchData()
      }).catch(err => {
        //console.log(err)
      })
    },
    // rxr
    // handleCurrentChange(val) {
    //   this.currentPage=val
    //   this.start = (val - 1) * this.limit
    //   this.fetchData()
    // },
    // changeTab(name) {
    //   //console.log(this.tab_name)
    //   this.start=0
    //   this.currentPage=1
    //   this.fetchData()
    // },
    //分页连续展示   currentPage页码  limit每页数量
    // typeIndex(index){
    //   return index+(this.currentPage-1)*this.limit+1
    // },
    //批量报废
    batchScrap(){
      if(this.selectedData.length>=1){
        this.selectedData.forEach(element=>{
          this.tempEquipmentId.push(element.equipmentId)
        })
        const params = {
          id:this.tempEquipmentId,
          status:'2'
        }
        batchChangeEquipmentStatus(params).then(res=>{
          this.$message.success(res.message)
        })
        this.tempEquipmentId = []
        //报废成功，等待2秒后重新刷新数据，重新渲染批量报废成功后的数据
        setTimeout(() => {
          location.reload();
          this.listLoading = false
        }, 2000)
      }else {
        this.$message.error('请选择要报废的设备')
      }
    },
    //批量恢复正常
    batchRecoverNormal(){
      if(this.selectedData.length>=1){
        this.selectedData.forEach(element=>{
          this.tempEquipmentId.push(element.equipmentId)
        })
        const params = {
          id:this.tempEquipmentId,
          status:'0'
        }
        batchChangeEquipmentStatus(params).then(res=>{
          this.$message.success(res.message)
        })
        this.tempEquipmentId = []
        //报废成功，等待2秒后重新刷新数据，重新渲染批量报废成功后的数据
        setTimeout(() => {
          location.reload();
          this.listLoading = false
        }, 2000)
      }else {
        this.$message.error('请选择要恢复正常的设备')
      }
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
 .el-scrollbar {
   overflow: hidden;
   position: relative;
 }
 //rxr
.el-scrollbar .el-scrollbar__wrap {
  overflow: auto;
  height: 100%;
}
.el-scrollbar__bar.is-vertical > div {
  width: 0;
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
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: #1d1e1f;
  background-color: #d2d2d2;
}
//.el-button--primary {
//  height: 58px;
//  color: #fff;
//  background-color: #409eff;
//  border-color: #409eff;
//}
</style>
