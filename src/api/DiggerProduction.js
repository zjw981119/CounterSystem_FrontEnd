import request from '@/utils/request'

export function queryConditionalProduction(data){
  return request({
    url: './diggerProduction/queryConditional',
    method: 'post',
    //headers: { 'content-type': 'application/json' },
    data: data,
  })
}

export function deleteDiggerProduction(data){
  return request({
    url: './diggerProduction/deleteDiggerProduction'+"/"+data,
    method: 'post',
    //headers: { 'content-type': 'application/json' },
  })
}

export function updateDiggerProduction(data){
  return request({
    url: './diggerProduction/editDiggerProduction',
    method: 'post',
    //headers: { 'content-type': 'application/json' },
    data: data
  })
}

export function addDiggerProduction(data){
  return request({
    url: './diggerProduction/addDiggerProduction',
    method: 'post',
    //headers: { 'content-type': 'application/json' },
    data: data
  })
}
