// pages/createcard/createcard.js
//获取应用实例
var app = getApp()

Page({
  data: {
    iseng: true,
    cardData: {
      "url": "",
      'data': {
        'id': '',
        'name': '',
        'title': '',
        'mobile': '',
        'companyName': '',  
        'avatarUrl': '',
        'email': '',
        'loglat':'',
        'address': '',
        'need':'',
        'project':'',
        'intro':''
      },
      userInfo:{}
    }},
  cardDataName: function (e) {
    this.setData({
      'cardData.data.name': e.detail.value
    })
  },
  cardDataTitle: function (e) {
    this.setData({
      'cardData.data.title': e.detail.value
    })
  },
  cardDataMobile: function (e) {
    this.setData({
      'cardData.data.mobile': e.detail.value
    })
  },
  cardDataCompanyName: function (e) {
    this.setData({
      'cardData.data.companyName': e.detail.value
    })
  },
  cardDataMore: function (e) {
    this.setData({
      'cardData.data.more': e.detail.value
    })
  },
  cardDataProject: function(e){
    this.setData({
      'cardData.data.project':e.detail.value
    })
  },
  cardDataNeed: function (e) {
    this.setData({
      'cardData.data.need': e.detail.value
    })
  },
  cardDataIntro: function (e) {
    this.setData({
      'cardData.data.intro': e.detail.value
    })
  },
  cardDataEmail: function (e) {
    this.setData({
      'cardData.data.email': e.detail.value
    })
  },
  getUUID:function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    if (options.id === "0") {
      that.setData({
        'cardData.data.id':that.getUUID() ,
        'cardData.data.avatarUrl': app.globalData.userInfo.avatarUrl,
      })
      wx.setNavigationBarTitle({
        title: '创建名片'
      })
    } else {
      // var myCards = wx.getStorageSync('cardData')
      // var thisCard
      // for(var i = 0;i < myCards.length;i++){
      //   if (myCards[i].id === options.id){
      //       thisCard = myCards[i]
      //   }
      // }
      app.getCardData('',function(res2){
        wx.setNavigationBarTitle({
          title: '编辑名片'
        })
        that.setData({
          'cardData.data': res2.cardData
        })
      })
     
    }
  },
  onReady: function () {
    // 页面渲染完成    
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  openAddress: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          'cardData.data.address': res.address,
          'cardData.data.loglat': res.latitude + ',' + res.longitude
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
        // complete
      }
    })
  },
  formSubmit: function (e) {
    var that = this
    if (e.detail.value.name === '' || e.detail.value.mobile === '') {
      if (e.detail.value.name === '') {
        wx.showToast({
          title: '姓名必填',
          image: '../../images/error.png',
          duration: 2000
        })
      }
      if (e.detail.value.mobile === '') {
        wx.showToast({
          title: '手机必填',
          image: '../../images/error.png',
          duration: 2000
        })
      }
    } else {
      var data =  {
          'id': that.data.cardData.data.id,
          'name': e.detail.value.name,
          'title': e.detail.value.title,
          'mobile': e.detail.value.mobile,
          'companyName': e.detail.value.companyName,
          'avatarUrl': that.data.cardData.data.avatarUrl,
          'loglat': that.data.cardData.data.loglat,
          'email': e.detail.value.email,
          'address': e.detail.value.address,
          'project':e.detail.value.project,
          'need':e.detail.value.need,
          'intro':e.detail.value.intro
        }
      if (e.detail.value.email != '') {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(e.detail.value.email)) {
          wx.showToast({
            title: '邮箱错误',
            image: '../../images/error.png',
            duration: 2000
          })
        } else {
          app.postCardData(data, function(res){
            wx.navigateBack({
              delta: 1
            })
          })
          // var src = wx.getStorageSync('cardData') || []
          // for(var i = 0;i<src.length;i++){
          //   if(src[i].id === data.id){
          //     src.splice(i)
          //   }
          // }
          // src.unshift(data)
          // wx.setStorageSync('cardData',src )
          // wx.navigateBack({
          //   delta:1
          // })
        }
      } else {
        app.postCardData(data, function (res) {
          wx.navigateBack({
            delta: 1
          })
        })
      }
    }
  },
 
})