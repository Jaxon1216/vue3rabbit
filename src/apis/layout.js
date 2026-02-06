import httpInstance from '@/utils/http'

export function getCategoryAPI(){
    return httpInstance({
        url: '/home/category/head'
    })
}
//flag:get请求省略methods？

