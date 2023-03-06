<template>
  <div style="height: auto">
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col  :span="12">
        <el-label>所属单位：</el-label>
        <!--        多条件展示-->
        <!--        popper-append-to-body = false   跳出body元素-->
        <el-select
          placeholder="详细字段查询"
          multiple
          v-model="DataName"
          size="medium"
          :popper-append-to-body ="false"
        >
          <el-option
            v-for="(item,index) in dataname_option"
            :key="index"
            :label="item.label"
            :value="item.value"
            class="searchInput"
            :title="item.label"
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
          value: '中国地震局第一监测中心',
          label: '中国地震局第一监测中心',
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
          value: '中国地震局第二监测中心',
          label: '中国地震局第二监测中心',
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
      params.postName = this.DataName
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
.el-select-dropdown__item {
  height: 30px;
  flex: 1 0 18%;
  margin: 10px;
}
/deep/.el-select-dropdown__list {
  margin: 5px 20px 20px 5px;
  height: auto;
  width: 950px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: stretch;
  max-height: 100vh;
}
el-label{
  display: inline-block;
  line-height: 40px;
  width: 150px;
  text-align: right;
}
.searchInput {
  text-align: center;
  color: #0b0c10;
  background-color: #deecff;
}
</style>





