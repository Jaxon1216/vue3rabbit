<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

// 触发获取列表的action，
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => categoryStore.getCategory())

//这里是调用了pinia执行了action，然后拿到了categoryList，是在加载这个index执行的吧，子组件只管用不需要再导入？
</script>

<template>
<!-- <i class="iconfont icon-xinlangweibo"></i> -->
<!-- <link rel="stylesheet" href="https://at.alicdn.com/t/c/font_5124612_0cbvjnqbss6.css"> -->
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- <RouterView :key="$route.fullPath"/> -->
  <RouterView />
  <!-- //Flag:routerview为什么不需要import？ -->
  <LayoutFooter />
</template>