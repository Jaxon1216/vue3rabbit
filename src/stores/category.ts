import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {getCategoryAPI} from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])
  const getCategory = async() =>{
    const res = await getCategoryAPI()
    console.log(res.result)
    categoryList.value = res.result
    //flag:result属性哪来的，为什么是数组
  }
  return { categoryList, getCategory }
})