import request from '@/utils/request'

// 获取日志数据
export function getLogData(data) {
  return request({
    url: '/home/log_management/getLogData',
    method: 'get',
    params: data
  })
}
