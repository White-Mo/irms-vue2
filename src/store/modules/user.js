import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    realname: '',
    roleid: '',
    role_department_id: '',
    role_department_name: '',
    roles: [],
    role_name:''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_REAL_NAME: (state, realname) => {
    state.realname = realname
  },
  SET_ROLE_ID: (state, roleid) => {
    state.roleid = roleid
  },
  SET_ROLE_DEPARTMENT_ID: (state, role_department_id) => {
    state.role_department_id = role_department_id
  },
  SET_ROLE_DEPARTMENT_NAME: (state, role_department_name) => {
    state.role_department_name = role_department_name
  },
  SET_USER_NAME: (state, username) => {
    state.username = username
  },
  SET_ROLE_NAME: (state, role_name) => {
    state.role_name = role_name
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, reCode, fosV } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, reCode: reCode, fosV: fosV }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, realname, roleid, role_department_id, role_department_name , username,role_name } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles) // group_name
        commit('SET_REAL_NAME', realname)
        commit('SET_ROLE_ID', roleid)
        commit('SET_ROLE_DEPARTMENT_ID', role_department_id)
        commit('SET_ROLE_DEPARTMENT_NAME', role_department_name)
        commit('SET_USER_NAME', username)
        commit('SET_ROLE_NAME', role_name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

