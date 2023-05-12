<!--<template>
  <div ref='bgMain' class='bg-main'>
    <el-row>
      <el-col :span='7' class='nav2'>
        <ul>
          <li class='nav_active'><i class='nav_1'></i><a href='#' style='font-size:calc(1vw);'>设备概况</a></li>
        </ul>
      </el-col>
      <el-col :span='7' class='header_center'>
        <h2><strong>智能可视化展示平台</strong></h2>
      </el-col>
      <el-col :span='7'></el-col>
    </el-row>

    <el-row class='total_line'>
      <el-col :span='12' class='count_box'>
        <div class='content_count_box left'>
          <div class='child_count_box_icon'>
            <img src='../../assets/dashboard_imgs/info_1.png'>
          </div>
          <div :span='8' class='child_count_box_p'>
            <p class='mainfont'>总设备数据量(台)</p>
            <p id='equipmentAll'>{{ allEquipmentNumber }}</p>
          </div>
        </div>
        <div :span='8' class='content_count_box right'>
          <div class='child_count_box_icon'>
            <img src='../../assets/dashboard_imgs/info_2.png'>
          </div>
          <div class='child_count_box_p'>
            <p class='mainfont'>设备类型数量(种)</p>
            <p id='equipmentTypeAll'>{{ equipmentTypeNumber }}</p>
          </div>
        </div>
      </el-col>
      <el-col :span='12' class='count_box'>
        <div class='content_count_box left'>
          <div class='child_count_box_icon'>
            <img src='../../assets/dashboard_imgs/title_1.png'>
          </div>
          <div class='child_count_box_p'>
            <p class='mainfont'>过保设备数量</p>
            <p id='equipmentAllIndate'>{{ overPeriodEquipmentNumber }}</p>
          </div>
        </div>

        <div class='content_count_box right'>
          <div class='child_count_box_icon'>
            <img src='../../assets/dashboard_imgs/title_3.png'>
          </div>
          <div class='child_count_box_p'>
            <p class='mainfont'>总业务系统数量(个)</p>
            <p id='systemWareAll'>{{ allApplicationSystemNumber }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class='charts_line'>
      <el-col :span='6' class='left col_charts'>
        <el-row class='child_charts'>
          <div class='chart_title'>
            <img src='../../assets/dashboard_imgs/title_1.png'>
            <span id='chart1Data'>{{ chart1name }}</span>
          </div>
          <p id='pieChart1' class='p_chart'></p>
        </el-row>
        <el-row class='child_charts'>
          <div class='chart_title'>
            <img src='../../assets/dashboard_imgs/title_2.png'>
            <span>各部门设备类型</span>
          </div>
          <p id='histogramChart' class='p_chart'></p>
        </el-row>
      </el-col>
      <el-col :span='12' class='center col_charts'>
        <div class='map_height child_charts'>
          <div class='map_width chart_title'>
            <img src='../../assets/dashboard_imgs/title_0.png'>
            <span>信息分布图</span>
          </div>
          <div id='myChart' :style="{width:'95%',height:'95%',display: 'inline-block',paddingTop:'2.2%',}">
          </div>

          <div id='el-dialog' class='dialog'>
            <div class='xc_layer'></div>
            <div id='printView' :style="{height:'68%'}" class='popBox'>
              <div class='ttBox'><span id='reportTitle' class='tt'></span>
                <img :style="{width:'30px',float: 'right',cursor:'pointer'}" class='close'
                     src='../../assets/dashboard_imgs/close.png' title='关闭弹窗' @click='changeMood'/>
              </div>
              <div id='el-dialog_body' class='txtBox'>
                <div :style="{height:'100%',width: '98%',marginLeft: '2%'}">
                  <div :style="{width:'64%'}" class='left div_any01'>
                    <div class='div_any_child_tanchu'>
                      <div class='div_any_title'>
                        <div id='date1' :style="{display: 'inline-block',cursor: 'pointer',marginRight: '16px'}"
                             class='demo-input'
                             type='text'></div>
                        <img src='../../assets/dashboard_imgs/title_4.png'>各部门IP使用个数
                      </div>
                      <div :style="{paddingLeft:'850px',paddingTop:'30px',fontsize:'1vw'}">IP总数：{{ IPtotal }}
                      </div>
                      &lt;!&ndash;                <p id="main" class="p_chart_tanchu" :style="{top: '-34px'}"></p>&ndash;&gt;
                      <p id='IPCount' style='width: 100%; height: 90%'></p>
                    </div>
                  </div>
                  <div :style="{width: '32%',}" class='left div_any01'>
                    <div class='div_any_child_tanchu'>
                      <div class='div_any_title'>
                        <div id='date3' :style="{display:'inline-block' ,cursor:'pointer' ,marginRight: '16px'}"
                             class='demo-input'
                             type='text'></div>
                        <img src='../../assets/dashboard_imgs/title_18.png'>
                        设备类型
                      </div>
                      &lt;!&ndash;                <p id="pieChart2" style="width: 600px; height: 400px" ></p>&ndash;&gt;
                      <p id='equipmentType' class='pieCHart' style='width: 100%; height: 100%;text-align: center'></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </el-col>
      <el-col :span='6' class='right col_charts'>
        <el-row class='child_charts'>
          <div class='chart_title'>
            <img src='../../assets/dashboard_imgs/title_3.png'>
            <span id='chart2Data'>{{ chart2name }}</span>
          </div>
          <p id='pieChart2' class='p_chart'></p>
        </el-row>
        <el-row class='child_charts'>
          <div class='chart_title'>
            <img src='../../assets/dashboard_imgs/title_4.png'>
            <span>各机房内机柜数量</span>
          </div>
          <p id='histogramChart2' class='p_chart'></p>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {
  getDepartmentAllCountData,
  getEquipmentAllCountData,
  getIPAddressCountData,
  getMachineRoomAllCountData,
  getCabinetAllCountData
} from '@/api/dashboard'
import {
  getApplicationUserCount,
  getEquipmentCount, getEquipmentTypeCount, getEquipmentUserCount,
  getBusinessSystemCount, getOverGuaranteePeriodCount
} from '@/api/cockpit_data'
import * as echarts from 'echarts'
import chinaJson from '@/assets/simlpe.json'

export default {
  name: 'Dashboard',

  data() {
    return {
      chart1Count: 0,
      postIndex: 0,
      IPtotal: 0,
      allEquipmentNumber: '',
      equipmentTypeNumber: '',
      overPeriodEquipmentNumber: '',
      allApplicationSystemNumber: '',
      applicationUserNumber: '',
      equipmentUserNumber: '',
      chart01Count: 0,
      post01Index: 0,
      chart1name: '',
      chart2name: ''
    }
  },
  mounted() {
    this.currentRole()
    this.equipmentType()
    this.mapChartType()
    this.RenderingData() //调用渲染设备概况数据函数
    this.cabinet()
    this.mapInit()
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
    //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;赵长开-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
    //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;渲染设备概况数据开始-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
    RenderingData() {
      const that = this
      getEquipmentCount().then(function (res) {
        // //console.log("************总设备数据量:"+ res.data.total +"*********************")
        that.allEquipmentNumber = res.data.total
      }),
        getEquipmentTypeCount().then(function (res) {
          // //console.log("************设备类型数据量:"+ res.data +"*********************")
          that.equipmentTypeNumber = res.data
        }),
        getOverGuaranteePeriodCount().then(function (res) {
          // //console.log("************过保设备数据量:"+ res +"*********************")
          that.overPeriodEquipmentNumber = res
        }),
        getBusinessSystemCount().then(function (res) {
          // //console.log("************总应用系统数量:"+ res +"*********************")
          that.allApplicationSystemNumber = res.data
        }),
        getApplicationUserCount().then(function (res) {
          // //console.log("************应用管理员数量:"+ res +"*********************")
          that.applicationUserNumber = res
        }),
        getEquipmentUserCount().then(function (res) {
          // //console.log("************设备管理员数量:"+ res +"*********************")
          that.equipmentUserNumber = res
        })
    },
    //-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;渲染设备概况数据结束&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;


    // 判断该用户是否为super
    async currentRole() {
      let endIndex = this.role_name.indexOf('/')
      let currentPost = this.role_name.substring(0, endIndex)
      // //console.log(currentPost)
      if (this.roles[0] === '超级管理员') {
        this.chart1name = '各单位设备数据量'
        // $('#chart1Data').html("各单位设备数据量");
        let chart1Count = await this.handleDepartmentAllCountData()
        //console.log(chart1Count)
        let postIndex = 0
        for (let i = 0; i < chart1Count.length; i++) {
          //console.log(chart1Count[i].name)
          if (chart1Count[i].name == currentPost) {
            postIndex = i
            break
          }
        }
        this.initEquipmentCount(chart1Count, postIndex)
        this.chart2name = '各单位机房数据量'
        // $('#chart2Data').html("各单位机房数据量");
        let chart01Count = await this.handleMachineRoomAllCountData()
        let post01Index = 0
        for (let i = 0; i < chart1Count.length; i++) {
          //console.log(chart01Count[i].name)
          if (chart01Count[i].name == currentPost) {
            post01Index = i
            break
          }
        }
        this.initEquipmentCount01(chart01Count, post01Index)
        // //console.log("机房数据"+post01Index)

      } else {
        // 用户不是超级管理员
        this.chart1name = '各部门设备数据量'
        // $('#chart1Data').html("各部门设备数据量");

        let chart1Count = await this.handleDepartmentAllCountData()
        let chartLabel = this.getDepartmentEqLabData(chart1Count)
        this.initEquipmentCount2(chartLabel, chart1Count)
        //console.log("NO")
        this.chart2name = '各部门机房数据量'
        // $('#chart1Data').html("各部门机房数据量");
        let chart01Count = await this.handleMachineRoomAllCountData()
        let chartLabel1 = this.getMachineRoomEqLabData(chart01Count)
        this.initEquipmentCount02(chartLabel1, chart01Count)
        //console.log("NO")
      }
    },

    // 各部门设备类型 堆叠条形图
    async equipmentType() {
      let colData = await this.handleEquipmentAllCountData()// 堆叠条形图所需所有数据
      //console.log(colData)
      let chartLabel = this.handleChartLable(colData) // 图例
      let chart2YAxis = this.handleEquipmentTypeLable(colData) // Y轴设备类型
      let chart2Count = this.handleEquipmentCountData(chartLabel, chart2YAxis, colData) // 各部门的各设备类型数据
      let series = this.seriesArr(chartLabel, chart2Count)
      this.initEquipmentType(chartLabel, series, chart2YAxis)
    },

    // 把各单位的设备总数处理为饼状图所需要的格式
    async handleDepartmentAllCountData() {
      let list = []
      let result = []
      await getDepartmentAllCountData().then((response) => {
        list = response.data.items
        // //console.log(this.equipmentCount)
      })
      for (let i = 0; i < list.length; i++) {
        ////console.log(list[i].id)
        result.push({id: list[i].id, value: list[i].total, name: list[i].name})
      }

      return result
    },

    // 饼状图图例
    getDepartmentEqLabData(chart1Count) {
      let lab = []
      for (let i = 0; i < chart1Count.length; i++) {
        lab.push(chart1Count[i].name)
      }
      return lab
    },

    // 获取当前单位的所有部门的各自的所有种类设备统计
    async handleEquipmentAllCountData(postId) {
      let result = []
      let data
      if (postId) {
        data = {postId: postId}
      } else {
        data = {postId: 'null'}
      }
      await getEquipmentAllCountData(data).then((response) => {
        result = response.data.items
        // //console.log(this.equipmentCount)
      })

      return result
    },
    // 堆叠条形图图例
    handleChartLable(colData) {
      let temp = []
      for (let i = 0; i < colData.length; i++) {
        temp.push(colData[i].departmentName)
      }
      let result = temp.filter(function (item, index) {
        return temp.indexOf(item) === index  // 因为indexOf 只能查找到第一个
      })
      return result
    },
    // 堆叠条形图Y轴设备类型
    handleEquipmentTypeLable(colData) {
      let temp = []
      for (let i = 0; i < colData.length; i++) {
        temp.push(colData[i].equipmentTypeName)
      }
      let result = temp.filter(function (item, index) {
        return temp.indexOf(item) === index
      })
      //console.log(result)
      return result
    },
    // 堆叠条形图 各部门的各设备数量 处理为二维数组
    handleEquipmentCountData(chartLabel, chart2YAxis, colData) {
      let result = []
      for (let i = 0; i < chartLabel.length; i++) {
        let temp = []
        for (let j = 0; j < chart2YAxis.length; j++) {
          let k = 0
          let flag = false
          for (k = 0; k < colData.length; k++) {
            if (colData[k].departmentName === chartLabel[i] && colData[k].equipmentTypeName === chart2YAxis[j]) {
              temp.push(colData[k].count)
              flag = true
              break
            }
          }
          if (!flag) {
            temp.push(0)
          }
        }
        result.push(temp)
      }
      return result
    },

    //把以上数据处理成堆叠条形图需要的series值
    seriesArr(chartLabel, chart2Count) {
      let series = []
      for (let i = 0; i < chartLabel.length; i++) {

        for (let j = 0; j < chart2Count[i].length; j++) {
          if (chart2Count[i][j] == 0) {
            chart2Count[i][j] = '无'
            //console.log(chart2Count[i][j])
          }
        }
        let item = {
          name: chartLabel[i],
          type: 'bar',
          stack: '总量',
          itemStyle: {normal: {label: {show: true}}},
          data: chart2Count[i]
        }
        series.push(item)
      }
      return series
    },


// 点击饼状图，重新加载其他图表
    async clickFunc(data) {
      this.$echarts.init(document.getElementById('histogramChart')).clear()  //清空重画
      //console.log(data);
      let colData = await this.handleEquipmentAllCountData(data.id)// 柱状图所需所有数据
      //console.log(colData)
      let chartLabel = this.handleChartLable(colData) // 图例
      let chart2YAxis = this.handleEquipmentTypeLable(colData) // Y轴
      let chart2Count = this.handleEquipmentCountData(chartLabel, chart2YAxis, colData)
      let series = this.seriesArr(chartLabel, chart2Count)
      this.initEquipmentType(chartLabel, series, chart2YAxis)

      // 机房机柜
      this.$echarts.init(document.getElementById('histogramChart2')).clear()  //清空重画
      let colData2 = await this.handleCabinetAllCountData(data.id)// 柱状图所需所有数据
      let chartLabel2 = this.handleCabinetChartLable(colData2) // 图例
      let chart2YAxis2 = this.handleCabinetLable(colData2) // Y轴
      let chart2Count2 = this.handleCabinetCountData(chartLabel2, chart2YAxis2, colData2)
      let series2 = this.cabinetseriesArr(chartLabel2, chart2Count2)
      this.initCabinet(chartLabel2, series2, chart2YAxis2)
    },

    // 把各单位的机房总数处理为饼状图所需要的格式
    async handleMachineRoomAllCountData() {
      let list = []
      let result = []
      await getMachineRoomAllCountData().then((response) => {
        list = response.data.items
        // //console.log(this.equipmentCount)
      })
      for (let i = 0; i < list.length; i++) {
        //console.log(list[i].id)
        result.push({id: list[i].id, value: list[i].total, name: list[i].name})
      }

      return result
    },

    // 饼状图图例
    getMachineRoomEqLabData(chart01Count) {
      let lab = []
      for (let i = 0; i < chart01Count.length; i++) {
        lab.push(chart01Count[i].name)
        //console.log(lab)
      }
      return lab
    },

    // 获取当前单位的所有部门的各自的所有种类设备统计
    async handleCabinetAllCountData(machineRoomId) {
      let result = []
      let data
      if (machineRoomId) {
        data = {postId: machineRoomId}
      } else {
        data = {postId: 'null'}
      }
      await getCabinetAllCountData(data).then((response) => {
        result = response.data.items
      })

      return result
    },

    // 堆叠条形图图例
    handleCabinetChartLable(colData) {
      let temp = []
      for (let i = 0; i < colData.length; i++) {
        temp.push(colData[i].machineRoomId)
      }
      let result = temp.filter(function (item, index) {
        return temp.indexOf(item) === index  // 因为indexOf 只能查找到第一个
      })
      return result
    },
    // 堆叠条形图X轴设备类型
    handleCabinetLable(colData) {
      let temp = []
      for (let i = 0; i < colData.length; i++) {
        temp.push(colData[i].machineRoomName)
      }
      //console.log(temp)
      return temp
    },
    // 堆叠条形图 各部门的各设备数量 处理为二维数组
    handleCabinetCountData(chartLabel, chart2YAxis, colData) {
      let result = []
      for (let i = 0; i < chartLabel.length; i++) {
        let temp = []
        for (let j = 0; j < chart2YAxis.length; j++) {
          let k = 0
          let flag = false
          for (k = 0; k < colData.length; k++) {
            if (colData[k].machineRoomId === chartLabel[i]) {
              temp.push(colData[k].count)
              flag = true
              break
            }
          }
          if (!flag) {
            temp.push(0)
          }
        }
        result.push(temp)
      }
      return result
    },

    // 各机房机柜总量统计 堆叠条形图
    async cabinet() {
      let colData = await this.handleCabinetAllCountData()// 堆叠条形图所需所有数据
      let chartLabel = this.handleCabinetChartLable(colData) // 图例
      let chart2YAxis = this.handleCabinetLable(colData) // X轴设备类型
      let chart2Count = this.handleCabinetCountData(chartLabel, chart2YAxis, colData) // 各部门的各设备类型数据
      let series = this.cabinetseriesArr(chartLabel, chart2Count)
      this.initCabinet(chartLabel, series, chart2YAxis)

    },

    //把以上数据处理成堆叠条形图需要的series值
    cabinetseriesArr(chartLabel, chart2Count) {

      let nums = []
      for (let i = 0; i < chart2Count.length; i++) {
        // //console.log(chart2Count[i])
        nums.push(chart2Count[i][0])
      }
      let series = []
      let item = {
        name: chartLabel,
        type: 'bar',
        stack: '总量',
        itemStyle: {normal: {label: {show: true}}},
        data: nums
      }
      series.push(item)
      return series
    },


    // 超级管理员
    initEquipmentCount(chart1Count, postIndex) {
      let pieChart = this.$echarts.init(document.getElementById('pieChart1'))
      pieChart.setOption({
        color: ['#87cefa', '#ff7f50', '#32cd32', '#da70d6', '#f1adbe', '#defa2d', '#fd0329', '#6c7ffd'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}台 ({d}%)'
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
                      fontSize: '1vw'
                    }
                  }

                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true,
                  textStyle: {
                    fontSize: '1vw',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: chart1Count
          }
        ]
      })
      let index = postIndex
      pieChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: index//默认选中第一个
      })
      pieChart.off('click')
      pieChart.on('mouseover', function (e) {
        if (e.dataIndex !== index) {
          pieChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: e.dataIndex
          })
        }
      })
      pieChart.on('mouseout', function (e) {
        // index = e.dataIndex;
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        })
      })
      pieChart.on('click', (params) => {
        // //console.log(params.data)
        this.clickFunc(params.data)
        if (params.dataIndex !== index) {
          //没用选中的取消高亮
          pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index})
        }
        //选中某一条高亮
        index = params.dataIndex
        pieChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: index})
        //console.log(index);
      })

      window.addEventListener('resize', function () {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index//默认选中第一个
        })
        pieChart.resize()
      })
      let elementResizeDetectorMaker = require('element-resize-detector')
      let myChart = elementResizeDetectorMaker()

      myChart.listenTo(document.getElementById('pieChart1'), () => {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index//默认选中第一个
        })
        pieChart.resize()
      })
      //监听元素变化
    },
    // 非超级管理员
    initEquipmentCount2(chartLabel, chart1Count) {

      let pieChart = this.$echarts.init(document.getElementById('pieChart1'))

      pieChart.setOption({
        color: ['#87cefa', '#ff7f50', '#32cd32', '#da70d6', '#f1adbe', '#defa2d', '#fd0329', '#6c7ffd'],
        legend: {
          y: '235',
          x: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: '1vw'
          },
          data: chartLabel
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}<br/>{c}台 ({d}%)'
        },
        calculable: false,
        series: [
          {
            name: '设备数据量',
            type: 'pie',
            radius: ['36%', '70%'],
            // avoidLabelOverlap: false,
            center: ['50%', '45%'],

            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: 'center'
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: false,
                  textStyle: {
                    fontSize: '1vw',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: chart1Count
          }
        ]
      })
      window.addEventListener('resize', function () {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0
        })
        pieChart.resize()
      })
      let elementResizeDetectorMaker = require('element-resize-detector')
      let myChart = elementResizeDetectorMaker()

      myChart.listenTo(document.getElementById('pieChart1'), () => {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0
        })
        pieChart.resize()
      })
      //监听元素变化
    },
    //各部门设备类型柱状图
    initEquipmentType(chartLabel, series, chart2YAxis) {
      let histogramChart = this.$echarts.init(document.getElementById('histogramChart'))
      histogramChart.setOption({

        color: ['#87cefa', '#ff7f50', '#32cd32', '#da70d6', '#f1adbe', '#defa2d', '#fd0329', '#6c7ffd'],
        legend: {
          y: '235',
          x: 'center',
          // data:chartLabel,
          data: [],
          textStyle: {
            color: '#ffffff',
            fontSize: '1vw'
          }
        },

        calculable: false,
        grid: {
          left: '5%',
          right: '5%',
          bottom: '20%',
          containLabel: true
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },

        xAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                color: ['#f2f2f2'],
                width: 0,
                type: 'solid'
              }
            }

          }
        ],

        yAxis: [
          {
            type: 'category',
            data: chart2YAxis,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                width: 0,
                type: 'solid'
              }
            }
          }
        ],

        series: series
      })
      window.addEventListener('resize', function () {
        histogramChart.resize()
      })
      let elementResizeDetectorMaker = require('element-resize-detector')
      let myChart = elementResizeDetectorMaker()

      myChart.listenTo(document.getElementById('pieChart1'), () => {
        histogramChart.resize()
      })
      //监听元素变化
    },

    // 超级管理员 机房
    initEquipmentCount01(chart01Count, post01Index) {
      //   机房总量设备设备显示
      let pieChart = this.$echarts.init(document.getElementById('pieChart2'))
      pieChart.setOption({
        color: ['#87cefa', '#ff7f50', '#32cd32', '#da70d6', '#f1adbe', '#defa2d', '#fd0329', '#6c7ffd'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}个({d}%)'
        },
        // calculable : false,
        series: [
          {
            name: '机房数据量',
            type: 'pie',
            radius: ['48%', '89%'],
            avoidLabelOverlap: false,
            center: ['50%', '52%'],

            itemStyle: {
              normal: {
                label: {
                  formatter: ' {b}\n{c}个\n{d}%',
                  lineHeight: 22,
                  show: false,
                  position: 'center',
                  rich: {
                    a: {
                      fontSize: '1vw'
                    }
                  }

                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true,
                  textStyle: {
                    fontSize: '1vw',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: chart01Count
          }
        ]
      })
      let index01 = post01Index
      pieChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: index01//默认选中第一个
      })

      pieChart.off('click')
      pieChart.on('mouseover', function (e) {
        if (e.dataIndex !== index01) {
          pieChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: e.dataIndex
          })
        }
      })
      pieChart.on('mouseout', function (e) {
        // index01 = e.dataIndex;
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index01
        })
      })
      pieChart.on('click', (params) => {

        //console.log(params.data)

        // this.clickCabinetFunc(params.data);
        this.clickFunc(params.data)
        if (params.dataIndex !== index01) {
          //没用选中的取消高亮
          pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index01})
        }
        //选中某一条高亮
        index01 = params.dataIndex
        pieChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: index01})
        //console.log(index01);
      })

      window.addEventListener('resize', function () {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index01//默认选中第一个
        })
        pieChart.resize()
      })

      let elementResizeDetectorMaker = require('element-resize-detector')
      let myChart = elementResizeDetectorMaker()

      myChart.listenTo(document.getElementById('pieChart2'), () => {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index01//默认选中第一个
        })
        pieChart.resize()
      })
      //监听元素变化
    },
    // 非超级管理员 机房
    initEquipmentCount02(chartLabel1, chart01Count) {

      let pieChart = this.$echarts.init(document.getElementById('pieChart2'))

      pieChart.setOption({
        color: ['#87cefa', '#ff7f50', '#32cd32', '#da70d6', '#f1adbe', '#defa2d', '#fd0329', '#6c7ffd'],
        legend: {
          y: '235',
          x: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: '1vw'
          },
          data: chartLabel1
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}<br/>{c}个({d}%)'
        },
        calculable: false,
        series: [
          {
            name: '机房数据量',
            type: 'pie',
            radius: ['36%', '70%'],
            // avoidLabelOverlap: false,
            center: ['50%', '45%'],

            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: 'center'
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: false,
                  textStyle: {
                    fontSize: '1vw',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: chart01Count
          }
        ]
      })
      window.addEventListener('resize', function () {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0
        })
        pieChart.resize()
      })

      let elementResizeDetectorMaker = require('element-resize-detector')
      let myChart = elementResizeDetectorMaker()

      myChart.listenTo(document.getElementById('pieChart2'), () => {
        this.$nextTick(() => {
          pieChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0
          })
          pieChart.resize()
        })
      })
      //监听元素变化
    },

    //各机房机柜总量柱状图
    initCabinet(chartLabel, series, chart2YAxis, colData) {
      let histogramChart2 = this.$echarts.init(document.getElementById('histogramChart2'))
      histogramChart2.setOption({

        color: ['#87cefa', '#ff7f50', '#32cd32', '#da70d6', '#f1adbe', '#defa2d', '#fd0329', '#6c7ffd'],

        legend: {
          y: '235',
          x: 'center',
          data: chartLabel,
          textStyle: {
            color: '#ffffff',
            fontSize: '1vw'
          }
        },

        calculable: false,
        grid: {
          left: '5%',
          right: '5%',
          bottom: '20%',
          containLabel: true
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: chart2YAxis,
            axisLabel: {
              show: false,
              textStyle: {
                color: '#fff'
              }
              // interval: 0,
              // formatter: function(data) {
              //   return data.split('').join('\n')
              // }
            },
            splitLine: {
              lineStyle: {
                color: ['#f2f2f2'],
                width: 0,
                type: 'solid'
              }
            }

          }
        ],

        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
            // splitLine:{
            //   lineStyle:{
            //     width:0,
            //     type:'solid'
            //   }
            // }
          }
        ],

        series: series
      })
      window.addEventListener('resize', function () {
        histogramChart2.resize()
      })

      let elementResizeDetectorMaker = require('element-resize-detector')
      let myChart = elementResizeDetectorMaker()
      myChart.listenTo(document.getElementById('histogramChart2'), () => {
        this.$nextTick(() => {
          histogramChart2.resize()
        })
      })
      //监听元素变化
    },

    mapInit() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      echarts.registerMap('myMap', chinaJson);// 注册地图数据
      // 将GeoJSON数据转换为Echarts支持的数据格式
      let convertedData = []
      chinaJson.features.forEach(function (feature) {
        let name = feature.properties.name
        let value = feature.properties.value
        let geometry = feature.geometry
        convertedData.push({
          name: name,
          value: [geometry.coordinates[0], geometry.coordinates[1], value]
        })
      })
      // 在Echarts中设置数据
      myChart.setOption({
        geo: [{
          map: 'myMap',
          roam: true,
          zoom: 1.6,
          center: [107.17822541210936, 34.534217994282535],
        }],
      })
       this.drawLine();
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

      ]
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', //设置背景图片 rgba格式
          color: 'black',
          borderWidth: '1', //边框宽度设置
          borderColor: 'rgba(0, 0, 0, 0.5)', //设置边框颜色
          textStyle: {
            fontsize: '1vw',
            color: 'white' //设置文字颜色
          }
        },
        series: [{
          type: 'scatter',
          coordinateSystem: 'myMap',
          itemStyle: {
            normal: {
              color: '#FF0000'
            }
          },
          data: params
        }]
      })
      myChart.on('click', (params) => {
        $('#el-dialog').css('display', 'block')
        $('#reportTitle').html(params.value[2])
        this.drawMapChartType(params.value[3])
        this.drawMapChartIP(params.value[3])
      })
    },
    changeMood() {
      $('.close').click(function (event) {
        $('#el-dialog').css('display', 'none')
      })
    },

    async drawMapChartIP(postId) {
      let XAxis = []
      let YAxis = []
      let markpointData = []
      let list = []
      let sum = 0
      let params = {postId: postId}
      await getIPAddressCountData(params).then((response) => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        XAxis.push(list[i].departmentName)
        YAxis.push(list[i].count)
        sum += list[i].count
      }
      this.IPtotal = sum
      for (let i = 0; i < YAxis.length; i++) {
        markpointData.push({value: YAxis[i], xAxis: XAxis[i], yAxis: YAxis[i]})
      }
      let myChart1 = this.$echarts.init(document.getElementById('IPCount'))
      let option1 = {
        color: ['#87cefa'],
        xAxis: {
          axisLabel: {
            color: '#FFFFFF',
            margin: 10,
            fontSize: '1vw',
            interval: 0
          },
          type: 'category',
          data: XAxis
        },
        yAxis: {

          axisLabel: {
            color: '#FFFFFF',
            margin: 30,
            fontSize: '1vw'
          },
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }

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
                fontSize: '1vw'
              },
              data: markpointData
            },
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.0)'
            }
          }
        ]
      }
      myChart1.setOption(option1)
      // window.addEventListener("resize",function (){
      //   myChart1.resize();
      // });
      // $("#menuHidden").click(function(){
      //   myChart1.resize();
      // });
    },
    // 地图弹窗中设备类型表的数据处理
    async mapChartType(postId) {
      let eqData = await this.handleEquipmentAllCountData(postId)
      let result = []
      let lableData = this.handleEquipmentTypeLable(eqData)
      for (let i = 0; i < lableData.length; i++) {
        let count = 0
        for (let j = 0; j < eqData.length; j++) {
          if (eqData[j].equipmentTypeName === lableData[i]) {
            count += eqData[j].count
          }
        }
        result.push({value: count, name: lableData[i]})
      }
      return result
    },
    async drawMapChartType(postId) {
      let chartData = await this.mapChartType(postId)
      let myChart = this.$echarts.init(document.getElementById('equipmentType'))
      let option = {
        color: ['#87cefa', '#ff7f50', '#32cd32', '#da70d6', '#f1adbe', '#defa2d', '#fd0329', '#6c7ffd'],
        tooltip: {
          trigger: 'item'
        },

        calculable: true,
        series: [
          {
            name: '设备类型',
            type: 'pie',
            radius: '50%',
            label: {
              formatter: '{name|{b}}\n{value|{c}台}',
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 20,
              rich: {
                value: {
                  fontSize: '1vw'
                }
              },
              textStyle: {
                fontSize: '1vw'
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
      }
      myChart.setOption(option)
    }

  }

}
</script>

<style lang='scss' scoped>

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
  min-height: calc(100vh - 50px);
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
  font-size: 2rem;
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
  height: 100%;
}

.child_count_box_icon {
  width: 15%;
  height: 90%;
  margin-left: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
  float: left;
}

.child_count_box_icon img {
  width: 80%;
  height: 80%;
}

.child_count_box_p {
  margin-top: 4%;
  margin-bottom: 4%;
  height: 96%;
  width: 80%;
  text-align: center;
  float: left;
}

.child_count_box_p p:nth-child(1) {
  font-size: calc(1vw);
  text-align: center;
}

.child_count_box_p p:nth-child(2) {
  margin-top: 2%;
  font-size: calc(2vw);
  color: #ffff43;
  text-align: center;
}

.left {
  float: left;
}

.right {
  float: right;
}

.charts_line {
  height: 100%;
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
  font-size: calc(1vw);
  left: 20%;
  line-height: 35px;
  text-align: center;
}

.chart_title img {
  height: 80%;
  position: relative;
  top: 2px;
  margin-right: 5px;
}

//图表样式
.p_chart {
  height: 90%;
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
    font-size: 5vw;
    line-height: 5px;
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
  font-size: calc(1vw);
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
  font-size: calc(1vw);
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

</style>-->


<template>
  <div ref='bgMain' class='bg-main'>
    <el-row>
      <el-col :span='7' class='nav2'>
        <ul>
          <li class='nav_active'><i class='nav_1'></i><a href='#' style='font-size:calc(1vw);'>设备概况</a></li>
        </ul>
      </el-col>
      <el-col :span='7' class='header_center'>
        <h2><strong>智能可视化展示平台</strong></h2>
      </el-col>
      <el-col :span='7'></el-col>
    </el-row>

    <el-row class='total_line'>
      <el-col :span='12' class='count_box'>
        <div class='content_count_box left'>
          <div class='child_count_box_icon'>
            <img src='../../assets/dashboard_imgs/info_1.png'>
          </div>
          <div :span='8' class='child_count_box_p'>
            <p class='mainfont'>总设备数据量(台)</p>
            <p id='equipmentAll'>{{ allEquipmentNumber }}</p>
          </div>
        </div>
        <div :span='8' class='content_count_box right'>
          <div class='child_count_box_icon'>
            <img src='../../assets/dashboard_imgs/info_2.png'>
          </div>
          <div class='child_count_box_p'>
            <p class='mainfont'>设备类型数量(种)</p>
            <p id='equipmentTypeAll'>{{ equipmentTypeNumber }}</p>
          </div>
        </div>
      </el-col>
      <el-col :span='12' class='count_box'>
        <div class='content_count_box left'>
          <div class='child_count_box_icon'>
            <img src='../../assets/dashboard_imgs/title_1.png'>
          </div>
          <div class='child_count_box_p'>
            <p class='mainfont'>过保设备数量</p>
            <p id='equipmentAllIndate'>{{ overPeriodEquipmentNumber }}</p>
          </div>
        </div>

        <div class='content_count_box right'>
          <div class='child_count_box_icon'>
            <img src='../../assets/dashboard_imgs/title_3.png'>
          </div>
          <div class='child_count_box_p'>
            <p class='mainfont'>总业务系统数量(个)</p>
            <p id='systemWareAll'>{{ allApplicationSystemNumber }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class='charts_line'>
      <el-col :span='6' class='left col_charts'>
        <el-row class='child_charts'>
          <div class='chart_title'>
            <img src='../../assets/dashboard_imgs/title_1.png'>
            <span id='chart1Data'>{{ chart1name }}</span>
          </div>
          <p id='pieChart1' class='p_chart'></p>
        </el-row>
        <el-row class='child_charts'>
          <div class='chart_title'>
            <img src='../../assets/dashboard_imgs/title_2.png'>
            <span>各部门设备类型</span>
          </div>
          <p id='histogramChart' class='p_chart'></p>
        </el-row>
      </el-col>
      <el-col :span='12' class='center col_charts'>
        <div class='map_height child_charts'>
          <div class='map_width chart_title'>
            <img src='../../assets/dashboard_imgs/title_0.png'>
            <span>信息分布图</span>
          </div>
          <div id='myChart' :style="{width:'95%',height:'95%',display: 'inline-block',paddingTop:'2.2%',}">
          </div>
        </div>
      </el-col>
      <el-col :span='6' class='right col_charts'>
        <el-row class='child_charts'>
          <div class='chart_title'>
            <img src='../../assets/dashboard_imgs/title_3.png'>
            <span id='chart2Data'>{{ chart2name }}</span>
          </div>
          <p id='pieChart2' class='p_chart'></p>
        </el-row>
        <el-row class='child_charts'>
          <div class='chart_title'>
            <img src='../../assets/dashboard_imgs/title_4.png'>
            <span>各机房内机柜数量</span>
          </div>
          <p id='histogramChart2' class='p_chart'></p>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {
  getDepartmentAllCountData,
  getEquipmentAllCountData,
  getIPAddressCountData,
  getMachineRoomAllCountData,
  getCabinetAllCountData, getUnitWithExistData
} from '@/api/dashboard'
import {
  getApplicationUserCount,
  getEquipmentCount, getEquipmentTypeCount, getEquipmentUserCount,
  getBusinessSystemCount, getOverGuaranteePeriodCount
} from '@/api/cockpit_data'
import * as echarts from 'echarts'
import chinaJson from '@/assets/simlpe.json'
import {getPost} from "@/api/select";

export default {
  name: 'Dashboard',
  data() {
    return {
      chart1Count: 0,
      postIndex: 0,
      ipTotal: 0,
      allEquipmentNumber: '',
      equipmentTypeNumber: '',
      overPeriodEquipmentNumber: '',
      allApplicationSystemNumber: '',
      applicationUserNumber: '',
      equipmentUserNumber: '',
      chart01Count: 0,
      post01Index: 0,
      chart1name: '',
      chart2name: '',
      existDataUnit: [],
    }
  },
  mounted() {
    this.currentRole()
    this.equipmentType()
    this.mapChartType()
    this.RenderingData() //调用渲染设备概况数据函数
    this.cabinet()
    this.mapInit()
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
    RenderingData() {
      const that = this
      getEquipmentCount().then(function (res) {
        // //console.log("************总设备数据量:"+ res.data.total +"*********************")
        that.allEquipmentNumber = res.data.total
      }),
        getEquipmentTypeCount().then(function (res) {
          // //console.log("************设备类型数据量:"+ res.data +"*********************")
          that.equipmentTypeNumber = res.data
        }),
        getOverGuaranteePeriodCount().then(function (res) {
          // //console.log("************过保设备数据量:"+ res +"*********************")
          that.overPeriodEquipmentNumber = res
        }),
        getBusinessSystemCount().then(function (res) {
          // //console.log("************总应用系统数量:"+ res +"*********************")
          that.allApplicationSystemNumber = res.data
        }),
        getApplicationUserCount().then(function (res) {
          // //console.log("************应用管理员数量:"+ res +"*********************")
          that.applicationUserNumber = res
        }),
        getEquipmentUserCount().then(function (res) {
          // //console.log("************设备管理员数量:"+ res +"*********************")
          that.equipmentUserNumber = res
        })
    },
    //---------------------渲染设备概况数据结束--------------------------------------------
    // 判断该用户是否为super
    async currentRole() {
      let endIndex = this.role_name.indexOf('/')
      let currentPost = this.role_name.substring(0, endIndex)
      if (this.roles[0] === '超级管理员') {
        this.chart1name = '各单位设备数据量'
        let chart1Count = await this.handleDepartmentAllCountData()
        let postIndex = 0
        for (let i = 0; i < chart1Count.length; i++) {
          if (chart1Count[i].name == currentPost) {
            postIndex = i
            break
          }
        }
        this.initEquipmentCount(chart1Count, postIndex)
        this.chart2name = '各单位机房数据量'
        let chart01Count = await this.handleMachineRoomAllCountData()
        let post01Index = 0
        for (let i = 0; i < chart1Count.length; i++) {
          if (chart01Count[i].name == currentPost) {
            post01Index = i
            break
          }
        }
        this.initEquipmentCount01(chart01Count, post01Index)
      } else {
        // 用户不是超级管理员
        this.chart1name = '各部门设备数据量'
        let chart1Count = await this.handleDepartmentAllCountData()
        let chartLabel = this.getDepartmentEqLabData(chart1Count)
        this.initEquipmentCount2(chartLabel, chart1Count)
        this.chart2name = '各部门机房数据量'
        let chart01Count = await this.handleMachineRoomAllCountData()
        let chartLabel1 = this.getMachineRoomEqLabData(chart01Count)
        this.initEquipmentCount02(chartLabel1, chart01Count)
      }
    },
    // 各部门设备类型 堆叠条形图
    async equipmentType() {
      let colData = await this.handleEquipmentAllCountData()// 堆叠条形图所需所有数据
      //console.log(colData)
      let chartLabel = this.handleChartLable(colData) // 图例
      let chart2YAxis = this.handleEquipmentTypeLable(colData) // Y轴设备类型
      let chart2Count = this.handleEquipmentCountData(chartLabel, chart2YAxis, colData) // 各部门的各设备类型数据
      let series = this.seriesArr(chartLabel, chart2Count)
      this.initEquipmentType(chartLabel, series, chart2YAxis)
    },
    // 把各单位的设备总数处理为饼状图所需要的格式
    async handleDepartmentAllCountData() {
      let list = []
      let result = []
      await getDepartmentAllCountData().then((response) => {
        list = response.data.items
        // //console.log(this.equipmentCount)
      })
      for (let i = 0; i < list.length; i++) {
        ////console.log(list[i].id)
        result.push({id: list[i].id, value: list[i].total, name: list[i].name})
      }

      return result
    },
    // 饼状图图例
    /* getDepartmentEqLabData(chart1Count) {
       let lab = []
       for (let i = 0; i < chart1Count.length; i++) {
         lab.push(chart1Count[i].name)
       }
       return lab
     },
 */
    // 获取当前单位的所有部门的各自的所有种类设备统计
    async handleEquipmentAllCountData(postId) {
      let result = []
      let data
      if (postId) {
        data = {postId: postId}
      } else {
        data = {postId: 'null'}
      }
      await getEquipmentAllCountData(data).then((response) => {
        result = response.data.items
        // //console.log(this.equipmentCount)
      })
      return result
    },
    // 堆叠条形图图例
    handleChartLable(colData) {
      let temp = []
      for (let i = 0; i < colData.length; i++) {
        temp.push(colData[i].departmentName)
      }
      let result = temp.filter(function (item, index) {
        return temp.indexOf(item) === index  // 因为indexOf 只能查找到第一个
      })
      return result
    },
    // 堆叠条形图Y轴设备类型
    handleEquipmentTypeLable(colData) {
      let temp = []
      for (let i = 0; i < colData.length; i++) {
        temp.push(colData[i].equipmentTypeName)
      }
      let result = temp.filter(function (item, index) {
        return temp.indexOf(item) === index
      })
      return result
    },
    // 堆叠条形图 各部门的各设备数量 处理为二维数组
    handleEquipmentCountData(chartLabel, chart2YAxis, colData) {
      let result = []
      for (let i = 0; i < chartLabel.length; i++) {
        let temp = []
        for (let j = 0; j < chart2YAxis.length; j++) {
          let k = 0
          let flag = false
          for (k = 0; k < colData.length; k++) {
            if (colData[k].departmentName === chartLabel[i] && colData[k].equipmentTypeName === chart2YAxis[j]) {
              temp.push(colData[k].count)
              flag = true
              break
            }
          }
          if (!flag) {
            temp.push(0)
          }
        }
        result.push(temp)
      }
      return result
    },
    //把以上数据处理成堆叠条形图需要的series值
    seriesArr(chartLabel, chart2Count) {
      let series = []
      for (let i = 0; i < chartLabel.length; i++) {

        for (let j = 0; j < chart2Count[i].length; j++) {
          if (chart2Count[i][j] == 0) {
            chart2Count[i][j] = '无'
            //console.log(chart2Count[i][j])
          }
        }
        let item = {
          name: chartLabel[i],
          type: 'bar',
          stack: '总量',
          itemStyle: {normal: {label: {show: true}}},
          data: chart2Count[i]
        }
        series.push(item)
      }
      return series
    },
// 点击饼状图，重新加载其他图表
    async clickFunc(data) {
      this.$echarts.init(document.getElementById('histogramChart')).clear()  //清空重画
      //console.log(data);
      let colData = await this.handleEquipmentAllCountData(data.id)// 柱状图所需所有数据
      //console.log(colData)
      let chartLabel = this.handleChartLable(colData) // 图例
      let chart2YAxis = this.handleEquipmentTypeLable(colData) // Y轴
      let chart2Count = this.handleEquipmentCountData(chartLabel, chart2YAxis, colData)
      let series = this.seriesArr(chartLabel, chart2Count)
      this.initEquipmentType(chartLabel, series, chart2YAxis)

      // 机房机柜
      this.$echarts.init(document.getElementById('histogramChart2')).clear()  //清空重画
      let colData2 = await this.handleCabinetAllCountData(data.id)// 柱状图所需所有数据
      let chartLabel2 = this.handleCabinetChartLable(colData2) // 图例
      let chart2YAxis2 = this.handleCabinetLable(colData2) // Y轴
      let chart2Count2 = this.handleCabinetCountData(chartLabel2, chart2YAxis2, colData2)
      let series2 = this.cabinetseriesArr(chartLabel2, chart2Count2)
      this.initCabinet(chartLabel2, series2, chart2YAxis2)
    },
    // 把各单位的机房总数处理为饼状图所需要的格式
    async handleMachineRoomAllCountData() {
      let list = []
      let result = []
      await getMachineRoomAllCountData().then((response) => {
        list = response.data.items
        // //console.log(this.equipmentCount)
      })
      for (let i = 0; i < list.length; i++) {
        //console.log(list[i].id)
        result.push({id: list[i].id, value: list[i].total, name: list[i].name})
      }

      return result
    },
    // 饼状图图例
    getMachineRoomEqLabData(chart01Count) {
      let lab = []
      for (let i = 0; i < chart01Count.length; i++) {
        lab.push(chart01Count[i].name)
      }
      return lab
    },
    // 获取当前单位的所有部门的各自的所有种类设备统计
    async handleCabinetAllCountData(machineRoomId) {
      let result = []
      let data
      if (machineRoomId) {
        data = {postId: machineRoomId}
      } else {
        data = {postId: 'null'}
      }
      await getCabinetAllCountData(data).then((response) => {
        result = response.data.items
      })

      return result
    },
    // 堆叠条形图图例
    handleCabinetChartLable(colData) {
      let temp = []
      for (let i = 0; i < colData.length; i++) {
        temp.push(colData[i].machineRoomId)
      }
      let result = temp.filter(function (item, index) {
        return temp.indexOf(item) === index  // 因为indexOf 只能查找到第一个
      })
      return result
    },
    // 堆叠条形图X轴设备类型
    handleCabinetLable(colData) {
      let temp = []
      for (let i = 0; i < colData.length; i++) {
        temp.push(colData[i].machineRoomName)
      }
      //console.log(temp)
      return temp
    },
    // 堆叠条形图 各部门的各设备数量 处理为二维数组
    handleCabinetCountData(chartLabel, chart2YAxis, colData) {
      let result = []
      for (let i = 0; i < chartLabel.length; i++) {
        let temp = []
        for (let j = 0; j < chart2YAxis.length; j++) {
          let k = 0
          let flag = false
          for (k = 0; k < colData.length; k++) {
            if (colData[k].machineRoomId === chartLabel[i]) {
              temp.push(colData[k].count)
              flag = true
              break
            }
          }
          if (!flag) {
            temp.push(0)
          }
        }
        result.push(temp)
      }
      return result
    },
    // 各机房机柜总量统计 堆叠条形图
    async cabinet() {
      let colData = await this.handleCabinetAllCountData()// 堆叠条形图所需所有数据
      let chartLabel = this.handleCabinetChartLable(colData) // 图例
      let chart2YAxis = this.handleCabinetLable(colData) // X轴设备类型
      let chart2Count = this.handleCabinetCountData(chartLabel, chart2YAxis, colData) // 各部门的各设备类型数据
      let series = this.cabinetseriesArr(chartLabel, chart2Count)
      this.initCabinet(chartLabel, series, chart2YAxis)

    },
    //把以上数据处理成堆叠条形图需要的series值
    cabinetseriesArr(chartLabel, chart2Count) {

      let nums = []
      for (let i = 0; i < chart2Count.length; i++) {
        nums.push(chart2Count[i][0])
      }
      let series = []
      let item = {
        name: chartLabel,
        type: 'bar',
        stack: '总量',
        itemStyle: {normal: {label: {show: true}}},
        data: nums
      }
      series.push(item)
      return series
    },
    // 超级管理员  初始化各单位设备数据量
    initEquipmentCount(chart1Count, postIndex) {
      let pieChart = this.$echarts.init(document.getElementById('pieChart1'))
      pieChart.setOption({
        color: ['#87cefa', '#ff7f50', '#32cd32', '#da70d6', '#f1adbe', '#defa2d', '#fd0329', '#6c7ffd'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}台 ({d}%)'
        },
        //calculable : false,
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
                      fontSize: '1vw'
                    }
                  }

                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true,
                  textStyle: {
                    fontSize: '1vw',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: chart1Count
          }
        ]
      })
      let index = postIndex
      pieChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: index//默认选中第一个
      })
      pieChart.off('click')
      pieChart.on('mouseover', function (e) {
        if (e.dataIndex !== index) {
          pieChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: e.dataIndex
          })
        }
      })
      pieChart.on('mouseout', function (e) {
        // index = e.dataIndex;
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        })
      })
      pieChart.on('click', (params) => {
        // //console.log(params.data)
        this.clickFunc(params.data)
        if (params.dataIndex !== index) {
          //没用选中的取消高亮
          pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index})
        }
        //选中某一条高亮
        index = params.dataIndex
        pieChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: index})
        //console.log(index);
      })

      window.addEventListener('resize', function () {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index//默认选中第一个
        })
        pieChart.resize()
      })
      let elementResizeDetectorMaker = require('element-resize-detector')
      let myChart = elementResizeDetectorMaker()

      myChart.listenTo(document.getElementById('pieChart1'), () => {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index//默认选中第一个
        })
        pieChart.resize()
      })
      //监听元素变化
    },
    // 非超级管理员  初始化各单位设备数据量
    initEquipmentCount2(chartLabel, chart1Count) {

      let pieChart = this.$echarts.init(document.getElementById('pieChart1'))

      pieChart.setOption({
        color: ['#87cefa', '#ff7f50', '#32cd32', '#da70d6', '#f1adbe', '#defa2d', '#fd0329', '#6c7ffd'],
        legend: {
          y: '235',
          x: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: '1vw'
          },
          data: chartLabel
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}<br/>{c}台 ({d}%)'
        },
        calculable: false,
        series: [
          {
            name: '设备数据量',
            type: 'pie',
            radius: ['36%', '70%'],
            // avoidLabelOverlap: false,
            center: ['50%', '45%'],

            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: 'center'
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: false,
                  textStyle: {
                    fontSize: '1vw',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: chart1Count
          }
        ]
      })
      window.addEventListener('resize', function () {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0
        })
        pieChart.resize()
      })
      let elementResizeDetectorMaker = require('element-resize-detector')
      let myChart = elementResizeDetectorMaker()

      myChart.listenTo(document.getElementById('pieChart1'), () => {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0
        })
        pieChart.resize()
      })
      //监听元素变化
    },
    //各部门设备类型柱状图
    initEquipmentType(chartLabel, series, chart2YAxis) {
      let histogramChart = this.$echarts.init(document.getElementById('histogramChart'))
      histogramChart.setOption({
        color: ['#87cefa', '#ff7f50', '#32cd32', '#da70d6', '#f1adbe', '#defa2d', '#fd0329', '#6c7ffd'],
        legend: {
          y: '235',
          x: 'center',
          // data:chartLabel,
          data: [],
          textStyle: {
            color: '#ffffff',
            fontSize: '1vw'
          }
        },

        calculable: false,
        grid: {
          left: '5%',
          right: '5%',
          bottom: '20%',
          containLabel: true
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },

        xAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                color: ['#f2f2f2'],
                width: 0,
                type: 'solid'
              }
            }

          }
        ],
        yAxis: [
          {
            type: 'category',
            data: chart2YAxis,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                width: 0,
                type: 'solid'
              }
            }
          }
        ],

        series: series
      })
      window.addEventListener('resize', function () {
        histogramChart.resize()
      })
      let elementResizeDetectorMaker = require('element-resize-detector')
      let myChart = elementResizeDetectorMaker()

      myChart.listenTo(document.getElementById('pieChart1'), () => {
        histogramChart.resize()
      })
      //监听元素变化
    },
    // 超级管理员 机房
    initEquipmentCount01(chart01Count, post01Index) {
      //   机房总量设备设备显示
      let pieChart = this.$echarts.init(document.getElementById('pieChart2'))
      pieChart.setOption({
        color: ['#87cefa', '#ff7f50', '#32cd32', '#da70d6', '#f1adbe', '#defa2d', '#fd0329', '#6c7ffd'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}个({d}%)'
        },
        // calculable : false,
        series: [
          {
            name: '机房数据量',
            type: 'pie',
            radius: ['48%', '89%'],
            avoidLabelOverlap: false,
            center: ['50%', '52%'],

            itemStyle: {
              normal: {
                label: {
                  formatter: ' {b}\n{c}个\n{d}%',
                  lineHeight: 22,
                  show: false,
                  position: 'center',
                  rich: {
                    a: {
                      fontSize: '1vw'
                    }
                  }

                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true,
                  textStyle: {
                    fontSize: '1vw',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: chart01Count
          }
        ]
      })
      let index01 = post01Index
      pieChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: index01//默认选中第一个
      })

      pieChart.off('click')
      pieChart.on('mouseover', function (e) {
        if (e.dataIndex !== index01) {
          pieChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: e.dataIndex
          })
        }
      })
      pieChart.on('mouseout', function (e) {
        // index01 = e.dataIndex;
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index01
        })
      })
      pieChart.on('click', (params) => {

        //console.log(params.data)

        // this.clickCabinetFunc(params.data);
        this.clickFunc(params.data)
        if (params.dataIndex !== index01) {
          //没用选中的取消高亮
          pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index01})
        }
        //选中某一条高亮
        index01 = params.dataIndex
        pieChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: index01})
        //console.log(index01);
      })

      window.addEventListener('resize', function () {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index01//默认选中第一个
        })
        pieChart.resize()
      })

      let elementResizeDetectorMaker = require('element-resize-detector')
      let myChart = elementResizeDetectorMaker()

      myChart.listenTo(document.getElementById('pieChart2'), () => {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index01//默认选中第一个
        })
        pieChart.resize()
      })
      //监听元素变化
    },
    // 非超级管理员 机房
    initEquipmentCount02(chartLabel1, chart01Count) {
      let pieChart = this.$echarts.init(document.getElementById('pieChart2'))
      pieChart.setOption({
        color: ['#87cefa', '#ff7f50', '#32cd32', '#da70d6', '#f1adbe', '#defa2d', '#fd0329', '#6c7ffd'],
        legend: {
          y: '235',
          x: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: '1vw'
          },
          data: chartLabel1
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}<br/>{c}个({d}%)'
        },
        calculable: false,
        series: [
          {
            name: '机房数据量',
            type: 'pie',
            radius: ['36%', '70%'],
            // avoidLabelOverlap: false,
            center: ['50%', '45%'],

            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: 'center'
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: false,
                  textStyle: {
                    fontSize: '1vw',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: chart01Count
          }
        ]
      })
      window.addEventListener('resize', function () {
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0
        })
        pieChart.resize()
      })

      let elementResizeDetectorMaker = require('element-resize-detector')
      let myChart = elementResizeDetectorMaker()

      myChart.listenTo(document.getElementById('pieChart2'), () => {
        this.$nextTick(() => {
          pieChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0
          })
          pieChart.resize()
        })
      })
      //监听元素变化
    },
    //各机房机柜总量柱状图
    initCabinet(chartLabel, series, chart2YAxis, colData) {
      let histogramChart2 = this.$echarts.init(document.getElementById('histogramChart2'))
      histogramChart2.setOption({

        color: ['#87cefa', '#ff7f50', '#32cd32', '#da70d6', '#f1adbe', '#defa2d', '#fd0329', '#6c7ffd'],

        legend: {
          y: '235',
          x: 'center',
          data: chartLabel,
          textStyle: {
            color: '#ffffff',
            fontSize: '1vw'
          }
        },

        calculable: false,
        grid: {
          left: '5%',
          right: '5%',
          bottom: '20%',
          containLabel: true
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: chart2YAxis,
            axisLabel: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                color: ['#f2f2f2'],
                width: 0,
                type: 'solid'
              }
            }

          }
        ],

        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          }
        ],

        series: series
      })
      window.addEventListener('resize', function () {
        histogramChart2.resize()
      })

      let elementResizeDetectorMaker = require('element-resize-detector')
      let myChart = elementResizeDetectorMaker()
      myChart.listenTo(document.getElementById('histogramChart2'), () => {
        this.$nextTick(() => {
          histogramChart2.resize()
        })
      })
      //监听元素变化
    },

    //地图处理
    mapInit() {
      getUnitWithExistData().then(res => {
        this.existDataUnit = res.data.items
        console.log("有数据的单位", this.existDataUnit)
        const unitEquipmentCountList = [];
        this.existDataUnit.forEach(function (element) {
          unitEquipmentCountList.push({
            name: element[0],
            value: `${element[1]}`,
          });
        });
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        echarts.registerMap('myMap', chinaJson);// 注册地图数据
        // 将GeoJSON数据转换为Echarts支持的数据格式
        let convertedData = []
        chinaJson.features.forEach(function (feature) {
          let name = feature.properties.name
          let value = feature.properties.value
          let geometry = feature.geometry
          convertedData.push({
            name: name,
            value: [geometry.coordinates[0], geometry.coordinates[1], value]
          })
        })
        let unit = []
        unitEquipmentCountList.forEach(function (element) {
          unit.push(element.name)
        })
        console.log(convertedData)
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            fontSize: 12,
            formatter: '{b}<br/>总设备数量：2020<br/>设备类型数量：54<br/>过保设备数量：0<br/>总业务系统数量(个)：0<br/> ',
          },
          geo: {
            map: 'myMap',
            roam: true,
            zoom: 1.6,
            center: [107.17822541210936, 34.534217994282535],

            itemStyle: {
              normal: {
                areaColor: 'rgb(0,255,255)',
                borderColor: '#111'
              },
              emphasis: {
                areaColor: '#ffffff' // 省份鼠标悬停时颜色
              }
            },
            label: {
              show: true, // 是否显示标签
              color: '#131712', // 标签文本颜色
              fontSize: 12, // 标签文本大小
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
                  unit.includes("中国地震局第二监测中心") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '安徽省',
                itemStyle: {
                  areaColor: unit.includes("安徽地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '江苏省',
                itemStyle: {
                  areaColor: unit.includes("江苏地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '江西省',
                itemStyle: {
                  areaColor: unit.includes("江西地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '辽宁省',
                itemStyle: {
                  areaColor: unit.includes("辽宁地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '内蒙古自治区',
                itemStyle: {
                  areaColor: unit.includes("内蒙古地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '宁夏回族自治区',
                itemStyle: {
                  areaColor: unit.includes("宁夏古地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '青海省',
                itemStyle: {
                  areaColor: unit.includes("青海地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '山西省',
                itemStyle: {
                  areaColor: unit.includes("山西地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '陕西省',
                itemStyle: {
                  areaColor: unit.includes("陕西地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '上海省',
                itemStyle: {
                  areaColor: unit.includes("上海地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '四川省',
                itemStyle: {
                  areaColor: unit.includes("四川地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '西藏自治区',
                itemStyle: {
                  areaColor: unit.includes("西藏地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '新疆维吾尔自治区',
                itemStyle: {
                  areaColor: unit.includes("新疆地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '云南省',
                itemStyle: {
                  areaColor: unit.includes("云南地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '浙江省',
                itemStyle: {
                  areaColor: unit.includes("浙江地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '重庆市',
                itemStyle: {
                  areaColor: unit.includes("重庆地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '天津市',
                itemStyle: {
                  areaColor: unit.includes("天津地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '河北省',
                itemStyle: {
                  areaColor: unit.includes("河北地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '贵州省',
                itemStyle: {
                  areaColor: unit.includes("贵州地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '台湾省',
                itemStyle: {
                  areaColor: unit.includes("台湾地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '福建省',
                itemStyle: {
                  areaColor: unit.includes("福建地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '山东省',
                itemStyle: {
                  areaColor: unit.includes("山东地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '广东省',
                itemStyle: {
                  areaColor: unit.includes("广东地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '海南省',
                itemStyle: {
                  areaColor: unit.includes("海南地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '湖北省',
                itemStyle: {
                  areaColor: unit.includes("湖北地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '甘肃省',
                itemStyle: {
                  areaColor: unit.includes("甘肃地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)'
                }
              },
              {
                name: '广西壮族自治区',
                itemStyle: {
                  areaColor: unit.includes("广西壮族自治区地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '河南省',
                itemStyle: {
                  areaColor: unit.includes("河南地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '黑龙江省',
                itemStyle: {
                  areaColor: unit.includes("黑龙江地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '湖南省',
                itemStyle: {
                  areaColor: unit.includes("湖南地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
                }
              },
              {
                name: '吉林省',
                itemStyle: {
                  areaColor: unit.includes("吉林地震局") ? 'rgba(255,196,0,0.99)' : 'rgb(0,255,255)' // 背景颜色
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
              color: '#ff0000',
              shadowBlur: 50,
              shadowColor: '#701313'
            },
            data: [
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

          }],
        });
      })
    },

    // 地图弹窗中设备类型表的数据处理
    async mapChartType(postId) {
      let eqData = await this.handleEquipmentAllCountData(postId)
      let result = []
      let lableData = this.handleEquipmentTypeLable(eqData)
      for (let i = 0; i < lableData.length; i++) {
        let count = 0
        for (let j = 0; j < eqData.length; j++) {
          if (eqData[j].equipmentTypeName === lableData[i]) {
            count += eqData[j].count
          }
        }
        result.push({value: count, name: lableData[i]})
      }
      return result
    },
  }

}
</script>

<style lang='scss' scoped>

* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;

}

.bg-main {
  //background-color: #081832;
  background: url(../../assets/dashboard_imgs/bg.png) no-repeat 0 0 / cover;
  color: white;
  text-align: center;
  //padding-top: 20px;
  min-height: calc(100vh - 50px);
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
  font-size: 2rem;
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
  height: 100%;
}

.child_count_box_icon {
  width: 15%;
  height: 90%;
  margin-left: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
  float: left;
}

.child_count_box_icon img {
  width: 80%;
  height: 80%;
}

.child_count_box_p {
  margin-top: 4%;
  margin-bottom: 4%;
  height: 96%;
  width: 80%;
  text-align: center;
  float: left;
}

.child_count_box_p p:nth-child(1) {
  font-size: calc(1vw);
  text-align: center;
}

.child_count_box_p p:nth-child(2) {
  margin-top: 2%;
  font-size: calc(2vw);
  color: #ffff43;
  text-align: center;
}

.left {
  float: left;
}

.right {
  float: right;
}

.charts_line {
  height: 100%;
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
  font-size: calc(1vw);
  left: 20%;
  line-height: 35px;
  text-align: center;
}

.chart_title img {
  height: 80%;
  position: relative;
  top: 2px;
  margin-right: 5px;
}

//图表样式
.p_chart {
  height: 90%;
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

</style>
