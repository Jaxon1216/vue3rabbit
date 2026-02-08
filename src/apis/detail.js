import request from '@/utils/http'

export const getDetailAPI = (id) => {
  return request({
    url: '/goods',
    params: {
      id
    }
  })
}