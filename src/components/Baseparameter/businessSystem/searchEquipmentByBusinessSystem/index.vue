<template>
  <div >
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span style="color: #ffffff">设备管理</span>
        </div>
      </el-col>
    </el-row>
    <el-row
      :gutter="10"
      class="bg-condition"
    >
      <el-col
        :xs="2"
        :sm="2"
        :md="2"
        :lg="2"
        :xl="2"
      >
        <span>查询条件：</span>
      </el-col>
      <el-col
        :xs="3"
        :sm="3"
        :md="3"
        :lg="3"
        :xl="3"
      >
        <el-select
          v-model="dataName"
          placeholder="详细字段查询"
          multiple
          size="medium"
        >
          <el-option
            v-for="(item,index) in basicValue"
            :key="index"
            :label="item.label"
            :value="item.value"
            class="searchInput"
          />
        </el-select>
      </el-col>
      <el-col
        :xs="3"
        :sm="3"
        :md="3"
        :lg="3"
        :xl="3"
      >
        <el-input
          v-model="inputValue"
          placeholder="输入查询内容"
          clearable
          size="medium"
        />
      </el-col>
      <el-col
        :xs="2"
        :sm="2"
        :md="2"
        :lg="2"
        :xl="2"
      >
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-search"
          clearable="true"
          @click="fetchData()"
        >搜索</el-button>
        <el-col
          :xs="2"
          :sm="2"
          :md="2"
          :lg="2"
          :xl="2">
          <el-button
            size="medium"
            type="primary"
            style="margin-left: 130px"
            @click="Refresh()"
          >返回业务系统首页</el-button>
        </el-col>
      </el-col>
    </el-row>
    <div style="height: 76.5vh; background-color: #5db2ff; line-height: 76.5vh; text-align: center; font-size: 80px" >
      我是通过业务系统查找设备页面</div>
<!--    <el-table-->
<!--      height="76.5vh"-->
<!--      :row-style="{height:'6.26vh'}"-->
<!--      :cell-style="{padding:'0px'}"-->
<!--      v-loading="listLoading"-->
<!--      :disable="true"-->
<!--      :data="list"-->
<!--      element-loading-text="Loading"-->
<!--      border-->
<!--      highlight-current-row-->
<!--      stripe-->
<!--    >-->
<!--      <el-table-column align="center" type="index" />-->
<!--    </el-table>-->
  </div>
</template>

<script>
import {getEquipmentByBusinessSystemId} from "@/api/baseparameter";
export default {
  name:'searchEquipmentByBusinessSystem',
  props:['tempBusinessSystemNameId'],
  data(){
    return{
      // listLoading: true,
      list:null,

    }
  },
  mounted() {
    const tempBusinessSystemNameId = this.tempBusinessSystemNameId
    getEquipmentByBusinessSystemId(tempBusinessSystemNameId).then(res=>{
      this.list = res.data.items
      console.log(res)
    })
  },
  methods:{
    //--------------刷新功能开始---------------------
    Refresh(){
      location.reload();
    },
    //--------------刷新功能结束---------------------

  }
}

</script>



<style lang="less" scoped>
*{
  font-size: 18px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple-dark {
  background: #304156;
}
.bg-condition {
  line-height: 50px;
  text-align: center;
  height: 54px;
  margin: 0px !important;
  background: #d3dce6;
}
.grid-content {
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}
</style>








