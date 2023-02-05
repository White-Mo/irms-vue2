/*
 * @Description: 获取下拉框的值
 * @Author:  wr
 * @Date: 2022-10-11 15:13:06
 * @LastEditTime: 2022-11-05 16:15:42
 * @LastEditors:
 */
import request from '@/utils/request'

export function getPost(data) { // 接受 data
  return request({
    url: '/home/inforesources/getPostAll',
    method: 'post',
    responseType: 'json',
    params:data //在发送请求的时候把data发送过去
  })
}

export function getDepartment(postId) {
  return request({
    params: { postId: postId },
    url: '/home/inforesources/getDepartmentByPostId',
    method: 'get',
    responseType: 'json'
  })
}

export function getEquipmentType() {
  return request({
    url: '/home/inforesources/getEquipmentAll',
    method: 'post',
    responseType: 'json'
  })
}

export function getMachineRoom(postId) {
  return request({
    params: { postId: postId },
    url: '/home/cycle/getMachineRoom',
    method: 'post',
    responseType: 'json'
  })
}

export function getCabinet(machineId) {
  return request({
    params: { machineId: machineId },
    url: '/home/cycle/getCabinet',
    method: 'post',
    responseType: 'json'
  })
}
