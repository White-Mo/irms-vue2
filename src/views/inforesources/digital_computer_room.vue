<template>
  <div class="main"  style='overflow: auto;position:relative;padding-bottom: 20px'>
    <dv-loading v-show='loading'>Loading...</dv-loading>
    <div class="card">
      <div class="roomCard" v-for="(item,index) in ComputerRoomCard" >
        <dv-border-box-13>
          <div style="height:90%; width:90%; position:absolute;left:1rem; top:2rem">
            <el-row style="margin-bottom: 10px">
              <el-col :span="5">
                <img :src=logoSrc+item.postId+logoImgetype style="width:4rem;border-radius: 4rem;position: relative;bottom: 0">
              </el-col>
              <el-col :span="17" :offset="2">
<!--                <div class="roomData">-->
<!--                  <span>中国地震局</span>-->
<!--                </div>-->
                <div class="roomData">
                  <span>{{item.postName}}</span>
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
                    :type="item.status === '0' ? 'success' : 'danger'"
                    disable-transitions>{{item.status === "0" ? "正常" : "维修中" }}</el-tag>
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
import {getAllmachineroom} from "@/api/machineRoom";

export default {
  name: 'digtal_computer_room',
  data() {
    return{
      loading:true,
      ComputerRoomCard:[],
      logoSrc:'/unitLogo/',// logo放在public 文件夹下 使用绝对路径即可
      logoImgetype:'.png'
    };
  },
  mounted() {
    const data = {
      dataName:['111'],
      dataValue:'',
      status:'',
      start:0,
      limit:9999
    }
    getAllmachineroom(data).then((res) => {
      // //console.log(111111)
      this.loading = false
      //console.log(res.data.items)
      this.ComputerRoomCard = res.data.items
    })
  },
  methods:{
    CheckComputerRoom(index){
      //console.log(this.ComputerRoomCard[index])
      // debugger
      var unit = this.ComputerRoomCard[index].unit
      var department =this.ComputerRoomCard[index].postName
      var installation_position = this.ComputerRoomCard[index].machineRoomName
      var unitid = this.ComputerRoomCard[index].postId
      var machineRoomId = this.ComputerRoomCard[index].machineRoomId
      // //console.log(unit,department)
      // //console.log(this.ComputerRoomCard[index])
      this.$store.commit('machineRoom/SET_UnitId',unitid)
      this.$store.commit('machineRoom/SET_MashRoomId',machineRoomId)
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
  height: 10rem;
  margin-left: 2rem;
  margin-top: 1rem;
}
.roomCard .roomData{
  width: 100%;
  position: relative;
  margin-bottom: 0.5rem;
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

::-webkit-scrollbar {
  width: 6px; /* 竖向滚动条宽度 */
  height: 6px; /* 横向滚动条高度 */
}
::-webkit-scrollbar-thumb {
  border-radius: 10px; /* 滚动条样式 */
  -webkit-box-shadow: #ffffff;  /* 内阴影 */
  background-color: #ffffff; /* 滚动条颜色 */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #ffffff; /* 滚动条悬浮颜色 */
}

::-webkit-scrollbar-track-piece {
  background: #ffffff; /* 滚动条背景颜色 */
}

::-webkit-scrollbar-button {
  background-color: #ffffff; /* 定义两端按钮的样式 */
}

::-webkit-scrollbar-corner {
  background: #ffffff; /* 右下角重合处的样式*/
}


/* 单独设置悬浮颜色 */
::-webkit-scrollbar-thumb:vertical {
  background: #adaeb0;  /* 竖向滑块颜色 */
}
::-webkit-scrollbar-thumb:horizontal {
  background: #adaeb0; /* 横向滑块颜色 */
}

/* 单独设置滚动条背景色 */
::-webkit-scrollbar-track-piece:vertical {
  background: #ffffff;
}
::-webkit-scrollbar-track-piece:horizontal {
  background: #ffffff;
}
</style>
