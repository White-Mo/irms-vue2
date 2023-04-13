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
                         ref="calendar"
                         type="date"
                         @input="handleDateChange"
                         style="background-color: rgba(34,116,236,0.22); border-radius: 8px; ">
            </el-calendar>
<!--            <div style="height: 32vh; background-color: #041165; border-radius: 8px;"></div>-->
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
  getLogDataByUser
} from '@/api/log_management'
import moment from 'moment'
export default {
  name: 'logRecord',
  data() {
    return {
      date: null,
      tableData: [],
      handlersData:[],
      listLoading: false,
      timeParams:'',
      dateArr:[],
      year:'',
      month:'',
      handlers:[
        {
          value:'user',
          label:'用户'
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
    }
  },
  created() {
    // console.log("当前年月："+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate() )
    getLogDataUser().then(response => {
      this.handlersData = response.data.items
    })
    getLogData().then(response =>{
      this.tableData = response.data.items
    })
  },
  mounted() {
    this.$nextTick(() => {
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
       getLogDataByTime(timeParams).then(response =>{
        this.tableData = response.data.items
      })
    },
    searchLogByUser(row) {
      const userName = row.user
      getLogDataByUser(userName).then(response =>{
        this.tableData = response.data.items
      })
     }
  },
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
  height: 85px;
  line-height: 85px;
  text-align: center;
  position: relative;
  /*background-color: orangered;*/

}

/*.el-calendar-table .el-calendar-day span{*/
/*  background-color: rgb(242, 246, 250);*/
/*  position: absolute;*/
/*  width: 50px;*/
/*  height: 50px;*/
/*  line-height: 50px;*/
/*  right: 14px;*/
/*  top: 20px;*/
/*  text-align: center;*/
/*  border-radius: 50%;*/
/*}*/
</style>






