<template>
  <div class='infobody'>
    <div class='grid-content bg-purple'><i class='el-icon-s-order' /><span>信息资源管理</span></div>
    <div class='app-container'>
      <div
        v-show="ifUpdate === '0'"
        class='show'
      >
        <el-row>
          <el-col :span='24'>
            <div class='grid-content bg-purple-dark'>综合信息管理</div>
          </el-col>
        </el-row>
        <el-row
          :gutter='10'
          class='bg-condition'
        >
          <el-col
            :xs='2'
            :sm='2'
            :md='2'
            :lg='2'
            :xl='2'
          >
            <span>查询条件:</span>
          </el-col>
          <el-col
            :xs='3'
            :sm='3'
            :md='3'
            :lg='3'
            :xl='3'
          >
            <el-select
              @change='handleSelectChange'
              v-model='DataName'
              placeholder='详细字段查询'
              multiple
            >
              <el-option
                v-for='item in dataname_option'
                :key='item.label'
                :label='item.label'
                :value='item.value'
                class='searchInput'
                :disabled='item.isDisabled'
                clearable
              />
            </el-select>

          </el-col>
          <el-col
            :xs='3'
            :sm='3'
            :md='3'
            :lg='3'
            :xl='3'
          >
            <el-autocomplete
              autosize
              type='text'
              class='inline-input'
              clearable
              v-model='inputValue'
              :fetch-suggestions='querySearch'
              placeholder='请输入内容'
              :popper-append-to-body='false'
              @select='handleSelect'
            ></el-autocomplete>
          </el-col>
          <el-col
            :xs='2'
            :sm='2'
            :md='2'
            :lg='2'
            :xl='2'
          >

            <el-button
              size='medium'
              type='primary'
              icon='el-icon-search'
              clearable='true'
              @click='searchOne()'
            >搜索
            </el-button>
          </el-col>
          <el-col
            :xs='3'
            :sm='3'
            :md='3'
            :lg='3'
            :xl='3'
          >
            保修期查询条件:
          </el-col>
          <el-col
            :xs='3'
            :sm='3'
            :md='3'
            :lg='3'
            :xl='3'
          >
            <el-select
              v-model='guaranteePeriodSearchCondition'
              placeholder='已过保'
              clearable
              :popper-append-to-body='false'>
              <el-option
                v-for='(item, index) in guaranteePeriodSearchConditionData'
                :key='index'
                :value='item.value'
                :label='item.label'
                :class='getColorClass(item.value)'
                class='searchInput'
              ></el-option>
            </el-select>
          </el-col>
          <el-col
            :xs='8'
            :sm='8'
            :md='8'
            :lg='8'
            :xl='8'
          >

            <el-button
              size='medium'
              type='primary'
              icon='el-icon-search'
              clearable='true'
              @click='guaranteePeriodSearch()'
            >保修期查询
            </el-button>
            <el-button
              size='medium'
              type='primary'
              @click='addInfo()'
            >添加设备信息
            </el-button>
            <el-button
              size='medium'
              type='primary'
              @click='search()'
            >筛选
            </el-button>
          </el-col>
        </el-row>

        <div class='draggable' style='padding: 20px' v-if='showTable'>
          <el-table
            ref='table'
            v-loading='listLoading'
            :diisable='true'
            :data='list'
            element-loading-text='Loading'
            height='72vh'
            border
            :row-style="{height:'6.26vh'}"
            :cell-style="{padding:'0px',borderColor:'#C0C0C0' }"
            :header-cell-style="{borderColor:'#C0C0C0'}"
            highlight-current-row
            stripe
            @sort-change='sortChange'
            @cell-dblclick='tbCellDoubleClick'
            @header-dragend='headWidthChange'
          >
            <el-table-column
              align='center'
              fixed='left'
              label='序号'
              :prop='newList[0].value'
              width='80px'
            ></el-table-column>
            <el-table-column
              v-for='(item,index) in newList'
              v-if='index>0'
              :key='`col_${index}`'
              :prop='item.value'
              :label='item.label'
              :formatter='item.formatter'
              align='center'
              :width=flexColumnWidth(item.label,item.value)
              show-overflow-tooltip
              sortable='custom'
            >
            </el-table-column>
            <el-table-column
              align='center'
              fixed='right'
              label='操作'
              width='250px'
            >
              <template slot-scope='scope'>
                <el-button
                  type='success' plain
                  size='mini'
                  @click='handleDetail(scope.$index, scope.row)'
                >详情
                </el-button>
                <el-button
                  type='primary' plain
                  size='mini'
                  @click='handleEdit(scope.$index, scope.row)'
                >编辑
                </el-button>

                <el-button
                  size='mini'
                  type='danger'
                  text
                  @click=handleDelete(scope.row)
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog
          title='多条件搜索'
          :visible.sync='dialogVisible'
          width='55%'
          style='margin-top: -80px;'
          custom-class='transparent-dialog'>
          <search-template :start='start' :limit='limit' @changList='receiveAllSearchData'></search-template>
        </el-dialog>
        <div class='block'>
          <el-pagination
            :page-size='10'
            :current-page.sync='currentPage'
            layout='total, sizes, prev, pager, next, jumper'
            :total='total'
            @size-change='handleSizeChange'
            @current-change='handleCurrentChange'
          />
        </div>
      </div>
      <div v-if="ifUpdate === '1'">
        <addInfo @changeDiv='changeDiv' />
      </div>
      <div v-if="ifUpdate === '2' || ifUpdate === '3'">
        <updateInfo
          :row='row'
          :current-show='ifUpdate'
          @changeDiv='changeDiv'
        />
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import {
  getList,
  delEquipment,
  InitValue,
  searchComprehensiveInfoByMultipleConditions,
  guaranteePeriodSearchByTime, solelySearchIdAndMacAddress
} from '@/api/table'
import addInfo from '@/components/Infomanage/addInfo'
import updateInfo from '@/components/Infomanage/updateInfo'
import searchTemplate from '@/components/Infomanage/searchTemplate'

