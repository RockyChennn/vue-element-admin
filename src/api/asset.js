import request from '@/utils/request'

// 资产管理数据面板
export function info(query) {
  return request({
    url: '/device/allCount',
    method: 'get',
    params: query
  })
}
