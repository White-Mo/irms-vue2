import request from '@/utils/request'

export function importExcel(data) {
  return request({
    url: '/home/inforesources/AddExcel',
    method: 'post',
    timeout: 120 * 1000,
    data
  })
}
