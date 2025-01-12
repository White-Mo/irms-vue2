import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 通过getInfo判断用户是否获得了权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          //  获取用户信息
          // 注意:角色必须是一个对象数组!例如:['admin']或['developer'，'editor']
          console.log("1111111111111111")
          const { roles } = await store.dispatch('user/getInfo')
          console.log("2222222222222222 roles",roles)
          // 根据角色生成可访问路由映射
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          console.log("4444444444444444 accessRoutes",accessRoutes)
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)
          console.log("5555555555555555 router",router)
          if(accessRoutes.length===0){
            next({ path: '/404' })
          }else {
            next({ ...to, replace: true })
          }
          // hack方法来确保adroutes是完整的
          // 设置replace: true，这样导航就不会留下历史记录
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error({
            message: error || '出现错误，请稍后再试'
          })
          next({ path: '/' })
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
