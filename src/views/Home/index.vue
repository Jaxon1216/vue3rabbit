<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import homeProduct from './components/HomeProduct.vue'
import HomePanel from './components/HomePanel.vue'

</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />

  <!-- 测试面板组件 -->
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <div>我是插槽</div>
  </HomePanel>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div>我是插槽</div>
  </HomePanel>
</template>
