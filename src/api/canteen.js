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

// 获取菜单列表
export function menuList(query) {
  return request({
    url: '/meal/menu/list',
    method: 'GET',
    params: query
  })
}

// 菜单添加
export function addMenu(menu) {
  return request({
    url: '/meal/menu/add',
    method: 'POST',
    params: menu
  })
}
// {
//   "eatDate": "2020-10-27 02:31:52",
//   "menu": "白菜",
//   "mperiod": 1
// }

// 菜单删除
export function deleteMenu(mid) {
  return request({
    url: '/meal/menu/delete',
    method: 'POST',
    params: mid
  })
}
