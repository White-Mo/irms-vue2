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
              v-model="user_input.username"
              :fetch-suggestions="querySearchName"
              placeholder="请输入姓名"
              @select="handleSelectUsername"
              style="width: 10rem;"
            ></el-autocomplete>
          </el-col>
          <el-col :span="4">
            登录帐号
            <el-input v-model="user_input.account " placeholder="请输入帐号" style="width: 10rem;"></el-input>
          </el-col>
          <el-col :span="3">
            单位
            <el-autocomplete
              class="inline-input"
              v-model="user_input.Unit"
              :fetch-suggestions="querySearchPost"
              placeholder="请输入单位"
              @select="handleSelectUnit"
              style="width: 8rem;"
            ></el-autocomplete>
          </el-col>
          <el-col :span="3">
            角色
            <el-autocomplete
              class="inline-input"
              v-model="user_input.Roles"
              :fetch-suggestions="querySearchFosGroup"
              placeholder="请输入角色"
              @select="handleSelectRoles"
              style="width: 8rem;"
            ></el-autocomplete>
          </el-col>
          <el-col :span="3">
            状态
            <el-autocomplete
              class="inline-input"
              v-model="user_input.Status"
              :fetch-suggestions="querySearchState"
              placeholder="请输入状态"
              @select="handleSelectStatus"
              style="width: 8rem;"
            ></el-autocomplete>
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" >
            <el-button
              size="medium"
              type="primary"
              icon="el-icon-search"
              clearable="true"
              @click="search()"
            >搜索</el-button>
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" >
            <el-button
              size="medium"
              type="primary"
              icon="el-icon-plus"
              clearable="true"
              @click="add_user()"
            >添加用户</el-button>
          </el-col>
        </el-row>
        <div class="grid-content" >
          <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            border
            :header-cell-style="{ background: '#f5f7fa', color: '#606266','text-align':'center' }"
            :cell-style="{'text-align':'center'}"
          >
            <!-- <el-table-column label="" width="40" type="selection" /> -->
            <el-table-column
              v-for="(item, index) in dataname"
              :key="index"
              :prop="item.value"
              :label="item.label"
              :formatter="item.formatter"
              header-align="center"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              header-align="center"
              label="操作"
              width="400"
              >
              <template slot-scope="scope" >
                <el-button @click="updateUser(scope.row)" type="info" size="small" icon="el-icon-edit">修改</el-button>
                <el-button @click="deleteUser(scope.row)" type="danger" size="small" icon="el-icon-delete">删除</el-button>
                <el-button @click="isdeleteUser(scope.row)" type="warning" size="small" icon="el-icon-video-play" v-if="isActivation(scope.row.isdel)" >激活</el-button>
                <el-button @click="isdeleteUser(scope.row)" type="warning" size="small" icon="el-icon-video-pause" v-else>冻结</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
<!--        <el-dialog
            title="请确认要删除这条记录吗?"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
          >
            <span slot="footer" class="dialog-footer">
              <el-button style="height: 2.8rem;" @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" style="height: 2.8rem;" @click="deleteUserPlus">确 定</el-button>
            </span>
        </el-dialog>-->
        <el-dialog
            :title="headInfo"
            :visible.sync="userDialogDisplay"
            @close='closeDialog'
            width="30%"
            center
          >
          <div style="width:100%;text-align:center" class="update_class">
            <div>
                用户姓名
              <el-input v-model="update_data.username " placeholder="请输入用户姓名" style="width: 20rem;left:2rem;"></el-input>
            </div>
            <div>
                登录帐号
              <el-input v-model="update_data.account " placeholder="请输入帐号" style="width: 20rem;left:2rem;"></el-input>
            </div>
            <div>
              密码
              <el-input v-model="update_data.password " placeholder="请输入密码" style="width: 20rem;left:2.8rem;" show-password></el-input>
            </div>
            <!-- <div>
              单位
              <el-select v-model="update_data.Unit" placeholder="请选择" style="width: 20rem;left:2.8rem;">
                <el-option
                  v-for="item in PostAll"
                  :key="item.postId"
                  :label="item.postName"
                  :value="item.postId">
                </el-option>
              </el-select>
            </div> -->
            <div>
                角色
              <el-select v-model="update_data.Roles" placeholder="请选择" @change="changeGroupID" style="width: 20rem;left:2.8rem;">
                <el-option
                  v-for="item in FosGroupAll"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div>
              部门
              <el-select v-model="update_data.department" placeholder="请选择"  style="width: 20rem;left:2.8rem;">
                <el-option
                  v-for="item in departmentAll"
                  :key="item.departmentId"
                  :label="item.postAnddepartment"
                  :value="item.departmentId">
                </el-option>
              </el-select>
            </div>
            <div>
                状态
              <el-select v-model="update_data.Status" placeholder="请选择" style="width: 20rem;left:2.8rem;">
                <el-option
                  v-for="item in [{'id':'1','value':'冻结'},{'id':'0','value':'激活'}]"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div>

            </div>
          </div>
            <span slot="footer" class="dialog-footer">
              <el-button style="height: 2.8rem;" @click="userDialogDisplay = false">返回</el-button>
              <el-button :disabled='disabled' type="primary" style="height: 2.8rem;" @click="updateUserPlus" v-if="updateOrAdd">更新</el-button>
              <el-button :disabled='disabled' type="primary" style="height: 2.8rem;" @click="addUserPlus" v-else>添加</el-button>
            </span>
        </el-dialog>
        <div class="tabListPage" style="text-align: center">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="PageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
            >
            </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getQComSelect, getFosUserByPage, getPostDepartmentAll, createFosUser,getFosUserCount, deleteFosUser,isdeleteFosUser,updateFosUserAction } from '@/api/user'
