import request from '@/utils/request'

export function getList() {
  return request({
    url: '/home/inforesources/getViewAll',
    method: 'get',
    responseType: 'json'
  })
}
