import request from '@/utils/request'

//总设备数据量
export const getEquipmentCount= () => {
  return request.get( '/home/inforesources/getCompreDataCount?dataName[]=111&dataValue=&status=0')
}

//总设备数据量
export const getEquipmentTypeCount= () => {
  return request.get( '/home/baseparameter/getEquipmentTypeCount')
}

//保修期内设备数据量
export const getGuaranteePeriodCount= () =>{
  return request.get('/home/inforesources/getGuaranteePeriodCount')
}

//总应用系统数量
export const getSystemWareCount= () =>{
  return request.get('/home/inforesources/getSystemWareCount')
}

//应用管理员数量
export const getApplicationUserCount= () =>{
  return request.get('/home/inforesources/getApplicationUserCount?qapp_user=all')
}

//设备管理员数量
export const getEquipmentUserCount= () =>{
  return request.get('/home/inforesources/getEquipmentUserCount?qequipment_user=all')
}
