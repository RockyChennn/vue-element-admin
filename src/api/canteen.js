import request from '@/utils/request'

export function viewLatestWeek() {
  return request({
    url: '/meal/order/latestWeek',
    method: 'GET'
  })
}

export function list(data) {
  return request({
    url: '/meal/order/list',
    method: 'GET',
    params: data
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

export function userList(data) {
  return request({
    url: '/meal/order/user/list',
    method: 'GET',
    params: data
  })
}
