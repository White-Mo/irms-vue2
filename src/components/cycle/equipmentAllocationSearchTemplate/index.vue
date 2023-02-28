<template>
  <div style="height: 200px">
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col  :span="12">
        <el-label>所属单位：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.postName"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'postName')})"
          placeholder="请输入单位"
          clearable
          @select="handleSelect('postName',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.postName }}</div>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col  :span="12" >
        <el-label>设备编号：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.basicInfoId"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'basicInfoId')})"
          placeholder="请输入编号"
          clearable
          @select="handleSelect('basicInfoId',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.basicInfoId }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col  :span="12">
        <el-label>所属部门：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.departmentName"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'departmentName')})"
          placeholder="请输入部门"
          clearable
          @select="handleSelect('departmentName',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.departmentName }}</div>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col  :span="12" >
        <el-label>设备名称：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.equipmentName"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'equipmentName')})"
          placeholder="请输入设备名"
          clearable
          @select="handleSelect('equipmentName',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.equipmentName }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col  :span="24">
        <el-label>主机名：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.hostName"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'hostName')})"
          placeholder="请输入主机名"
          clearable
          @select="handleSelect('hostName',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.hostName }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>

    <div slot="footer" class="dialog-footer" style="height: 40px;text-align: center;margin-top: 40px;">
      <el-button style="width: 100px" type="primary" @click="confirmSearch">查询</el-button>
    </div>
  </div>
</template>

<script>
import {searchComprehensiveInfoByMultipleConditions} from "@/api/table";


export default{
  name:'equipmentAllocationSearchTemplate',
  props:["limit"],
  data(){
    return{
      dialogVisible:true,
      totalDataNumber:0,
      infoInput:{ //定义输入框里的字段
        basicInfoId:'',
        postName:'',
        departmentName:'',
        equipmentName:'',
        brandName:'',
        equipmentTypeName:'',
        machineRoomName:'',
        cabinetName:'',
        onlineTime:'',
        offlineTime:'',
        hostName:'',
        equipmentAdminName:'',
        equipmentAdminPhone:'',
        appAdminName:'',
        appAdminPhone:'',
        brandModelName:'',
        serialNumber:'',
        guaranteePeriod:'',
        type:'',
        edition:'',
        mark:'',
        start: 0,
        limit: 10,
        status: "0",
      },
      selectInput:{},
      start:0,
      backDataAll:[],
      timeout:null,

    }
  },
  created() {
    this.infoInput.start=this.start;
    this.infoInput.limit=this.limit;
  },
  methods: {
    async querySearch(queryString, cb , mark) {
      this.infoInput.mark=mark
      const selectInput=JSON.parse(JSON.stringify(this.infoInput));
      selectInput.start=0
      selectInput.limit=9999
      await this.getSearchData(selectInput) //获取多条件查询的数据
      let dataAll = this.backDataAll.items;
      let results = queryString ? dataAll.filter(this.createFilter(queryString,mark)) : dataAll;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 30 * Math.random());
    },
    createFilter(queryString,mark) {
      return (data) => {
        return (data[mark].toLowerCase().match(queryString.toLowerCase()));
      };
    },
    handleSelect(mark,item) {
      this.infoInput[mark] = item[mark].trim();
    },
    async getSearchData(data){ //调接口获取多条件搜索出的结果数据
      const params={ ...data }
      await searchComprehensiveInfoByMultipleConditions(params).then(res=>{
        res.data.items.forEach(element => {
          element.isEdit = false;
        });
        this.backDataAll = [];
        this.backDataAll = res.data
        console.log(res.data.items)
      })
    },
    async confirmSearch(){
      this.infoInput.start=this.start
      this.infoInput.limit=15
      this.infoInput.mark = '';
      const params={ ...this.infoInput}
      // console.log(params)
      await this.getSearchData(params)

      let searchAllData = this.backDataAll;
      this.$emit('changList', searchAllData,params);
      for (const key in this.infoInput) {  //每次点击查询后清空输入框里的值
        if (Object.hasOwnProperty.call(this.infoInput, key)) {
          this.infoInput[key] = '';
        }
      }
      this.dialogVisible = false
    }
  }

}
</script>

<style lang="less">
el-label{
  display: inline-block;
  line-height: 40px;
  width: 150px;
  text-align: right;
}
</style>






