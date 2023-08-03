<template>
  <div style="height: 100%; width: 100%;">
    <dv-border-box-12>
      <div>
        <dv-decoration-7 style="width:100%;height:40px; font-size: 15px;color:rgba(0,234,255,0.96);">设备总览</dv-decoration-7>
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

export default {
  name: "map",
  mounted() {
    this.mapInit();
  },
  methods: {
    mapInit() {
      // 初始化 echarts 实例
      let myChart = echarts.init(document.getElementById("myChart"));

      // 注册中国地图
      echarts.registerMap("china", chinaJson);

      // 设置地图图表的选项
      const options = {
        tooltip: {
          trigger: "item",
          formatter: "{b}",
        },
        series: [
          {
            type: "map",
            map: "china",
            center: [104.113478, 26.578343], // 设置地图的中心点为贵州的经纬度
            roam: true,
            label: {
              show: true,
            },
            itemStyle: {
              areaColor: "rgba(0,216,255,0.65)",
              borderColor: "#ffffff",
            },
            emphasis: {
              label: {
                show: true,
              },
              itemStyle: {
                areaColor: "#b2e7ff",
              },
            },
            // 设置地图的缩放级别
            zoom: 1.2, // 调整此值以放大或缩小地图
          },

        ],
      };

      // 将选项设置给 echarts 实例以渲染地图
      myChart.setOption(options);
    },
  },
};
</script>

<style scoped>
/* 可在此处添加组件的自定义样式 */
</style>