import { getPost, getDepartment, getEquipmentType } from '@/api/select'
import {delMachineRoom} from "@/api/baseparameter";
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'realname',
      'roles',
      'userid'
    ])
  },
  data() {
    return {
      disabled:false,
      user_input:{
        username:"",
        username_id:"",
        account :"",
        Unit:"",
        Unit_id:"",
        Roles:"",
        Roles_id:"",
        Status:"",
        Status_id:"",
      },
      RealnameAll:[],
      PostAll:[],
      FosGroupAll:[],
      stateAll:[
        {"id":"1",'value':"冻结"},
        {"id":"0",'value':"激活"}
      ],
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 8, 10, 12, 15],
      // 默认每页显示的条数（可修改）
      PageSize: 12,
      dataname: [
        {
          value: 'realname',
          label: '用户姓名'
        },
        {
          value: 'username',
          label: '登录帐号'
        },
        {
          value: 'role',
          label: '单位（部门）'
        },
        {
          value: 'roles',
          label: '角色'
        },
        {
          value: 'status',
          label: '状态'
        }
      ],
      // 显示弹窗
      centerDialogVisible: false,
      deleteUseRparams:{},
      userDialogDisplay:false,
      headInfo:"",
      update_data:{
        username:"",
        account:"",
        password:"",
        Unit:"",
        department:"",
        Roles:"",
        Status:"",
        row:{},
      },
      departmentAll: [],
      updateOrAdd:false,
    }
  },
  mounted() {

    for (let i of ['getRealnameAll','getPostAll','getFosGroupAll']){
      getQComSelect(i).then(res => {
        if(i == 'getRealnameAll'){
          this.RealnameAll = res.data.items
        }else if(i == 'getPostAll'){
          this.PostAll = res.data.items
        }else{
          this.FosGroupAll = res.data.items
        }
    })
    }
    this.get_user()

  },
  destroyed() {
  },
