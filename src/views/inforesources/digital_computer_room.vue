<template>
  <div class="main">
    <div class="card">
      <div class="roomCard" v-for="(item,index) in ComputerRoomCard">
        <dv-border-box-13>
          <div style="height:100%; width:90%; position:absolute;left:1rem; top:2rem">
            <el-row style="margin-bottom: 10px">
              <el-col :span="5">
                <img src="../../../public/unitLogo/cea.png" alt="" style="width:4rem;border-radius: 4rem;position: relative;bottom: 0">
              </el-col>
              <el-col :span="17" :offset="2">
                <div class="roomData">
                  <span>{{item.unit}}</span>
                </div>
                <div class="roomData">
                  <span>{{item.department}}</span>
                </div>
                <div class="roomData">
                  <span class="roomName">{{item.machineRoomName}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <div class="roomData">
                  <span>机房状态：</span>
                </div>
              </el-col>
              <el-col :span="6">
                  <el-tag
                    size="small"
                    :type="item.status === '施工中' ? 'danger' : 'success'"
                    disable-transitions>{{item.status}}</el-tag>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" size="large" @click="CheckComputerRoom(index)">进入机房</el-button>
              </el-col>
            </el-row>
          </div>
        </dv-border-box-13>
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: 'digtal_computer_room',
  data() {
    return{
      isFull: 0,
      ComputerRoomCard:[
        {
          unit: '中国地震局台网中心',
          department: '地球物理部',
          machineRoomName: 'b1核心机房',
          status: '施工中'
        },
        {
          unit: '中国地震局台网中心',
          department: '财务与规划处',
          machineRoomName: 'b2核心机房',
          status: '施工中'
        },
        {
          unit: '中国地震局台网中心',
          department: '应急响应部',
          machineRoomName: 'b3核心机房',
          status: '正常'
        },
        {
          unit: '中国地震局台网中心',
          department: '预警速报部',
          machineRoomName: 'b1核心机房',
          status: '施工中'
        },
        {
          unit: '中国地震局台网中心',
          department: '财务与规划处',
          machineRoomName: 'b2核心机房',
          status: '施工中'
        },
        {
          unit: '中国地震局台网中心',
          department: '信息技术保障部',
          machineRoomName: 'b3核心机房',
          status: '正常'
        }
      ],
    };
  },
  mounted() {
    // this.full()
  },
  methods:{
    full () {
      // console.log(this.$store.state.machineRoom.department)
      screenfull.toggle()
    },
    CheckComputerRoom(index){
      var unit = this.ComputerRoomCard[index].unit
      var department =this.ComputerRoomCard[index].department
      var installation_position = this.ComputerRoomCard[index].machineRoomName
      this.$store.commit('machineRoom/SET_Unit',unit)
      this.$store.commit('machineRoom/SET_DEPARTMENT',department)
      this.$store.commit('machineRoom/SET_InstallPosition',installation_position)
      this.$router.push({ name:'computerRoom'})
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.main{
  width: 100%;
  height: 100vh;
  background: #041135;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.card{
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
}
.roomCard{
  width: 18rem;
  height: 11rem;
  margin-left: 2rem;
  margin-top: 1rem;
}
.roomCard .roomData{
  width: 100%;
  position: relative;
  margin-bottom: 0.2rem;
}
.roomCard .roomData span{
  width:80%;
  color:#FFFFFF;
  text-shadow:0 0 25px #00d8ff;
  font-size:18px;
  font-weight: 900
}
.roomCard .roomData .roomName{
  color:#20dbfd;
  text-shadow:0 0 25px #00d8ff;
}
</style>
