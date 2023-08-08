<template>
  <div style="height: 100%;width: 100%;">
    <dv-border-box-13>
      <div>
        <dv-decoration-7 style="width:100%;height:60px; font-size: 15px;color:rgba(0,234,255,0.96);">常见设备信息统计</dv-decoration-7>
        <div style="height: 31vh; margin-top: -4vh; margin-left: 10px;" id="commonEquipmentInformation">

        </div>
      </div>
    </dv-border-box-13>
  </div>

</template>

<script>
import * as echarts from "echarts";
import {getCommonEquipmentInformationAndCount} from "@/api/dashboard";

export default {
  name: "commonEquipmentInformation",
  data(){
    return{
      count:[]
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData(){
      getCommonEquipmentInformationAndCount().then(res=>{
        this.count.push(res.data.homemadeCount[0])
        this.count.push(res.data.earlyWarningEquipmentCount[0])
        this.count.push(res.data.businessSystemFirstLevelsCount[0])
        this.count.push(res.data.commonSoftwareCount[0])
        this.count.push(res.data.secondProtectedBusinessSonSystemCount[0])
      }).then(this.initChart)
    },
    initChart() {
      const chartDom = document.getElementById('commonEquipmentInformation');
      const myChart = echarts.init(chartDom);
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['国产设备', '预警设备', '业务系统', '通用软件','等保二级'],
          axisLine: {
            show: true,
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            color: '#fff',
            // rotate: -20, // 设置旋转角度为 -45 度
            textStyle: {
              align: 'center', // 文字右对齐
            },
          },

        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            color: '#fff',
          },

        },
        series: [
          {
            data: this.count,
            type: 'bar',
            itemStyle: {
              // barBorderRadius: [20, 20, 0, 0], // 仅设置末端为圆角，其他角为直角
              color: function () {
                return (
                  "rgb(" +
                  Math.round(Math.random() * 255) +
                  ", " +
                  Math.round(Math.random() * 255) +
                  ", " +
                  Math.round(Math.random() * 255) +
                  ")"
                );
              }
            },
            label: {
              show: true,
              position: 'top', // 设置标签显示在柱状图顶部
              color: 'rgb(0,216,255)', // 标签文字颜色
            },
          }
        ]
      };
      option && myChart.setOption(option);
    }
  }

}
</script>

<style scoped>

</style>
