import request from '@/utils/request'

export function queryConditionalConfig(data){
  return request({
    url: './diggerConfig/queryConditional',
    method: 'post',
    //headers: { 'content-type': 'application/json' },
    data: data,
  })
}

export function delDiggerConfig(data){
  return request({
    url: './diggerConfig/delDiggerConfigById'+"/"+data,
    method: 'post',
    //headers: { 'content-type': 'application/json' },
  })
}

export function editDiggerConfig(data){
  return request({
    url: './diggerConfig/editDiggerConfig',
    method: 'post',
    //headers: { 'content-type': 'application/json' },
    data: data
  })
}
