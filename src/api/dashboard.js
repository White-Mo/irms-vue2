import request from '@/utils/request'

export function getDepartmentAllCountData() {
  // 将有数组和字符串的对象转为符合JSON格式的对象
  // var params = JSON.parse(JSON.stringify(obj))
  let params = ''

  return request({
    params,
    url: '/home/inforesources/getDepartmentAllCountData',
    method: 'get',
    responseType: 'json'
  })
}

export function getEquipmentAllCountData(obj) {
  // 将有数组和字符串的对象转为符合JSON格式的对象
  let params = JSON.parse(JSON.stringify(obj))
  //console.log(params)
  // //console.log(typeof (params))
  return request({
    params,
    url: '/home/inforesources/getEquipmentAllCountData',
    method: 'get',
    responseType: 'json'
  })
}

export function getIPAddressCountData(obj) {
  // 将有数组和字符串的对象转为符合JSON格式的对象
  let params = JSON.parse(JSON.stringify(obj))
  //console.log(params)
  // //console.log(typeof (params))
  return request({
    params,
    url: '/home/inforesources/getIPAddressCountData',
    method: 'get',
    responseType: 'json'
  })
}

export function getMachineRoomAllCountData() {
  // 将有数组和字符串的对象转为符合JSON格式的对象
  let params = ''
  // //console.log(typeof (params))
  return request({
    params,
    url: '/home/inforesources/getMachineRoomAllCountData',
    method: 'get',
    responseType: 'json'
  })
}

export function getCabinetAllCountData(obj) {
  // 将有数组和字符串的对象转为符合JSON格式的对象
  var params = JSON.parse(JSON.stringify(obj))
  //console.log(params)
  // //console.log(typeof (params))
  return request({
    params,
    url: '/home/inforesources/getCabinetAllCountData',
    method: 'get',
    responseType: 'json'
  })
}
