<template>
  <div style="height: 100%;width: 100%;">
    <dv-border-box-13>
      <div>
        <dv-decoration-7 style="width:100%;height:50px; font-size: 15px;color:rgba(0,234,255,0.96);">设备总览</dv-decoration-7>
        <div style="height: 70%;width: 96%;">
          <el-row>
            <el-col :span="8" style="color:#00ffd9;">
              <div style="font-size: 40px;margin-bottom: 10px;">{{equipmentTypeCount}}</div>
              <span><i class="el-icon-tickets" style="margin-right: 5px;"></i>设备类型</span>
            </el-col>
            <el-col :span="8" style="color:#00c4ff;">
              <div style="font-size: 40px;margin-bottom: 10px;">{{businessSystemCount}}</div>
              <span><i class="el-icon-tickets" style="margin-right: 5px;"></i>业务系统</span>
            </el-col>
            <el-col :span="8" style="color:#b7ff00;">
              <div style="font-size: 40px;margin-bottom: 10px;">{{overGuaranteePeriodEquipmentCount}}</div>
              <span><i class="el-icon-tickets" style="margin-right: 5px;"></i>过保设备</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </dv-border-box-13>
  </div>

</template>

<script>
import {getBusinessSystemCount, getEquipmentTypeCount, getOverGuaranteePeriodCount} from "@/api/cockpit_data";

export default {
  name: "anlageuebersicht",
  data(){
    return{
      equipmentTypeCount:'',
      businessSystemCount:'',
      overGuaranteePeriodEquipmentCount:'',
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData(){
      getEquipmentTypeCount().then(res=>{
        console.log("设备类型：",res)
        this.equipmentTypeCount = res.data
      })
      getBusinessSystemCount().then(res=>{
        this.businessSystemCount = res.data
      })
      getOverGuaranteePeriodCount().then(res=>{
        this.overGuaranteePeriodEquipmentCount = res
      })
    }
  }

}
</script>

<style scoped>

</style>
