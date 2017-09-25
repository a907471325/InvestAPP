// pages/mycard/mycard.js
//获取应用实例
var app = getApp()
Page({
  data: {
    cardData: [],
  },
  getCardData: function () {
    //获取我的名片数据
    var that = this
    app.getCardData("", function (res) {
        that.setData({
          cardData: res
        })
    })
  },
  // getCardData: function () {
  //   this.setData({
  //     cardData: wx.getStorageSync('cardData') || []
  //   })
  // },
  openCreatecard: function () {
    var that = this
    if (wx.getStorageSync('loginSuccessData').mobVerify) {
      wx.navigateTo({
        url: '../createcard/createcard?id=0'
      })
    } else {
      wx.showModal({
        title: '请验证手机',
        showCancel: false,
        content: '请先验证手机号码~',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../phoneverify/phoneverify'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  onLoad: function (options) {
    var that = this
    app.getLogiCallback('',function(){
      that.getCardData()
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    app.getLogiCallback('', function () {
      that.getCardData()
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})