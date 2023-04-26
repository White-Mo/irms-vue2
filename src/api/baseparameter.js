import request from '@/utils/request'
//通过页码获取单位
export function getPostByPage(data) {
  if(data.dataName[0] === '111' && data.dataValue !== " "){
    data.dataName = [
      'postName',
      'postCode'
    ]
  }
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
  if(data.dataName[0] === '111' && data.dataValue !== ' '){
    data.dataName = [
      'equipmentFirstTypeName',
      'equipmentFirstTypeCode'
    ]
  }
  return request({
    url: '/home/baseparameter/getEquipmentFirstTypeByPage',
    method: 'get',
    params: data
  })
}

//修改一级设备类型----------------赵长开----------------
export function updateEquipmentFirstType(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updateEquipmentFirstType',
    method: 'post',
    responseType: 'json'
  })
}
//修改二级设备类型----------------赵长开----------------
export function updateEquipmentSecondType(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updateEquipmentSecondType',
    method: 'post',
    responseType: 'json'
  })
}




//通过页码获取二级设备类型
export function getEquipmentTypeByPage(data) {
  // if(data.dataName[0] === '111' && data.dataValue !== " "){
  //   data.dataName = [
  //     'equipmentTypeName',
  //     'equipmentTypeCode',
  //     'equipmentFirstTypeName'
  //   ]
  // }
  return request({
    url: '/home/baseparameter/getEquipmentTypeByPage',
    method: 'get',
    params: data
  })
}

//获取机房数量wr
export function getMachineRoomTotal(data) {
  if(data.dataName[0] === '111' && data.dataValue !== " "){
    data.dataName = [
      'machineRoomName',
      'postName'
    ]
  }
  return request({
    url: '/home/baseparameter/getMachineRoomTotal',
    method: 'get',
    params: data
  })
}

//通过页码获取机房
export function getMachineRoomByPage(data) {
  if(data.dataName[0] === '111' && data.dataValue !== " "){
    data.dataName = [
      'machineRoomName',
      'postName'
    ]
  }
  return request({
    url: '/home/baseparameter/getMachineRoomByPage',
    method: 'get',
    params: data
  })
}

//通过页码获取业务系统
export function getBusinessSystemByPage(data) {
  if(data.dataName[0] === '111' && data.dataValue !== " "){
    data.dataName = [
      'businessSystemName',
      'businessSystemLevel',
      'businessSystemFirstName',
      'departmentName',
      'postName'
    ]
  }
  return request({
    url: '/home/baseparameter/getBusinessSystemByPage',
    method: 'get',
    params: data
  })
}

//通过页码获取一级业务系统
export function getFirstLevelBusinessSystemByPage(data) {
  return request({
    url: '/home/baseparameter/getFirstLevelBusinessSystemByPage',
    method: 'get',
    params: data
  })
}

//删除一级业务系统
export function deleteFirstLevelBusinessSystem(data){
  return request({
    url: '/home/baseparameter/deleteFirstLevelBusinessSystem',
    method: 'DELETE',
    params: {businessSystemFirstId:data}
  })
}

//搜索查询一级业务系统
export function SearchBusinessSystemFirstLevel(data){
  return request({
    url: '/home/baseparameter/SearchBusinessSystemFirstLevel',
    method: 'post',
    params: data
  })
}


//获取全部一级业务系统数据
export function getAllFirstLevelBusinessSystem() {
  return request({
    url: '/home/baseparameter/getAllFirstLevelBusinessSystem',
    method: 'get'
  })
}

//通过单位获取一级业务系统
export function getFirstLevelBusinessSystemByPostId(data) {
  return request({
    params: {postId: data},
    url: '/home/baseparameter/getFirstLevelBusinessSystemByPostId',
    method: 'get'
  })
}

