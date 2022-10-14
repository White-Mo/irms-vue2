import request from '@/utils/request'

export function getList() {
  return request({
    url: '/home/inforesources/getViewAll',
    method: 'get',
    responseType: 'json'
  })
}

export function addEquipment(eq) {
  return request({
    data: JSON.stringify(eq),
    url: '/home/inforesources/AddExcelBaseInfo',
    method: 'post',
    responseType: 'json'
  })
}
