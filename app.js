//app.js

App({
  onLaunch: function() {
    this.getLogiCallback()
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  getLogiCallback: function (vl, callback) {
    var that = this
    var token = wx.getStorageSync('token')
    if (token) {
      if(typeof callback == "function"){
        callback()
      }
    } else {
      wx.login({
        success: function (body) {
          console.log(body)
          if (body.code) {
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?'
              + 'appid=wx291758036acbb3f6'
              + '&secret=d278ace781eadade7aad50387eee042a'
              + '&js_code=' + body.code
              + '&grant_type=authorization_code',
              data: {
              },
              success: function (body) {
                console.log(body)
                wx.getUserInfo({
                  withCredentials:true,
                  success: function (res) {
                    wx.setStorageSync('userInfo', res.userInfo)
                    var data = {
                      'iv': res.iv,//wx.getUserInfo接口返回那里的iv
                      'rawData': res.rawData, //wx.getUserInfo接口返回那里的iv
                      'signature': res.signature,// wx.getUserInfo接口返回那里的signature
                      'encryptedData': res.encryptedData,  //wx.getUserInfo接口返回那里的encryptedData
                      'session_key': body.data.session_key //wx.login接口下面 “code 换取 session_key” 获得
                    }
                    that.getLoginData(data, function (res2) {
                      wx.setStorageSync('token', res2.token)
                      wx.setStorageSync('loginSuccessData', res2)
                      if (typeof callback == "function") {
                        callback(res2.token)
                      }
                    })
                  },
                  fail: function (res) {
                  }
                })
              }
            })
          } else {
            console.log('登录失败')
          }
        }
      })
    }

  },
  getLoginData: function (data, callback) {
    var url = 'https://'+this.globalData.host+'/wxlogin'
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        callback(res.data)
      },
      fail: function (res) {
        console.log('请求出错')
      }
    })
  },
  getCardData: function (data, callback) {
    var url = 'https://'+this.globalData.host + '/card/id'
    var token = wx.getStorageSync('token')
    wx.request({
      url: url,
      header: {
        'token': token,
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data.cardData ==null){
          callback('')
        }
        else{
          callback(res.data)
        }
        
      },
      fail: function (res) {
        console.log('请求出错')
      }
    })
  },
  getOtherCardData: function (data, callback) {
    var url = 'https://' + this.globalData.host + '/card/id'
    wx.request({
      url: url,
      header: {
        'token': data,
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.cardData == null) {
          callback('')
        }
        else {
          callback(res.data)
        }

      },
      fail: function (res) {
        console.log('请求出错')
      }
    })
  },
  postCardData: function (data, callback) {
    var url = 'https://' + this.globalData.host + '/card/card'
    var token = wx.getStorageSync('token')
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      header: {
        'token': token,
        'content-type': 'application/json'
      },
      success: function (res) {
        callback(res.data)
      },
      fail: function (res) {
        console.log('请求出错')
      }
    })
  },
  delCardData: function (data, callback) {
    var url = 'https://' + this.globalData.host + '/card/card/'+data
    var token = wx.getStorageSync('token')
    wx.request({
      url: url,
      method: 'DELETE',
      header: {
        'token': token,
        'content-type': 'application/json'
      },
      success: function (res) {
        callback(res.data)
      },
      fail: function (res) {
        console.log('请求出错')
      }
    })
  },
  checkIfExist:function(data,callback){
    var url = 'https://' + this.globalData.host + '/cardcase/cardData/' + data
    var token = wx.getStorageSync('token')
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'token': token,
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(data)
        console.log(token)
        console.log(res)
        if(res.data.cardData == null){
          callback('')
        }
        else{
          callback(res.data.cardData)
        }
      },
      fail: function (res) {
        console.log('请求出错')
      }
    })
  },
  addOtherCard:function(data,callback){
    var url = 'https://' + this.globalData.host + '/cardcase/cardData'
    var token = wx.getStorageSync('token')
    wx.request({
      url: url,
      method: 'POST',
      data:data,
      header: {
        'token': token,
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.result == 'success') {
          callback()
        }
      },
      fail: function (res) {
        console.log('请求出错')
      }
    })
  },
  getItemList:function(callback){
    var url = 'https://' + this.globalData.host + '/shop/itemList'
    var token = wx.getStorageSync('token')
    wx.request({
      url: url,
      method: 'Get',
      header: {
        'token': token,
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data != null) {
          callback(res.data)
        }
      },
      fail: function (res) {
        console.log('请求出错')
      }
    })
  },
  payOff:function(order,callback){
    var url = 'https://' + this.globalData.host + '/shop/deal'
    var token = wx.getStorageSync('token')
    wx.request({
      url: url,
      method: "POST",
      data:order,
      header:{
        'token':token,
        'content-type':'application/json'
      },
      success:function(res){
          if(res.data.result == "success"){
            callback()
          }
      }
    })
  },
  getOrderList:function(callback){
    var url = 'https://' + this.globalData.host + '/shop/orderList'
    var token = wx.getStorageSync('token')
    wx.request({
      url: url,
      header:{
        'token':token,
        'content-type':'application/json'
      },
      success:function(res){
        callback(res.data)
      }
    })
  },
  globalData: {
    userInfo: null,
    host:'minidisk.cn'
  }
})
