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

export function createDevice(data) {
  return request({
    url: '/device/add',
    method: 'post',
    params: data
  })
}

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

// phone
export function listPhone(query) {
  return request({
    url: '/device/message/all',
    method: 'get',
    params: query
  })
}

export function createPhone(data) {
  return request({
    url: '/device/message/add',
    method: 'post',
    params: data
  })
}

export function deletePhone(data) {
  return request({
    url: '/device/message/delete',
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