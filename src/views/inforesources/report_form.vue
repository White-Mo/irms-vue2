<!--
<template>
  <div class="infobody">
    <div class="grid-content bg-purple">
      <i class="el-icon-s-order" /><span>信息管理</span>
    </div>
    <div class="app-container">
      <div class="table_end">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">数据报表制作</div>
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
            <el-input size="medium" v-model="inputValue" placeholder="输入查询内容" clearable />
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
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
            <el-button type="primary" size="medium" icon="el-icon-download" @click="exportEscel(0)">总表导出</el-button>
          </el-col>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
            <el-button type="primary" size="medium" icon="el-icon-download" @click="exportEscel(1)">详表导出</el-button>
          </el-col>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
            <el-button type="primary" size="medium" icon="el-icon-download" @click="exportEscel(2)">统计表导出</el-button>
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
        <el-dialog
          title="多条件搜索"
          :visible.sync="dialogVisible"
          width="55%"
          style="margin-top: -80px;"
          custom-class="transparent-dialog">
          <dataStatementMakeSearchTemplate @changList="receiveAllSearchData"></dataStatementMakeSearchTemplate>
        </el-dialog>
        <div class="grid-content form_table_class" >
          <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            height="70vh"
            :row-style="{height:'6.26vh'}"
            :cell-style="{padding:'0px'}"
            border
            :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
            @select-all="selectAllFun"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="" width="40" type="selection" />
            <el-table-column
              v-for="(item, index) in dataname"
              :key="index"
              :prop="item.value"
              :label="item.label"
              :formatter="item.formatter"
              header-align="center"
              align="center"
              style="width: 100%"
              show-overflow-tooltip
              :width="flexColumnWidth(item.value, item.label)"
            />
          </el-table>
          <el-alert v-if="isflag" title="正在努力加载中..." type="success" center :closable="false" show-icon></el-alert>
          <el-alert v-if="isMore" title="没有更多数据" type="warning" center show-icon></el-alert>
          &lt;!&ndash; <div class="tabListPage" style="text-align: center">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="PageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
            >
            </el-pagination>
          </div> &ndash;&gt;
          <el-dialog
            title="详表导出模式选择"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
          >
            <div style="width:100%;text-align: center;">
              <span>
                <span class="radio_class">
                  <el-radio v-model="select_teble_radio" label="1">单独导出每条数据</el-radio>
                  <el-radio v-model="select_teble_radio" label="2">多条数据存放在一个文件中导出</el-radio>
                </span>
                <span v-if="select_teble_radio==2">
                  <el-radio-group v-model="select_teble_type">
                    <el-radio :label="2">2条</el-radio>
                    <el-radio :label="8">8条</el-radio>
                    <el-radio :label="10">10条</el-radio>
                    <el-radio :label="-2">全部</el-radio>
                    <el-radio :label="-3">自定义</el-radio>
                  </el-radio-group>
                  <span v-if="select_teble_type == -3" class="radio_class">
                    <el-input v-model="select_teble_type2" placeholder="输入数量" style="width: 24rem;" />
                  </span>
                </span>
              </span>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button style="height: 2.8rem;" @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" style="height: 2.8rem;" @click="getExcel2">确 定</el-button>
            </span>
          </el-dialog>
        </div>
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
import { mapGetters } from 'vuex'
import { getExcelDemo1, getExcelDemo2, getExcelDemo3 } from '@/api/get_excel'
import { getStatisticsData } from '@/api/table'
import { getList, getdataCount } from '@/api/table'
import Progress from "@/components/progress"
import dataStatementMakeSearchTemplate from "@/components/Infomanage/dataStatementMakeSearchTemplate";
export default {

  data() {
    return {
      dialogVisible: false,
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 8, 10, 12, 15],
      // 默认每页显示的条数（可修改）
      PageSize: 12,
      // 上一次的筛选参数
      par_str: '',
      selectData: [],
      centerDialogVisible: false,
      select_teble_radio: -1,
      select_teble_type: -1,
      select_teble_type2: '',
      inputValue: '',
      initname: ['123'],
      radio: -1,
      basic_info_id: '',
      dataname: [
        {
          value: 'num',
          label: '#'
        },{
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
          label: '上线时间',
          formatter:function (row) {
            var time=row.onlineTime
            if(!time){
              return time
            }
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
            return year+"-"+month+"-"+day;
          }
        },
        {
          value: 'offlineTime',
          label: '下线时间',
          formatter:function (row) {
            var time=row.offlineTime
            if(!time){
              return time
            }
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
            return year+"-"+month+"-"+day;
          }
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
      uploadData: {
        //懒加载节点信息
        tree: null,
        treeNode: null,
        resolve: null
      },
      isflag: false,
      isMore: false,
      DataName: 'all',
      ClientHeight:0,
      // 统计数据
      StatisticsData: [],
      // 全选事件
      is_select_all:false
    }
  },
  components:{
    Progress,
    dataStatementMakeSearchTemplate
  },
  computed: {
    ...mapGetters(['name', 'roles']),
  },

  mounted() {
    this.get_data()
    document.getElementsByClassName('el-table__body-wrapper')[0].addEventListener('scroll',this.load)
  },
  destroyed() {
    document.removeEventListener('scroll',this.load)
  },
  watch:{
    'ClientHeight':function(curVal,oldVal){
      //console.log(curVal,oldVal,'&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;')
      //console.log(this.tableData.length , this.totalCount)
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
        limit: this.totalCount < this.tableData.length + 15 ? this.totalCount - this.tableData.length : 15,
        status: ''
      }
      if(this.tableData.length < this.totalCount){
        //console.log("提交请求",params)
        getList(params).then((response) => {
          this.isflag = false
          //console.log(response)
          if(this.tableData.length < this.totalCount){
            let num = this.tableData.length + 1
            for(let i of response.data.items){
              i["num"] = num
              num++
            }
            this.tableData = this.tableData.concat(response.data.items)
            }
        })
      }

    }
  },
  methods: {
    receiveAllSearchData(searchAllData){
      this.tableData = searchAllData;
      this.dialogVisible = false;
    },
    search(){
      this.dialogVisible = true
    },
    get_data() {
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
        status: ''
      }
      const numparams = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: ''
      }
      getdataCount(numparams).then((response) => {
        this.totalCount = response.data.total
      })
      //console.log("提交请求",params)

      getList(params).then((response) => {
        //console.log(response)
        let num = this.tableData.length + 1
        for(let i of response.data.items){
          i["num"] = num
          num++
        }
        this.tableData = this.tableData.concat(response.data.items)
      })

    },
    get_data2() {
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
        status: ''
      }
      const params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        start: this.tableData.length ? this.tableData.length : 0,
        limit: 15,
        status: ''
      }
      getdataCount(numparams).then((response) => {
        this.totalCount = response.data.total
      })
      getList(params).then((response) => {
        //console.log(response)
        let num = this.tableData.length + 1
        for(let i of response.data.items){
          i["num"] = num
          num++
        }
        this.tableData = this.tableData.concat(response.data.items)
      })

    },
    load (e) {
      if(e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) <= 40){
        //console.log("滚动到底了",this.tableData.length , this.totalCount,e.target.scrollHeight)
        if(this.ClientHeight == e.target.scrollHeight){
          this.isMore = true
          setTimeout(()=>{
            this.isMore = false
          },1000)
        }
        this.ClientHeight = e.target.scrollHeight
      }
    },
    getStatisticsExcel() {
      const item_list = [
        'getEquipmentCount',
        '../baseparameter/getEquipmentTypeCount',
        'getGuaranteePeriodCount',
        'getSystemWareCount',
        'getApplicationUserCount?qapp_user=all',
        'getEquipmentUserCount?qequipment_user=all'
      ]
      const trigger_fun = (data) => {
        this.StatisticsData.push(data)
        if (this.StatisticsData.length > 5) {
          //console.log('ok')
          getExcelDemo3(this.StatisticsData)
        }
      }
      for (const i of item_list) {
        getStatisticsData(i).then((res) => {
          // //console.log(res,i)
          // StatisticsData.push(res)
          if (typeof res === 'object') {
            trigger_fun(res.data)
          } else {
            trigger_fun(res)
          }
        }).catch(err=>{ // 如果接口失效则添加零
          //console.log(err)
          trigger_fun(0)
        })
      }
    },
    handleSelectionChange(val) {
      this.selectData = val
    },
    selectAllFun(val){
      if(val.length!=0){
        this.is_select_all = true;
      }else {
        this.is_select_all = false;
      }
      //console.log(this.is_select_all)
    },
    async exportEscel(model) {
      if (model === 0) {
        if (this.DataName === 'all' || this.DataName.length === 0) {
          //console.log(this.DataName)
          this.initname = ['111']
        } else {
          this.initname = JSON.parse(JSON.stringify(this.DataName))
        }
        const numparams = {
          dataName: this.initname,
          dataValue: this.inputValue,
          status: ''
        }
        let item_count = (await getdataCount(numparams)).data.total
        const params = {
          dataName: this.initname,
          dataValue: this.inputValue,
          start: 0,
          limit: item_count,
          status: ''
        }
        getList(params).then((response) => {
          getExcelDemo1(response.data.items)
        })
      } else if (model === 1) {
        // 选择怎么导出数据 1.单独导出每条数据 2.多条数据存放在一个文件中导出
        // 设置弹窗导出
        if (this.selectData.length > 1) {
          this.centerDialogVisible = true
        } else if (this.selectData.length === 1) {
          getExcelDemo2(this.selectData)
          // 取消表格选择
          this.$refs.multipleTable.clearSelection();
          // //console.log('this')
        } else {
          this.$message.error('请选择需要导出的信息')
        }
      } else if (model === 2) {
        this.getStatisticsExcel()
      }
    },
    async getExcel2() {
      // eslint-disable-next-line eqeqeq
      let data_num = 0
      if (this.select_teble_radio != -1 || this.select_teble_type != -1 || this.select_teble_type2 != '') {
        if (this.select_teble_radio == 1) {
          data_num = 1
        } else if (this.select_teble_type != -3) {
          data_num = this.select_teble_type
        } else {
          const item_num = parseInt(this.select_teble_type2)
          if (item_num > 0 && item_num < this.selectData.length) {
            data_num = item_num
          } else if (item_num >= this.selectData.length) {
            data_num = -2
          } else {
            this.$message.error('请选择填入合理的数字')
            data_num = 0
          }
        }
        if (data_num !== 0) {
          let item = this.selectData
          if(this.is_select_all){ // 表格全选
            if (this.DataName === 'all' || this.DataName.length === 0) {
              this.initname = ['111']
            } else {
              this.initname = JSON.parse(JSON.stringify(this.DataName))
            }
            const numparams = {
              dataName: this.initname,
              dataValue: this.inputValue,
              status: ''
            }
            let item_count = (await getdataCount(numparams)).data.total
            const params = {
              dataName: this.initname,
              dataValue: this.inputValue,
              start: 0,
              limit: item_count,
              status: ''
            }
            item = (await getList(params)).data.items
          }
          this.is_select_all = false
          const h = this.$createElement
          let notify = this.$notify({
              title: '正在导出',
              dangerouslyUseHTMLString: true,
              message: h('Progress',{
              style:{
                  width:"15rem"
              }
              }),
              type: 'success',
              offset: 100,  // 向下偏移100
              duration: 0  // 设置不会自动关闭
          })
          // //console.log("退出弹窗")
          this.centerDialogVisible = false
          this.select_teble_radio = -1
          this.select_teble_type = -1
          this.select_teble_type2 = ''
          // 取消表格选择
          this.$refs.multipleTable.clearSelection();
          getExcelDemo2(item, data_num == -2 ? item.length : data_num > item.length ? item.length : data_num ).then((res=>{
            setTimeout(()=>{
              notify.close()
            },2000)
          }))
        }

      }
    },
    /**
     * el-table-column 自适应列宽
     * @param prop_label: 表名
     * @param table_data: 表格数据
     */
    flexColumnWidth(label, prop) {
      // //console.log('label', label)
      // //console.log('prop', prop)
      // 1.获取该列的所有数据
      const arr = this.tableData.map((x) => x[prop])
      // arr.push(label) // 把每列的表头也加进去算
      arr.push(prop) // 把每列的表头也加进去算
      // //console.log(arr)
      // // 2.计算每列内容最大的宽度 + 表格的内间距（依据实际情况而定）
      return this.getMaxLength(arr)*1.7 + 40 + 'px'
    },

    /**
     * 遍历列的所有内容，获取最宽一列的宽度
     * @param arr
     */
    getMaxLength(arr) {
      return arr.reduce((acc, item) => {
        if (item) {
          const calcLen = this.getTextWidth(item)
          if (acc < calcLen) {
            acc = calcLen
          }
        }
        return acc
      }, 0)
    },

    /**
     * 使用span标签包裹内容，然后计算span的宽度 width： px
     * @param valArr
     */
    getTextWidth(str) {
      let width = 0
      const html = document.createElement('span')
      html.innerText = str
      html.className = 'getTextWidth'
      document.querySelector('body').appendChild(html)
      width = document.querySelector('.getTextWidth').offsetWidth
      document.querySelector('.getTextWidth').remove()
      return width
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      // this.currentPage = 1;
      // this.getData_plus(0, this.currentPage * this.PageSize, this.par_str);
      // //console.log(val);
    }
    // 显示第几页
    // handleCurrentChange(val) {
    //   // 改变默认的页数
    //   this.currentPage = val
    //   // 取消选中
    //   this.basic_info_id = ''
    //   this.radio = -1

    //   this.getData_plus(
    //     this.PageSize * (this.currentPage - 1),
    //     this.PageSize * this.currentPage
    //     // this.par_str
    //   )
    //   // //console.log(val);
    // }
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
// .form_table_class{
//   // overflow-y: scroll;
//   // height: 50rem;
// }
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
</style>
-->


























