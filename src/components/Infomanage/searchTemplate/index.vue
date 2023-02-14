<template>
  <div style="height: 400px">
    <el-row >
      <el-col>
        <el-label>设备编号：</el-label>
        <el-select value="请选择设备编号">
          <el-option value="数据待定"></el-option>
        </el-select>
      </el-col>
      <el-col>
        <el-label>设备编号：</el-label>
        <el-select value="请选择设备编号">
          <el-option value="数据待定"></el-option>
        </el-select>
      </el-col>
    </el-row>
<!--    <div slot="footer" class="dialog-footer" style="height: 400px">-->
<!--      <el-button @click="dialogVisible = false">取消</el-button>-->
<!--      <el-button type="primary" @click="confirm">确定</el-button>-->
<!--    </div>-->
  </div>
</template>

<script>
export default{
  name:'searchTemplate',
  data(){
    return{
      dialogVisible:true
    }
  }

}
</script>

<style lang="less">

</style>
