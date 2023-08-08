<template>
  <div class="navbar" v-if="isHidden">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <div class="user-text">
            <span v-for="role in roles" :key="role">{{"["+role_name+"/"+role+"]"+realname}}</span>
          </div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { eventBus } from '@/main'

export default {
  data(){
    return{
      isHidden:true,
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      clickable: true, // 初始状态可点击
    }
  },
  created() {
    // 在B组件的created钩子中监听事件总线的事件
    eventBus.$on('disableBClick', this.disableClickHandler);
  },
  beforeDestroy() {
    // 在B组件销毁前解绑事件
    eventBus.$off('disableBClick', this.disableClickHandler);
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'realname',
      'roles',
      'role_name'
    ])
  },
  methods: {
    toggleSideBar() {
      if(this.clickable){
        this.$store.dispatch('app/toggleSideBar')
      }
      // 触发自定义事件clickEvent，将点击事件传递给事件总线
      eventBus.$emit('clickEvent');
    },
    disableClickHandler(disable) {
      this.clickable = !disable; // 设置clickable变量来控制是否禁用点击事件
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-text {
          font-size: 18px;
          line-height: 15px;
          font-weight:bold;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
