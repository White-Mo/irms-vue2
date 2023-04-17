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
      <el-row :gutter="20" >
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
                  <div v-if="item[0].indexOf(data.day) != -1" class="haveData" >
                  </div>
                </div>
                </div>
              </template>
            </el-calendar>
            <div id="myChart"  style="height: 32vh; background-color: rgba(34,81,236,0.22); ">
            </div>
          </el-row>
        </el-col>
        <el-col :span="4" >
          <el-table
            height="77vh"
            :row-style="{height:'6.26vh'}"
            :cell-style="{padding:'0px'}"
            v-loading="listLoading"
            :disable="true"
            :data="handlersData"
            element-loading-text="Loading"
            border
            highlight-current-row
            stripe
            @row-click="searchLogByDateAndUser"
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
      <el-col span="1" style="width: 0.1vh; height: 77vh; background-color: rgba(170,238,238,0.6)"></el-col>
        <el-col :span="11">
          <el-table
            height="77vh"
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
  getLogDataByTime,
  getLogDataByDateAndUser, getLogDateAndCount, getCurrentDayLogData
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
      counts: [],
    }
  },
  created() {
  },
  mounted() {
    //默认显示当天操作用户
    this.getCurrentDayDate()
    //获取从当天开始按日期降序的数据
    getLogData().then(response => {
      this.tableData = response.data.items
    })
    //操作频率统计
    this.frequencyChart()
    //获取有用户操作的日期和该日期操作的次数
    getLogDateAndCount().then(response => {
      this.scheduleData = response.data.items
      this.counts = response.data.items
      console.log("用户操作的日期和该日期操作的次数",this.scheduleData)
    })

  },

  methods: {
    getCurrentDayDate() {
      const currentDate = moment(new Date()).format('YYYY-MM-DD')
      console.log(currentDate)
      getCurrentDayLogData(currentDate).then(response => {
        console.log(response.data)
        this.handlersData = response.data.items
      })
    },
    handleDateChange(date) {
      this.timeParams = moment(date).format('YYYY-MM-DD')
      const timeParams = this.timeParams
      getLogDataUserByTime(timeParams).then(response => {
        // console.log(response)
        this.handlersData = response.data.items
      })
      getLogDataByTime(timeParams).then(response => {
        this.tableData = response.data.items
      })
    },
    searchLogByDateAndUser(row) {
      const params = {
        userName:row.user,
        time:moment(row.time).format('YYYY-MM-DD')
      }
      getLogDataByDateAndUser(params).then(response => {
        this.tableData = response.data.items
      })
    },
    frequencyChart() {
      const myChart = this.$echarts.init(document.getElementById('myChart'));//获取容器元素
      getLogDateAndCount().then(response => {
        this.counts = response.data.items;
        const xAxisData = []; // 处理横坐标日期
        const seriesData = []; // 处理纵坐标操作次数
        const today = moment(); // 获取当前日期
        for (let i = 6; i >= 0; i--) {
          const date = today.clone().subtract(i, 'days'); // 获取最近7天的日期
          xAxisData.push(date.format('MM-DD')); // 格式化日期
          const item = this.counts.find(item => moment(item[0]).isSame(date, 'day')); // 查找该日期对应的次数
          seriesData.push(item ? item[1] : 0); // 如果有次数，则添加次数，否则添加0
        }

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
            data: xAxisData,
            name: '日期',
            nameTextStyle: {
              color: '#333',
              fontSize: 16,
            }
          },
          yAxis: {
            type: 'value',
            name: '操作频数',
            nameTextStyle: {
              color: '#333',
              fontSize: 16,
            }
          },
          series: [
            {
              data: seriesData,
              type: 'bar'
            }
          ]
        };//设置初始化配置项
        myChart.setOption(option);//设置option
      })
    },
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

<style >
.el-calendar-table .el-calendar-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 4px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  position: relative;

}

.haveData{
  width: 95%;
  height: 95%;
  position: absolute;
  top: 1%;
  background-color: rgba(0, 255, 255, 0.44);
}
</style>






