import request from '@/utils/request'

// 获取日志数据操作者
export function getLogDataUser(data) {
  return request({
    url: '/home/log_management/getLogDataUser',
    method: 'get',
    params: data
  })
}
// 通过时间获取日志数据的用户
export function getLogDataUserByTime(timeParams) {
  return request({
    params: {timeParams:timeParams},
    url: '/home/log_management/getLogDataUserByTime',
    method: 'get',
  })
}

// 通过时间获取日志数据
export function getLogDataByTime(timeParams) {
  return request({
    params: {timeParams:timeParams},
    url: '/home/log_management/getLogDataByTime',
    method: 'get',
  })
}
// 通过用户获取日志数据
export function getLogDataByUser(userName) {
  return request({
    params: {userName:userName},
    url: '/home/log_management/getLogDataByUser',
    method: 'get',
  })
}
//获取日志数据
export function getLogData() {
  return request({
    params: '',
    url: '/home/log_management/getLogData',
    method: 'get',
  })
}
//获取每天操作日志的次数
export function getLogDateAndCount() {
  return request({
    params: '',
    url: '/home/log_management/getLogDateAndCount',
    method: 'get',
  })
}
