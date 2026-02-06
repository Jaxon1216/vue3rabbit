import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://geek.itheima.net/v1_0/channels'
//4.导出
export const useCounterStore = defineStore('counter', () => {
  //1.数据，
  const count = ref(0)
  //2.修改数据的方法  //4.getters
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  //5.定义异步action
  const list = ref([])
  const getList = async () => {
    const res = await axios.get(API_URL)
    list.value = res.data.data.channels
    //flag：为什么俩data，赋值怎呢对应上的不需要结构吗

  }

  
  //3.以对象的形式供组件使用
  return { count, doubleCount, increment, list, getList }
})
