<template>
  <div class="bg-main">
      <el-row>
        <el-col :span="7" class="nav2">
          <ul>
            <li class="nav_active"><i class="nav_1"></i><a href="#" style="font-size: 16px">设备概况</a> </li>
          </ul>
        </el-col>
        <el-col :span="7" class="header_center" >
          <h2><strong>智能可视化展示平台</strong></h2>
        </el-col>
        <el-col :span="7"></el-col>
      </el-row>
      <el-row class="total_line">
        <el-col :span="8" class="count_box">
          <div class="content_count_box left">
            <div class="child_count_box_icon">
              <img src="../../assets/dashboard_imgs/info_1.png">
            </div>
            <div :span="8" class="child_count_box_p">
              <p class="mainfont">总设备数据量(台)</p>
              <p id="equipmentAll">2</p>
            </div>
          </div>
          <div :span="8" class="content_count_box right">
            <div class="child_count_box_icon">
              <img src="../../assets/dashboard_imgs/info_2.png">
            </div>
            <div class="child_count_box_p">
              <p class="mainfont">设备类型数量(种)</p>
              <p id="equipmentTypeAll">5</p>
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
              <p id="equipmentAllIndate">2</p>
            </div>
          </div>

          <div class="content_count_box right">
            <div class="child_count_box_icon">
              <img src="../../assets/dashboard_imgs/title_3.png">
            </div>
            <div class="child_count_box_p">
              <p class="mainfont">总应用系统数量(个)</p>
              <p id="systemWareAll">5</p>
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
              <p id="applicationtUser">1</p>
            </div>
          </div>

          <div class="content_count_box right">
            <div class="child_count_box_icon">
              <img src="../../assets/dashboard_imgs/title_4.png">
            </div>
            <div class="child_count_box_p">
              <p class="mainfont">设备管理员数量(个)</p>
              <p id="equipmentUser">1</p>
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
            <p class="p_chart" id="pieChart1"></p>
          </el-row>
          <el-row class="child_charts">
            <div class="chart_title">
              <img src="../../assets/dashboard_imgs/title_2.png">
              <span>各部门设备类型</span>
            </div>
            <p class="p_chart" id="histogramChart"></p>
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
              <div class="popBox" id="printView" :style="{height:'68%'}">
                <div class="ttBox"><span class="tt" id="reportTitle"></span>
                  <img src="../../assets/dashboard_imgs/close.png" :style="{width:'30px',float: 'right',cursor:'pointer'}" title="关闭弹窗" class="close" @click="changeMood"/>
                </div>
                <div class="txtBox" id="el-dialog_body">
                  <div :style="{height:'100%',width: '98%',marginLeft: '2%'}">
                    <div class="left div_any01" :style="{width:'64%'}">
                      <div class="div_any_child_tanchu">
                        <div class="div_any_title"><div type="text" class="demo-input" id="date1" :style="{display: 'inline-block',cursor: 'pointer',marginRight: '16px'}"></div><img src="../../assets/dashboard_imgs/title_4.png">各部门IP使用个数</div>
                        <div :style="{paddingLeft:'850px',paddingTop:'30px',fontsize:'17px'}">IP总数：0<span id="IP_total" :style="{fontsize:'17px'}"></span></div>
                        <!--                <p id="main" class="p_chart_tanchu" :style="{top: '-34px'}"></p>-->
                        <p id="main1"  style="width: 900px; height: 460px"></p>
                      </div>

                    </div>
                    <div class="left div_any01"  :style="{width: '32%',}">
                      <div class="div_any_child_tanchu">
                        <div class="div_any_title"><div type="text" class="demo-input" id="date3" :style="{display:'inline-block' ,cursor:'pointer' ,marginRight: '16px'}"></div>
                          <img src="../../assets/dashboard_imgs/title_18.png">
                          设备类型
                        </div>
                        <!--                <p id="pieChart2" style="width: 600px; height: 400px" ></p>-->
                        <p id="main"  style="width: 771px; height: 416px;left:-66px" class="pieCHart"></p>
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
            <p class="p_chart" id="lineChart"></p>
          </el-row>
          <el-row class="child_charts">
            <div class="chart_title">
              <img src="../../assets/dashboard_imgs/title_4.png">
              <span>保修期内设备数量</span>
            </div>
            <p class="p_chart" id="lineChart2"></p>
          </el-row>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "@/../node_modules/echarts/extension/bmap/bmap";
