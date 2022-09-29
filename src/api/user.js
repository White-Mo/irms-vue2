import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/syslogin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/syslogin/login/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/syslogin/loginout',
    method: 'post'
  })
}

export function initVerifyCode(fosV) {
  return request({
    url: '/syslogin/initVerifyCode',
    method: 'get',
    responseType: 'json',
    params: { fosV }
  })
}

export function getMoveRoute() {
  return request({
    url: '/syslogin/getMoveRoute',
    method: 'get',
    responseType: 'json'
  })
}

export function getList() {
  return request({
    url: '/syslogin/getViewAll',
    method: 'get',
    responseType: 'json'
  })
}
