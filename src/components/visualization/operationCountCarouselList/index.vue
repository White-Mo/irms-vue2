<template>
  <div style="height: 100%; width: 100%;">
    <dv-border-box-13>
      <div>
        <dv-decoration-7 style="width:100%;height:50px; font-size: 18px;color:rgba(0,234,255,0.96);">{{title}}</dv-decoration-7>
        <div style="height: 100%;width: 100%; display: flex; justify-content: center; align-items: center;">
          <dv-scroll-board
            :config="config"
            style="height: 33vh;width: 90%;color:rgba(0,216,255,0.98);"
          />
        </div>
      </div>
    </dv-border-box-13>
  </div>
</template>


<script>
import {getUnitRoleOrDepartmentRoleOperationCountByCurrenDayDate} from "@/api/log_management";
import moment from "moment";
import {getDepartment, getPost} from "@/api/select";
import {mapGetters} from "vuex";

export default {
  data(){
    return{
      title: '',
      config: {},
      listData:[],
      postAllName:[],
      unitRoleOrDepartmentRoleOperationCount:[]
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
    async handleUnitRoleOrDepartmentRoleOperationCountData() {
      let list = []
      let result = []
      let currenDayDate = moment(new Date()).format('YYYY-MM-DD')
      await getUnitRoleOrDepartmentRoleOperationCountByCurrenDayDate(currenDayDate).then((response) => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        result.push({name: list[i][0], value: list[i][1]})
      }
      return result
    },
    async initDataByCurrentRole(){
      if (this.roles[0] === '超级管理员') {
        this.title = '当天各单位系统使用次数'
        // 获取所有单位名字
        this.postAllName = await this.handelPostCountData()
        // 获取各单位系统使用频度
        this.unitRoleOrDepartmentRoleOperationCount = await this.handleUnitRoleOrDepartmentRoleOperationCountData()

        // 根据已知数据构建listData数组
        this.listData = this.postAllName.map(post => {
          // 查找对应单位系统操作次数
          const unitRoleOperationCountObj = this.unitRoleOrDepartmentRoleOperationCount.find(item => item.name === post.postName)
          // 获取系统操作次数，如果找不到对应项，默认为0
          const unitRoleOperationCount = unitRoleOperationCountObj ? unitRoleOperationCountObj.value : 0
          // 返回组合的对象
          return {
            postName: post.postName,
            unitRoleOperationCount: unitRoleOperationCount,
          };
        });
        // 对listData 按unitRoleOperationCount的值降序排序
        this.listData.sort((a, b) => b.unitRoleOperationCount - a.unitRoleOperationCount);


        this.config = {data:this.listData.map(item => [item.postName, item.unitRoleOperationCount]),
          header: ['单位名称', '系统使用频度', ],
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
        this.title = '当天各部门系统使用次数'
        // 获取所有部门名字
        this.departmentAllName = await this.handleDepartmentCountData()
        // 获取各部门当天系统使用频度
        this.unitRoleOrDepartmentRoleOperationCount = await this.handleUnitRoleOrDepartmentRoleOperationCountData()
        // 根据已知数据构建listData数组
        this.listData = this.departmentAllName.map(department => {
          // 查找对应部门的系统操作次数
          const departmentRoleOperationCountObj = this.unitRoleOrDepartmentRoleOperationCount.find(item => item.name === department.departmentName)

          // 获取设备总数和机房总数，如果找不到对应项，默认为0
          const departmentRoleOperationCount = departmentRoleOperationCountObj ? departmentRoleOperationCountObj.value : 0

          return {
            departmentName: department.departmentName,
            departmentRoleOperationCount: departmentRoleOperationCount,
          };
        });
        this.config = {data:this.listData.map(item => [item.departmentName, item.departmentRoleOperationCount]),
          header: ['部门名称', '系统使用频度'],
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

<style scoped>
.dv-border-box-13 {
  overflow: hidden;
}
</style>
