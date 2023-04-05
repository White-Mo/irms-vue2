<template>
  <div>
    <div class="grid-content bg-purple">
      <i class="el-icon-s-order" /><span>日志管理</span>
    </div>
    <div class="app-container" style="height: 100%">
      <el-row :gutter="20">
        <el-col>
          <div class="grid-content bg-purple-dark">日志管理
          </div>
        </el-col>
        <el-col :span=8 style="margin-top: 10px">
          <el-calendar v-model="dateValue" @change="printDate">
<!--          <el-calendar v-model="dateValue" ref="calendar" @click="handleDateClick" >-->
          <template
            slot="dateCell"
            slot-scope="{date, data}"
          >
            <div>
              <div v-for="(item, key) in activeday" :key="key">
                <el-badge v-if="data.day == item.dat" is-dot class="item"></el-badge>
              </div>
              <div class="spandate">{{ data.day.split('-').slice(2).join('-') }}</div>
            </div>
          </template>

          </el-calendar>
          <p>当前选中日期：{{ activeday }}</p>
<!--          <button @click="selectDate">选中日期</button>-->
        </el-col >
        <el-col :span="15">
          <div class="block">

            <el-timeline>
              <el-timeline-item timestamp="2023/4/6" placement="top">
                <el-card>
                  <el-table
                    height="70vh"
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
                    <el-table-column align="center" type="index" :index="typeIndex"/>
                    <el-table-column
                      v-for="(item,index) in basicvalue"
                      :key="index"
                      :label="item.label"
                      :prop="item.value"
                      :formatter="item.formatter"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
                </el-card>
              </el-timeline-item>

              <el-timeline-item timestamp="2023/4/3" placement="top">
                <el-card>
                  <el-table
                    height="70vh"
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
                    <el-table-column align="center" type="index" :index="typeIndex"/>
                    <el-table-column
                      v-for="(item,index) in basicvalue"
                      :key="index"
                      :label="item.label"
                      :prop="item.value"
                      :formatter="item.formatter"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
<!--                  <h4>更新 Github 模板</h4>-->
<!--                  <p>王小虎 提交于 2018/4/3 20:46</p >-->
                </el-card>
              </el-timeline-item>

              <el-timeline-item timestamp="2023/4/2" placement="top">
                <el-card>
                  <el-table
                    height="70vh"
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
                    <el-table-column align="center" type="index" :index="typeIndex"/>
                    <el-table-column
                      v-for="(item,index) in basicvalue"
                      :key="index"
                      :label="item.label"
                      :prop="item.value"
                      :formatter="item.formatter"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import { getLogData } from '@/api/log_management'

export default {
  name: 'help',
  data() {
    return {
      tableData: [],
      listLoading: false,
      dateValue: new Date(),
      selectedDate:null,
      currentPage: 1,
      limit: 10,
      time: [],
      activeday: null,
      basicvalue: [
        {
          value: 'time',
          label: '时间'
        },
        {
          value: 'user',
          label: '用户'
        },
        {
          value: 'message',
          label: '操作行为'
        }
      ],
    }
  },
  created() {
    this.showData()
    // this.handleSelect()
    this.printDate()
    // this.handleDateClick()
  },

  methods: {
    printDate(date) {
      console.log('选中日期:', date);
      this.activeday = date; // 更新 activeday 的值
    },
    // printDate(date) {
    //   console.log("所选日期是：", date);
    // },
    // handleDateClick(event) {
    //   const calendar = this.$refs.calendar;
    //   const selectedDate = calendar.calendarView.activeDate; // 获取当前所选日期
    //   console.log("所选日期是：", selectedDate);
    // },
    // selectDate() {
    //   // 选中日期
    //   const calendar = this.$refs.calendar;
    //   const selectedDate = new Date("2023-04-01"); // 指定选中的日期
    //   calendar.value = selectedDate; // 设置value属性
    //   console.log("所选日期是：", selectedDate);
    // },
    // handleDateChange(date) {
    //   console.log('选中日期:', date);
    // },
  showData() {
    const params = {
      start: this.currentPage - 1,
      limit: this.limit
    }
    getLogData(params).then(response => {
      this.tableData = response.data
    })
  },

  //点击下载使用说明文档
  DownHelpDocument() {
    // specification.docx文件存储在public文件夹下
    let a = document.createElement('a')
    a.href = './static/specification.docx'  //下载链接
    a.download = '使用说明.docx'  //下载后文件名
    // a.style.display = 'none'
    document.body.appendChild(a)
    a.click() //点击下载
    a.remove() //下载完成移除元素
  },



  typeIndex(index) {
    return index + (this.currentPage - 1) * this.limit + 1
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







