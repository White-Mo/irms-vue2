<template>
  <div class="bg-main">
    <el-row>
      <el-col :span="8" class="nav2">
        <ul>
          <li class="nav_active"><i class="nav_1"></i><a href="#" style="font-size: 16px">设备概况</a></li>
        </ul>
      </el-col>
      <el-col :span="8" class="header_center" >
        <h2><strong>智能可视化展示平台</strong></h2>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <el-row class="total_line">
      <el-col :span="8" class="count_box">
        <div class="content_count_box left">
          <div class="child_count_box_icon">
            <img src="../../assets/dashboard_imgs/info_1.png">
          </div>
          <div :span="8" class="child_count_box_p">
            <p class="mainfont">总设备数据量(台)</p>
            <p id="equipmentAll">{{allEquipmentNumber}}</p>
          </div>
        </div>
        <div :span="8" class="content_count_box right">
          <div class="child_count_box_icon">
            <img src="../../assets/dashboard_imgs/info_2.png">
          </div>
          <div class="child_count_box_p">
            <p class="mainfont">设备类型数量(种)</p>
            <p id="equipmentTypeAll">{{equipmentTypeNumber}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="count_box">
        <div class="content_count_box left">
          <div class="child_count_box_icon">
            <img src="../../assets/dashboard_imgs/title_1.png">
          </div>
          <div class="child_count_box_p">
            <p class="mainfont">保修期内设备数量(台)</p>
            <p id="equipmentAllIndate">{{periodEquipmentNumber}}</p>
          </div>
        </div>

        <div class="content_count_box right">
          <div class="child_count_box_icon">
            <img src="../../assets/dashboard_imgs/title_3.png">
          </div>
          <div class="child_count_box_p">
            <p class="mainfont">总应用系统数量(个)</p>
            <p id="systemWareAll">{{allApplicationSystemNumber}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="count_box">
        <div class="content_count_box left">
          <div class="child_count_box_icon">
            <img src="../../assets/dashboard_imgs/title_5.png">
          </div>
          <div class="child_count_box_p">
            <p class="mainfont">应用管理员数量(个)</p>
            <p id="applicationtUser">{{applicationUserNumber}}</p>
          </div>
        </div>

        <div class="content_count_box right">
          <div class="child_count_box_icon">
            <img src="../../assets/dashboard_imgs/title_4.png">
          </div>
          <div class="child_count_box_p">
            <p class="mainfont">设备管理员数量(个)</p>
            <p id="equipmentUser">{{equipmentUserNumber}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="charts_line">
      <el-col :span="6" class="left col_charts">
        <el-row class="child_charts">
          <div class="chart_title">
            <img src="../../assets/dashboard_imgs/title_1.png">
            <span id="chart1Data">各单位设备数据量</span>
          </div>
          <p id="pieChart1" class="p_chart"></p>
        </el-row>
        <el-row class="child_charts">
          <div class="chart_title">
            <img src="../../assets/dashboard_imgs/title_2.png">
            <span>各部门设备类型</span>
          </div>
          <p id="histogramChart" class="p_chart"></p>
        </el-row>
      </el-col>
      <el-col :span="12" class="center col_charts">
        <div class="map_height child_charts">
          <div class="map_width chart_title">
            <img src="../../assets/dashboard_imgs/title_0.png">
            <span>信息分布图</span>
          </div>
          <div id="myChart" :style="{width:'95%',height:'95%',display: 'inline-block',paddingTop:'2.2%'}"></div>
          <div id="el-dialog" class="dialog">
            <div class="xc_layer"></div>
            <div id="printView" :style="{height:'68%'}" class="popBox">
              <div class="ttBox"><span id="reportTitle" class="tt"></span>
                <img :style="{width:'30px',float: 'right',cursor:'pointer'}" class="close"
                     src="../../assets/dashboard_imgs/close.png" title="关闭弹窗" @click="changeMood"/>
              </div>
              <div id="el-dialog_body" class="txtBox">
                <div :style="{height:'100%',width: '98%',marginLeft: '2%'}">
                  <div :style="{width:'64%'}" class="left div_any01">
                    <div class="div_any_child_tanchu">
                      <div class="div_any_title">
                        <div id="date1" :style="{display: 'inline-block',cursor: 'pointer',marginRight: '16px'}" class="demo-input"
                             type="text"></div>
                        <img src="../../assets/dashboard_imgs/title_4.png">各部门IP使用个数
                      </div>
                      <div :style="{paddingLeft:'850px',paddingTop:'30px',fontsize:'17px'}">IP总数：{{IPtotal}}
                      </div>
                      <!--                <p id="main" class="p_chart_tanchu" :style="{top: '-34px'}"></p>-->
                      <p id="IPCount" style="width: 100%; height: 90%"></p>
                    </div>

                  </div>
                  <div :style="{width: '32%',}" class="left div_any01">
                    <div class="div_any_child_tanchu">
                      <div class="div_any_title">
                        <div id="date3" :style="{display:'inline-block' ,cursor:'pointer' ,marginRight: '16px'}" class="demo-input"
                             type="text"></div>
                        <img src="../../assets/dashboard_imgs/title_18.png">
                        设备类型
                      </div>
                      <!--                <p id="pieChart2" style="width: 600px; height: 400px" ></p>-->
                      <p id="equipmentType" class="pieCHart" style="width: 100%; height: 100%;text-align: center"></p>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </el-col>
      <el-col :span="6" class="right col_charts">
        <el-row class="child_charts">
          <div class="chart_title">
            <img src="../../assets/dashboard_imgs/title_3.png">
            <span>设备上线时间统计</span>
          </div>
          <p id="lineChart" class="p_chart"></p>
        </el-row>
        <el-row class="child_charts">
          <div class="chart_title">
            <img src="../../assets/dashboard_imgs/title_4.png">
            <span>保修期内设备数量</span>
          </div>
          <p id="lineChart2" class="p_chart"></p>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import "@/../node_modules/echarts/extension/bmap/bmap";
import BMap from "BMap";
import { getDepartmentAllCountData, getEquipmentAllCountData,getIPAddressCountData} from '@/api/dashboard'
import {
  getApplicationUserCount,
  getEquipmentCount, getEquipmentTypeCount, getEquipmentUserCount,
  getGuaranteePeriodCount,
  getSystemWareCount
} from "@/api/cockpit_data";
export default {
  name: 'Dashboard',

  data() {
    return {
      chart1Count: 0,
      postIndex: 0,
      IPtotal: 0,
      allEquipmentNumber:'',
      equipmentTypeNumber:'',
      periodEquipmentNumber:'',
      allApplicationSystemNumber:'',
      applicationUserNumber:'',
      equipmentUserNumber:''

    }
  },
  created() {
    // this.draw_Chart();
  },
  mounted() {
    this.currentRole();
    this.equipmentType();

    // this.draw_Chart();
    this.drawLine();
    this.mapChartType();

    this.RenderingData() //调用渲染设备概况数据函数
  },
  computed: {
    ...mapGetters([
      'roleid',
      'role_department_id',
      'role_name',
      'roles'
    ])
  },
  methods: {
    //----------------赵长开-------------
    //----------------渲染设备概况数据开始-----------------------------
    RenderingData(){
      const that = this
      getEquipmentCount().then(function (res){
        console.log("************总设备数据量:"+ res +"*********************")
        that.allEquipmentNumber = res;
      }),
        getEquipmentTypeCount().then(function (res){
          console.log("************设备类型数据量:"+ res.data +"*********************")
          that.equipmentTypeNumber = res.data;
        }),
        getGuaranteePeriodCount().then(function (res){
          console.log("************保修期内设备数据量:"+ res +"*********************")
          that.periodEquipmentNumber = res;
        }),
        getSystemWareCount().then(function (res){
          console.log("************总应用系统数量:"+ res +"*********************")
          that.allApplicationSystemNumber = res;
        }),
        getApplicationUserCount().then(function (res){
          console.log("************应用管理员数量:"+ res +"*********************")
          that.applicationUserNumber = res;
        }),
        getEquipmentUserCount().then(function (res){
          console.log("************设备管理员数量:"+ res +"*********************")
          that.equipmentUserNumber = res;
        })
    },
    //---------------------渲染设备概况数据结束--------------------------------------------


    // 判断该用户是否为super
    async currentRole() {
      let endIndex = this.role_name.indexOf('/');
      let currentPost = this.role_name.substring(0, endIndex);
      // console.log(currentPost)
      if (this.roles[0] === '超级管理员') {

        $('#chart1Data').html("各单位设备数据量");

        let chart1Count = await this.handleDepartmentAllCountData();
        console.log(chart1Count)
        let postIndex = 0;
        for (let i = 0; i < chart1Count.length; i++) {
          console.log(chart1Count[i].name)
          if (chart1Count[i].name == currentPost) {
            postIndex = i;
            break;
          }
        }
        this.initEquipmentCount(chart1Count,postIndex);
        // this.drawChart();
        // this.drawChart2();
        // this.drawChart3();
        // this.drawChart4();
        // this.drawLine();

      } else {
        // 用户不是超级管理员
        $('#chart1Data').html("各部门设备数据量");
        let chart1Count=await this.handleDepartmentAllCountData();
        let chartLabel = this.getDepartmentEqLabData(chart1Count);
        this.initEquipmentCount2(chartLabel,chart1Count);
        console.log("NO")
      }
    },

    // 各部门设备类型 堆叠条形图
    async equipmentType(){
      let colData = await this.handleEquipmentAllCountData();// 堆叠条形图所需所有数据
      console.log(colData)
      let chartLabel = this.handleChartLable(colData); // 图例
      let chart2YAxis = this.handleEquipmentTypeLable(colData); // Y轴设备类型
      let chart2Count= this.handleEquipmentCountData(chartLabel,chart2YAxis,colData); // 各部门的各设备类型数据
      let series=this.seriesArr(chartLabel,chart2Count)
      this.initEquipmentType(chartLabel,series,chart2YAxis);
    },

    // 把各单位的设备总数处理为饼状图所需要的格式
    async handleDepartmentAllCountData() {
      let list=[];
      let result = [];
      await getDepartmentAllCountData().then((response) => {
        list = response.data.items
        // console.log(this.equipmentCount)
      })
      for (let i = 0; i < list.length; i++) {
        //console.log(list[i].id)
        result.push({id: list[i].id, value: list[i].total, name: list[i].name});
      }

      return result;
    },

    // 饼状图图例
    getDepartmentEqLabData(chart1Count){
      let lab=[];
      for(let i= 0;i<chart1Count.length;i++){
        lab.push(chart1Count[i].name);
      }
      return lab;
    },

    // 获取当前单位的所有部门的各自的所有种类设备统计
    async handleEquipmentAllCountData(postId){
      let result = []
      let data ;
      if(postId){
        data = {postId:postId};
      }else {
        data = {postId: "null"};
      }
      await getEquipmentAllCountData(data).then((response) => {
        result = response.data.items
        // console.log(this.equipmentCount)
      })
      // for (let i = 0; i < temp.length; i++) {
      //   result.push({post_id: temp[i].postId,department_id:temp[i].departmentId,department_name:temp[i].departmentName,equipment_id:temp[i][3],equipment_name:temp[i][4],count:temp[i][5]});
      // }
      return result;
    },
    // 堆叠条形图图例
    handleChartLable(colData){
      let temp = [];
      for(let i = 0; i < colData.length; i++){
        temp.push(colData[i].departmentName)
      }
      let result = temp.filter(function(item,index){
        return temp.indexOf(item) === index;  // 因为indexOf 只能查找到第一个
      });
      return result;
    },
    // 堆叠条形图Y轴设备类型
    handleEquipmentTypeLable(colData){
      let temp = [];
      for(let i = 0; i < colData.length; i++){
        temp.push(colData[i].equipmentTypeName)
      }
      let result = temp.filter(function(item,index){
        return temp.indexOf(item) === index;
      });
      console.log(result)
      return result;
    },
    // 堆叠条形图 各部门的各设备数量 处理为二维数组
    handleEquipmentCountData(chartLabel,chart2YAxis,colData){
      let result=[];
      for (let i = 0; i < chartLabel.length; i++) {
        let temp = [];
        for (let j = 0; j < chart2YAxis.length; j++) {
          let k = 0;
          let flag = false;
          for (k = 0; k < colData.length; k++) {
            if(colData[k].departmentName === chartLabel[i] && colData[k].equipmentTypeName === chart2YAxis[j]){
              temp.push(colData[k].count);
              flag = true;
              break;
            }
          }
          if(!flag){
            temp.push(0);
          }
        }
        result.push(temp)
      }
      return result;
    },

    //把以上数据处理成堆叠条形图需要的series值
    seriesArr(chartLabel,chart2Count){
      let series=[];
      for(let i=0;i<chartLabel.length;i++){

        for (let j=0;j<chart2Count[i].length;j++){
          if(chart2Count[i][j]==0){
            chart2Count[i][j]="无"
            console.log(chart2Count[i][j])
          }
        }
        let item={
          name:chartLabel[i],
          type:'bar',
          stack: '总量',
          itemStyle : { normal: {label : {show: true}}},
          data:chart2Count[i]
        };
        series.push(item);
      }
      return series;
    },


// 点击饼状图，重新加载其他图表
    clickFunc(data){
      this.$echarts.init(document.getElementById('histogramChart')).clear();  //清空重画
      // console.log(data);
      let colData = this.handleEquipmentAllCountData(data.id);// 柱状图所需所有数据
      // console.log(colData)
      let chartLabel = this.handleChartLable(colData); // 图例
      let chart2YAxis = this.handleEquipmentTypeLable(colData); // Y轴
      let chart2Count= this.handleEquipmentCountData(chartLabel,chart2YAxis,colData);
      let series=this.seriesArr(chartLabel,chart2Count)
      this.initEquipmentType(chartLabel,series,chart2YAxis);

    },

    // 超级管理员
    initEquipmentCount(chart1Count, postIndex) {
      let pieChart = this.$echarts.init(document.getElementById('pieChart1'));
      pieChart.setOption({
        color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6", "#f1adbe", "#defa2d", "#fd0329", "#6c7ffd",],
        tooltip: {
          trigger: 'item',
          formatter: "{b}<br/>{c}台 ({d}%)"
        },
        // calculable : false,
        series: [
          {
            name: '设备数据量',
            type: 'pie',
            radius: ['48%', '89%'],
            avoidLabelOverlap: false,
            center: ['50%', '52%'],

            itemStyle: {
              normal: {
                label: {
                  formatter: ' {b}\n{c}台\n{d}%',
                  lineHeight: 22,
                  show: false,
                  position: 'center',
                  rich: {
                    a: {
                      fontSize: 16,
                    }
                  },

                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true,
                  textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: chart1Count,
          }
        ]
      });
      let index = postIndex;
      pieChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: index,//默认选中第一个
      });
      pieChart.off('click')
      pieChart.on('mouseover', function (e) {
        if (e.dataIndex !== index) {
          pieChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: e.dataIndex,
          });
        }
      });
      pieChart.on('mouseout', function (e) {
        // index = e.dataIndex;
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index,
        });
      });
      pieChart.on("click", function clickF(params) {
        // console.log(params.data)
        this.clickFunc(params.data);
        if (params.dataIndex !== index) {
          //没用选中的取消高亮
          pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index});
        }
        //选中某一条高亮
        index = params.dataIndex;
        pieChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: index});
        console.log(index);
      });

      window.addEventListener("resize", function () {
        pieChart.resize();
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index,//默认选中第一个
        });
      });
      $("#sidebar-collapse").click(function () {
        pieChart.resize();
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index,//默认选中第一个
        });
      });

    },
    // 非超级管理员
    initEquipmentCount2(chartLabel,chart1Count){

      let pieChart = this.$echarts.init(document.getElementById('pieChart1'));

      pieChart.setOption({
        color:["#87cefa","#ff7f50","#32cd32","#da70d6","#f1adbe","#defa2d","#fd0329","#6c7ffd",],
        legend: {
          y : '235',
          x : 'center',
          textStyle : {
            color : '#ffffff',
            fontSize:13
          },
          data : chartLabel,
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a}<br/>{b}<br/>{c}台 ({d}%)"
        },
        calculable : false,
        series : [
          {
            name:'设备数据量',
            type:'pie',
            radius : ['36%', '70%'],
            // avoidLabelOverlap: false,
            center : ['50%', '45%'],

            itemStyle : {
              normal : {
                label : {
                  show : false,
                  position : 'center',
                },
                labelLine : {
                  show : false
                }
              },
              emphasis : {
                label : {
                  show : false,
                  textStyle : {
                    fontSize : '20',
                    fontWeight : 'bold'
                  }
                }
              }
            },
            data:chart1Count
          }
        ]
      });
      window.addEventListener("resize",function (){
        pieChart.resize();
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          //dataIndex: index,//默认选中第一个
        });
      });
      $("#sidebar-collapse").click(function(){
        pieChart.resize();
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          //dataIndex: index,//默认选中第一个
        });
      });

},
    //各部门设备类型柱状图
    initEquipmentType(chartLabel,series,chart2YAxis){
      let histogramChart = this.$echarts.init(document.getElementById('histogramChart'));
      histogramChart.setOption({

        color:["#87cefa","#ff7f50","#32cd32","#da70d6","#f1adbe","#defa2d","#fd0329","#6c7ffd",],
        legend: {
          y : '235',
          x : 'center',
          data:chartLabel,
          textStyle : {
            color : '#ffffff',
            fontSize: 13,
          }
        },

        calculable :false,
        grid:{
          left: '5%',
          right: '5%',
          bottom: '20%',
          containLabel: true
        },

        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },

        xAxis : [
          {
            type : 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            splitLine:{
              lineStyle:{
                color:['#f2f2f2'],
                width:0,
                type:'solid'
              }
            }

          }
        ],

        yAxis : [
          {
            type : 'category',
            data : chart2YAxis,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            splitLine:{
              lineStyle:{
                width:0,
                type:'solid'
              }
            }
          }
        ],

        series : series
      });
      window.addEventListener("resize",function (){
        histogramChart.resize();
      });
      $("#sidebar-collapse").click(function(){
        histogramChart.resize();
      });
    },
    drawLine() {
      // this.drawChart();
      // 基于准备好的dom，初始化echarts实例
      let params = [
        [116.344516, 39.917558, '中国地震局台网中心', '2c90a15e5ffb2ae9015ffb3a19a50035'],
        // [116.297235,39.914195, '信息技术保障部'],
        // [116.313699,39.985729, '北京市地震局'],
        [116.297235, 39.914195, '中国地震局', '2c90a15e5ffb2ae9015ffb3a19a50000'],
        [116.808554, 39.969103, '防灾科技学院', '2c90a15e5ffb2ae9015ffb3a19a50041'],
        [108.989465, 34.231801, '中国地震局第二监测中心', '2c90a15e5ffb2ae9015ffb3a19a50040'],
        [102.746056, 25.082943, '云南省地震局', '2c90a15e5ffb2ae9015ffb3a19a50025'],
        [104.073864, 30.642951, '四川省地震局', '2c90a15e5ffb2ae9015ffb3a19a50023'],
        [103.863986, 36.056004, '甘肃省地震局', '2c90a15e5ffb2ae9015ffb3a19a50029']

      ];
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        bmap: {
          center: [105, 38],
          zoom: 5,
          roam: true,
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: " rgba(0, 0, 0, 0.5)", //设置背景图片 rgba格式
          color: "black",
          borderWidth: "1", //边框宽度设置1
          borderColor: "rgba(0, 0, 0, 0.5)", //设置边框颜色
          textStyle: {
            fontsize: 12,
            color: "white" //设置文字颜色
          },
          formatter: function (params, ticket, callback) {
            return params.value[2]
          }
        },
        series: [{
          type: 'scatter',
          coordinateSystem: 'bmap',
          itemStyle: {
            normal: {
              color: '#FF0000'
            }
          },
          data: params
        }]
      });
      myChart.on('click', (params) => {
        // $("#el-dialog").removeClass('hide');
        $("#el-dialog").css('display', 'block');
        $("#reportTitle").html(params.value[2]);
        // this.draw_Chart(params.value[3]);
        this.drawMapChartType(params.value[3]);
        this.drawMapChartIP(params.value[3]);
      });

      var bmap = myChart.getModel().getComponent('bmap').getBMap()
      bmap.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP]}));
      var styleJson = [
        {
          "featureType": "land",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on",
            "color": "#091220ff"
          }
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on",
            "color": "#113549ff"
          }
        }, {
          "featureType": "green",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on",
            "color": "#0e1b30ff"
          }
        }, {
          "featureType": "building",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "building",
          "elementType": "geometry.topfill",
          "stylers": {
            "color": "#113549ff"
          }
        }, {
          "featureType": "building",
          "elementType": "geometry.sidefill",
          "stylers": {
            "color": "#143e56ff"
          }
        }, {
          "featureType": "building",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#dadada00"
          }
        }, {
          "featureType": "subwaystation",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on",
            "color": "#113549B2"
          }
        }, {
          "featureType": "education",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on",
            "color": "#12223dff"
          }
        }, {
          "featureType": "medical",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on",
            "color": "#12223dff"
          }
        }, {
          "featureType": "scenicspots",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on",
            "color": "#12223dff"
          }
        }, {
          "featureType": "highway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on",
            "weight": 4
          }
        }, {
          "featureType": "highway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "highway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#fed66900"
          }
        }, {
          "featureType": "highway",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "highway",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "highway",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "highway",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "arterial",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on",
            "weight": 2
          }
        }, {
          "featureType": "arterial",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "arterial",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#ffeebb00"
          }
        }, {
          "featureType": "arterial",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "arterial",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "arterial",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "local",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on",
            "weight": 1
          }
        }, {
          "featureType": "local",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "local",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "local",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "local",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#979c9aff"
          }
        }, {
          "featureType": "local",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffffff"
          }
        }, {
          "featureType": "railway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "subway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "weight": 1
          }
        }, {
          "featureType": "subway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#d8d8d8ff"
          }
        }, {
          "featureType": "subway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "subway",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "subway",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#979c9aff"
          }
        }, {
          "featureType": "subway",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffffff"
          }
        }, {
          "featureType": "continent",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "continent",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "continent",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "continent",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "city",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "city",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "city",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "city",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "town",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "town",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "town",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#454d50ff"
          }
        }, {
          "featureType": "town",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffffff"
          }
        }, {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "poilabel",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "districtlabel",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "road",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "district",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "poilabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "poilabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "poilabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "manmade",
          "elementType": "geometry",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "districtlabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffffff"
          }
        }, {
          "featureType": "entertainment",
          "elementType": "geometry",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "shopping",
          "elementType": "geometry",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "nationalway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "6"
          }
        }, {
          "featureType": "nationalway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "7"
          }
        }, {
          "featureType": "nationalway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "8"
          }
        }, {
          "featureType": "nationalway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "9"
          }
        }, {
          "featureType": "nationalway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "10"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "6"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "7"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "8"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "9"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "10"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "6"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "7"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "8"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "9"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,10",
            "level": "10"
          }
        }, {
          "featureType": "cityhighway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "6"
          }
        }, {
          "featureType": "cityhighway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "7"
          }
        }, {
          "featureType": "cityhighway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "8"
          }
        }, {
          "featureType": "cityhighway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "9"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "6"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "7"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "8"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "9"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "6"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "7"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "8"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "9"
          }
        }, {
          "featureType": "subwaylabel",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "subwaylabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "tertiarywaysign",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "tertiarywaysign",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "provincialwaysign",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "provincialwaysign",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "nationalwaysign",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "nationalwaysign",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "highwaysign",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "highwaysign",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "village",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "district",
          "elementType": "labels.text",
          "stylers": {
            "fontsize": 20
          }
        }, {
          "featureType": "district",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "district",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "country",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "country",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "tertiaryway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "tertiaryway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#ffffff10"
          }
        }, {
          "featureType": "provincialway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "provincialway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "highway",
          "elementType": "labels.text",
          "stylers": {
            "fontsize": 20
          }
        }, {
          "featureType": "nationalway",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "labels.text",
          "stylers": {
            "fontsize": 20
          }
        }, {
          "featureType": "provincialway",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "provincialway",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "provincialway",
          "elementType": "labels.text",
          "stylers": {
            "fontsize": 20
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "labels.text",
          "stylers": {
            "fontsize": 20
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "estate",
          "elementType": "geometry",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "tertiaryway",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "tertiaryway",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "fourlevelway",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "fourlevelway",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "scenicspotsway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "scenicspotsway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "universityway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "universityway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "vacationway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "vacationway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "fourlevelway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "fourlevelway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#12223dff"
          }
        }, {
          "featureType": "fourlevelway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "transportationlabel",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "transportationlabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "transportationlabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "transportationlabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "educationlabel",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "educationlabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "educationlabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "educationlabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "transportation",
          "elementType": "geometry",
          "stylers": {
            "color": "#113549ff"
          }
        }, {
          "featureType": "airportlabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "airportlabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "scenicspotslabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "scenicspotslabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "medicallabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "medicallabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "medicallabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "scenicspotslabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "airportlabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "entertainmentlabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "entertainmentlabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "entertainmentlabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "estatelabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "estatelabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "estatelabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "businesstowerlabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "businesstowerlabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "businesstowerlabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "companylabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "companylabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "companylabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "governmentlabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "governmentlabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "governmentlabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "restaurantlabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "restaurantlabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "restaurantlabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "hotellabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "hotellabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "hotellabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "shoppinglabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "shoppinglabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "shoppinglabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "lifeservicelabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "lifeservicelabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "lifeservicelabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "carservicelabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "carservicelabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "carservicelabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "financelabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "financelabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "financelabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "otherlabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "otherlabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "otherlabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "manmade",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "manmade",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "transportation",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "transportation",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "education",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "education",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "medical",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "medical",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "scenicspots",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#2dc4bbff"
          }
        }, {
          "featureType": "scenicspots",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }];

      bmap.setMapStyleV2({styleJson: styleJson});
    },
    changeMood() {
      $(".close").click(function (event) {
        $("#el-dialog").css('display', 'none');
      });
    },

    async drawMapChartIP(postId){
      let XAxis=[];
      let YAxis=[];
      let markpointData = [];
      let list = [];
      let sum = 0;
      let params = {postId:postId};
      await getIPAddressCountData(params).then((response) => {
        list = response.data.items
      })
      for(let i = 0; i < list.length; i++){
        XAxis.push(list[i].departmentName);
        YAxis.push(list[i].count);
        sum += list[i].count;
      }
      this.IPtotal = sum;
      for (let i = 0; i < YAxis.length; i++) {
        markpointData.push({value: YAxis[i], xAxis: XAxis[i], yAxis: YAxis[i]});
      }
      let myChart1 = this.$echarts.init(document.getElementById("IPCount"));
      let option1 = {
        color: ["#87cefa"],
        xAxis: {
          axisLabel: {
            color: '#FFFFFF',
            margin: 10,
            fontSize: 16,
            interval: 0
          },
          type: 'category',
          data: XAxis
        },
        yAxis: {

          axisLabel: {
            color: '#FFFFFF',
            margin: 30,
            fontSize: 16
          },
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },

        },
        series: [
          {
            radius: '50%',
            data: YAxis,
            type: 'bar',

            showBackground: true,
            markPoint: {
              barWidth: '25%',
              label: {
                show: true,
                color: '#000000',//气泡中字体颜色
                fontSize: 16
              },
              data: markpointData,
            },
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.0)'
            }
          }
        ]
      };
      myChart1.setOption(option1);
      // window.addEventListener("resize",function (){
      //   myChart1.resize();
      // });
      // $("#sidebar-collapse").click(function(){
      //   myChart1.resize();
      // });
    },
    // 地图弹窗中设备类型表的数据处理
    async mapChartType(postId){
      let eqData = await this.handleEquipmentAllCountData(postId);
      let result = [];
      let lableData = this.handleEquipmentTypeLable(eqData);
      for(let i = 0; i < lableData.length; i++){
        let count = 0;
        for(let j = 0; j < eqData.length; j++){
          if(eqData[j].equipmentTypeName === lableData[i]){
            count += eqData[j].count;
          }
        }
        result.push({value: count,name:lableData[i]})
      }
      return result;
    },
    async drawMapChartType(postId){
      let chartData = await this.mapChartType(postId);
      let myChart = this.$echarts.init(document.getElementById("equipmentType"));
      let option={
        color: ["#87cefa","#ff7f50","#32cd32","#da70d6","#f1adbe","#defa2d","#fd0329","#6c7ffd"],
        tooltip: {
          trigger: 'item',
        },

        calculable: true,
        series: [
          {
            name: '设备类型',
            type: 'pie',
            radius: '50%' ,
            label: {
              formatter: '{name|{b}}\n{value|{c}台}',
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 20,
              rich: {
                value: {
                  fontSize: 16,
                }
              },
              textStyle: {
                fontSize: 17
              }
            },
            data: chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart.setOption(option);
      // window.addEventListener("resize",function (){
      //   myChart.resize();
      // });
      // $("#sidebar-collapse").click(function(){
      //   myChart.resize();
      // });
    },

  },

}
</script>

<style lang="scss" scoped>

* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
}

