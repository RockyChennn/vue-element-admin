import request from '@/utils/request'

// 获取最近七天的预约人数
export function latestWeekList() {
  return request({
    url: '/meal/order/latestWeek',
    method: 'GET'
  })
}

// 获取预约记录
export function orderList(data) {
  return request({
    url: '/meal/order/list',
    method: 'GET',
    params: data
  })
}
