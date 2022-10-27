import request from '@/utils/request'

export function getPostByPage(data) {
  return request({
    url: '/home/baseparameter/getPostByPage',
    method: 'get',
    params: data
  })
}
export function createPost(data) {
  return request({
    params: data,
    url: '/home/baseparameter/createPost',
    method: 'post',
    responseType: 'json'
  })
}
export function checkPostName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkPostName',
    method: 'post',
    responseType: 'json'
  })
}
export function checkPostCode(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkPostCode',
    method: 'post',
    responseType: 'json'
  })
}

export function getPostDepartmentByPage(data) {
  return request({
    url: '/home/baseparameter/getPostDepartmentByPage',
    method: 'get',
    params: data
  })
}
