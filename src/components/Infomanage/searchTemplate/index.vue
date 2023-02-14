<template>
  <div style="height: 550px">
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col  :span="12" >
        <el-label>设备编号：</el-label>
        <el-select  v-model="dataName">
          <el-option value="数据待定"></el-option>
        </el-select>
      </el-col>
      <el-col  :span="12">
        <el-label>所属单位：</el-label>
        <el-select  v-model="dataName">
          <el-option value="数据待定"></el-option>
        </el-select>
      </el-col>
    </el-row>
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

    <div slot="footer" class="dialog-footer" style="height: 40px;text-align: center;margin-top: 20px;">
      <el-button style="width: 100px" type="primary" @click="confirm">查询</el-button>
    </div>
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
el-label{
  //style="display: inline-block; line-height: 40px; width: 150px;text-align:right;"
  display: inline-block;
  line-height: 40px;
  width: 150px;
  text-align: right;
}
</style>
