<template>
  <div>
    <ttable :labels="labels">
      <template #header>
        全生命周期管理
      </template>
      <template #top>
        设备报废
      </template>
    </ttable>
  </div>
</template>

<script>
import Ttable from '@/components/Infomanage/ttable'
export default {
  components: {
    Ttable
  },
  data() {
    return {
      labels:
        { 'postName': '所属单位', 'departmentName': '所属部门', 'equipmentTypeName': '设备类型', 'equipmentName': '设备名', 'brandName': '设备品牌' }
    }
  }
}
</script>

<style>

</style>
