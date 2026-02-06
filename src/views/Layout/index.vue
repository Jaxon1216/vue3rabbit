<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

//触发获取列表的action，
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => categoryStore.getCategory())
</script>

<template>
<!-- <i class="iconfont icon-xinlangweibo"></i> -->
<!-- <link rel="stylesheet" href="https://at.alicdn.com/t/c/font_5124612_0cbvjnqbss6.css"> -->
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <!-- //Flag:routerview为什么不需要import？ -->
  <LayoutFooter />
</template>