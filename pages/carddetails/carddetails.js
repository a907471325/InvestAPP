// pages/carddetails/carddetails.js
//获取应用实例
var app = getApp()

Page({
  data: {
    mobile: '',
    folded:{
      project:'展开',
      projectInfo:'',
      need:'展开',
      needInfo:'',
      intro:'展开',
      introInfo:''
    },
    getData: {},
    isshare: false,
    isviewImage: true,
    econds: 3,
    cardDetailsData: {},
    removeCollCard: {
      'url': 'Card/removeCollCard',
      'data': {
        'id': ''
      }
    },
    GetOthersCard2: {
      'url': 'https://api.91ygj.com/vCard/Card/GetOthersCard2',
      'data': {
        'id': ''
      }
    },
    CardShareData: {
      'url': 'Card/GetCardShared',
      'data': {
        'id': ''
      }
    },
    cardDetails: {
      'url': 'Card/GetCard',
      'data': {
        'id': ''
      }
    },
    othersCardDetails: {
      'url': 'Card/GetOthersCard',
      'data': {
        'id': ''
      }
    },
    GetCardQRCode: {
      'url': 'Card/GetCardQRCode',
      'data': {
        'id': ''
      }
    }
  },
  switchProjectStatus:function(){
    if(this.data.folded.project == '展开'){
      this.setData({
        'folded.project': '收起',
        'folded.projectInfo': this.data.cardDetailsData.project
      })
    }
    else{
      this.setData({
        'folded.project': '展开',
        'folded.projectInfo': this.data.cardDetailsData.project.slice(0,19)+'......'
      })
    }
  },
  switchNeedStatus: function () {
    if (this.data.folded.need == '展开') {
      this.setData({
        'folded.need': '收起',
        'folded.needInfo': this.data.cardDetailsData.need
      })
    }
    else {
      this.setData({
        'folded.need': '展开',
        'folded.needInfo': this.data.cardDetailsData.need.slice(0, 19) + '......'
      })
    }
  },
  switchIntroStatus: function () {
    if (this.data.folded.intro == '展开') {
      this.setData({
        'folded.intro': '收起',
        'folded.introInfo': this.data.cardDetailsData.intro
      })
    }
    else {
      this.setData({
        'folded.intro': '展开',
        'folded.introInfo': this.data.cardDetailsData.intro.slice(0, 19) + '......'
      })
    }
  },
  //打开地图
  openAddress: function (e) {
    wx.getLocation({
      //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = parseFloat(e.target.dataset.loglat.split(",")[0])
        var longitude = parseFloat(e.target.dataset.loglat.split(",")[1])
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name: e.target.dataset.name,
          address: e.target.dataset.name,
          scale: 28,
          complete: function (res) {
          }
        })
      }
    })
  },
  onShareAppMessage: function () {
    var that = this
    var dataSet = that.data.cardDetailsData
    var avatarUrl = dataSet.avatarUrl
    //  avatarUrl = avatarUrl.replace('&','%26')
    //  avatarUrl = avatarUrl.replace('=', '%3D')
    //  avatarUrl = avatarUrl.replace('/', '%2F')
    //  avatarUrl =  avatarUrl.replace('?', '%3F')
    // console.log('pages/carddetails/carddetails?id=' + dataSet.id + '&name=' + dataSet.name + '&title=' + dataSet.title + '&mobile=' + dataSet.mobile + '&companyName=' + dataSet.companyName + '&more=' + dataSet.more + '&avatarUrl=' + encodeURIComponent(avatarUrl) + '&loglat=' + dataSet.loglat + '&address=' + dataSet.address + '&share=1')
    return {
      title: '这是我的名片,请惠存。',
      path: 'pages/carddetails/carddetails?id=' + dataSet.id + '&name=' + dataSet.name + '&title=' + dataSet.title + '&mobile=' + dataSet.mobile + '&companyName=' + dataSet.companyName + '&loglat=' + dataSet.loglat + '&address=' + dataSet.address + '&share=1' + '&avatarUrl=' + encodeURIComponent(avatarUrl) + '&project=' + dataSet.project + '&need=' + dataSet.need + '&intro=' + dataSet.intro,
      success: function (res) {
        // 分享成功
        console.log('success')
      },
      fail: function (res) {
        // 分享失败
        console.log('fail')
      }
    }
  },
  //拨打电话
  phoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.id //仅为示例，并非真实的电话号码
    })
  },
  countdown: function (that) {
    var second = that.data.econds
    var timer
    if (second == 0) {
      clearTimeout(timer);
      that.setData({
        econds: 3,
        isviewImage: true
      });
      return;
    }
    timer = setTimeout(function () {
      that.setData({
        econds: second - 1,
        isviewImage: false
      });
      that.countdown(that);
    }, 1000)
  },
  //获取二维码地址
  getCode: function (e) {
    var that = this
    that.setData({
      'GetCardQRCode.data.id': e.currentTarget.dataset.id
    })
    app.postData(that.data.GetCardQRCode, function (res) {
      wx.previewImage({
        current: res.data + '?' + Math.random(),
        urls: [res.data + '?' + Math.random()],
        success: function () {
          that.countdown(that);
        }
      })
    })
  },
  //删除单张名片
  removeCard: function (e) {
      var myCard = wx.getStorageSync('cardData') || []
      if(myCard){
        for (var i = 0; i < myCard.length; i++) {
          if (myCard[i].id === e.target.dataset.id) {
            myCard.splice(i)
          }
        }
      }
      wx.setStorageSync('cardData',myCard)
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 1000,
      })
      wx.navigateBack({
        delta: 1
      })

  },
  //编辑单张名片
  editCard: function (e) {
    wx.navigateTo({
      url: '../createcard/createcard?id=' + e.target.dataset.id
    })
  },
  //打开我的名片
  openMycard: function () {
    wx.switchTab({
      url: '../card/card'
    })
  },
  //移除收藏的名片
  undockCard: function (e) {
    var that = this
    // that.setData({
    //   'removeCollCard.data.id': e.target.dataset.id
    // })
    // app.postData(that.data.removeCollCard, function (res) {
    //   wx.showToast({
    //     title: res.msg,
    //     icon: 'success',
    //     duration: 2000,
    //     complete: function () {
    //       app.postData(that.data.othersCardDetails, function (res) {
    //         that.setData({
    //           cardDetailsData: res.data
    //         })
    //       })
    //     }
    //   })
    // })
    var cardBox = wx.getStorageSync('othersCardData') || []
    if (cardBox) {
      for (var i = 0; i < cardBox.length; i++) {
        if (cardBox[i].id === e.target.dataset.id) {
          cardBox.splice(i)
        }
      }
    }
    wx.setStorageSync('othersCardData', cardBox)
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1000,
    })
    wx.navigateBack({
      delta: 1
    })
  },
  //收藏他人名片夹
  addCard: function (e) {
    var that = this
    that.setData({
      'collCardData.data.id': e.target.dataset.id
    })
    app.postData(that.data.collCardData, function (res) {
      wx.showToast({
        title: res.msg,
        icon: 'success',
        duration: 2000,
        complete: function () {
          // wx.switchTab({
          //   url: '../mycard/mycard'
          // })
          app.postData(that.data.othersCardDetails, function (res) {
            that.setData({
              cardDetailsData: res.data
            })
          })
        }
      })
    })
  },
  //收藏他人名片夹 并且打开名片小程序
  addCardOpen: function (e) {
    var that = this
    var othersCardData = that.data.cardDetailsData
    var preData = wx.getStorageSync('othersCardData') || []
    preData.unshift(othersCardData)
    wx.setStorageSync('othersCardData', preData)
    
    wx.showToast({
        title: '添加名片',
        icon: 'success',
        duration: 2000,
        complete: function () {
          wx.navigateTo({
            url: '../cardcase/cardcase',
          })
        }
      })
    
  },
  openShare: function (e) {
    var that = this
    that.setData({
      'CardShareData.data.id': e.target.dataset.id
    })
    app.postData(that.data.CardShareData, function (res) {
      wx.previewImage({
        current: res.data + '?' + Math.random(), // 当前显示图片的http链接
        urls: [res.data + '?' + Math.random()] // 需要预览的图片http链接列表
      })
      that.setData({
        isviewImage: true
      })
    })
  },
  onLoad: function (options) {
    app.getUserInfo()
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    if (options.q) {
      var src = decodeURIComponent(options.q)

      console.log(options.q)
      src.match(/id=(\S*)&share=1/)[1]
      that.setData({
        'cardDetailsData.id': src.match(/id=(\S*)&share=1/)[1],
        'otherscardDetailsData.id': src.match(/id=(\S*)&share=1/)[1],
        'GetOthersCard2.data.id': src.match(/id=(\S*)&share=1/)[1]
      })
      app.getLogiCallback('', function () {
        wx.request({
          url: that.data.GetOthersCard2.url,
          method: 'POST',
          data: that.data.GetOthersCard2.data,
          header: {
            'token': wx.getStorageSync('loginSuccessData').token,
            'content-type': 'application/json'
          },
          success: function (res) {
            that.setData({
              isshare: true,
              cardDetailsData: res.data.data,
              mobile: wx.getStorageSync('loginSuccessData').mobile
            })
          },
          fail: function (res) {
            console.log('请求出错')
          }
        })
      })
    } else {
      that.setData({
        'cardDetailsData.id': options.id,
        'otherscardDetailsData.id': options.id,
        'GetOthersCard2.data.id': options.id
      })
      var othersCardData = wx.getStorageSync('othersCardData') || []
      if (options.share) {
        that.setData({
          isshare: true,
          'cardDetailsData.id': options.id,
          'cardDetailsData.name': options.name,
          'cardDetailsData.title': options.title,
          'cardDetailsData.mobile': options.mobile,
          'cardDetailsData.companyName': options.companyName,
          'cardDetailsData.avatarUrl': decodeURIComponent(options.avatarUrl),
          'cardDetailsData.email': options.email,
          'cardDetailsData.loglat': options.loglat,
          'cardDetailsData.address': options.address,
          'cardDetailsData.project': options.project,
          'cardDetailsData.need': options.need,
          'cardDetailsData.intro': options.intro,
          'folded.projectInfo': options.project.slice(0, 19) + '......',
          'folded.needInfo': options.need.slice(0, 19) + '......',
          'folded.introInfo': options.intro.slice(0, 19) + '......'
        })
        if (othersCardData) {
          for (var i = 0; i < othersCardData.length; i++) {
            if (othersCardData[i].id = options.id) {
              that.setData({
                'cardDetailsData.hasCollect':1
              })
            }
          }
        }
      } else {
        if (options.type) {
          // that.setData({
          //   getData: that.data.othersCardDetails,
          // }) 
          if (othersCardData) {
            for (var i = 0; i < othersCardData.length; i++) {
              if (othersCardData[i].id = options.id) {
                that.setData({
                  cardDetailsData: othersCardData[i],
                  'cardDetailsData.hasCollect': 1,
                  'folded.projectInfo': othersCardData[i].project.slice(0, 19) + '......',
                  'folded.needInfo': othersCardData[i].need.slice(0, 19) + '......',
                  'folded.introInfo': othersCardData[i].intro.slice(0, 19) + '......'
                })
              }
            }
          }
        } else {
          // that.setData({
          //   getData: that.data.cardDetails,
          // })
          var cardData = wx.getStorageSync('cardData')[0]
          that.setData({
            cardDetailsData: cardData,
            mobile: cardData.mobile,
            'folded.projectInfo': cardData.project.slice(0, 19) + '......',
            'folded.needInfo': cardData.need.slice(0, 19) + '......',
            'folded.introInfo': cardData.intro.slice(0, 19) + '......'
          })
          wx.setNavigationBarTitle({
            title: that.data.cardDetailsData.name
          })
        }  
      }
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
      var that = this
      if (!that.data.isshare){
        //本人打开名片
        if(that.data.mobile&&that.data.mobile==that.data.cardDetailsData.mobile){
          var cardData = wx.getStorageSync('cardData')[0]
          that.setData({
            cardDetailsData: cardData,
            mobile: cardData.mobile,
            'folded.projectInfo': cardData.project.slice(0,19)+'......',
            'folded.needInfo': cardData.need.slice(0, 19)+'......',
            'folded.introInfo': cardData.intro.slice(0, 19)+'......'
          })
        }
        //打开名片夹中的名片
        else{
          
        }
      }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})