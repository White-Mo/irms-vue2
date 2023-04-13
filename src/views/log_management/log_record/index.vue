<template>
  <div>
    <div class="grid-content bg-purple">
      <i class="el-icon-s-order" /><span>日志管理</span>
    </div>
    <div class="app-container" style="height: 100%">
      <el-row :gutter="20">
        <el-col>
          <div class="grid-content bg-purple-dark">日志记录
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-row :gutter="10" >
            <el-calendar v-model="date"
                         @input="handleDateChange"
                         style="background-color: rgba(34,116,236,0.22);  ">
              <template slot="dateCell" slot-scope="{ data }">
                <div :class="data.isSelected ? 'is-selected' : ''">
                  {{ data.day.split("-").slice(2).join("-") }}
                <div
                  v-for="(item ,index) in scheduleData"
                  :key>
                  <div v-if="item[0].indexOf(data.day) != -1" class="haveData" ></div>
                </div>
                </div>
              </template>
            </el-calendar>
<!--            <div id="myChart"  style="height: 32vh; background-color: rgba(34,81,236,0.22); ">
            </div>-->
          </el-row>
        </el-col>
        <el-col :span="5" >
          <el-table
            height="76.5vh"
            :row-style="{height:'6.26vh'}"
            :cell-style="{padding:'0px'}"
            v-loading="listLoading"
            :disable="true"
            :data="handlersData"
            element-loading-text="Loading"
            border
            highlight-current-row
            stripe
            @row-click="searchLogByUser"
          >
            <el-table-column
              v-for="(item,index) in handlers"
              :key="index"
              :label="item.label"
              :prop="item.value"
              :formatter="item.formatter"
              align="center"
            >
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="11">
          <el-table
            height="76.5vh"
            :row-style="{height:'6.26vh'}"
            :cell-style="{padding:'0px'}"
            v-loading="listLoading"
            :disable="true"
            :data="tableData"
            element-loading-text="Loading"
            border
            highlight-current-row
            stripe
          >
            <el-table-column align="center" type="index"/>
            <el-table-column
              v-for="(item,index) in basicValue"
              :key="index"
              :label="item.label"
              :prop="item.value"
              :formatter="item.formatter"
              align="center"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  getLogDataUserByTime,
  getLogData,
  getLogDataUser,
  getLogDataByTime,
  getLogDataByUser, getLogDateAndCount
} from '@/api/log_management'
import moment from 'moment'
export default {
  name: 'logRecord',
  data() {
    return {
      date: null,
      tableData: [],
      handlersData: [],
      listLoading: false,
      timeParams: '',
      dateArr: [],
      year: '',
      month: '',
      handlers: [
        {
          value: 'user',
          label: '用户'
        }
      ],
      basicValue: [
        {
          value: 'message',
          label: '操作行为'
        },
        {
          value: 'user',
          label: '操作用户'
        },
        {
          value: 'time',
          label: '具体时间'
        },
      ],
      scheduleData: {},
    }
  },
  created() {
    getLogDataUser().then(response => {
      this.handlersData = response.data.items
    })
    getLogData().then(response => {
      this.tableData = response.data.items
    })
  },
  mounted() {
/*    this.frequencyChart()*/
    /*    this.$nextTick(() => {
      let tempDate = moment(new(Date)).format('YYYY-MM-DD')
      this.year = tempDate.slice(0,4)
      this.month = tempDate.slice(6,7)-1 // 注意：moment.js中的月份从0开始计数，所以4月的索引为3
      const daysInMonth = moment(`${this.year}-${this.month+1}`, 'YYYY-MM').daysInMonth()
      for (let i = 1; i <= daysInMonth; i++) {
        const date = moment(`${this.year}-${this.month + 1}-${i}`, 'YYYY-MM-DD')
        console.log(date.format('YYYY-MM-DD'))
        this.dateArr.push(date.format('YYYY-MM-DD'))
      }
      console.log(this.dateArr)
    })*/
    getLogDateAndCount().then(response => {
      this.scheduleData = response.data.items
      console.log(this.scheduleData)

    })

  },

  methods: {
    handleDateChange(date) {
      this.timeParams = moment(date).format('YYYY-MM-DD')
      const timeParams = this.timeParams
      getLogDataUserByTime(timeParams).then(response => {
        console.log(response)
        this.handlersData = response.data.items
      })
      getLogDataByTime(timeParams).then(response => {
        this.tableData = response.data.items
      })
    },
    searchLogByUser(row) {
      const userName = row.user
      getLogDataByUser(userName).then(response => {
        this.tableData = response.data.items
      })
    },
/*    frequencyChart() {
      const myChart = this.$echarts.init(document.getElementById('myChart'));//获取容器元素
      const option = {
        title: {
          text: '一周操作频率',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };//设置初始化配置项
      myChart.setOption(option);//设置option
    },*/
  }
}
</script>

<style lang="scss" scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-condition {
  line-height: 50px;
  height: 54px;
  margin: 0px !important;
  background: #d3dce6;
}
.el-timeline{
  height: 100%;
  margin-top: 15px;

}
.el-row{
  min-height: 100%;
}

body,html{
  height:100%;
}
.box{
  width: 100%;
}
.is-selected {
  color: #1989FA;
}


</style>

<style>
.el-calendar-table .el-calendar-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 4px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: relative;
}

.haveData{
  width: 100%;
  height: 100%;
  /*border-radius: 50%;*/
  /*left: 24px;*/
  /*bottom: 4px;*/
  position: absolute;
  background-color: rgba(255, 0, 0, 0.44);
}
</style>






