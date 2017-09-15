// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{
      address:'',
      loglat:'',
    }
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
    if(e.detail.value.num == ''|| e.detail.value.buyer == '' || e.detail.value.phone == ''|| e.detail.value.address == ''){
      if(e.detail.value.num == ''){
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
          title: '地址',
          image: '../../images/error.png',
          duration: 2000
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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