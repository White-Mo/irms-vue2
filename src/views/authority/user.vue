<template>
  <div class='infobody'>
    <div class='grid-content bg-purple'>
      <i class='el-icon-s-order' /><span>系统信息管理</span>
    </div>
    <div class='app-container'>
      <div v-if="ifShow === '0'"
           class='show'
      >
        <div class='table_end'>
          <el-row>
            <el-col :span='24'>
              <div class='grid-content bg-purple-dark'>用户信息管理</div>
            </el-col>
          </el-row>
          <el-row :gutter='10' class='bg-condition'>
            <el-col :xs='2' :sm='2' :md='2' :lg='2' :xl='2'>
            <span>
              <h3 style='margin-top:0.1rem'>
                查询条件
              </h3>
            </span>
            </el-col>
            <el-col :span='4'>
              用户姓名
              <el-autocomplete
                class='inline-input'
                v-model='user_input.username'
                :fetch-suggestions='querySearchName'
                placeholder='请输入姓名'
                @select='handleSelectUsername'
                style='width: 10rem;'
              ></el-autocomplete>
            </el-col>
            <el-col :span='4'>
              登录帐号
              <el-input v-model='user_input.account ' placeholder='请输入帐号' style='width: 10rem;'></el-input>
            </el-col>
            <el-col :span='3'>
              单位
              <el-autocomplete
                class='inline-input'
                v-model='user_input.Unit'
                :fetch-suggestions='querySearchPost'
                placeholder='请输入单位'
                @select='handleSelectUnit'
                style='width: 8rem;'
              ></el-autocomplete>
            </el-col>
            <el-col :span='3'>
              角色
              <el-autocomplete
                class='inline-input'
                v-model='user_input.Roles'
                :fetch-suggestions='querySearchFosGroup'
                placeholder='请输入角色'
                @select='handleSelectRoles'
                style='width: 8rem;'
              ></el-autocomplete>
            </el-col>
            <el-col :span='3'>
              状态
              <el-autocomplete
                class='inline-input'
                v-model='user_input.Status'
                :fetch-suggestions='querySearchState'
                placeholder='请输入状态'
                @select='handleSelectStatus'
                style='width: 8rem;'
              ></el-autocomplete>
            </el-col>
            <el-col :xs='2' :sm='2' :md='2' :lg='2' :xl='2'>
              <el-button
                size='medium'
                type='primary'
                icon='el-icon-search'
                clearable='true'
                @click='search()'
              >搜索
              </el-button>
            </el-col>
            <el-col :xs='2' :sm='2' :md='2' :lg='2' :xl='2'>
              <el-button
                size='medium'
                type='primary'
                icon='el-icon-plus'
                clearable='true'
                @click='add_user()'
              >添加用户
              </el-button>
            </el-col>
          </el-row>
          <div class='grid-content'>
            <el-table
              ref='multipleTable'
              :data='tableData'
              stripe
              border
              :header-cell-style="{ background: '#f5f7fa', color: '#606266','text-align':'center' }"
              :cell-style="{'text-align':'center'}"
            >
              <!-- <el-table-column label="" width="40" type="selection" /> -->
              <el-table-column
                v-for='(item, index) in dataname'
                :key='index'
                :prop='item.value'
                :label='item.label'
                :formatter='item.formatter'
                header-align='center'
                align='center'
                show-overflow-tooltip
              />
              <el-table-column
                header-align='center'
                label='操作'
                width='400'
              >
                <template slot-scope='scope'>
                  <el-button @click='updateUser(scope.row)' type='info' size='small' icon='el-icon-edit'>修改
                  </el-button>
                  <el-button @click='deleteUser(scope.row)' type='danger' size='small' icon='el-icon-delete'>删除
                  </el-button>
                  <el-button @click='isdeleteUser(scope.row)' type='warning' size='small' icon='el-icon-video-play'
                  >{{ isActivation(scope.row.isdel) === true ? '激活' : '冻结' }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class='tabListPage' style='text-align: center'>
            <el-pagination
              @size-change='handleSizeChange'
              @current-change='handleCurrentChange'
              :current-page='currentPage'
              layout='total, sizes, prev, pager, next, jumper'
              :total='totalCount'
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div v-if="ifShow === '1'">
        <add-user @changeDiv='changeDiv'></add-user>
      </div>
      <div v-if="ifShow === '2'">
        <update-user :row='row' @changeDiv='changeDiv'></update-user>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { deleteFosUser, getFosUserByPage, getFosUserCount, getQComSelect, isdeleteFosUser } from '@/api/user'
import UpdateUser from '@/components/authority/user/updateUser/index.vue'
import AddUser from '@/components/authority/user/addUser/index.vue'

export default {
  name: 'Dashboard',
  components: { AddUser, UpdateUser },
  computed: {
    ...mapGetters([
      'realname',
      'roles',
      'userid'
    ])
  },
  data() {
    return {
      ifShow: '0',
      row: {},
      //提交按钮禁用
      disabled: false,
      //登陆账号重复判断
      accountId: '',
      action: '',
      user_input: {
        username: '',
        username_id: '',
        account: '',
        Unit: '',
        Unit_id: '',
        Roles: '',
        Roles_id: '',
        Status: '',
        Status_id: ''
      },
      RealnameAll: [],
      PostAll: [],
      FosGroupAll: [],
      stateAll: [
        { 'id': '1', 'value': '冻结' },
        { 'id': '0', 'value': '激活' }
      ],
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
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
          value: 'telephone',
          label: '电话'
        },
        {
          value: 'status',
          label: '状态'
        }

      ],
      // 显示弹窗
      centerDialogVisible: false,
      deleteUseRparams: {},
      userDialogDisplay: false,
      headInfo: '',
      update_data: {
        username: '',
        account: '',
        password: '',
        Unit: '',
        department: '',
        Roles: '',
        telephone: '',
        Status: '',
        row: {}
      },
      departmentAll: [],
      updateOrAdd: false,
      tempDepartmentId: '',
      tempDepartmentPostOrName: ''
    }
  },
  mounted() {

    for (let i of ['getRealnameAll', 'getPostAll', 'getFosGroupAll']) {
      getQComSelect(i).then(res => {
        if (i === 'getRealnameAll') {
          this.RealnameAll = res.data.items
        } else if (i === 'getPostAll') {
          this.PostAll = res.data.items
        } else {
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
    changeDiv(value) {
      this.ifShow = value
      this.currentPage = this.currentPage
      this.get_user()
    },
    add_user(){
      this.ifShow = '1'
    },

    search() {
      this.currentPage = 0
      this.get_user()
    },
    querySearchName(queryString, cb) {
      return this.querySearch(this.RealnameAll, 0, queryString, cb)
    },
    querySearchPost(queryString, cb) {
      return this.querySearch(this.PostAll, 1, queryString, cb)
    },
    querySearchFosGroup(queryString, cb) {
      return this.querySearch(this.FosGroupAll, 2, queryString, cb)
    },
    querySearchState(queryString, cb) {
      return this.querySearch(this.stateAll, 3, queryString, cb)
    },
    querySearch(restaurants, type, queryString, cb) {
      var results = queryString ? restaurants.filter(this.createFilter(queryString, type)) : restaurants
      // 调用 callback 返回建议列表的数据
      let item = []
      for (let i of results) {
        item.push({
          'id': i[type == 1 ? 'postId' : 'id'],
          'value': i[type == 0 ? 'realname' : type == 1 ? 'postName' : type == 2 ? 'name' : 'value']
        })
      }
      cb(item)
    },
    createFilter(queryString, type) {
      return (restaurant) => {
        if (type == 0) {
          return (restaurant['realname'].toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        } else if (type == 1) {
          return (restaurant['postName'].toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        } else if (type == 2) {
          return (restaurant['name'].toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        } else {
          return (restaurant['value'].toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      }
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
    async get_user() {
      // //console.log(this.FosGroupAll)
      const get_roles = (id) => {
        let item = ''
        for (let i of this.FosGroupAll) {
          if (id == i.id) {
            item = i.name
            break
          }
        }
        return item
      }

      let params = {
        realname: this.user_input.username == '' ? 'all' : this.user_input.username_id,
        username: this.user_input.account,
        use_post: this.user_input.Unit == '' ? 'all' : this.user_input.Unit_id,
        groupid: this.user_input.Roles == '' ? 'all' : this.user_input.Roles_id,
        isdel: this.user_input.Status == '' ? 'all' : this.user_input.Status_id
      }
      //console.log(params)
      this.totalCount = (await getFosUserCount(params)).data
      params['start'] = this.currentPage - 1
      params['limit'] = 10
      getFosUserByPage(params).then(res => {
        for (let i of res.data.items) {
          i.roles = get_roles(i.groupid)
          i.status = i.isdel == '0' ? '激活' : '冻结'
        }
        this.tableData = res.data.items
      })
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
      this.get_user()
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
      this.get_user()
    },
    // 显示激活或冻结按钮
    isActivation(isdel) {
      if (isdel == '1') {
        return true
      } else {
        return false
      }
    },
    isdeleteUser(row) {
      let params = {
        id: row.id
      }
      let _this = this
      isdeleteFosUser(params).then(() => {
        _this.get_user()
        _this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    },
    //删除用户弹窗
    deleteUser(row) {
      this.$alert(`是否永久删除用户：\"${row.realname}\"信息`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            deleteFosUser(row.id).then((response) => {
              this.$alert(response.data, '提示', {
                confirmButtonText: '确定',
                type: 'info',
                showClose: false
              }).then(() => {
                this.get_user()
              })
            })
          }
        }
      })
    },

    updateUser(row) {
      this.row = row
      this.ifShow = '2'
    }
  }
}

</script>

<style lang='less' scoped>
/deep/ .el-select-dropdown__list {
  width: 900px;
}

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

.update_class div {
  margin-top: 0.3rem;
}
</style>
