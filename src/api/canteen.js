import request from '@/utils/request'

export function viewLatestWeek(data) {
  return request({
    url: '/meal/order/latestWeek',
    method: 'GET'
  })
}

export function list() {
  return request({
    url: '/meal/order/list',
    method: 'GET'
  })
}

export function addOrder(data) {
  return request({
    url: '/meal/order/user/add',
    method: 'POST',
    params: data
  })
}

export function deleteOrder(data) {
  return request({
    url: '/meal/order/user/delete',
    method: 'POST',
    params: data
  })
}

export function userList() {
  return request({
    url: '/meal/order/user/list',
    method: 'GET'
  })
}