export default {
  // 引用vue reload方法
  inject: ['reload'],
  components: {
    addInfo,
    updateInfo,
    searchTemplate
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
  watch: {
    async newTable() {
      console.log('列改变')
      await this.refreshTable()
      this.$nextTick(() => {
        // 获取el-table的横向滚动条位置
        const elTable = this.$refs.table.$el
        const bodyWrapper = elTable.querySelector('.el-table__body-wrapper')
        bodyWrapper.scrollLeft = this.scrollLeft
        this.columnDrop()
      })
    }
  },
  data() {
    return {
      scrollLeft: 0,
      newTable: false,
      showTable: true,
      prop: 'basicInfoId',
      order: 'ASC',
      currentPage: 1,
      guaranteePeriodID: '保修期:',
      editionID: '中间件版本:',
      typeID: 'CPU类型:',
      type: 0,
      edition: 0,
      guaranteePeriod: 0,
      ipAddress: 0,
      macAddress: 0,
      remains: 0,
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
      keyname: [],
      DataName: 'all',
      initname: [],
      department: '',
      inputValue: '',
      inputValue2: '',
      postname: '',
      input3: '',
      ifUpdate: '0',
      listLoading: true,
      singalInfo: {},
      initval: [],
      tempAllData: null,
      newList: [],
      // 定义表格列配置
      counter: 1,
      dataname: [
        { value: 'sequenceNumber', label: '序号' },
        { value: 'basicInfoId', label: '设备编号' },
        { value: 'postName', label: '所属单位名称' },
        { value: 'departmentName', label: '所属部门名称' },
        { value: 'equipmentTypeName', label: '设备类型' },
        {
          value: 'trueOrVirtual',
          label: '实体机/虚拟机',
          formatter: function(row) {
            let trueOrVirtual = row.trueOrVirtual === '1' ? '实体机' : '虚拟机'
            return trueOrVirtual
          }
        },
        { value: 'isChinaLocalization', label: '是否国产化' },
        { value: 'equipmentName', label: '设备名称' },
        { value: 'equipmentAdminName', label: '设备管理员' },
        { value: 'equipmentAdminPhone', label: '设备管理员电话' },
        { value: 'appAdminName', label: '应用管理员' },
        { value: 'appAdminPhone', label: '应用管理员电话' },
        {
          value: 'onlineTime',
          label: '上线时间',
          formatter: function(row) {
            let time = row.onlineTime
            if (time == null) {
              return null
            } else {
              //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
              var date = new Date(time)
              var year = date.getFullYear()
              /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
              var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
              var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
              // 拼接
              // return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
              return year + '-' + month + '-' + day
            }
          }
        },
        {
          value: 'offlineTime',
          label: '下线时间',
          formatter: function(row) {
            let time = row.offlineTime
            if (time == null) {
              return null
            } else {
              //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
              var date = new Date(time)
              var year = date.getFullYear()
              /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
              var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
              var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
              var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
              var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
              var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
              // 拼接
              // return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
              return year + '-' + month + '-' + day
            }
          }
        },
        {
          value: 'status',
          label: '设备状态',
          formatter: function (row) {//还需要修改上方newList
            let status = row.status
            console.log(status)
            switch (status) {
              case '0':
                status = '在用'
                break
              case '1':
                status = '停用'
                break
              case '2':
                status = '报废'
                break
              default:
                status = '状态异常'
                break
            }
            return status
          }

        },
        { value: 'isTransfer', label: '是否存在调拨' },
        { value: 'transferRecord', label: '设备调拨记录' },
        { value: 'transferRecordTime', label: '设备调拨时间' },
        { value: 'isMoving', label: '是否存在移动' },
        { value: 'movingRecord', label: '设备移动记录' },
        { value: 'movingRecordTime', label: '设备移动时间' },
        { value: 'machineRoomName', label: '安装位置' },
        { value: 'cabinetName', label: '机柜号' },
        { value: 'cabinetUStart', label: '机柜开始U位' },
        { value: 'cabinetUEnd', label: '机柜结束U位' },
        { value: 'guaranteePeriod', label: '保修期' },
        { value: 'pool', label: '所属资源池' },
        { value: 'hostName', label: '主机名' },
        { value: 'businessApplicationName', label: '业务应用名称' },
        { value: 'businessSystem', label: '所属业务子系统' },
        { value: 'businessSystemLevel', label: '所属业务子系统等保等级' },
        { value: 'businessSystemFirstName', label: '所属业务系统' },
        { value: 'isTestBusinessSystem', label: '正式业务/实验业务' },
        { value: 'ipAddress', label: 'IP地址' },
        { value: 'macAddress', label: 'MAC地址' },
        { value: 'type', label: 'CPU型号' },
        { value: 'configMemoryCorenessOrCapacity', label: '内存容量（GB）' },
        { value: 'softwareOperatingSystemEdition', label: '操作系统版本' },
        { value: 'edition', label: '中间件品牌规格' },
        { value: 'softwareDatabaseEdition', label: '数据库版本' },
        { value: 'businessOrExperimental', label: '业务机/实验机' },
        { value: 'mainOrBackup', label: '主机/备机' },
        { value: 'migratable', label: '是否可迁移' },
        { value: 'shelfOff', label: '是否可下架' },
        { value: 'brandName', label: '品牌' },
        { value: 'brandModelName', label: '型号' },
        { value: 'serialNumber', label: '序列号' },
        { value: 'deploymentEnvironment', label: '部署环境（互联网/地震行业网/政务外网/应急指挥信息网/其他）' },
        { value: 'remarks', label: '备注' },
        { value: 'singleAndDoublePowerSupply', label: '单双电源' },
        { value: 'agreedToTemporaryShutdown', label: '是否同意临时关停（是/否）' },
        { value: 'installSafetyMonitoringSoftware', label: '是否安装安全监测软件' },
        { value: 'deployStrongPassword', label: '是否部署强口令' },
        { value: 'cloudServiceUnit', label: '云服务单位' },
        { value: 'leasedComputingResources', label: '租用计算资源情况（CPU核数）（个）' },
        { value: 'leasedStorageResources', label: '租用存储资源情况（TB）' },
        { value: 'leasedNetworkBandwidth', label: '租用网络带宽（兆）' },
        { value: 'termOfLease', label: '租用期限（年）' },
        { value: 'domainName', label: '域名' },
        { value: 'domainNameRegistrationService', label: '域名注册服务商' },
        { value: 'ns', label: 'NS记录' },
        { value: 'cname', label: 'CNAME记录（别名）' },
        { value: 'useCDN', label: '是否使用CDN' },
        { value: 'networkArea', label: '网络区域' },
        { value: 'accessLocation', label: '接入位置' }


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

        //新添IP地址Mac地址
        // PS：搜索框中使用了dataname_option这个数组中IP地址、Mac地址的索引
        // //若要改此数组元素的顺序，务必修改handleSelectChange()方法中的代码！！！
        {
          value: 'ipAddress',
          label: 'IP地址',
          width: '200px'
        },
        {
          value: 'macAddress',
          label: 'Mac地址',
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
      isMultiline: false,
      isGuaranteePeriodSearch: false,
      infoInput: [],
      guaranteePeriodSearchCondition: '',
      tempGuaranteePeriodSearchCondition: '',
      guaranteePeriodParams: {
        start: '',
        limit: '',
        searchCondition: ''
      },
      guaranteePeriodSearchConditionData: [
        {
          value: 'OverGuaranteePeriod',
          label: '已过保'
        },
        {
          value: 'currentMonthOverGuaranteePeriod',
          label: '当前月过保'
        },
        {
          value: 'threeMonthsOverGuaranteePeriod',
          label: '三个月后过保'
        },
        {
          value: 'sixMonthsOverGuaranteePeriod',
          label: '半年后过保'
        },
        {
          value: 'oneYearOverGuaranteePeriod',
          label: '一年后过保'
        }

      ]
    }
  },
  created() {
    this.fetchData()
    // 初始化新列顺序
    this.newList=this.dataname
    // this.newList = JSON.parse(JSON.stringify(this.dataname))
    // this.newList[12].formatter = this.dataname[12].formatter
    // this.newList[13].formatter = this.dataname[13].formatter
    // this.newList[14].formatter = this.dataname[14].formatter
    // this.newList[5].formatter = this.dataname[5].formatter
  },
  mounted() {
    this.restaurants = this.loadAll()
    this.columnDrop()
  },
  methods: {
    // 列拖拽
    columnDrop() {
      // 创建列拖拽实例
      const wrapperTr = document.querySelector('.draggable .el-table__header-wrapper tr')
      const elTable = this.$refs.table.$el
      const bodyWrapper = elTable.querySelector('.el-table__body-wrapper')
      let position = 0

      Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onStart: env => {
          position = env.oldIndex
        },
        onMove: evt => {
          const deltaX = evt.willInsertAfter
          console.log(deltaX)

          if (deltaX === true) {
            bodyWrapper.scrollLeft = bodyWrapper.scrollLeft + (evt.draggedRect.left)
          } else {
            bodyWrapper.scrollLeft = bodyWrapper.scrollLeft - (evt.draggedRect.left)
          }
        },
        onEnd: evt => {
          // 更新新列顺序以反映新的列顺序
          if (this.newTable === false) {
            this.newTable = true
          } else {
            this.newTable = false
          }
          const oldItem = this.newList[evt.oldIndex]
          this.newList.splice(evt.oldIndex, 1)
          this.newList.splice(evt.newIndex, 0, oldItem)
          console.log(this.newTable)
        }
      })

    },

    receiveAllSearchData(searchAllData, infoInput) {
      this.isMultiline = true
      this.start = 0
      this.currentPage = 1
      this.infoInput = infoInput
      this.list = searchAllData.items
      let counter = infoInput.start + 1
      this.list.forEach(item => {
        item.sequenceNumber = counter // 添加一个序号属性，值为计数器变量
        counter++ // 计数器自增
      })
      this.total = searchAllData.total
      this.dialogVisible = false

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
      if (val.indexOf('type') === -1 && this.type === 1) {
        // console.log("删除CPU类型");
        this.deleteSelect(this.typeID)
        this.type = 0
      } else if (val.indexOf('edition') === -1 && this.edition === 1) {
        // console.log("删除中间件版本");
        this.deleteSelect(this.editionID)
        this.edition = 0
      } else if (
        val.indexOf('guaranteePeriod') === -1 &&
        this.guaranteePeriod === 1
      ) {
        // console.log("删除保修期");
        this.deleteSelect(this.guaranteePeriodID)
        this.guaranteePeriod = 0
      }
      // 特殊字段下拉框进行初始化
      var key = 0
      for (key = 0; key < val.length; key++) {
        if (val[key] === 'type' && this.type === 0) {
          this.getInitValue(this.typeID, 'type')
          this.type = 1
        } else if (val[key] === 'edition' && this.edition === 0) {
          this.getInitValue(this.editionID, 'edition')
          this.edition = 1
        } else if (val[key] === 'guaranteePeriod' && this.guaranteePeriod === 0) {
          this.getInitValue(this.guaranteePeriodID, 'guarantee_period')
          this.guaranteePeriod = 1
        }
      }
    },

    getInitValue(name, initdatas) {
      InitValue(initdatas).then((response) => {
        this.initval = response.data.items
        for (let i = 0; i < this.initval.length; i++) {
          this.foad.push({ label: name, value: name + this.initval[i] })
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
        if (dfata[index].label === deleteName) {
          num++
          if (num === 1) {
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
    headWidthChange(newWidth, oldWidth, column, event) {
      console.log(newWidth, oldWidth, column, event)
      this.$refs.table.doLayout()
    },
    sortChange(column) {
      console.log(column)
      this.prop = column.prop
      if (column.order == null) {
        this.order = 'ASC'
      } else {
        this.order = column.order
      }
      this.fetchData()
    },
    //单条件搜索
    searchOne() {
      this.start = 0
      this.currentPage = 1
      this.fetchData()
    },
    // 综合数据管理展示与查询--lry
    fetchData() {
      this.listLoading = true
      this.isMultiline = false
      this.isGuaranteePeriodSearch = false
      // console.log(this.basicValue)
      // 判断处理---解决空值与后台逻辑不符合问题----时间紧待优化
      if (this.DataName === 'all' || this.DataName.length === 0) {
        this.initname = ['111']
      } else {
        // console.log(JSON.parse(JSON.stringify(this.DataName)))
        // if (this.eselect == true) {
        //   this.initname = JSON.parse(JSON.stringify(this.cpu_middle_guar))
        // }
        this.initname = JSON.parse(JSON.stringify(this.DataName))
      }
      // console.log("initname",this.initname)
      const params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: '0',
        start: (this.currentPage - 1) * this.limit,
        limit: this.limit,
        prop: this.prop,
        order: this.order
      }
      // console.log('11',this.initname)
      var flog = false
      // for (let i = 0; i <= this.initname.length; i++) {
      //   if (this.initname[i] === 'ipAddress' || this.initname[i] === 'macAddress') {
      //     // console.log("参数1",params)
      //     solelySearchIdAndMacAddress(params).then((response) => {
      //       let IpOrMacSearchAllData = response.data  //返回的数据包括“code”和“data”
      //       console.log(IpOrMacSearchAllData)
      //       this.list = IpOrMacSearchAllData
      //       this.total = IpOrMacSearchAllData.length
      //       // this.$emit('changList2', IpOrMacSearchAllData); //$emit()--将子组件的数据传递给父组件
      //       this.listLoading = false
      //     })
      //     flog = true
      //     break
      //   }
      // }单独搜索ip和mac
      if (flog === false) {
        console.log('参数2', params)
        getList(params).then((response) => {
          this.list = response.data.items
          console.log('+++++++++', this.list)
          //由于用组件列自动序号会导致拖动是数据错乱，故自定义一个序号属性
          let counter = params.start + 1
          this.list.forEach(item => {
            item.sequenceNumber = counter // 添加一个序号属性，值为计数器变量
            counter++ // 计数器自增
          })
          console.log('---------------', this.list)
          this.total = response.data.total
          this.listLoading = false
        })
      }
    },

    addInfo() {
      this.ifUpdate = '1'
    },
    handleDetail(index, row) {
      console.log('------------------------------')
      console.log(index, row)
      this.row = row
      this.ifUpdate = '2'
    },
    handleEdit(index, row) {
      //console.log(index, row)
      this.row = row
      this.ifUpdate = '3'
    },
    handleDelete(row) {
      this.$confirm(`是否永久删除设备：\"${row.equipmentName}\"信息`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delEquipment(row.equipmentId).then((response) => {
          this.active = 0
          this.$alert(response.data, '提示', {
            confirmButtonText: '确定',
            type: 'info',
            showClose: false
          }).then(() => {
            this.fetchData()
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

    },


    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.limit = val
      if (this.isMultiline) {
        this.infoInput.start = this.start * this.limit
        this.infoInput.limit = this.limit
        this.listLoading = true
        const params = this.infoInput
        searchComprehensiveInfoByMultipleConditions(params).then(res => {
          this.list = res.data.items
          let counter = params.start + 1
          this.list.forEach(item => {
            item.sequenceNumber = counter // 添加一个序号属性，值为计数器变量
            counter++ // 计数器自增
          })
          this.total = res.data.total
          this.listLoading = false
        })
      } else if (this.isGuaranteePeriodSearch) {
        const params = {
          start: this.start * this.limit,
          limit: this.limit,
          searchCondition: this.tempGuaranteePeriodSearchCondition
        }
        guaranteePeriodSearchByTime(params).then(res => {
          this.list = res.data.items
          let counter = this.start * this.limit
          this.list.forEach(item => {
            item.sequenceNumber = counter // 添加一个序号属性，值为计数器变量
            counter++ // 计数器自增
          })
          this.total = res.data.total
          this.listLoading = false
        })
      } else {
        this.fetchData()
      }
    },
    handleCurrentChange(val) {
      this.listLoading = true
      this.currentPage = val
      if (this.isMultiline) {
        this.infoInput.start = (val - 1) * this.limit
        this.infoInput.limit = this.limit
        const params = this.infoInput
        searchComprehensiveInfoByMultipleConditions(params).then(res => {
          this.list = res.data.items
          let counter = params.start + 1
          this.list.forEach(item => {
            item.sequenceNumber = counter // 添加一个序号属性，值为计数器变量
            counter++ // 计数器自增
          })
          this.total = res.data.total
          this.listLoading = false
        })
      } else if (this.isGuaranteePeriodSearch) {
        const params = {
          start: (val - 1) * this.limit,
          limit: this.limit,
          searchCondition: this.tempGuaranteePeriodSearchCondition
        }
        console.log(222, this.initname)
        guaranteePeriodSearchByTime(params).then(res => {
          this.list = res.data.items
          let counter = params.start + 1
          this.list.forEach(item => {
            item.sequenceNumber = counter // 添加一个序号属性，值为计数器变量
            counter++ // 计数器自增
          })
          this.total = res.data.total
          this.listLoading = false
        })
      } else {
        const params = {
          dataName: this.initname,
          dataValue: this.inputValue,
          status: '0',
          start: (val - 1) * this.limit,
          limit: this.limit,
          prop: this.prop,
          order: this.order
        }
        getList(params).then((response) => {
          this.list = response.data.items
          let counter = params.start + 1
          this.list.forEach(item => {
            item.sequenceNumber = counter // 添加一个序号属性，值为计数器变量
            counter++ // 计数器自增
          })
          this.total = response.data.total
          this.listLoading = false
        })
      }
    },
    search() {
      this.dialogVisible = true
    },
    //保修期搜索
    guaranteePeriodSearch() {
      this.isMultiline = false
      console.log('查询的条件:', this.guaranteePeriodSearchCondition)
      //一年后过保
      if (this.guaranteePeriodSearchCondition === 'oneYearOverGuaranteePeriod') {
        this.guaranteePeriodSearchHandel()
      }
      //当前月过保
      else if (this.guaranteePeriodSearchCondition === 'currentMonthOverGuaranteePeriod') {
        this.guaranteePeriodSearchHandel()
      }
      //半年后过保
      else if (this.guaranteePeriodSearchCondition === 'sixMonthsOverGuaranteePeriod') {
        this.guaranteePeriodSearchHandel()
      }
      //三个月后过保
      else if (this.guaranteePeriodSearchCondition === 'threeMonthsOverGuaranteePeriod') {
        this.guaranteePeriodSearchHandel()
      }
      //已过保
      else if (this.guaranteePeriodSearchCondition === 'OverGuaranteePeriod' || this.guaranteePeriodSearchCondition === '') {
        this.guaranteePeriodSearchCondition = 'OverGuaranteePeriod'
        this.guaranteePeriodSearchHandel()
      }
    },

    guaranteePeriodSearchHandel() {
      this.currentPage = 1
      this.tempGuaranteePeriodSearchCondition = this.guaranteePeriodSearchCondition
      const params = {
        start: (this.currentPage - 1) * this.limit,
        limit: this.limit,
        searchCondition: this.guaranteePeriodSearchCondition
      }
      guaranteePeriodSearchByTime(params).then(res => {
        this.list = res.data.items
        let counter = params.start + 1
        this.list.forEach(item => {
          item.sequenceNumber = counter // 添加一个序号属性，值为计数器变量
          counter++ // 计数器自增
        })
        this.total = res.data.total
        this.guaranteePeriodSearchCondition = ''
        this.isGuaranteePeriodSearch = true
        this.listLoading = false
      })
    },
    changeDiv(value) {
      this.ifUpdate = value
      this.fetchData()
    },
    //分页连续展示   currentPage页码  limit每页数量
    typeIndex(index) {
      return index + (this.currentPage - 1) * this.limit + 1
    },
    getColorClass(value) {
      if (value === 'OverGuaranteePeriod') {
        {
          return 'red'
        }
      }
    },
    /**
     * el-table-column 自适应列宽
     * @param prop_label: 表名
     * @param table_data: 表格数据
     */
    flexColumnWidth(label, prop) {
      return this.getTextWidth(label) * 1.7 + 40 + 'px'
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
    refreshTable() {
      // 获取el-table的横向滚动条位置
      const elTable = this.$refs.table.$el
      const bodyWrapper = elTable.querySelector('.el-table__body-wrapper')
      this.scrollLeft = bodyWrapper.scrollLeft
      console.log(this.scrollLeft)

      this.showTable = false

      this.$nextTick(() => {
        this.showTable = true
      })
    }

  }
}
</script>

<style lang='less' scoped>

/deep/ .el-autocomplete-suggestion {
  width: auto !important;
  text-align: left !important;
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
  line-height: 40px;
  text-align: center;
  color: #0b0c10;
  background-color: #deecff;
}


.el-select-dropdown__item {
  height: 40px;
  width: 200px;
  line-height: 40px;

}

/deep/ .el-select-dropdown__list {
  margin: 5px -10px 20px -10px;
  height: auto;
  width: 150px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: stretch;
  max-height: 100vh;
}

el-label {
  display: inline-block;
  line-height: 40px;
  width: 150px;
  text-align: right;
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


.red {
  background-color: red;
  color: #FFFFFF;
}


</style>
