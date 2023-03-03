<template>
  <div style="height: auto">
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col  :span="12">
        <el-label>所属单位：</el-label>
<!--        多条件展示-->
        <el-select
          placeholder="详细字段查询"
          multiple
          v-model="DataName"
          size="medium"
          class="four-column-select"
        >
          <el-option
            v-for="(item,index) in dataname_option"
            :key="index"
            :label="item.label"
            :value="item.value"
            class="searchInput"
          />
        </el-select>


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
        <el-label>设备名：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model.trim="infoInput.equipmentName"
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
      <el-col  :span="12">
        <el-label>设备品牌：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.brandName"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'brandName')})"
          placeholder="请输入设备品牌"
          clearable
          @select="handleSelect('brandName',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.brandName }}</div>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col  :span="12" >
        <el-label>设备类型：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.equipmentTypeName"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'equipmentTypeName')})"
          placeholder="请输入设备类型"
          clearable
          @select="handleSelect('equipmentTypeName',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.equipmentTypeName }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col  :span="12">
        <el-label>安装位置：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.machineRoomName"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'machineRoomName')})"
          placeholder="请输入安装位置"
          clearable
          @select="handleSelect('machineRoomName',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.machineRoomName }}</div>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col  :span="12" >
        <el-label>机柜编号：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.cabinetName"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'cabinetName')})"
          placeholder="请输入机柜编号"
          clearable
          @select="handleSelect('cabinetName',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.cabinetName }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col  :span="12">
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
      <el-col  :span="12" >
        <el-label>设备管理员：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.equipmentAdminName"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'equipmentAdminName')})"
          placeholder="请输入设备管理员"
          clearable
          @select="handleSelect('equipmentAdminName',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.equipmentAdminName }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col  :span="12">
        <el-label>设备管理员电话：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.equipmentAdminPhone"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'equipmentAdminPhone')})"
          placeholder="请输入设备管理员电话"
          clearable
          @select="handleSelect('equipmentAdminPhone',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.equipmentAdminPhone }}</div>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col  :span="12" >
        <el-label>应用管理员：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.appAdminName"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'appAdminName')})"
          placeholder="请输入应用管理员"
          clearable
          @select="handleSelect('appAdminName',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.appAdminName }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col  :span="12">
        <el-label>应用管理员电话：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.appAdminPhone"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'appAdminPhone')})"
          placeholder="请输入应用管理员电话"
          clearable
          @select="handleSelect('appAdminPhone',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.appAdminPhone }}</div>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col  :span="12" >
        <el-label>型号：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.brandModelName"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'brandModelName')})"
          placeholder="请输入型号"
          clearable
          @select="handleSelect('brandModelName',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.brandModelName }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col  :span="12">
        <el-label>序列号：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.serialNumber"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'serialNumber')})"
          placeholder="请输入序列号"
          clearable
          @select="handleSelect('serialNumber',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.serialNumber }}</div>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col  :span="12" >
        <el-label>保修期：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.guaranteePeriod"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'guaranteePeriod')})"
          placeholder="请输入保修期"
          clearable
          @select="handleSelect('guaranteePeriod',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.guaranteePeriod }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col  :span="12">
        <el-label>CPU类型：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.type"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'type')})"
          placeholder="请输入CPU类型"
          clearable
          @select="handleSelect('type',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.type }}</div>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col  :span="12" >
        <el-label>中间件版本：</el-label>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="infoInput.edition"
          :fetch-suggestions="((queryString,cb)=>{querySearch(queryString,cb,'edition')})"
          placeholder="请输入中间件版本"
          clearable
          @select="handleSelect('edition',$event)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.edition }}</div>
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
import { getPost } from "@/api/select";