<template>
  <div class="infobody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>信息资源管理</span></div>
    <div class="app-container">
      <div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">数据报表制作</div>
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
              style="margin-left: 40px"
              @click="fetchData()"
            >搜索</el-button>
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"  style="margin-left: 40px">
            <el-button type="primary" size="medium" icon="el-icon-download" @click="exportEscel(0)">总表导出</el-button>
          </el-col>
          <el-col  :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="margin-left: 20px">
            <el-button  type="primary" size="medium" icon="el-icon-download" @click="exportEscel(1)">详表导出</el-button>
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="3" :xl="2" style="margin-left: 10px" >
            <el-button type="primary" size="medium" icon="el-icon-download" @click="exportEscel(2)">统计表导出</el-button>
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
              style="margin-left: 150px"
              @click="search()"
            >筛选</el-button>
          </el-col>
        </el-row>
        <el-table
          ref="multipleTable"
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
          @select-all="selectAllFun"
          @selection-change="handleSelectionChange"
          @cell-dblclick="tbCellDoubleClick"
        >
          <el-table-column label="" width="40" type="selection" />
          <el-table-column label="" width="40" align="center" type="index" />
          <el-table-column
            v-for="(item,index) in dataname"
            :key="index"
            :label="item.label"
            :prop="item.value"
            :formatter="item.formatter"
            align="center"
            style="width: 100%"
            show-overflow-tooltip
            :width="flexColumnWidth(item.value, item.label)"
          >
          </el-table-column>

        </el-table>
        <el-dialog
          title="多条件搜索"
          :visible.sync="dialogVisible"
          width="55%"
          style="margin-top: -80px;"
          custom-class="transparent-dialog">
          <dataStatementMakeSearchTemplate :start="start" :limit="limit" @changList="receiveAllSearchData"></dataStatementMakeSearchTemplate>
        </el-dialog>
        <div class="block">
          <el-pagination
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
          />
        </div>
        <el-alert v-if="isflag" title="正在努力加载中..." type="success" center :closable="false" show-icon></el-alert>
        <el-alert v-if="isMore" title="没有更多数据" type="warning" center show-icon></el-alert>
        <el-dialog
          title="详表导出模式选择"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
        >
          <div style="width:100%;text-align: center;">
              <span>
                <span class="radio_class">
                  <el-radio v-model="select_teble_radio" label="1">单独导出每条数据</el-radio>
                  <el-radio v-model="select_teble_radio" label="2">多条数据存放在一个文件中导出</el-radio>
                </span>
                <span v-if="select_teble_radio==2">
                  <el-radio-group v-model="select_teble_type">
                    <el-radio :label="2">2条</el-radio>
                    <el-radio :label="8">8条</el-radio>
                    <el-radio :label="10">10条</el-radio>
                    <el-radio :label="-2">全部</el-radio>
                    <el-radio :label="-3">自定义</el-radio>
                  </el-radio-group>
                  <span v-if="select_teble_type == -3" class="radio_class">
                    <el-input v-model="select_teble_type2" placeholder="输入数量" style="width: 24rem;" />
                  </span>
                </span>
              </span>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button style="height: 2.8rem;" @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" style="height: 2.8rem;" @click="getExcel2">确 定</el-button>
            </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getList,
  getdataCount,
  InitValue,
  searchComprehensiveInfoByMultipleConditions,
  getStatisticsData
} from '@/api/table'
import dataStatementMakeSearchTemplate from "@/components/Infomanage/dataStatementMakeSearchTemplate";
import {getExcelDemo1, getExcelDemo2, getExcelDemo3} from "@/api/get_excel";
import Progress from "@/components/progress"


