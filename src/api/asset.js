import request from '@/utils/request'

// device
export function countInfo(query) {
  return request({
    url: '/device/all_count',
    method: 'get',
    params: query
  })
}

export function listDevice(query) {
  return request({
    url: '/device/list',
    method: 'get',
    params: query
  })
}

// {
//   "addDate": 1603891118205,
//   "address": "北京",
//   "category": "固定资产",
//   "deviceName": "string",
//   "price": 188,
//   "principal": "小胡",
//   "status": 0
// }
export function createDevice(data) {
  return request({
    url: '/device/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: [
      function(data) {
        data = JSON.stringify(data)
        return data
      }
    ],
    params: {},
    data: data
  })
}

// 更新需要在 create 的基础上带上 did
export function updateDevice(data) {
  return request({
    url: '/device/upload',
    method: 'post',
    params: data
  })
}

export function findDevice(data) {
  return request({
    url: '/device/find',
    method: 'get',
    params: data
  })
}

export function deleteDevice(data) {
  return request({
    url: '/device/delete',
    method: 'post',
    params: data
  })
}

// email
export function listEmail(query) {
  return request({
    url: '/device/email/list',
    method: 'get',
    params: query
  })
}

export function createEmail(data) {
  return request({
    url: '/device/email/add',
    method: 'post',
    params: data
  })
}

export function deleteEmail(data) {
  return request({
    url: '/device/email/delete',
    method: 'post',
    params: data
  })
}

// short message
export function listMessage(query) {
  return request({
    url: '/device/phone/list',
    method: 'get',
    params: query
  })
}

export function createMessage(data) {
  return request({
    url: '/device/phone/add',
    method: 'post',
    params: data
  })
}

export function deleteMessage(data) {
  return request({
    url: '/device/phone/delete',
    method: 'post',
    params: data
  })
}

// repair
export function createRepair(data) {
  return request({
    url: '/device/repair/add',
    method: 'post',
    params: data
  })
}

export function listRepair(query) {
  return request({
    url: '/device/repair/list',
    method: 'get',
    params: query
  })
}

export function findRepair(query) {
  return request({
    url: '/device/repair/find_by_did',
    method: 'get',
    params: query
  })
}