import BMap from "BMap";

export default {
  name: 'Dashboard',
  data(){
    return{
      chart1Count: 0,
      postIndex: 0,
    }
  },
  created() {
    this.draw_Chart();
  },
  mounted() {

    this.drawChart();
    this.drawChart2();
    this.drawChart3();
    this.drawChart4();
    this.drawLine();
    // this.initEquipmentCount()
  },

  methods:{
    draw_Chart() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("main"));
      let myChart1 = this.$echarts.init(document.getElementById("main1"));

      var markpointData = [];

      var xdata = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; //横轴值数组

      var ydata =[120, 200, 150, 80, 70, 110, 130]; //纵轴值数组

      for(var i = 0;i<ydata.length;i++){
        markpointData.push({value:ydata[i], xAxis: xdata[i], yAxis:ydata[i] });
      }

      let department_Data_Array1=[120, 200, 150, 80, 70, 110, 130];
      let option1 = {
        color: ["#87cefa"],
        xAxis: {
          axisLabel: {
            color: '#FFFFFF',
            margin: 10,
            fontSize:16,
            interval: 0
          },
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {

          axisLabel: {
            color: '#FFFFFF',
            margin: 30,
            fontSize:16
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
          {radius: '50%',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',

            showBackground: true,
            markPoint: {
              barWidth: '25%',
              label:{
                show: true,
                color: '#000000',//气泡中字体颜色
                fontSize:16
              },
              data:markpointData,
            },
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.0)'
            }
          }
        ]
      };
      // 指定图表的配置项和数据
      let option = {

        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
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
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      myChart1.setOption(option1);
    },
    drawLine() {
      // this.drawChart();
      // 基于准备好的dom，初始化echarts实例
      let params=[
        [116.344516,39.917558, '中国地震局台网中心','2c9f40818022f3e1018022f66fdc0001'] ,
        // [116.297235,39.914195, '信息技术保障部'],
        // [116.313699,39.985729, '北京市地震局'],
        [116.297235,39.914195, '中国地震局','2c90a15e5ffb2ae9015ffb3a19a50000'],
        [116.808554,39.969103, '防灾科技学院','2c9f40818022f3e1018022f6922c0003'],
        [108.989465,34.231801, '中国地震局第二监测中心','2c9f40818022f3e1018022fce15d000b'],
        [102.746056,25.082943, '云南省地震局','2c9f40818022f3e1018022fc4a510009'],
        [104.073864,30.642951, '四川省地震局','2c9f40818022f3e1018022fc2e4e0007'],
        [103.863986,36.056004, '甘肃省地震局','2c9f40818022f3e1018022fd13be000d']

      ];
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        bmap: {
          center: [105,38],
          zoom: 5,
          roam: true,
        },
        tooltip : {
          trigger: 'item',
          backgroundColor: " rgba(0, 0, 0, 0.5)", //设置背景图片 rgba格式
          color: "black",
          borderWidth: "1", //边框宽度设置1
          borderColor: "rgba(0, 0, 0, 0.5)", //设置边框颜色
          textStyle: {
            fontsize:12,
            color: "white" //设置文字颜色
          },
          formatter:function(params, ticket, callback){
            return params.value[2]
          }
        },
        series: [{
          type: 'scatter',
          coordinateSystem: 'bmap',
          itemStyle : {
            normal : {
              color:'#FF0000'
            }
          },
          data: params
        }]
      });
      myChart.on('click',  (params)=> {
        // $("#el-dialog").removeClass('hide');
        $("#el-dialog").css('display','block');
        $("#reportTitle").html(params.value[2]);
        this.draw_Chart();
      });

      var bmap = myChart.getModel().getComponent('bmap').getBMap()
      bmap.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP ]}));
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

      bmap.setMapStyleV2({styleJson:styleJson});
    },
    changeMood(){
      $(".close").click(function(event) {
        $("#el-dialog").css('display','none');
      });
    },
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("pieChart1"));
      // 指定图表的配置项和数据
      let option = {
        color:["#87cefa","#ff7f50","#32cd32","#da70d6","#f1adbe","#defa2d","#fd0329","#6c7ffd",],
        tooltip : {
          trigger: 'item',
          formatter: "{b}<br/>{c}台 ({d}%)"
        },

        series: [
          {
            name:'设备数据量',
            type:'pie',
            radius : ['48%', '89%'],
            avoidLabelOverlap: false,
            center : ['50%', '52%'],
            itemStyle : {
              normal : {
                label : {
                  formatter:' {b}\n{c}台\n{d}%',
                  lineHeight: 22,
                  show : false,
                  position : 'center',
                  rich: {
                    a: {
                      fontSize: 16,
                    }
                  },

                },
                labelLine : {
                  show : false
                }
              },
              emphasis : {
                label : {
                  show : true,
                  textStyle : {
                    fontSize : '16',
                    fontWeight : 'bold'
                  }
                }
              }
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);


    },

    drawChart2() {
      let myChart = this.$echarts.init(document.getElementById("histogramChart"));
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [
          {
            name: 'Direct',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: 'Mail Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Affiliate Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: 'Search Engine',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawChart3() {
      let myChart = this.$echarts.init(document.getElementById("lineChart"));
      // 指定图表的配置项和数据
      let option = {
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
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawChart4() {
      let myChart = this.$echarts.init(document.getElementById("lineChart2"));
      // 指定图表的配置项和数据
      let option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
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
  padding-top: 20px;
  height: calc(100vh - 50px);
}
.nav_active{
  border-bottom: 4px solid #4b8df8;
  box-shadow: -10px 0px 15px #034c6a inset,  0px -10px 15px #034c6a inset, 10px 0px 15px #034c6a inset, 0px 10px 15px #034c6a inset;
}
.nav2>ul>li {
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
.total_line{
  height: 10vh;
  margin-bottom: 25px;
  margin-left: 5px;
}
.count_box{
  height: 100%;
  background-color: #034c6a;
}
.content_count_box{
  width: 50%;
  height: 100%;
}
.child_count_box{
  float: left;
}
.child_count_box_icon{
  margin-left: 5%;
  margin-top: 35px;
  float: left;
}
.child_count_box_icon img{
  width: 40px;
  height: 40px;
}
.child_count_box_p{
  margin-top: 15px;
  margin-left: 5%;
  text-align: center;
  line-height: 35px;
  float: left;
}
.child_count_box_p p:nth-child(1){
  font-size: 18px !important;
}
.child_count_box_p p:nth-child(2){
  font-size: 28px;
  color: #ffff43;
  font-weight: 600;
}
.left{
  float: left;
}
.right{
  float: right;
}

.charts_line{
  height: 100%;
  margin-bottom: 25px;
  margin-left: 5px;
}
.col_charts{
  padding-right: 25px;
}
.child_charts{
  width: 100%;
  height: calc(32vh);
  margin-top: 25px;
  box-shadow: -10px 0px 15px #034c6a inset, 0px -10px 15px #034c6a inset,10px 0px 15px #034c6a inset, 0px 10px 15px #034c6a inset;
  border: 1px solid #034c6a;
  box-sizing: border-box;
  position: relative;

}
.chart_title{
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
.chart_title img{
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
.map_height{
  height: calc(66vh);
}
.map_width{
  width: 30% !important;
  left: 35% !important;
}
.dialog{
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
.dynamic{
  display: flex;
  position: relative;
}
.map{
  width: 50%;
  height: 330px;
  transition: 0.5s;
}
.mapBig{
  position: absolute;
  width: 100%;
  height:536px;
  z-index: 3;
  transition: 0.5s;
  top: -218px;
}
.information{
  width: 30%;
}
.popBox{position: fixed; left: 45%; top: 10%; background-color: #081832; z-index: 1001; width: 90%; max-height: 84%; margin-left: -40%; border-radius: 5px; font-weight: bold; color: #ffffff;height: 100%;}
.xc_layer{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #666666; opacity: 0.5; z-index: 1000;}
.popBox .ttBox{height: 30px; line-height: 30px; padding: 14px 30px; border-bottom: solid 1px #eef0f1;text-align: center;-webkit-box-sizing: content-box;  -moz-box-sizing: content-box;box-sizing: content-box;}
.popBox .ttBox .tt{font-size: 20px; display: inline-block;  height: 30px;}

.div_any_child_tanchu{
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
.div_any_title{
  background-color: #034c6a;
  border-radius: 18px;
  position: absolute;
  height: 35px;
  width: 60%;
  top:-15px;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  left: 20%;
  line-height: 35px;
  text-align: center;
}
.div_any_title img{
  width: 18px;
  height: 18px;
  position: relative;
  top:2px;
  margin-right: 5px;
}
.BMap_cpyCtrl {
  display: none;
}

.anchorBL {
  display: none;
}

</style>