export default{
  name:'searchTemplate',
  props:["limit"],
  data(){
    return{
      DataName: 'all',
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
      // 筛选——多单位
      dataname_option: [
        {
          value: '北京地震局',
          label: '北京地震局',
        },
        {
          value: '天津地震局',
          label: '天津地震局',
        },
        {
          value: '河北地震局',
          label: '河北地震局',
        },
        {
          value: '中国地震台网中心',
          label: '中国地震台网中心',
        },
        {
          value: '山西地震局',
          label: '山西地震局',
        },
        {
          value: '内蒙古地震局',
          label: '内蒙古地震局',
        },
        {
          value: '辽宁地震局',
          label: '辽宁地震局',
        },
        {
          value: '中国地震灾害防御中心',
          label: '中国地震灾害防御中心',
        },
        {
          value: '吉林地震局',
          label: '吉林地震局',
        },
        {
          value: '黑龙江地震局',
          label: '黑龙江地震局',
        },
        {
          value: '上海地震局',
          label: '上海地震局',
        },
        {
          value: '中国地震局发展研究中心',
          label: '中国地震局发展研究中心',
        },
        {
          value: '江苏地震局',
          label: '江苏地震局',
        },
        {
          value: '浙江地震局',
          label: '浙江地震局',
        },

        {
          value: '安徽地震局',
          label: '安徽地震局',
        },{
          value: '中国地震局地球物理勘探中心',
          label: '中国地震局地球物理勘探中心',
        },
        {
          value: '福建地震局',
          label: '福建地震局',
        },
        {
          value: '江西地震局',
          label: '江西地震局',
        },
        {
          value: '山东地震局',
          label: '山东地震局',
        },
        {
          value: '中国地震局第一检测中心',
          label: '中国地震局第一检测中心',
        },
        {
          value: '河南地震局',
          label: '河南地震局',
        },
        {
          value: '湖北地震局',
          label: '湖北地震局',
        },
        {
          value: '湖南地震局',
          label: '湖南地震局',
        },
        {
          value: '中国地震局第二检测中心',
          label: '中国地震局第二检测中心',
        },
        {
          value: '广东地震局',
          label: '广东地震局',
        },
        {
          value: '广西地震局',
          label: '广西地震局',
        },
        {
          value: '海南地震局',
          label: '海南地震局',
        },
        {
          value: '中国地震局地球物理研究所',
          label: '中国地震局地球物理研究所',
        },
        {
          value: '重庆地震局',
          label: '重庆地震局',
        },
        {
          value: '四川地震局',
          label: '四川地震局',
        },
        {
          value: '贵州地震局',
          label: '贵州地震局',
        },
        {
          value: '中国地震局地质研究所',
          label: '中国地震局地质研究所',
        },
        {
          value: '云南地震局',
          label: '云南地震局',
        },
        {
          value: '西藏地震局',
          label: '西藏地震局',
        },
        {
          value: '陕西地震局',
          label: '陕西地震局',
        },
        {
          value: '中国地震局地震预测研究所',
          label: '中国地震局地震预测研究所',
        },
        {
          value: '甘肃地震局',
          label: '甘肃地震局',
        },
        {
          value: '青海地震局',
          label: '青海地震局',
        },
        {
          value: '宁夏地震局',
          label: '宁夏地震局',
        },
        {
          value: '中国地震局工程力学研究所',
          label: '中国地震局工程力学研究所',
        },
        {
          value: '新疆地震局',
          label: '新疆地震局',
        },
        {
          value: '防灾科技学院',
          label: '防灾科技学院',
        }
      ]
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
      console.log(params)
      params.postName = this.DataName
      params.status='0'
      // params.postName = (params.postName).replace(/\[\]/g, '\\"\\"')
      // console.log(this.DataName)
      await searchComprehensiveInfoByMultipleConditions(params).then(res=>{
        this.backDataAll = [];
        this.backDataAll = res.data
        console.log(res.data.items)
      })
    },
    async confirmSearch(){
      this.infoInput.start=this.start
      this.infoInput.limit=this.limit
      this.infoInput.mark = '';
      const params={ ...this.infoInput}
      const postNameReturn=this.DataName
      // console.log(params)
      await this.getSearchData(params)
      let searchAllData = this.backDataAll;
      this.$emit('changList', searchAllData,params,postNameReturn);
      this.DataName=[];
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


<style lang="less" scoped>
el-label{
  display: inline-block;
  line-height: 40px;
  width: 200px;
  text-align: right;
}
.searchInput {
  width: 100px;
  text-align: center;
  color: #0b0c10;
  background-color: #deecff;
}
.el-select-dropdown__list{
  width: 950px;
}
.el-select-dropdown__item {
  height: 30px;
  flex: 1 0 18%;
  margin: 10px;
}

//.el-select-dropdown__list {
//  margin: 5px 20px 20px 5px;
//  height: auto;
//  width: 950px;
//  display: flex;
//  justify-content: space-between;
//  flex-direction: row;
//  flex-wrap: wrap;
//  align-content: flex-start;
//  align-items: stretch;
//  max-height: 100vh;
//}
</style>






