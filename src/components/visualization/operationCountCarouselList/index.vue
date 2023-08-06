<template>
  <div style="height: 100%;width: 100%;">
    <dv-border-box-13>
      <div>
        <dv-decoration-7 style="width:100%;height:40px; font-size: 15px;color:rgba(0,234,255,0.96);">设备总览</dv-decoration-7>
        <div style="height: 70%;">
        </div>
      </div>
    </dv-border-box-13>
  </div>

</template>

<script>
import {getUnitRoleOrDepartmentRoleOperationCountByCurrenDayDate} from "@/api/log_management";
import moment from "moment";

export default {
  data(){
    return{
      unitRoleOrDepartmentRoleOperationCount:[]
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      let currenDayDate = moment(new Date()).format('YYYY-MM-DD')
      console.log("currenDayDate",currenDayDate)
      this.unitRoleOrDepartmentRoleOperationCount = await getUnitRoleOrDepartmentRoleOperationCountByCurrenDayDate(currenDayDate)
      console.log("66666666666555555555555555",this.unitRoleOrDepartmentRoleOperationCount)
    }
  }

}
</script>

<style scoped>

</style>