/*  created() {
    this.changeGroupID()
  },*/
  methods: {
    search(){
      this.currentPage = 0
      this.get_user()
    },
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
        item.push({"id":i[type == 1 ? "postId" : "id"],"value":i[type == 0?'realname':type == 1?"postName":type == 2?"name":"value"]})
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
    handleSelectUsername(item) {
      //console.log(item);
      this.user_input.username_id = item.id
    },
    handleSelectUnit(item) {
      //console.log(item);
      this.user_input.Unit_id = item.id
    },
    handleSelectRoles(item) {
      //console.log(item);
      this.user_input.Roles_id = item.id
    },
    handleSelectStatus(item) {
      //console.log(item);
      this.user_input.Status_id = item.id
    },
    async get_user(){
      // //console.log(this.FosGroupAll)
      const get_roles = (id) => {
        let item = ''
        for(let i of this.FosGroupAll){
          if(id == i.id){
            item = i.name
            break
          }
        }
        return item
      }

			let params = {
					realname:this.user_input.username == "" ? "all" : this.user_input.username_id,
					username:this.user_input.account,
					use_post:this.user_input.Unit == "" ? "all" : this.user_input.Unit_id,
					groupid:this.user_input.Roles == "" ? "all" : this.user_input.Roles_id,
					isdel:this.user_input.Status == "" ? "all" : this.user_input.Status_id
			};
      //console.log(params)
      this.totalCount = (await getFosUserCount(params)).data
      params["start"] = this.currentPage - 1
      params["limit"] = this.PageSize
      getFosUserByPage(params).then(res =>{
        for(let i of res.data.items){
          i.roles = get_roles(i.groupid)
          i.status = i.isdel == "0" ? "激活" : "冻结"
        }
        this.tableData = res.data.items
      })
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
      this.get_user()
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
      this.get_user()
    },
    // 显示激活或冻结按钮
    isActivation(isdel){
      if(isdel == "1"){
        return true
      }else{
        return false
      }
    },
    isdeleteUser(row){
      let params = {
        id:row.id
      }
      let _this = this
      isdeleteFosUser(params).then(()=>{
        _this.get_user()
        _this.$message({
          message: '修改成功',
          type: 'success'
        });
      })
    },
    deleteUser(row){
        this.$alert(`是否永久删除用户：\"${row.realname}\"信息`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: (action, instance) => {
            if (action === 'confirm') {
              deleteFosUser(row.id).then((response)=>{
                this.$alert(response.data, '提示', {
                  confirmButtonText: '确定',
                  type: 'info',
                  showClose: false
                }).then(()=>{
                  this.get_user()
                })
              })
            }
          }
        })
    },

    async updateUser(row){
      this.disabled=false
      console.log(row)
      let temp = row.role.split("/")
      this.userDialogDisplay = true
      this.updateOrAdd = true
      this.headInfo = "更新用户信息"
      this.update_data.username = row.realname
      this.update_data.account = row.username
      this.update_data.password = row.password
      this.update_data.Unit = temp[0]
      this.update_data.department =""

      this.update_data.Roles = row.roles
      this.update_data.Status = row.status==="激活" ? '0':'1'
      // this.update_data.Status = row.status==="激活" ? '0':'1'
      this.update_data.row = row
      console.log(this.update_data)
      //console.log(row)
      //console.log(this.RealnameAll,this.PostAll,this.FosGroupAll)
      // this.departmentAll = (await getDepartment(row.roleid)).data.items
      getPostDepartmentAll({groupid:row.groupid}).then(res=>{
        //console.log(res)
        for(let i of res.data.items){
          i["postAnddepartment"] = i.postName + '/' + i.departmentName
        }
        this.departmentAll = res.data.items
      })
    },
    changeGroupID(groupid){
      //console.log(groupid)
      this.update_data.department = ""
      let _this = this
      getPostDepartmentAll({groupid:groupid}).then(res=>{
      // getPostDepartmentAll({groupid:this.$store.state.user.roleid}).then(res=>{
        console.log(res)
        for(let i of res.data.items){
          i["postAnddepartment"] = i.postName + '/' + i.departmentName
        }
      })
    },
    closeDialog(){
      this.departmentAll = []
    },
    async updateUserPlus(){
      let params = {
        id:this.update_data.row.id, // 被修改的账户的id
        // insertuserid:this.userid,   // 修改者的id
        userid:this.userid,   // 修改者的id
        // role:this.update_data.Unit + '/' + this.update_data.department,// 单位和部门拼接的字符串
        // roleid:"", // 单位的id
        // use_post:getDepartmentId(this.update_data.Unit), // 单位的id
        // use_post:this.update_data.row.roleid, // 单位的id
        use_post:this.update_data.department == "" ? this.update_data.row.roleDepartmentId : this.update_data.department, // 单位的id
        // roleDepartmentId:"", // 部门的id
        // roles:"", // 权限的汉字名称
        groupid:this.update_data.Roles == "" ? this.update_data.row.groupid : this.update_data.row.groupid, // 权限对应的id
        telephone:"", // 电话 暂时为空
        isdel: this.update_data.Status == "" ? this.update_data.row.isdel : this.update_data.Status, // 帐号状态
        username:this.update_data.account, // 登录帐号
        realname:this.update_data.username, // 用户姓名
        password:this.update_data.password, //
        controlid:"", // 暂时为空的字段
      }
      console.log(params)
      let _this = this
      updateFosUserAction(params).then((res)=>{
        //console.log(res)
        _this.$message({
          message: '更改成功',
          type: 'success'
        });
        _this.get_user()
        _this.userDialogDisplay = false
      }).catch((err)=>{
        //console.log(err)
        _this.$message.error('更改失败');
      })
    },
    add_user(){
      this.userDialogDisplay = true
      this.updateOrAdd = false
      this.headInfo = "添加新用户"
      this.update_data.username = ""
      this.update_data.account = ""
      this.update_data.password = ""
      this.update_data.department = ""
      this.update_data.Roles = ""
      this.update_data.Status = ""
    },
    addUserPlus(){
      let params = {
        userid:this.userid,   // 修改者的id
        use_post:this.update_data.department, // 单位的id
        groupid:this.update_data.Roles, // 权限对应的id
        telephone:"", // 电话 暂时为空
        isdel: this.update_data.Status, // 帐号状态
        username:this.update_data.account, // 登录帐号
        realname:this.update_data.username, // 用户姓名
        password:this.update_data.password, //
        controlid:"", // 暂时为空的字段
      }
      //console.log(params)
      let _this = this
      createFosUser(params).then((res)=>{
        //console.log(res)
        _this.$message({
          message: '添加成功',
          type: 'success'
        });
        _this.get_user()
        location.reload();
        _this.userDialogDisplay = false
      }).catch((err)=>{
        //console.log(err)
        _this.$message.error('添加失败');
      })
    },
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
.update_class div{
  margin-top:0.3rem;
}
</style>
