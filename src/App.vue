<script setup lang="ts">
//1.导入方法
import { useCounterStore } from '@/stores/counter'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
//2.执行方法得到实例对象
const counterStore = useCounterStore()

// 解构响应式数据（state和getters）- 使用storeToRefs保持响应式
const { count, doubleCount, list } = storeToRefs(counterStore)
// 注意：storeToRefs() 的作用域限制：
// ✅ 可以解构：state（响应式数据）和 getters（计算属性）
// ❌ 不能解构：actions（方法）
// 解构方法（actions）- 直接从store解构
const { increment, getList } = counterStore

//3.使用实例对象
console.log('count:', count.value)
console.log('doubleCount:', doubleCount.value)
console.log('increment:', increment) // 方法不需要.value

//4.调用异步action
onMounted(() => {
  getList()
})
</script>

<template>
  <br>
  <el-button type="primary">Primary</el-button>
  <hr>
  <ul>
    <li v-for="item in list" :key="item.id">{{ item.name }}</li>
    <!-- key作用：帮助Vue识别每个列表项，提高渲染性能和正确性 -->
    <!-- 为什么用item.id：因为id是唯一的，能准确标识每一项 -->
  </ul>
  <hr>
  <button @click="increment">{{ count }}</button>
</template>

<style scoped></style>
