<template>
  <div class="infobody">
    <div class="grid-content bg-purple">
      <i class="el-icon-s-order" /><span>系统信息管理</span>
    </div>
    <div class="app-container">
      <div class="table_end">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">用户信息管理</div>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="bg-condition">
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <span>查询条件：</span>
          </el-col>
          <!-- <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
            <el-select
              v-model="DataName"
              placeholder="详细字段查询"
              multiple
              size="medium"
            >
              <el-option
                v-for="(item, index) in dataname"
                :key="index"
                :label="item.label"
                :value="item.value"
                class="searchInput"
              />
            </el-select>
          </el-col> -->
          <!-- <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-input size="medium" v-model="inputValue" placeholder="输入查询内容" clearable />
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="medium"
              clearable="true"
              @click="fetchData()"
            >搜索</el-button>
          </el-col> -->
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getQComSelect } from '@/api/table'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'realname',
      'roles'
    ])
  },
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.realname)
    for (let i of ['getRealnameAll','getPostAll','getFosGroupAll']){
      getQComSelect(i).then(res => {
      console.log(res)
    })
    }
  },
  destroyed() {
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}
.app-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-condition {
  line-height: 50px;
  text-align: center;
  height: 54px;
  margin: 0px !important;
  background: #d3dce6;
}
</style>
