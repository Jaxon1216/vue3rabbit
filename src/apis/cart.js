//封装购物车相关接口
import request from '@/utils/http'
export const insertCartAPI = ({ skuId, count }) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: { skuId, count }
  })
}

//获取最新的购物车列表
export const findNewCarListAPI = () => {
  return request({
    url: '/member/cart',
    method: 'GET'
  })
}

//删除购物车
export const delCartAPI = (ids) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

//合并购物车
export const mergeCartAPI = (data) => {
  return request({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}

// 选中/取消选中购物车商品（全部）
export const checkAllCartAPI = (selected, ids) => {
  return request({
    url: '/member/cart/selected',
    method: 'PUT',
    data: { selected, ids }
  })
}