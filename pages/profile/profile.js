
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }
})