export default {
  // 引用vue reload方法
  inject: ['reload'],
  components: {
    Progress,
    dataStatementMakeSearchTemplate
  },
  computed: {
    ...mapGetters(['name', 'roles']),
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
      isflag: false,
      isMore: false,
      selectData: [],
      centerDialogVisible: false,
      select_teble_radio: -1,
      select_teble_type: -1,
      select_teble_type2: '',
      ClientHeight:0,
      radio: -1,
      par_str: '',
      // 统计数据
      StatisticsData: [],
      // 全选事件
      is_select_all:false,
      currentPage:1,
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
      list: [],
      total: 0,
      start: 0,
      limit: 10,
      DataName: 'all',
      keyname: [],
      initname: ['123'],
      department: '',
      inputValue: '',
      inputValue2:'',
      postname: '',
      input3: '',
      ifUpdate: '0',
      listLoading: true,
      singalInfo: {},
      initval: [],
      tempAllData:null,
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
        }
      ],
      // 解决下拉框的部分字段数据顺序和表格中不一致的需求
      dataname_option: [
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
          label: '业务系统'
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
      isMultiline:false,
      infoInput:[],
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
    receiveAllSearchData(searchAllData,infoInput){
      this.isMultiline=true;
      this.start=0;
      this.currentPage=1;
      this.infoInput=infoInput;
      this.list = searchAllData.items;
      this.total = searchAllData.total;
      this.dialogVisible = false;
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
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
      this.isMultiline=false
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
        dataValue2: this.inputValue2,
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


    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`)
      this.limit = val
      if(this.isMultiline){
        this.infoInput.start=this.start
        this.infoInput.limit=this.limit
        this.listLoading=true
        const params=this.infoInput
        searchComprehensiveInfoByMultipleConditions(params).then(res=>{
          this.list=res.data.items
          this.total=res.data.total
          this.listLoading=false
        })
      }else {
        this.fetchData()
      }

    },
    handleCurrentChange(val) {
      this.listLoading=true
      this.currentPage=val
      if(this.isMultiline){
        this.infoInput.start=val - 1
        this.infoInput.limit=this.limit
        const params=this.infoInput

        searchComprehensiveInfoByMultipleConditions(params).then(res=>{
          this.list=res.data.items
          this.total=res.data.total
          this.listLoading = false
        })
      }else {
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
      }
    },
    search(){
      this.dialogVisible = true
    },
    changeDiv(value) {
      this.ifUpdate = value
    },
    selectAllFun(val){
      if(val.length!=0){
        this.is_select_all = true;
      }else {
        this.is_select_all = false;
      }
      //console.log(this.is_select_all)
    },

    handleSelectionChange(val) {
      this.selectData = val
    },

    getStatisticsExcel() {
      const item_list = [
        'getEquipmentCount',
        '../baseparameter/getEquipmentTypeCount',
        'getGuaranteePeriodCount',
        'getSystemWareCount',
        'getApplicationUserCount?qapp_user=all',
        'getEquipmentUserCount?qequipment_user=all'
      ]
      const trigger_fun = (data) => {
        this.StatisticsData.push(data)
        if (this.StatisticsData.length > 5) {
          //console.log('ok')
          getExcelDemo3(this.StatisticsData)
        }
      }
      for (const i of item_list) {
        getStatisticsData(i).then((res) => {
          // //console.log(res,i)
          // StatisticsData.push(res)
          if (typeof res === 'object') {
            trigger_fun(res.data)
          } else {
            trigger_fun(res)
          }
        }).catch(err=>{ // 如果接口失效则添加零
          //console.log(err)
          trigger_fun(0)
        })
      }
    },

    async exportEscel(model) {
      if (model === 0) {
        if (this.DataName === 'all' || this.DataName.length === 0) {
          //console.log(this.DataName)
          this.initname = ['111']
        } else {
          this.initname = JSON.parse(JSON.stringify(this.DataName))
        }
        const numparams = {
          dataName: this.initname,
          dataValue: this.inputValue,
          status: ''
        }
        let item_count = (await getdataCount(numparams)).data.total
        const params = {
          dataName: this.initname,
          dataValue: this.inputValue,
          start: 0,
          limit: item_count,
          status: ''
        }
        getList(params).then((response) => {
          getExcelDemo1(response.data.items)
        })
      } else if (model === 1) {
        // 选择怎么导出数据 1.单独导出每条数据 2.多条数据存放在一个文件中导出
        // 设置弹窗导出
        if (this.selectData.length > 1) {
          this.centerDialogVisible = true
        } else if (this.selectData.length === 1) {
          await getExcelDemo2(this.selectData)
          // 取消表格选择
          this.$refs.multipleTable.clearSelection();
          // //console.log('this')
        } else {
          this.$message.error('请选择需要导出的信息')
        }
      } else if (model === 2) {
        this.getStatisticsExcel()
      }
    },

    async getExcel2() {
      // eslint-disable-next-line eqeqeq
      let data_num = 0
      if (this.select_teble_radio !== -1 || this.select_teble_type !== -1 || this.select_teble_type2 !== '') {
        if (this.select_teble_radio === 1) {
          data_num = 1
        } else if (this.select_teble_type !== -3) {
          data_num = this.select_teble_type
        } else {
          const item_num = parseInt(this.select_teble_type2)
          if (item_num > 0 && item_num < this.selectData.length) {
            data_num = item_num
          } else if (item_num >= this.selectData.length) {
            data_num = -2
          } else {
            this.$message.error('请选择填入合理的数字')
            data_num = 0
          }
        }
        if (data_num !== 0) {
          let item = this.selectData
          if(this.is_select_all){ // 表格全选
            if (this.DataName === 'all' || this.DataName.length === 0) {
              this.initname = ['111']
            } else {
              this.initname = JSON.parse(JSON.stringify(this.DataName))
            }
            const numparams = {
              dataName: this.initname,
              dataValue: this.inputValue,
              status: ''
            }
            let item_count = (await getdataCount(numparams)).data.total
            const params = {
              dataName: this.initname,
              dataValue: this.inputValue,
              start: 0,
              limit: item_count,
              status: ''
            }
            item = (await getList(params)).data.items
          }
          this.is_select_all = false
          const h = this.$createElement
          let notify = this.$notify({
            title: '正在导出',
            dangerouslyUseHTMLString: true,
            message: h('Progress',{
              style:{
                width:"15rem"
              }
            }),
            type: 'success',
            offset: 100,  // 向下偏移100
            duration: 0  // 设置不会自动关闭
          })
          // //console.log("退出弹窗")
          this.centerDialogVisible = false
          this.select_teble_radio = -1
          this.select_teble_type = -1
          this.select_teble_type2 = ''
          // 取消表格选择
          this.$refs.multipleTable.clearSelection();
          getExcelDemo2(item, data_num === -2 ? item.length : data_num > item.length ? item.length : data_num ).then((res=>{
            setTimeout(()=>{
              notify.close()
            },2000)
          }))
        }

      }
    },

    flexColumnWidth(label, prop) {
      // //console.log('label', label)
      // //console.log('prop', prop)
      // 1.获取该列的所有数据
      const arr = this.list.map((x) => x[prop])
      // arr.push(label) // 把每列的表头也加进去算
      arr.push(prop) // 把每列的表头也加进去算
      // //console.log(arr)
      // // 2.计算每列内容最大的宽度 + 表格的内间距（依据实际情况而定）
      return this.getMaxLength(arr)*1.7 + 40 + 'px'
    },

    getMaxLength(arr) {
      return arr.reduce((acc, item) => {
        if (item) {
          const calcLen = this.getTextWidth(item)
          if (acc < calcLen) {
            acc = calcLen
          }
        }
        return acc
      }, 0)
    },

    getTextWidth(str) {
      let width = 0
      const html = document.createElement('span')
      html.innerText = str
      html.className = 'getTextWidth'
      document.querySelector('body').appendChild(html)
      width = document.querySelector('.getTextWidth').offsetWidth
      document.querySelector('.getTextWidth').remove()
      return width
    },
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
.transparent-dialog{
  background-color: rgba(300,300,300,0.8)
}

.radio_class{
  display:inline-block;
  height:2rem;
  width:100%;
}

//.transparent-dialog .el-dialog__body {
//  background: transparent;
//}
</style>
