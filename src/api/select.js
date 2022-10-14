import request from '@/utils/request'

export function getPost() {
  return request({
    url: '/home/inforesources/getPostAll',
    method: 'post',
    responseType: 'json'
  })
}

export function getDepartment(postId) {
  return request({
    params: { postId: postId },
    url: '/home/inforesources/getDepartmentByPostId',
    method: 'get',
    responseType: 'json'
  })
}

export function getEquipmentType() {
  return request({
    url: '/home/inforesources/getEquipmentAll',
    method: 'post',
    responseType: 'json'
  })
}
