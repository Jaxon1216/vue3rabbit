// 封装分类数据业务相关代码
import { onMounted, ref } from 'vue'
import { getCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory () {
  // 获取分类数据
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    console.log('📂 Category请求:', id, res)
    categoryData.value = res.result
  }
  onMounted(() => getCategory())

  // 目标:路由参数变化的时候 可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    console.log('🔄 路由更新: 从', route.params.id, '到', to.params.id)
    // 存在问题：使用最新的路由参数请求最新的分类数据
    getCategory(to.params.id)
  })
  return {
    categoryData
  }
}
