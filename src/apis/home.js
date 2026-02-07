import httpInstance from '@/utils/http'

//获取banner

export function getBannerAPi (){

    return httpInstance({
        url: '/home/banner',

    })
}