#页面如何引用组件

小程序创建components/like 组件

然后pages中引入

```json
{
  "usingComponents": {
    "v-like":"components/like/index"
  }
}
```
```html
<v-like/>
```
这时候Component isnot found in path

相对路径和绝对路径
../       /

视觉稿
375 * 667  

rpx  flex  响应式布局

#组件只能继承少数样式
  组件只能继承font和color
  页面可以继承全局样式

#组件事件与组件处理
```js
<view bind:tap="onLike" class="container">
  <image src='images/like.png'/>
  <text>2</text>
</view>
```

bind:tap 
catch:tap

#组件的封闭性，开放性及粒度
// 哪些属性封装在内部，哪些开放出来
// 粒度  
//  非常简单的功能  非常复杂的功能

#看待组件的两种观点
 代码分类
 代码复用

#onLoad钩子函数向服务器请求数据

#wx.request - 4xx状态码并不会执行fail

```js
  onLoad: function (options) {
    wx.request({
      url: 'http://',
      header:{
      },
      success: res => {
      }
    })
  },
```
#Promise
  解决回调地域
  但是不能滥用Promise
#const常量

#封装HTTP
```JS
import {config} from '../config.js'
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
          params.error && params.error(res)
        }
      },
      fail: err => {
        params.fail && params.fail(err)
      }
    })
  }
}

export {
  HTTP
}
```

