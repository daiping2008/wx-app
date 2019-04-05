import {config} from '../config.js'
import {tips} from './error.js'
class HTTP {
  constructor(){
    this.api_base_url = config.api_url
  }
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: this.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header:{
        'content-type': 'application/json',
        'appkey': config.appKey
      },
      success: res => {
        let code = res.statusCode + ''
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: err => {
        params.fail && params.fail(err)
      }
    })
  }

  _show_error(error_code) {
    wx.showToast({
      title: tips[error_code],
      icon:'none',
      duration:2000
    })
  }
}

export {
  HTTP
}