.bg-main {
  background-color: #081832;
  color: white;
  text-align: center;
  //padding-top: 20px;
  height: calc(100vh - 50px);
}

.nav_active {
  border-bottom: 4px solid #4b8df8;
  box-shadow: -10px 0px 15px #034c6a inset, 0px -10px 15px #034c6a inset, 10px 0px 15px #034c6a inset, 0px 10px 15px #034c6a inset;
}

.nav2 > ul > li {
  display: inline-block;
  width: 120px;
  text-align: center;
  height: 50px;
  position: relative;
  line-height: 50px;
  margin-top: 15px;
  box-sizing: border-box;
  border-radius: 5px;
  float: left;
}

.header_center {
  width: 30%;
  margin: 0px auto;
  color: #FFFFff;
  text-align: center;
  height: 80px;
  background-image: url(../../assets/dashboard_imgs/logoBg.png);
  background-size: 100% 100%;
}
.header_center h2 {
  padding-top: 20px;
}

.total_line {
  height: 10vh;
  margin-top: 20px;
  margin-bottom: 25px;
  margin-left: 5px;
}

.count_box {
  height: 100%;
  background-color: #034c6a;
}

.content_count_box {
  width: 50%;
  height: 100%;
}

.child_count_box {
  float: left;
}

.child_count_box_icon {
  margin-left: 5%;
  margin-top: 35px;
  float: left;
}

