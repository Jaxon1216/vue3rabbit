<script setup>
// SKU组件拓展练习页面
// 具体逻辑代码请参照笔记 "14. 拓展部分.md" 自行填充
import { onMounted, ref } from 'vue'
import axios from 'axios'
import bwPowerSet from './power-set'

let pathMap = {}
// 商品数据
const goods = ref({})
const getGoods = async () => {
  // 1135076  初始化就有无库存的规格
  // 1369155859933827074 更新之后有无库存项（蓝色-20cm-中国）
  const res = await axios.get('http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=1369155859933827074')
  goods.value = res.data.result
  pathMap = getPathMap()
  console.log(goods)
  // console.log(pathMap)
  initDisabledStatus(goods.value.specs, pathMap)
}

onMounted(() => getGoods())

//切换选中状态
const changeSelectedStatus = (item, val) => {
  //item同排的对象
  // val 当前点击项
  if (val.selected) {
    val.selected = false
  } else {
    item.values.forEach(valItem => valItem.selected = false)
    val.selected = true
  }
  // const selectedArr = getSelectedArr(goods.value.specs)
  updateDisabledStatus(goods.value.specs, pathMap)
  // console.log(selectedArr)
  // 产出SKU对象数据
  const index = getSelectedArr(goods.value.specs).findIndex(item => item === undefined)
  if (index > -1) {
    console.log('找到了，信息不完整')
  } else {
    console.log('没有找到，信息完整，可以产出')
    // 获取sku对象
    const key = getSelectedArr(goods.value.specs).join('-')
    const skuIds = pathMap[key]
    console.log(skuIds)
    // 以skuId作为匹配项去goods.value.skus数组中找
    const skuObj = goods.value.skus.find(item => item.id === skuIds[0])
    console.log('sku对象为', skuObj)
  }
}


//生成有效路径字典对象
const getPathMap = () => {
  // 1. 根据skus字段生成有效的sku数组
  const effectiveSkus = goods.value.skus.filter(sku => sku.inventory > 0)
  // 2. 根据有效的sku数组生成路径字典对象，子集算法【1，2】=> [[1], [2], [1,2]]
  const pathMap = {}
  effectiveSkus.forEach(sku => {
    // 2.1 获取可选规格值数组
    const specs = sku.specs.map(spec => spec.valueName)
    // 2.2 获取可选值数组的子集
    const powerSet = bwPowerSet(specs)
    // 3. 把得到子集生成最终的路径字典对象
    powerSet.forEach(set => {
      //初始化key 数组join -> 字符串 对象的key
      const key = set.join('-')
      if (pathMap[key]) {
        pathMap[key].push(sku.id)
      } else {
        pathMap[key] = [sku.id]
      }
    })
  })
  return pathMap
}
// 初始化禁用状态
const initDisabledStatus = (specs, pathMap) => {
  specs.forEach(item => {
    item.values.forEach(val => {
      if (pathMap[val.name]) {
        val.disabled = false
      } else {
        val.disabled = true
      }
    })
  })

}

//获取选中项的匹配数组
const getSelectedArr = (specs) => {
  const selectedArr = []
  specs.forEach(item => {
    const selectedVal = item.values.find(val => val.selected)
    selectedArr.push(selectedVal ? selectedVal.name : undefined)
  })
  return selectedArr
}
//切换时更新禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((item, index) => {
    item.values.forEach(val => {
      const selectedArr = getSelectedArr(specs)
      selectedArr[index] = val.name
      const key = selectedArr.filter(value => value).join('-')
      val.disabled = !pathMap[key]
    })
  })
}
</script>

<template>
  <div class="sku-page">
    <div class="container">
      <h2>SKU 规格组件 - 拓展练习</h2>
      <div class="sku-wrapper">
        <!-- 在此处编写 SKU 组件内容 -->
        <div class="goods-sku">
          <dl v-for="item in goods.specs" :key="item.id">
            <dt>{{ item.name }}</dt>
            <dd>
              <template v-for="val in item.values" :key="val.name">
                <!-- 图片类型规格 -->
                <img :class="{ selected: val.selected, disabled: val.disabled }"
                  @click="changeSelectedStatus(item, val)" v-if="val.picture" :src="val.picture" :title="val.name">
                <!-- 文字类型规格 -->
                <span :class="{ selected: val.selected, disabled: val.disabled }" v-else
                  @click="changeSelectedStatus(item, val)">{{ val.name }}</span>
              </template>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.sku-page {
  padding: 40px 0;
  background: #f5f5f5;
  min-height: 100vh;

  .container {
    width: 1240px;
    margin: 0 auto;
    background: #fff;
    border-radius: 8px;
    padding: 30px;

    h2 {
      font-size: 22px;
      color: #333;
      margin-bottom: 30px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e4e4e4;
    }
  }
}

@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: #27ba9b;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
