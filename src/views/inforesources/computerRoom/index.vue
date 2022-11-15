<template>
  <div class = "main">
    <dv-loading>Loading...</dv-loading>
    <div class="app">
      <el-header style="background:#142437;height: 7rem;">
        <el-row :gutter="20" style="height: 5rem;display: flex">
          <el-col :span="3"><dv-decoration-8 :color=datavcolor style="width:300px;height:50px;position: absolute;left: 0" /></el-col>
          <el-col :span="8" :offset="5"><h1 style="text-align: center;position:relative;color:#20dbfd;;text-shadow:0 0 25px #00d8ff;font-weight: 900">{{computerTitle}}</h1></el-col>
          <el-col :span="3" :offset="3" ><dv-decoration-8 :color=datavcolor :reverse="true" style="width:300px;height:50px;position: absolute;right: 0" /></el-col>
          <el-button id="getcomputerroom" type="danger"  style="z-index:99;position: absolute;bottom: -20px;right: 100px;" v-show="datacard" @click="handchangedatacardstate" >关闭机房信息</el-button>
          <el-button id="getcomputerroom" type="primary"  style="z-index:99;position: absolute;bottom: -20px;right: 100px;" v-show="showButton" plain @click="handchangedatacardstate">打开机房信息</el-button>
          <el-button id="getcomputerroom" type="primary"  style="z-index:99;position: absolute;bottom: -20px;right: 20px;" @click="backPage">返回</el-button>
        </el-row >
        <el-row :gutter="20" style="height: 2rem">
          <el-col :span="8" :offset="8" style="text-align: center;color: #cdddf7"><dv-decoration-5 :color=datavcolor :dur="2" style=" width:100%;height:40px;position: relative;bottom:2rem" /></el-col>
        </el-row >
        <dv-decoration-10 style="width:100%;height:5px; position: relative;bottom:1rem" />
      </el-header>
    </div>

    <div id="container"></div>
    <dv-border-box-11 class="msgTable" title="机房信息概况"style="height: 15rem;width:25vw;position: absolute;left: 1vw;top: 10rem;background: #142437" v-show="datacard">
        <table style="width: 90%;color: #FFFFFF;text-align: left;position: relative;left: 5%;top:30%;font-size:20px" border="1" cellspacing="0" cellpadding="0">
          <tr style="height: 45px">
            <th style="color: #0a72c7;width: 110px">管理员：</th>
            <th><span style="color:#20dbfd;text-shadow:0 0 25px #00d8ff;font-size:20px;font-family:yjsz;font-weight: 900;">{{this.roomBasicInfo.manager_name}}</span></th>
          </tr>
          <tr style="height: 45px">
            <th style="color: #0a72c7;width: 80px">机房IP：</th>
            <th><span style="color:#20dbfd;text-shadow:0 0 25px #00d8ff;font-size:20px;font-family:yjsz;font-weight: 900">{{this.roomBasicInfo.equipment_ip}}</span></th>
          </tr>
          <tr style="height: 45px">
            <th style="color: #0a72c7;width: 80px">机房地址：</th>
            <th><span style="color:#20dbfd;text-shadow:0 0 25px #00d8ff;font-size:20px;font-family:yjsz;font-weight: 900">{{this.roomBasicInfo.UnitDepartment}}</span></th>
          </tr>
        </table>
        <div style="height: 25%;width: 100%;position:absolute;left: 10px;top:30%">
          <el-row>
            <el-col :span="8" :offset="1">
              <h4 style="position: relative;bottom: 10px;color: #0a72c7"></h4>
            </el-col>
            <el-col :span="7">
              <h4 style="position:relative;bottom:20px;left: -40px;color:#20dbfd;text-shadow:0 0 25px #00d8ff;font-size:20px;font-family:yjsz;font-weight: 900"></h4>
            </el-col>
            <el-col :span="8">
              <img  :src=logosrc  alt="" style="width:60px;border-radius: 40px;position: relative;bottom: 10px">
            </el-col>
          </el-row>
        </div>
      </dv-border-box-11>
    <dv-border-box-12 class="msgTable" style="height: 45vh;width:25vw;position: absolute;left: 1vw;top: 28rem;background: #142437" v-show="datacard">
        <div id="myechart" style="height:40vh;width:25vw;padding-top:30px;color: #ffffff;" ></div>
      </dv-border-box-12>
    <dv-border-box-11 class="msgTable" title="设备概况" style="height: 15rem;width:25vw;position: absolute;right: 1vw;top: 10rem;background: #142437" v-show="datacard">
      <div style="height:35%;width:100%;position: absolute;left:10px;top: 35%;">
        <table style="width: 90%;color: #FFFFFF;position: relative;left: 3%;top:-10px;font-size:20px" border="1" cellspacing="0" cellpadding="0">
          <tr style="height: 60px">
            <th>设备总数:</th>
            <th style="color:#20dbfd;text-shadow:0 0 25px #00d8ff;font-family:yjsz;font-weight: 900;text-align: right;padding-right: 10px">{{this.equipmentBaseInfo.total}}</th>
            <th>服务器数量:</th>
            <th  style="color:#20dbfd;text-shadow:0 0 25px #00d8ff;font-family:yjsz;font-weight: 900;text-align: right;padding-right: 10px">{{this.equipmentBaseInfo.serverCount}}</th>
          </tr>
          <tr style="height: 60px" >
            <th>设备种类:</th>
            <th style="color:#20dbfd;text-shadow:0 0 25px #00d8ff;font-family:yjsz;font-weight: 900;text-align: right;padding-right: 10px">{{this.equipmentBaseInfo.typeCount}}</th>
            <th>交换机数量:</th>
            <th style="color:#20dbfd;text-shadow:0 0 25px #00d8ff;font-family:yjsz;font-weight: 900;text-align: right;padding-right: 10px">{{this.equipmentBaseInfo.switchCount}}</th>
          </tr>
        </table>
      </div>
      </table>
    </dv-border-box-11>
    <dv-border-box-12 class="msgTable" style="height: 45vh;width:25vw;position: absolute;right: 1vw;top: 28rem;background: #142437" v-show="datacard">
      <el-row style="position: relative;top:5%">
        <el-col :span="12" :offset="8">
          <h2 style="position: relative;left:15px;color: #06e1f4">机房设备</h2>
        </el-col>
      </el-row>
      <el-popover
        popper-class="popoverBackB"
        placement="top-start"
        trigger="hover">
        <p style="color:#0ad8ee;">点击查看详情</p>
        <el-table
          border
          slot="reference"
          highlight-current-row
          @current-change="handleCurrentChange"
          class="show_table"
          :data="tableData"
          :header-cell-style="{textAlign: 'center',color:'#20dbfd',background:'#142437',borderColor:'#ffffff'}"
          :cell-style="{ textAlign: 'center',color:'#20dbfd',background:'#142437',borderColor:'#ffffff'}"
          style="position:relative;left:5%;width:90%;height:70%;top: 10%">
          <el-table-column  type="index" label="#" width="50"></el-table-column>
          <el-table-column prop="equipment_type" label="设备类型" width="90"></el-table-column>
          <el-table-column prop="equipment_name" label="设备名称" ></el-table-column>
          <el-table-column prop="equipment_brand" label="品牌" width="90"></el-table-column>
        </el-table>
      </el-popover>
    </dv-border-box-12>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export default {
  name:'computerRoom',
  data() {
    return {
      datavcolor:['#0e94eb','#0e94eb'],
      computerTitle: '',
      datacard:true,
      showButton:false,
      loading:true,
      logosrc:'',
      roomBasicInfo:{
        manager_name: '黄猛',
        equipment_ip: '10.5.103.156',
        UnitDepartment: '防灾科技学院长庚楼502',
      } ,
      equipmentBaseInfo:{
        total:25,
        typeCount:4,
        serverCount:5,
        switchCount:6
      },
      tableData:[],
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls:null
    };
  },
  created() {
    this.full()
  },
  mounted() {
    if (this.$store.state.machineRoom.department === '') {
      this.$router.push({ path:'/inforesources/digital_computer_room'})
    } else {
      this.computerTitle = this.$store.state.machineRoom.department + this.$store.state.machineRoom.installation_position
    }
    var that = this
    setTimeout(function () {
      that.echartsDraw()
      that.init();
      that.animate();
      that.loadGltf()
    }, 200);
  },
  methods: {
    full () {
      // console.log(this.$store.state.machineRoom.department)
      screenfull.toggle()
    },
    //初始化
    init: function() {
      //  创建场景对象Scene
      this.scene = new THREE.Scene();
      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(10, 10, 10);
      this.scene.add(directionalLight);
// 平行光2
      var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight2.position.set(-400, -200, -300);
      this.scene.add(directionalLight2);
//环境光
      var ambient = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(ambient);
      //网格模型添加到场景中
      // let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      // let material = new THREE.MeshNormalMaterial({
      //   color: "white"
      // });
      // this.mesh = new THREE.Mesh(geometry, material);
      // this.scene.add(this.mesh);
      // 坐标轴
      let axes = new THREE.AxesHelper(1000);
      this.scene.add(axes);
      /**
       * 相机设置
       */

      var width = window.outerWidth; //窗口宽度
      var height = window.outerHeight; //窗口高度
      var k = width / height; //Three.js输出的Cnavas画布宽高比
      var s = 200;//设置相机渲染范围大小
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 3000);
      this.camera.position.set(-537, 76, -615); //设置相机位置
      this.camera.lookAt(0,0,0);

      // let container = document.getElementById("container");
      // this.camera = new THREE.PerspectiveCamera(
      //   70,
      //   container.clientWidth / container.clientHeight,
      //   0.01,
      //   10
      // );
      // this.camera.position.z = 1;
      /**
       * 创建渲染器对象
       */
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      //创建控件对象
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    // 动画
    animate() {
      if (this.mesh) {
        requestAnimationFrame(this.animate);
        // this.mesh.rotation.y += 0.004;//绕Y轴旋转0.004°
        this.renderer.render(this.scene, this.camera);
      }
    },
    // 加载外部模型
    // 外部模型加载函数
    loadGltf() {
      let self = this;
      let loader = new GLTFLoader();
      //本地模型路径：public/static/mod/Xbot.glb
      loader.load("static/c.glb", function (gltf) {
        console.log(gltf)
        self.isLoading = false;//关闭载入中效果
        self.mesh = gltf.scene;
        // self.mesh.scale.set(5,5,5);//设置大小比例
        self.mesh.position.set(0, 0, 0);//设置位置
        self.scene.add(self.mesh); // 将模型引入three、
        self.animate();
      });
    },
    backPage(){
      this.$router.push({ path:'/inforesources/digital_computer_room'})
      this.full()
    },
    handchangedatacardstate(){
      this.datacard = !this.datacard
      this.showButton = !this.showButton
    },
    handleCurrentChange(val){
      this.dialogVisible = true
      // this.dialog_description = val
    },
    echartsDraw() {
      var myChart = this.$echarts.init(document.getElementById('myechart'));
      const option = {
        title: {
          text: '设备故障年趋势',
          left:"center",
          textStyle:{
            fontSize:20,
            color:"#06e1f4"
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['监控系统(次)', '通信系统(次)', '供配电系统(次)'],
          textStyle:{
            color:"#8DB6DB"
          },
          padding:[40,0,0,0],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2021/10', '2021/11', '2021/12', '2022/1', '2022/3', '2022/4', '2022/5'],
          axisLabel:{//修改坐标系字体颜色
            show:true,
            textStyle:{
              color:"#8DB6DB"
            },
            left: 20
          },
        },
        yAxis: {
          type: 'value',
          axisLabel:{//修改坐标系字体颜色
            show:true,
            textStyle:{
              color:"#8DB6DB"
            },
            left: 20
          },
        },
        series: [
          {
            name: '监控系统(次)',
            type: 'line',
            stack: 'Total',
            data: [1, 1, 2, 3, 2, 2, 3]
          },
          {
            name: '通信系统(次)',
            type: 'line',
            stack: 'Total',
            data: [2, 1, 1, 2, 2, 3, 3]
          },
          {
            name: '供配电系统(次)',
            type: 'line',
            stack: 'Total',
            data: [1, 2, 2, 1, 1, 3, 4]
          },
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style>
.main{
  cursor: pointer;
  position:absolute;
  left:0;
  width: 100%;
  height:100vh;
}
.app{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height:10vh;
}
#container {
  position: absolute;
  bottom: 0;
  z-index:98;
  width:100%;
  height:90vh;
}
.msgTable{
  z-index:99
}
</style>