.child_count_box_icon img {
  width: 40px;
  height: 40px;
}

.child_count_box_p {
  margin-top: 15px;
  margin-left: 5%;
  text-align: center;
  line-height: 35px;
  float: left;
}

.child_count_box_p p:nth-child(1) {
  font-size: 18px !important;
}

.child_count_box_p p:nth-child(2) {
  font-size: 28px;
  color: #ffff43;
  font-weight: 600;
}

.left {
  float: left;
}

.right {
  float: right;
}

.charts_line {
  height: 100%;
  margin-bottom: 25px;
  margin-left: 5px;
}

.col_charts {
  padding-right: 25px;
}

.child_charts {
  width: 100%;
  height: calc(32vh);
  margin-top: 25px;
  box-shadow: -10px 0px 15px #034c6a inset, 0px -10px 15px #034c6a inset, 10px 0px 15px #034c6a inset, 0px 10px 15px #034c6a inset;
  border: 1px solid #034c6a;
  box-sizing: border-box;
  position: relative;

}

.chart_title {
  background-color: #034c6a;
  border-radius: 18px;
  position: absolute;
  height: 35px;
  width: 60%;
  top: -15px;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  left: 20%;
  line-height: 35px;
  text-align: center;
}

.chart_title img {
  width: 18px;
  height: 18px;
  position: relative;
  top: 2px;
  margin-right: 5px;
}

