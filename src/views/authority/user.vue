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
            <span>
              <h3 style="margin-top:0.1rem">
                查询条件
              </h3>
            </span>
          </el-col>
          <el-col :span="4">
            用户姓名
            <el-autocomplete
              class="inline-input"
              v-model="user_input.state1"
              :fetch-suggestions="querySearchName"
              placeholder="请输入姓名"
              @select="handleSelect"
              style="width: 10rem;"
            ></el-autocomplete>
          </el-col>
          <el-col :span="4">
            登录帐号
            <el-input v-model="user_input.state2" placeholder="请输入帐号" style="width: 10rem;"></el-input>
          </el-col>
          <el-col :span="3">
            单位
            <el-autocomplete
              class="inline-input"
              v-model="user_input.state3"
              :fetch-suggestions="querySearchPost"
              placeholder="请输入单位"
              @select="handleSelect"
              style="width: 8rem;"
            ></el-autocomplete>
          </el-col>
          <el-col :span="3">
            角色
            <el-autocomplete
              class="inline-input"
              v-model="user_input.state4"
              :fetch-suggestions="querySearchFosGroup"
              placeholder="请输入角色"
              @select="handleSelect"
              style="width: 8rem;"
            ></el-autocomplete>
          </el-col>
          <el-col :span="3">
            状态
            <el-autocomplete
              class="inline-input"
              v-model="user_input.state5"
              :fetch-suggestions="querySearchState"
              placeholder="请输入状态"
              @select="handleSelect"
              style="width: 8rem;"
            ></el-autocomplete>
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" >
            <el-button
              size="medium"
              type="primary"
              icon="el-icon-search"
              clearable="true"
            >搜索</el-button>
          </el-col>
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
      user_input:{
        state1:"",
        state2:"",
        state3:"",
        state4:"",
        state5:"",
      },
      RealnameAll:[],
      PostAll:[],
      FosGroupAll:[],
      stateAll:[
        {"id":"000",'value':"全部"},
        {"id":"001",'value':"冻结"},
        {"id":"002",'value':"激活"}
      ],

    }
  },
  mounted() {
    console.log(this.realname)
    for (let i of ['getRealnameAll','getPostAll','getFosGroupAll']){
      getQComSelect(i).then(res => {
        if(i == 'getRealnameAll'){
          this.RealnameAll = [{"id":"000",'realname':"全部"}].concat(res)
        }else if(i == 'getPostAll'){
          this.PostAll = [{"id":"000",'postName':"全部"}].concat(res)
        }else{
          this.FosGroupAll = [{"id":"000",'name':"全部"}].concat(res)
        }
    })
    }
  },
  destroyed() {
  },
  methods: {
    querySearchName(queryString, cb){
      return this.querySearch(this.RealnameAll,0,queryString,cb)
    },
    querySearchPost(queryString, cb){
      return this.querySearch(this.PostAll ,1,queryString,cb)
    },
    querySearchFosGroup(queryString, cb){
      return this.querySearch(this.FosGroupAll ,2,queryString,cb)
    },
    querySearchState(queryString, cb){
      return this.querySearch(this.stateAll ,3,queryString,cb)
    },
    querySearch(restaurants,type,queryString, cb) {
      var results = queryString ? restaurants.filter(this.createFilter(queryString,type)) : restaurants;
      // 调用 callback 返回建议列表的数据
      let item = []
      for(let i of results){
        item.push({"id":i['id'],"value":i[type == 0?'realname':type == 1?"postName":type == 2?"name":"value"]})
      }
      cb(item);
    },
    createFilter(queryString,type) {
      return (restaurant) => {
        if(type == 0){
          return (restaurant['realname'].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }else if(type == 1){
          return (restaurant['postName'].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }else if(type == 2){
          return (restaurant['name'].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }else{
          return (restaurant['value'].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }
        
      };
    },
    handleSelect(item) {
      console.log('handleSelect',item);
    }
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
