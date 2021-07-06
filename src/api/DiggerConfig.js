import request from '@/utils/request'

export function queryConditionalConfig(data){
  return request({
    url: './diggerConfig/queryConditional',
    method: 'post',
    data: data,
  })
}

export function delDiggerConfig(data){
  return request({
    url: './diggerConfig/delDiggerConfigById'+"/"+data,
    method: 'post',
  })
}

export function editDiggerConfig(data){
  return request({
    url: './diggerConfig/editDiggerConfig',
    method: 'post',
    data: data
  })
}

export function latestDiggerConfig(date){
  return request({
    url: './diggerConfig/latestDiggerConfigData',
    method: 'post',
    data:date
  })
}
