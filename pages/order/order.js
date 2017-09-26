// pages/order/order.js
function add0(m) { return m < 10 ? '0' + m : m };
function getCurrentTime() {
  var time = new Date();
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  var currentTime = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
  return currentTime
}
var app = getApp()
var MD5Util = require('../../utils/md5.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{
      orderId:'',
      dealTime:'',
      code:'',
      name:'',
      num:1,
      price:'', 
      amount:'',
      buyer:'宋禹龙',
      phone:'17777842295',
      address:'北京市朝阳区房地首华大厦',
      loglat:'',
      status:0
      //0-未发货,1-已发货,2-已完成,3-取消\退款
    }
  },
  orderDataNum:function(e){
    var that = this
    var total = that.data.order.price * e.detail.value
    that.setData({
      'order.num':e.detail.value,
      'order.amount': that.data.order.price * e.detail.value
    })
  },
  orderDataBuyer: function (e) {
    this.setData({
      'order.buyer': e.detail.value
    })
  },
  orderDataPhone:function (e) {
    this.setData({
      'order.phone':e.detail.value
    })
  },
  orderDataAddress: function (e) {
    this.setData({
      'order.address': e.detail.value
    })
  },
  openAddress: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          'order.address': res.address,
          'order.loglat': res.latitude + ',' + res.longitude
        })
        that.setData({
          'order.address': res.address,
          'order.loglat': res.latitude + ',' + res.longitude
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
        // complete
      }
    })
  },
  formSubmit:function(e){
    var that = this
    if (e.detail.value.num == '' || e.detail.value.num === '0'||e.detail.value.buyer == '' || e.detail.value.phone == ''|| e.detail.value.address == ''){
      if (e.detail.value.num == '' || e.detail.value.num === '0'){
        wx.showToast({
          title: '数量必填',
          image: '../../images/error.png',
          duration: 2000
        })
      }
      if (e.detail.value.buyer == '') {
        wx.showToast({
          title: '姓名必填',
          image: '../../images/error.png',
          duration: 2000
        })
      }
      if (e.detail.value.phone == '') {
        wx.showToast({
          title: '手机必填',
          image: '../../images/error.png',
          duration: 2000
        })
      }
      if (e.detail.value.address == '') {
        wx.showToast({
          title: '地址必填',
          image: '../../images/error.png',
          duration: 2000
        })
      }
    }
    else{
      var reg = /^1[34578]\d{9}$/
      if(!reg.test(e.detail.value.phone)){
        wx.showToast({
          title: '填写正确的手机号',
          image: '../../images/error.png',
          duration: 2000
        })
      }
      else{
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                // url: 'https://minidisk.cn/prepay',
                url: 'https://minidisk.cn/prepay',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                data: {
                  code: res.code,
                  name:that.data.order.name,
                  price:that.data.order.amount*100
                },
                success: function (res) {
                  var time = (Date.parse(new Date())/1000).toString()
                  var sign = ''
                  var signA = "appId=wx291758036acbb3f6" + "&nonceStr=" + res.data.nonceStr + "&package=prepay_id=" + res.data.prepayId + "&signType=MD5&timeStamp=" + time
                  var signB = signA + "&key=d278ace781eadade7aad50387eee042b"
                  sign = MD5Util.MD5(signB).toUpperCase(); 
                //
                  wx.requestPayment({
                    nonceStr: res.data.nonceStr,
                    package: "prepay_id=" + res.data.prepayId,
                    signType: 'MD5',
                    timeStamp: time,
                    paySign: sign,
                    success: function () {
                      that.setData({
                        "order.dealTime": getCurrentTime()
                      })
                      wx.showToast({
                        title: '支付成功',
                        icon: 'success',
                        duration: 1500,
                      })
                      // var purchaseList = wx.getStorageSync('purchaseList') || []
                      // purchaseList.unshift(that.data.order)
                      // wx.setStorageSync('purchaseList', purchaseList)
                      app.payOff(that.data.order,function(){
                        setTimeout(function () {
                          wx.redirectTo({
                            url: '../mydeal/mydeal',
                          })
                        }, 1500)
                      })
                    },
                    fail: function () {

                    },
                    complete: function () {
                      
                    }
                  })  
                },
                fail: function (err) {
                  console.log(err)
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      "order.code":options.id,
      "order.name":options.name,
      "order.price":options.price,
      "order.amount":options.price * that.data.order.num
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})