var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [
      'http://n.sinaimg.cn/auto/transform/20160219/W5x6-fxprucv9753519.jpg',
      '../../image/NK`BH0}CQ3NEVE4K9@IUOMW.png',
      '../../image/3.png'
    ],
    item:''
  }, 
	onLoad: function () {
    var that = this
    app.getUserInfo()
    app.getItemList(function(res2){
      that.setData({
        item: res2
      })
    })
  }


})