//改变机房状态wr
export function changeStatus(eq) {
  var params = JSON.parse(JSON.stringify(eq))
  return request({
    params,
    url: '/home/baseparameter/changeRoomStatus',
    method: 'post',
    responseType: 'json'
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
//新增业务系统 ----------------------赵长开-------------------
export function createBusinessSystem(data) {
  return request({
    params: data,
    url: '/home/baseparameter/createBusinessSystem',
    method: 'post',
    responseType: 'json'
  })
}

//新增一级业务系统 ----------------------赵长开-------------------
export function createFirstLevelBusinessSystem(data) {
  return request({
    params:data,
    url: '/home/baseparameter/createFirstLevelBusinessSystem',
    method: 'post',
    responseType: 'json'
  })
}

//检查业务系统是否重复----------------------赵长开-------------------
export function checkBusinessSystemName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkBusinessSystemName',
    method: 'post',
    responseType: 'json'
  })
}

//检查一级业务系统是否重复----------------------赵长开-------------------
export function checkFirstLevelBusinessSystemName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkFirstLevelBusinessSystemName',
    method: 'post',
    responseType: 'json'
  })
}

//删除业务系统---------------------赵长开----------------------
export function delBusinessSystem(data) {
  return request({
    url: '/home/baseparameter/delBusinessSystem',
    method: 'delete',
    params: data
  })
}

//修改一级业务系统
export function updateFirstLevelBusinessSystem(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updateFirstLevelBusinessSystem',
    method: 'post',
    responseType: 'json'
  })
}


//修改业务系统----------------赵长开----------------
export function updateBusinessSystemAction(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updateBusinessSystemAction',
    method: 'post',
    responseType: 'json'
  })
}


//通过业务系统Id获取设备------------赵长开
export function getEquipmentByBusinessSystemId(data){
  return request({
    //params:data,
    params: {tempBusinessSystemNameId : data},
    url:'/home/baseparameter/getEquipmentByBusinessSystemId',
    method:'post',
    responseType:'json'
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
//删除一级设备类型
export function delEquipmentFirstType(data) {
  return request({
    url: '/home/baseparameter/delEquipmentFirstType',
    method: 'delete',
    params: {equipmentFirstTypeId : data}
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

//新增一级设备类型
export function addEquipmentFirstType(data) {
  return request({
    params: data,
    url: '/home/baseparameter/addEquipmentFirstType',
    method: 'post',
    responseType: 'json'
  })
}

/* //修改一级设备类型
export function  updateEquipmentFirstType(data){
  return request({
    params:data,
    url:'/home/baseparameter/updateEquipmentFirstType',
    method: 'post',
    responseType: 'json'
  })
} */

//新增二级设备类型
export function addEquipmentSecondType(data) {
  return request({
    params: data,
    url: '/home/baseparameter/addEquipmentType',
    method: 'post',
    responseType: 'json'
  })
}


//检查一级设备类型名称是否重复
export function checkEquipmentTypeFirstName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkEquipmentTypeFirstName',
    method: 'post',
    responseType: 'json'
  })
}

//检查二级设备类型名称是否重复
export function checkEquipmentTypeSecondName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkEquipmentTypeName',
    method: 'post',
    responseType: 'json'
  })
}


//新增机房
export function addMachineRoom(data) {
  return request({
    params: data,
    url: '/home/baseparameter/addMachineRoom',
    method: 'post',
    responseType: 'json'
  })
}
//修改机房
export function updataMachineRoomAction(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updataMachineRoomAction',
    method: 'post',
    responseType: 'json'
  })
}
//检查机房名称是否重复
export function checkMachineRoomName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkMachineRoomName',
    method: 'post',
    responseType: 'json'
  })
}

//删除机房
export function delMachineRoom(data) {
  return request({
    url: '/home/baseparameter/delMachineRoom',
    method: 'delete',
    params: {machineRoomId : data}
  })
}

//删除机柜
export function delCabinet(data) {
  return request({
    url: '/home/baseparameter/delCabinet',
    method: 'delete',
    params: {cabinetId : data}
  })
}

