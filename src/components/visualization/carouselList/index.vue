<template>
  <div style="height: 100%; width: 100%;">
    <dv-border-box-13>
      <div>
        <dv-decoration-7 style="width:100%;height:50px; font-size: 15px;color:rgba(0,234,255,0.96);">{{title}}</dv-decoration-7>
        <div style="height: 100%;width: 100%; display: flex; justify-content: center; align-items: center;">
          <dv-scroll-board
            :config="config"
            style="height: 33vh;width: 90%;color:rgba(0,216,255,0.98);"
          />
          <!--          width: 26vw;-->
        </div>
      </div>
    </dv-border-box-13>
  </div>
</template>

<script>
import {getDepartment, getPost} from "@/api/select";
import {getDepartmentAllCountData, getMachineRoomAllCountData} from "@/api/dashboard";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      departmentAllName:[],
      listData:[],
      postAllName:[],
      equipmentAllName:[],
      machineRoomAllName:[],
      title: '',
      config: {}
    }
  },
  computed: {
    ...mapGetters([
      'roleid',
      'role_department_id',
      'role_name',
      'roles'
    ])
  },
  mounted() {
    this.initDataByCurrentRole()
  },
  methods:{
    //处理单位名字
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
    async handleDepartmentCountData(){
      let list = []
      let result = []
      await getDepartment(this.roleid).then(response => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        result.push({departmentName: list[i].departmentName})
      }
      return result
    },
    async handlePostOrDepartmentAllCountData() {
      let list = []
      let result = []
      await getDepartmentAllCountData().then((response) => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        result.push({name: list[i].name, value: list[i].total})
      }
      return result
    },
    async handleMachineRoomAllCountData() {
      let list = []
      let result = []
      await getMachineRoomAllCountData().then((response) => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        result.push({name: list[i].name, value: list[i].total})
      }
      return result
    },
    async initDataByCurrentRole(){
      if (this.roles[0] === '超级管理员') {
        this.title = '各单位设备 / 机房数'
        // 获取所有单位名字
        this.postAllName = await this.handelPostCountData()
        // 获取各单位设备总数
        this.equipmentAllName = await this.handlePostOrDepartmentAllCountData()
        // 获取各单位机房总数
        this.machineRoomAllName = await this.handleMachineRoomAllCountData()
        // 根据已知数据构建listData数组
        this.listData = this.postAllName.map(post => {
          // 查找对应单位设备总数
          const equipmentCountObj = this.equipmentAllName.find(item => item.name === post.postName)
          // 查找对应单位机房总数
          const machineRoomCountObj = this.machineRoomAllName.find(item => item.name === post.postName)

          // 获取设备总数和机房总数，如果找不到对应项，默认为0
          const equipmentCount = equipmentCountObj ? equipmentCountObj.value : 0
          const machineRoomCount = machineRoomCountObj ? machineRoomCountObj.value : 0
          // 返回组合的对象
          return {
            postName: post.postName,
            equipmentCount: equipmentCount,
            machineRoomCount: machineRoomCount
          };
        });
        //按equipmentCount降序排序
        this.listData.sort((a, b) => {return b.equipmentCount - a.equipmentCount;});
        this.config = {data:this.listData.map(item => [item.postName, item.equipmentCount, item.machineRoomCount]),
          header: ['单位名称', '设备总数', '机房总数'],
          align: 'center',
          headerHeight:35,
          rowNum:8,
          columnWidth: [200],
          waitTime:2000,
          headerBGC: 'rgba(25,255,220,0.15)',
          oddRowBGC: 'rgba(0,216,255,0.3)',
          evenRowBGC: 'rgba(0,216,255,0.22)',
          scrollable: true}
      }else {
        this.title = '各部门设备数'
        // 获取所有部门名字
        this.departmentAllName = await this.handleDepartmentCountData()
        // 获取各部门设备总数
        this.equipmentAllName = await this.handlePostOrDepartmentAllCountData()
        // 获取各部门机房总数
        // this.machineRoomAllName = await this.handleMachineRoomAllCountData()
        // 根据已知数据构建listData数组
        this.listData = this.departmentAllName.map(department => {
          // 查找对应单位设备总数
          const equipmentCountObj = this.equipmentAllName.find(item => item.name === department.departmentName)
          // 查找对应单位机房总数
          // const machineRoomCountObj = this.machineRoomAllName.find(item => item.name === department.departmentName)

          // 获取设备总数和机房总数，如果找不到对应项，默认为0
          const equipmentCount = equipmentCountObj ? equipmentCountObj.value : 0
          // const machineRoomCount = machineRoomCountObj ? machineRoomCountObj.value : 0
          // 返回组合的对象
          return {
            departmentName: department.departmentName,
            equipmentCount: equipmentCount,
            // machineRoomCount: machineRoomCount
          };
        });
        console.log("9999999999999999999",this.listData)
        this.config = {data:this.listData.map(item => [item.departmentName, item.equipmentCount]),
          header: ['部门名称', '设备总数'],
          align: 'center',
          headerHeight:35,
          rowNum:8,
          columnWidth: [200],
          waitTime:2000,
          headerBGC: 'rgba(25,255,220,0.15)',
          oddRowBGC: 'rgba(0,216,255,0.3)',
          evenRowBGC: 'rgba(0,216,255,0.22)',
          scrollable: true}
      }
    }
  }
}
</script>
<style scoped></style>
