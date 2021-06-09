import request from '@/utils/request'

export function getList(data){
  return request({
    url: './display/machinedetail',
    method: 'post',
    data: data,
  })
}
export function getExcavatorAndCar(){
  return request({
    url: './display/ExcavatorAndCar',
    method: 'post'
  })
}


