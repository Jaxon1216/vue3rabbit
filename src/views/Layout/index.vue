<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
</script>

<template>
<!-- <i class="iconfont icon-xinlangweibo"></i> -->
<!-- <link rel="stylesheet" href="https://at.alicdn.com/t/c/font_5124612_0cbvjnqbss6.css"> -->
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <!-- //Flag:routerview为什么不需要import？ -->
  <LayoutFooter />
</template>