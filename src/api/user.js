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
/**
获取验证码
 */
export function initVerifyCode(fosV) {
  return request({
    url: '/syslogin/initVerifyCode',
    method: 'get',
    responseType: 'json',
    params: { fosV }
  })
}
// export function initVerifyCode(fosV) {
//   return Ruoyi_request({
//     url: 'localhost:8086/syslogin/initVerifyCode',
//     method: 'get',
//     responseType: 'json',
//     params: { fosV }
//   })
// }

export function getMoveRoute() {
  return request({
    url: '/syslogin/getMoveRoute',
    method: 'get',
    responseType: 'json'
  })
}

export function getQComSelect(model) {
  return request({
    url: 'home/authority/' + model,
    method: 'post',
    responseType: 'json'
  })
}
export function getFosUserByPage(obj) {
  if (obj.dataName[0] === '111' && obj.dataValue !== ' ') {
    obj.dataName = [
      'realname',
      'username',
      'role',
      'name',
      'telephone',
      'isdel',
    ]
  }
  const params = JSON.parse(JSON.stringify(obj))
  return request({
    params,
    url: '/home/authority/getFosUserByPage',
    method: 'get',
    responseType: 'json'
  })
}
export function getFosUserCount(params) {
  return request({
    params,
    url: '/home/authority/getFosUserCount',
    method: 'get',
    responseType: 'json'
  })
}
export function isdeleteFosUser(params) {
  return request({
    params,
    url: '/home/authority/isdelFosUser',
    method: 'post',
    responseType: 'json'
  })
}
export function deleteFosUser(data) {
  return request({
    url: '/home/authority/delFosUser',
    method: 'delete',
    params: {id : data}
  })
}
export function updateFosUserAction(params) {
  return request({
    params,
    url: '/home/authority/updateFosUserAction',
    method: 'post',
    responseType: 'json'
  })
}
export function createFosUser(params) {
  return request({
    params,
    url: '/home/authority/createFosUser',
    method: 'post',
    responseType: 'json'
  })
}
export function getDepartmentByGroupIdAndPostName(params) {
  return request({
    params,
    url: '/home/authority/getDepartmentByGroupIdAndPostName',
    method: 'post',
    responseType: 'json'
  })
}
//  登陆账号重复判断
export function checkUserName(data) {
  return request({
    params: data,
    url: '/home/authority/checkUserName',
    method: 'post',
    responseType: 'json'
  })
}

//  用户名称重复判断
export function checkRealName(data) {
  return request({
    params: data,
    url: '/home/authority/checkRealName',
    method: 'post',
    responseType: 'json'
  })
}

export function getGroupAll() {
  return request({
    url: 'home/authority/getFosGroupAll',
    method: 'post',
    responseType: 'json'
  })
}
