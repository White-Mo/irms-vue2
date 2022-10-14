<template>
  <div class="shadows">
    <div class="shadows paddingLeft"><slot /></div>
    <div class="content">
      <el-button @click="addLine">新增行</el-button>
      <el-button v-show="form.length !== 1" @click="delLine">删除行</el-button>
      <div class="table">
        <el-table
          :data="form"
          border
          highlight-current-row
          stripe
        >
          <af-table-column v-for="(value,key,index) in lable" :key="index" align="center" :label="value">
            <template slot-scope="scope">
              <el-input v-model="scope.row[key]" />
            </template>
          </af-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Array,
      required: true
    },
    lable: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    addLine() {
      const obj = this.form[0]
      const newObj = {}
      for (const key in obj) {
        newObj[key] = ''
      }
      this.form.push(newObj)
    },
    delLine() {
      this.form.pop()
    }
  }
}
</script>

<style scoped>
.shadows{
  box-shadow: 0 0 4px #0000004d !important;
  margin-top: 35px;
}
.paddingLeft{
    padding-left: 10px;
}
.label-style{
    text-align: center;
    border-right: 1px solid #c7c3c3b8;
    border-top: 1px solid #c7c3c3b8;
}
.content{
  padding: 10px;
}
.table{
  border: 1px solid #c7c3c3b8;
  margin-top: 10px;
}
</style>
