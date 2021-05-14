import request from '@/utils/request'

export function queryConditional(data){
  return request({
    url: './diggerConfig/queryConditional',
    method: 'post',
    //headers: { 'content-type': 'application/json' },
    data: data,
  })
}
