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
    data: data,
    url: '/home/baseparameter/createPost',
    method: 'post',
    responseType: 'json'
  })
}
