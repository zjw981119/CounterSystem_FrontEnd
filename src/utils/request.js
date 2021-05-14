import axios from 'axios'


// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_SERVER, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
  withCredentials: true // 允许携带cookie信息发送给服务器
})

// request interceptor
service.interceptors.request.use(
  // config => {
    // do something before request is sent

  //   if (store.getters.token) {
  //     // let each request carry token
  //     // ['X-Token'] is a custom headers key
  //     // please modify it according to the actual situation
  //     config.headers['X-Token'] = getToken()
  //   }
  //   return config
  // },
  // error => {
  //   // do something with request error
  //   console.log(error) // for debug
  //   return Promise.reject(error)
  // }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  // response => {
  //   const res = response.data
  //   console.log('返回之前',response)
  //   // if the custom code is not 20000, it is judged as an error.
  //   if (res.result.code !== '20000') {
  //     Message({
  //       message: res.result.message || 'Error',
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //
  //     // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
  //     if (res.result.code === '50008' || res.result.code === '50012' || res.result.code === '50014') {
  //       // to re-login
  //       MessageBox.confirm('你没有登录，不能停留在这个页面，请重新登录', 'Confirm logout', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('user/resetToken').then(() => {
  //           location.reload()
  //         })
  //       })
  //     }
  //     return Promise.reject(new Error(res.result.message || 'Error'))
  //   } else {
  //     return res
  //   }
  // },
  // error => {
  //   console.log('err' + error) // for debug
  //   Message({
  //     message: error.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   return Promise.reject(error)
  // }
)

export default service
