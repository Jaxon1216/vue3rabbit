import httpInstance from '@/utils/http'


//返回一个promise对象？
export function getCategory(){
    return httpInstance({
        url: '/home/category/head'
    })
}