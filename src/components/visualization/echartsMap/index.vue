<!--
<template>
  <div style="height: 100%; width: 100%;">
    <dv-border-box-12>
      <div>
        <dv-decoration-7 style="width:100%;height:40px; font-size: 15px;color:rgba(0,234,255,0.96);">设备分布</dv-decoration-7>
        <div style="height: 100%; width: 90%;margin-left: 20px;">
          <div id="myChart" style="height: 750px; width: 620px;"></div>
        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
import * as echarts from "echarts";
import chinaJson from "@/assets/china.json";
import {getUnitWithExistData} from "@/api/dashboard";

export default {
  name: "map",
  mounted() {
    this.mapInit();
  },
  methods: {
    mapInit() {
      const data = [
        {name: '北京地震局', value: [116.395645, 39.929986]},
        {name: '天津地震局', value: [117.210813, 39.14393]},
        {name: '河北地震局', value: [114.502464, 38.045475]},
        {name: '内蒙古地震局', value: [111.660351, 40.828319]},
        {name: '辽宁地震局', value: [123.431475, 41.836175]},
        {name: '吉林地震局', value: [125.32568, 43.897016]},
        {name: '黑龙江地震局', value: [126.657717, 45.773225]},
        {name: '上海地震局', value: [121.483672, 31.238443]},
        {name: '江苏地震局', value: [118.772781, 32.047615]},
        {name: '浙江地震局', value: [120.153576, 30.287459]},
        {name: '安徽地震局', value: [117.283042, 31.86119]},
        {name: '福建地震局', value: [119.306239, 26.075302]},
        {name: '江西地震局', value: [115.892151, 28.676493]},
        {name: '山东地震局', value: [117.000923, 36.675807]},
        {name: '山西地震局', value: [112.549248, 37.857014]},
        {name: '河南地震局', value: [113.665412, 34.757975]},
        {name: '湖北地震局', value: [114.341862, 30.546498]},
        {name: '湖南地震局', value: [112.9836, 28.112743]},
        {name: '广东地震局', value: [113.394818, 23.408004]},
        {name: '广西地震局', value: [108.924274, 23.552255]},
        {name: '海南地震局', value: [110.330802, 20.022071]},
        {name: '重庆地震局', value: [106.530635, 29.544606]},
        {name: '四川地震局', value: [104.075809, 30.651239]},
        {name: '贵州地震局', value: [106.70546, 26.600302]},
        {name: '云南地震局', value: [102.710002, 25.045806]},
        {name: '青海地震局', value: [101.780199, 36.620901]},
        {name: '西藏地震局', value: [91.111891, 29.662557]},
        {name: '陕西地震局', value: [108.954239, 34.265472]},
        {name: '甘肃地震局', value: [103.823557, 36.058039]},
        {name: '宁夏地震局', value: [106.238976, 38.492392]},
        {name: '新疆地震局', value: [87.616823, 43.82663]},
        {name: '中国地震局地质研究所', value: [116.352309, 39.943889]},
        {name: '中国地震局地震预测研究所', value: [116.36133, 39.949124]},
        {name: '中国地震局工程力学研究所', value: [116.353622, 39.954435]},
        {name: '中国地震台网中心', value: [116.296929, 39.927485]},
        {name: '中国地震灾害防御中心', value: [116.358828, 39.954719]},
        {name: '中国地震局发展研究中心', value: [116.356076, 39.957754]},
        {name: '中国地震局地球物理勘探中心', value: [116.352882, 39.947333]},
        {name: '中国地震局第一监测中心', value: [116.356794, 39.9629]},
        {name: '中国地震局第二监测中心', value: [116.351509, 39.947437]},
        {name: '防灾科技学院', value: [116.808554, 39.969103]},
        {name: '中国地震局地球物理研究所', value: [116.309863, 39.962051]},
      ]

      getUnitWithExistData().then(res => {
        this.existDataUnit = res.data.items
        console.log("有数据的单位", this.existDataUnit)
        let unitEquipmentCountList = [];
        this.existDataUnit.forEach( element => {
          unitEquipmentCountList.push({
            name: element[0],
            value: `${element[1]}`,
          });
        });
        console.log("unitEquipmentCountList666",unitEquipmentCountList)
        let unit = []
        unitEquipmentCountList.forEach(element =>  {
          unit.push(element.name)
        })
        console.log("unit:",unit)

        // 初始化 echarts 实例
        let myChart = echarts.init(document.getElementById("myChart"));
        // 注册中国地图
        echarts.registerMap("china", chinaJson);
        // 设置地图图表的选项
        const options = {
          tooltip: {
            trigger: 'item',
            textStyle:{
              fontSize: 18,
              color: 'red'
            },
            formatter:function(params){
              let item = unitEquipmentCountList.find(unitEquipmentCountList => unitEquipmentCountList.name === params.name);
              if (item){
                return  item.name +'<br/>总设备数量：'+ item.value;
              } else {
                return params.name + '<br/>总设备数量：0';
              }
            }
          },
          geo: {
            map: 'china',
            roam: true,
            zoom: 1.2,
            center: [104.113478, 26.578343], // 设置地图的中心点为贵州的经纬度
            itemStyle: {
              normal: {
                areaColor: 'rgba(0,255,255,0.16)',
                borderColor: 'rgb(242,246,250)',
              },
              emphasis: {
                areaColor: '#ffffff',// 省份鼠标悬停时颜色
              }
            },
            label: {
              show: true, // 是否显示标签
              color:'rgba(255,255,255,0.65)', // 标签文本颜色
              fontSize: 11, // 标签文本大小
              formatter: function (params) { // 标签文本格式化函数
                return params.name;
              }
            },
            regions: [
              {
                name: '北京市',
                itemStyle: {
                  areaColor: unit.includes("北京地震局") || unit.includes("中国地震局地球物理研究所") ||
                  unit.includes("中国地震局地质研究所") || unit.includes("中国地震局地震预测研究所") ||
                  unit.includes("中国地震局工程力学研究所") || unit.includes("中国地震台网中心") ||
                  unit.includes("中国地震灾害防御中心") || unit.includes("中国地震局发展研究中心") ||
                  unit.includes("中国地震局地球物理勘探中心") || unit.includes("中国地震局第一监测中心") ||
                  unit.includes("中国地震局第二监测中心") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '安徽省',
                itemStyle: {
                  areaColor: unit.includes("安徽地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '江苏省',
                itemStyle: {
                  areaColor: unit.includes("江苏地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '江西省',
                itemStyle: {
                  areaColor: unit.includes("江西地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '辽宁省',
                itemStyle: {
                  areaColor: unit.includes("辽宁地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '内蒙古自治区',
                itemStyle: {
                  areaColor: unit.includes("内蒙古地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '宁夏回族自治区',
                itemStyle: {
                  areaColor: unit.includes("宁夏地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '青海省',
                itemStyle: {
                  areaColor: unit.includes("青海地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '山西省',
                itemStyle: {
                  areaColor: unit.includes("山西地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '陕西省',
                itemStyle: {
                  areaColor: unit.includes("陕西地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '上海省',
                itemStyle: {
                  areaColor: unit.includes("上海地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '四川省',
                itemStyle: {
                  areaColor: unit.includes("四川地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '西藏自治区',
                itemStyle: {
                  areaColor: unit.includes("西藏地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '新疆维吾尔自治区',
                itemStyle: {
                  areaColor: unit.includes("新疆地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '云南省',
                itemStyle: {
                  areaColor: unit.includes("云南地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '浙江省',
                itemStyle: {
                  areaColor: unit.includes("浙江地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '重庆市',
                itemStyle: {
                  areaColor: unit.includes("重庆地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '天津市',
                itemStyle: {
                  areaColor: unit.includes("天津地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '河北省',
                itemStyle: {
                  areaColor: unit.includes("河北地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '贵州省',
                itemStyle: {
                  areaColor: unit.includes("贵州地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '台湾省',
                itemStyle: {
                  areaColor: unit.includes("台湾地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '福建省',
                itemStyle: {
                  areaColor: unit.includes("福建地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '山东省',
                itemStyle: {
                  areaColor: unit.includes("山东地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '广东省',
                itemStyle: {
                  areaColor: unit.includes("广东地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '海南省',
                itemStyle: {
                  areaColor: unit.includes("海南地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '湖北省',
                itemStyle: {
                  areaColor: unit.includes("湖北地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '甘肃省',
                itemStyle: {
                  areaColor: unit.includes("甘肃地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)'
                }
              },
              {
                name: '广西壮族自治区',
                itemStyle: {
                  areaColor: unit.includes("广西壮族自治区地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '河南省',
                itemStyle: {
                  areaColor: unit.includes("河南地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '黑龙江省',
                itemStyle: {
                  areaColor: unit.includes("黑龙江地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '湖南省',
                itemStyle: {
                  areaColor: unit.includes("湖南地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              },
              {
                name: '吉林省',
                itemStyle: {
                  areaColor: unit.includes("吉林地震局") ? 'rgba(0,216,255,0.71)' : 'rgba(0,255,255,0.16)' // 背景颜色
                }
              }
            ]
          },

          series: [{
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: 20,
            itemStyle: {
              color: 'rgb(239,41,41)',
              shadowBlur: 50,
              shadowColor: '#701313'
            },
            data: data
          }],
        };

        // 将选项设置给 echarts 实例以渲染地图
        myChart.setOption(options);
      })


    },
  },
};
</script>
<style scoped>
</style>
-->





<template>
  <div style="height: 100%; width: 100%;">
    <dv-border-box-12>
      <div>
        <dv-decoration-7 style="width:100%;height:40px; font-size: 15px;color:rgba(0,234,255,0.96);">设备分布</dv-decoration-7>
        <div style="height: 100%; width: 90%;margin-left: 20px;">
          <div id="myChart" style="height: 750px; width: 620px;"></div>
        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
import * as echarts from "echarts";
import chinaJson from "@/assets/china.json";
import {getDepartmentAllCountData, getUnitWithExistData} from "@/api/dashboard";
import {getPost} from "@/api/select";

export default {
  name: "map",
  data(){
    return{
      postAllName:[],
      unitEquipmentCountData:[],
    }
  },
  mounted() {
    this.mapInit();
    this.handlePostEquipmentCountData()
  },
  methods: {
    async handelPostCountData(){
      let list = []
      let result = []
      await getPost().then(response => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        result.push({postName: list[i].postName})
      }
      return result
    },
    async handlePostEquipmentCountData() {
      let list = []
      let result = []
      await getUnitWithExistData().then((response) => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        result.push({name: list[i][0], value: list[i][1]})
      }
      return result
    },
    async initData(){
      // 获取所有单位名字
      this.postAllName = await this.handelPostCountData()
      this.unitEquipmentCountData = await this.handlePostEquipmentCountData()

    },

    mapInit() {
        // 初始化 echarts 实例
        let myChart = echarts.init(document.getElementById("myChart"));
        // 注册中国地图
        echarts.registerMap("china", chinaJson);
        // 设置地图图表的选项
        const options = {
          tooltip: {
            trigger: 'item',
            textStyle:{
              fontSize: 18,
              color: 'red'
            },
          },
          geo: {
            map: 'china',
            roam: true,
            zoom: 1.2,
            center: [104.113478, 26.578343], // 设置地图的中心点为贵州的经纬度
            itemStyle: {
              normal: {
                areaColor: 'rgba(0,255,255,0.16)',
                borderColor: 'rgb(242,246,250)',
              },
              emphasis: {
                areaColor: '#ffffff',// 省份鼠标悬停时颜色
              }
            },
            label: {
              show: true, // 是否显示标签
              color:'rgba(255,255,255,0.65)', // 标签文本颜色
              fontSize: 11, // 标签文本大小
              formatter: function (params) { // 标签文本格式化函数
                return params.name;
              }
            },
          },
        };
        // 将选项设置给 echarts 实例以渲染地图
        myChart.setOption(options);

    },
  },
};
</script>
<style scoped>
</style>
