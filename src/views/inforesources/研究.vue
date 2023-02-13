<template>
  <el-container>
    <el-header  style='background: #041135'>
      <el-row :gutter="20">
        <el-col :span="12">
          <!--          修改的第一部分     搜索框  选用了 element input 远程搜索组件
           目前还存在的问题 是 查询按钮 没有作用 等你理解了 就可以写上去了-->
          <div  style='width: 100vw;height:5vh;position: relative;top:1vh;left: 2vw'>
            <el-button-group>
              <el-button type="primary" icon="el-icon-edit">查询</el-button>
              <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </el-button-group>
          </div></el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
    </el-header>

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
  </el-container>
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
      logoImgetype:'.png',
      restaurants: [],
      state: '',
    };
  },
  mounted() {
    this.restaurants = this.getMachineroom();
  },
  methods:{
    getMachineroom(){
      var restaurants = []
      const data = {
        dataName:['111'],
        dataValue:'',
        status:'',
        start:0,
        limit:9999
      }
      getAllmachineroom(data).then((res) => {
        this.loading = false
        //console.log(res.data.items)
        this.ComputerRoomCard = res.data.items
        this.ComputerRoomCard.forEach(function(item,index){
          var obj = {
            value:item.postName + item.machineRoomName, // 例如合并后为字段类似于  山西省地震局B1核心机房  在检索时 检索 输入山西省或者输入B1核心机房 都可进行检索
            index:index // 该条数据的索引
          }
          restaurants.push(obj)
        }) //修改的第二部分  对于拿到的机房数据做了一个处理 新生成了一个数组
        // 为什么   value  = 机房全程： 便于用户检索机房名称 （详细解释看第三处修改）
        // 为什么  要有index  记录索引值： 因为CheckComputerRoom（） 方法中 我们是通过索引值来读取要进入的这个机房的相关信息，
        // 因此 可以通过记录索引值 在用户检索到该机房时，直接点击选项，然后通过index值 直接调用CheckComputerRoom() 方法 然后 进入3D场景
        // 也就是 handleSelect()方法的原理
      })
      return restaurants
    },
    CheckComputerRoom(index){
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
    querySearchAsync(queryString, cb) {
      // console.log(queryString,"querySting")
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().match(queryString.toLowerCase())); // 修改第三部分 对字段匹配规则的修改
        //官方案例：  return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        // 官方案例只能检索到 输入值与被匹配值 必须从第一个字符就相同
        // 例如 山西省地震局B1核心机房  输入 B1核心机房 则匹配不到  如果时山西省的工作人员 他只能看到山西省地震局的机房
        // 那么他肯定更愿意只输入B1核心机房 而不愿意输入全称，所以官方用例不适用于我们的开发场景
        // 补充：indexof() 方法可返回某个指定的字符串值在字符串中首次出现的位置
        // 因为选用 match()函数
        // 补充：match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
        // 该方法类似 indexOf() 和 lastIndexOf()，但是它返回结果数组，而不是字符串的位置。所以我们可以拿到 匹配到的那些数据所组成的列表，
        // 例如: 搜索B1核心机房  即可以获取到 所有机房名称中 带有 “B1核心机房” 这几个字的 数据 （超级管理员账号下效果更明显）

        //
      };
    },
    handleSelect(item) {
      this.CheckComputerRoom(item.index)
    }
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
