import request from '@/utils/request'
//通过页码获取单位
export function getPostByPage(data) {
  return request({
    url: '/home/baseparameter/getPostByPage',
    method: 'get',
    params: data
  })
}
//通过页码获取部门
export function getPostDepartmentByPage(data) {
  return request({
    url: '/home/baseparameter/getPostDepartmentByPage',
    method: 'get',
    params: data
  })
}
//通过页码获取一级设备类型
export function getEquipmentFirstTypeByPage(data) {
  return request({
    url: '/home/baseparameter/getEquipmentFirstTypeByPage',
    method: 'get',
    params: data
  })
}
//通过页码获取二级设备类型
export function getEquipmentTypeByPage(data) {
  return request({
    url: '/home/baseparameter/getEquipmentTypeByPage',
    method: 'get',
    params: data
  })
}

//通过页码获取机房
export function getMachineRoomByPage(data) {
  return request({
    url: '/home/baseparameter/getMachineRoomByPage',
    method: 'get',
    params: data
  })
}

//通过页码获取业务系统
export function getBusinessSystemByPage(data) {
  return request({
    url: '/home/baseparameter/getBusinessSystemByPage',
    method: 'get',
    params: data
  })
}

//新增单位
export function createPost(data) {
  return request({
    params: data,
    url: '/home/baseparameter/createPost',
    method: 'post',
    responseType: 'json'
  })
}

//新增部门
export function createDepartment(data) {
  return request({
    params: data,
    url: '/home/baseparameter/createPostDepartment',
    method: 'post',
    responseType: 'json'
  })
}

//修改单位
export function updatePostAction(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updatePostAction',
    method: 'post',
    responseType: 'json'
  })
}

//修改部门
export function updatePostDepartmentAction(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updatePostDepartmentAction',
    method: 'post',
    responseType: 'json'
  })
}
//检查单位名称是否重复
export function checkPostName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkPostName',
    method: 'post',
    responseType: 'json'
  })
}
//检查单位代码是否重复
export function checkPostCode(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkPostCode',
    method: 'post',
    responseType: 'json'
  })
}

//检查部门名称是否重复
export function checkDepartmentName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkPostDepartmentName',
    method: 'post',
    responseType: 'json'
  })
}
//检查部门代码是否重复
export function checkDepartmentCode(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkPostDepartmentCode',
    method: 'post',
    responseType: 'json'
  })
}

//删除单位
export function delPost(data) {
  return request({
    url: '/home/baseparameter/delPost',
    method: 'delete',
    params: {postId : data}
  })
}

//删除部门
export function delPostDepartment(data) {
  return request({
    url: '/home/baseparameter/delPostDepartment',
    method: 'delete',
    params: {departmentId : data}
  })
}
//删除二级设备类型
export function delEquipmentType(data) {
  return request({
    url: '/home/baseparameter/delEquipmentType',
    method: 'delete',
    params: {equipmentTypeId : data}
  })
}
//删除机房
export function delMachineRoom(data) {
  return request({
    url: '/home/baseparameter/delMachineRoom',
    method: 'delete',
    params: {equipmentTypeId : data}
  })
}

//删除业务系统
export function delBusinessSystem(data) {
  return request({
    url: '/home/baseparameter/delBusinessSystem',
    method: 'delete',
    params: {equipmentTypeId : data}
  })
}
