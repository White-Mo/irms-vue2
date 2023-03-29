import request from '@/utils/request'

export function getPostDepartmentByPage(data) {
  return request({
    url: '/home/log_management/getPostDepartmentByPage',
    method: 'get',
    params: data
  })
}
