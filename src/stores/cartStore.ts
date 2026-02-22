import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCarListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  // 判断是否登录
  const isLogin = computed(() => userStore.userInfo.token)
  // 1. 定义state - cartList
  const cartList = ref([])
  // 2. 定义action - addCart
  const addCart = async (goods) => {
    console.log('添加', goods)
    if (isLogin.value) {
      // 登录之后的加入购车逻辑
      await insertCartAPI({ skuId: goods.skuId, count: goods.count })
      const res = await findNewCarListAPI()
      cartList.value = res.result
    } else {
      // 添加购物车操作
      // 已添加过 - count + 1
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        item.count++
      } else {
        // 没找到
        cartList.value.push(goods)
      }
    }
  }

  // 3. 定义action - delCart
  // 删除购物车
  const delCart = async (skuId) => {
    if (isLogin.value) {
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI([skuId])
      // 重新获取最新的购物车列表
      const res = await findNewCarListAPI()
      cartList.value = res.result
    } else {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
  }

  //6. 清除购物车
  const clearCart = () => {
    cartList.value = []
  }
  // 4. 定义action - singleCheck
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }
  // 5. 定义action - allCheck
  const allCheck = (selected) => {
    cartList.value.forEach((item) => item.selected = selected)
  }
  //计算属性
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
  //已选择数量
  const selectedCount = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0))
  //已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0))
  //是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))

  return {
    cartList,
    addCart,
    delCart,
    clearCart,
    isAll,
    allCount,
    allPrice,
    selectedCount,
    selectedPrice,
    singleCheck,
    allCheck
  }
}, {
  persist: true,
})