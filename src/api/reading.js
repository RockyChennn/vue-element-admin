import request from '@/utils/request'

export function computerList(query) {
  return request({
    url: '/computer/list',
    method: 'GET',
    params: query
  })
}

export function addItem(data) {
  return request({
    url: '/computer/add',
    method: 'POST',
    params: data
  })
}

export function deleteItem(data) {
  return request({
    url: '/computer/delete',
    method: 'POST',
    params: data
  })
}

export function findItem(query) {
  return request({
    url: '/computer/find',
    method: 'GET',
    params: query
  })
}

export function freeItem(data) {
  return request({
    url: '/computer/update',
    method: 'POST',
    params: data
  })
}

export function addRecord(data) {
  return request({
    url: '/computer/record/add',
    method: 'POST',
    params: data
  })
}

export function deleteRecord(data) {
  return request({
    url: '/computer/record/delete',
    method: 'POST',
    params: data
  })
}

export function recordList(query) {
  return request({
    url: '/computer/record/list',
    method: 'GET',
    params: query
  })
}

export function searchRecord(query) {
  return request({
    url: '/computer/record/search',
    method: 'GET',
    params: query
  })
}

export function updateRecord(data) {
  return request({
    url: '/computer/record/update',
    method: 'POST',
    params: data
  })
}
