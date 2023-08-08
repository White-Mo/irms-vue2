<template>
  <div style="height: 100%;width: 100%;">
    <dv-border-box-13>
      <div>
        <dv-decoration-7 style="width:100%;height:50px; font-size: 15px;color:rgba(0,234,255,0.96);">各状态设备数
        </dv-decoration-7>
        <div style="height: 70%;width: 96%;">
          <el-row>
            <el-col :span="8" style="color:#bf00ff;">
              <div style="font-size: 40px;margin-bottom: 10px;">{{ useEquipmentNumber }}</div>
              <span><i class="el-icon-tickets" style="margin-right: 5px;"></i>在用设备</span>
            </el-col>
            <el-col :span="8" style="color:#e77272;">
              <div style="font-size: 40px;margin-bottom: 10px;">{{ pauseEquipmentNumber }}</div>
              <span><i class="el-icon-tickets" style="margin-right: 5px;"></i>停用设备</span>
            </el-col>
            <el-col :span="8" style="color:rgba(239,41,41,0.92);">
              <div style="font-size: 40px;margin-bottom: 10px;">{{ endEquipmentNumber }}</div>
              <span><i class="el-icon-tickets" style="margin-right: 5px;"></i>报废设备</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </dv-border-box-13>
  </div>

</template>

<script>
import {
  getEndEquipmentCount,
  getEquipmentCount,
  getPauseEquipmentCount
} from "@/api/cockpit_data";

export default {
  name: "equipmentStatus",
  data() {
    return {
      useEquipmentNumber: '',
      pauseEquipmentNumber: '',
      endEquipmentNumber: '',
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getEquipmentCount().then(res => {
        this.useEquipmentNumber = res.data.total
      })
      getPauseEquipmentCount().then(res => {
        this.pauseEquipmentNumber = res.data.total
      })
      getEndEquipmentCount().then(res => {
        this.endEquipmentNumber = res.data.total
      })
    }
  }

}
</script>

<style scoped>

</style>
