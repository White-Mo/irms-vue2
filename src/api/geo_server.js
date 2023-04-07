import request from '@/utils/request'

export function getMapJson(data) {
  return request({
    url: '/hgis/ktw/ows',
    method: 'get',
    params: data
  })
}