//图表样式
.p_chart {
  height: 288px;
  padding: 5px 10px;
  margin-top: 15px;
}

.map_height {
  height: calc(66vh);
}

.map_width {
  width: 30% !important;
  left: 35% !important;
}

.dialog {
  display: none;
}

.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.dynamic {
  display: flex;
  position: relative;
}

.map {
  width: 50%;
  height: 330px;
  transition: 0.5s;
}

.mapBig {
  position: absolute;
  width: 100%;
  height: 536px;
  z-index: 3;
  transition: 0.5s;
  top: -218px;
}

.information {
  width: 30%;
}

.popBox {
  position: fixed;
  left: 45%;
  top: 10%;
  background-color: #081832;
  z-index: 1001;
  width: 90%;
  max-height: 84%;
  margin-left: -40%;
  border-radius: 5px;
  font-weight: bold;
  color: #ffffff;
  height: 100%;
}

.xc_layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #666666;
  opacity: 0.5;
  z-index: 1000;
}

.popBox .ttBox {
  height: 30px;
  line-height: 30px;
  padding: 14px 30px;
  border-bottom: solid 1px #eef0f1;
  text-align: center;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

.popBox .ttBox .tt {
  font-size: 20px;
  display: inline-block;
  height: 30px;
}

.div_any_child_tanchu {
  width: 97%;
  height: 480px;
  box-shadow: -10px 0px 15px #034c6a inset, /*氓路娄猫戮鹿茅藴麓氓陆卤*/
  0px -10px 15px #034c6a inset, /*盲赂艩猫戮鹿茅藴麓氓陆卤*/
  10px 0px 15px #034c6a inset, /*氓聫鲁猫戮鹿茅藴麓氓陆卤*/
  0px 10px 15px #034c6a inset;
  border: 1px solid #034c6a;
  box-sizing: border-box;
  position: relative;
  margin-top: 25px;
}

.div_any_title {
  background-color: #034c6a;
  border-radius: 18px;
  position: absolute;
  height: 35px;
  width: 60%;
  top: -15px;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  left: 20%;
  line-height: 35px;
  text-align: center;
}

.div_any_title img {
  width: 18px;
  height: 18px;
  position: relative;
  top: 2px;
  margin-right: 5px;
}

.BMap_cpyCtrl {
  display: none;
}

.anchorBL {
  display: none;
}

</style>
