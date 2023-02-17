<template>
  <div style="height: 550px">
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col  :span="12">
        <el-label>所属单位：</el-label>
        <el-autocomplete
          class="inline-input"
          v-model="infoInput.postName"
          :fetch-suggestions="querySearchPost"
          placeholder="请输入单位"
          clearable
          @select="handlePosSelect"
        ></el-autocomplete>
      </el-col>
      <el-col  :span="12" >
        <el-label>设备编号：</el-label>
        <el-autocomplete
          class="inline-input"
          v-model="infoInput.basicInfoId"
          :fetch-suggestions="querySearchEquipmentId"
          placeholder="请输入内容"
          clearable
          @select="handleSelectEquipmentId"
        ></el-autocomplete>
      </el-col>
    </el-row>


    <div slot="footer" class="dialog-footer" style="height: 40px;text-align: center;margin-top: 20px;">
      <el-button style="width: 100px" type="primary" @click="confirm">查询</el-button>
    </div>
  </div>
</template>

<script>
import {getList, searchComprehensiveInfoByMultipleConditions} from "@/api/table";
import {getPost} from "@/api/select";


export default{
  name:'searchTemplate',
  data(){
    return{
      dialogVisible:true,
      allData:null,
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

      },
      dynamic:{  //动态字段，用于接收输入框输入后的值
        basicInfoId:'',                //设备编号
        postName:'',                   //所属单位
        departmentName:'',             //所属部门
        equipmentName:'',              //设备名
        brandName:'',                  //设备品牌
        equipmentTypeName:'',          //设备类型
        machineRoomName:'',            //安装位置
        cabinetName:'',                //机柜编号
        onlineTime:'',                 //上线时间
        offlineTime:'',                //下线时间
        hostName:'',                   //主机名
        equipmentAdminName:'',         //设备管理员
        equipmentAdminPhone:'',        //设备管理员电话
        appAdminName:'',               //应用管理员
        appAdminPhone:'',              //应用管理员电话
        brandModelName:'',             //型号
        serialNumber:'',               //序列号
        guaranteePeriod:'',            //保修期
        type:'',                       //CPU类型
        edition:'',                    //中间件版本
      },
      postAll:[],
      queryParams:{  //获取数据需要的接口参数
        dataName: ['123'],
        dataValue: '',
        dataValue2: '',
        status: "0",
        start: 0,
        limit: 10,
      },

    }
  },
  created() {
    this.getData()
    this.getPost()
    this.getSearchData() //获取多条件查询的数据
  },
  methods: {
    getData() { //获取limit条数据
      getList(this.queryParams).then((response) => {
        this.allData = response.data.items
        this.totalDataNumber = response.data.total
        console.log(this.allData)
      })
    },
    getPost() {
      getPost().then(res => {
        this.postAll = res.data.items
      })
    },
    querySearchPost(queryString, cb) {
      let postAll = this.postAll;
      let item = []
      for (let i of postAll) {
        item.push({
          "value": i["postName"],
          "id": i["postId"]
        })
      }
      let results = queryString ? item.filter(this.createFilter(queryString)) : item;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchEquipmentId(queryString, cb){},
    createFilter(queryString) {
      return (post) => {
        return (post.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handlePosSelect(item) {
      // console.log("++++++++++++++",item);
      // console.log(item.value)
      // console.log(this.dynamic)
      this.dynamic.postName = item.value
    },
    handleSelectEquipmentId(item){},

    getSearchData(){ //调接口获取多条件搜索出的结果数据
/*      const params = {
        basicInfoId:this.dynamic.basicInfoId,
        postName:this.dynamic.postName,
        departmentName:this.dynamic.departmentName,
        equipmentName:this.dynamic.equipmentName,
        brandName:this.dynamic.brandName,
        equipmentTypeName:this.dynamic.equipmentTypeName,
        machineRoomName:this.dynamic.machineRoomName,
        cabinetName:this.dynamic.cabinetName,
        onlineTime:this.dynamic.onlineTime,
        offlineTime:this.dynamic.offlineTime,
        hostName:this.dynamic.hostName,
        equipmentAdminName:this.dynamic.equipmentAdminName,
        equipmentAdminPhone:this.dynamic.equipmentAdminPhone,
        appAdminName:this.dynamic.appAdminName,
        appAdminPhone:this.dynamic.appAdminPhone,
        brandModelName:this.dynamic.brandModelName,
        serialNumber:this.dynamic.serialNumber,
        guaranteePeriod:this.dynamic.guaranteePeriod,
        type:this.dynamic.type,
        edition:this.dynamic.edition,
      }*/

      const params = { ...this.dynamic }; //获取输入框里的值传给后端，简化了上面注释的写法
      searchComprehensiveInfoByMultipleConditions(params).then(res=>{
        console.log(res)
      })
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







<!--
<el-row :gutter="20"  style="margin-bottom: 10px;">
<el-col  :span="12">
  <el-label>所属部门：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
<el-col  :span="12">
  <el-label >设备名 ：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
</el-row>
<el-row :gutter="20"  style="margin-bottom: 10px;">
<el-col  :span="12">
  <el-label>设备品牌：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
<el-col  :span="12">
  <el-label>设备类型：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
</el-row>
<el-row :gutter="20"  style="margin-bottom: 10px;">
<el-col  :span="12">
  <el-label>安装位置：</el-label>
  <el-select v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
<el-col  :span="12">
  <el-label>机柜编号：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
</el-row>
<el-row :gutter="20"  style="margin-bottom: 10px;">
<el-col  :span="12">
  <el-label>上线时间：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
<el-col  :span="12">
  <el-label>下线时间：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
</el-row>
<el-row :gutter="20"  style="margin-bottom: 10px;">
<el-col  :span="12">
  <el-label>主机名：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
<el-col  :span="12">
  <el-label>设备管理员：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
</el-row>
<el-row :gutter="20"  style="margin-bottom: 10px;">
<el-col  :span="12">
  <el-label>设备管理员电话：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
<el-col  :span="12">
  <el-label>应用管理员：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
</el-row>
<el-row :gutter="20"  style="margin-bottom: 10px;">
<el-col  :span="12">
  <el-label>应用管理员电话：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
<el-col  :span="12">
  <el-label>型号：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
</el-row>
<el-row :gutter="20"  style="margin-bottom: 10px;">
<el-col  :span="12">
  <el-label>序列号：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
<el-col  :span="12">
  <el-label>保修期：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
</el-row>
<el-row>
<el-col>
  <el-label>中间件版本：</el-label>
  <el-select  v-model="dataName">
    <el-option value="数据待定"></el-option>
  </el-select>
</el-col>
</el-row>
-->
