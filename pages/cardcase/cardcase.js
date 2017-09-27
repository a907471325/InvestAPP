// pages/cardcase/cardcase.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardData:[]
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

  setCardData:function(){
    var othersCardData = wx.getStorageSync('othersCardData') || []
    if (othersCardData){
      this.setData({
        cardData:othersCardData
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    app.getCardcaseData(function(res){
        if(res){
          that.setData({
            cardData: res
          })
        }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})