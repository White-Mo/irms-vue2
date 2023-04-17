<template>
  <div>
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>日志管理</span></div>
    <div class="app-container">
      <div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <span style="color: #ffffff">用户日志</span>
            </div>
          </el-col>
        </el-row>
        <el-row style="width: 100%;height: 78vh;">
          <el-col :span="8" style="height: 78vh;" >
            <el-table
              height="78vh"
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
                type='index'
                align='center'
                show-overflow-tooltip
              >
              </el-table-column>
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
          <el-col :span="16" style="height: 78vh;" class="my-calendar" >
            <el-calendar v-model="date"
                         style="background-color: rgba(34,152,236,0.3); height: 78vh; ">
              <template slot="dateCell" slot-scope="{ data }">
                <p :class="data.isSelected ? 'is-selected' : '' ">
                  {{ data.day.split("-").slice(2).join("-") }}
                </p>
                <div  v-for="(item ,index) in dateAndCount"
                      :key>
                  <div v-if="item[0].indexOf(data.day) != -1" class="haveData">
                    <span >操作了{{item[1]}}次</span>
                  </div>
                </div>
              </template>
            </el-calendar>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
import {getLogDataUser, getLogDateAndCountByUser} from "@/api/log_management";

export default {
  name: "userLog",
  data() {
    return{
      date: null,
      listLoading: false,
      handlersData: [],
      handlers: [
        {
          value: 'user',
          label: '用户'
        }
      ],
      firstUser:',',
      dateAndCount: [],
    }
  },
  mounted() {
    getLogDataUser().then(res => {
      this.handlersData = res.data.items;
      this.firstUser = res.data.items[0].user;
    })
    getLogDateAndCountByUser(this.firstUser).then(res => {
      console.log("************",res)
     this.dateAndCount = res.data.items;
    })
  },
  methods: {
    searchLogByUser(row){
      getLogDateAndCountByUser(row.user).then(res => {
        this.dateAndCount = res.data.items;
      })
    }
  }
}
</script>



<style lang="less" scoped>
.bg-purple-dark {
  background: #304156;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}
.app-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.haveData {
  width: 95%;
  height: 95%;
  line-height: 60px;
  position: absolute;
  top: 1%;
  background-color: rgba(0, 255, 255, 0.44);
  color: #c50d0d;
}

p {
  margin: 10px auto;
;
}

</style>


<style>
.my-calendar .el-calendar-table .el-calendar-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 4px;
  height: 85px;
  line-height: 85px;
  text-align: center;
  position: relative;
}
</style>

