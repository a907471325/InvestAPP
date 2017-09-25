// // pages/course/course.js
// function timer (that) {
//   that.data.sec = that.data.sec + 1
//   if (that.data.sec >= 60) {
//     that.data.sec = 0
//     that.data.min = that.data.min + 1
//   }
// };
// var timer = '';
// function startTimer(timer) {
//   setInterval(timer, 1000)
// };
// function pauseTimer(timer) {
//   clearInterval(timer)
// };
// function resetTimer(timer) {
//   clearInterval(timer)
//   that.data.min = 0
//   that.data.sec = 0
// };

Page({
  /**
   * 页面的初始数据
   */
  data: {
    playing:false,
    min:0,
    sec:0,
    currentPlay:{
      song:'',
      len:'',
      artist:'',
      url:''
    },
    item:{
      type:'book',
      id:'',
      name:'',
      // pressorauthor:'',
      // pagesornum:'',
      // sales:'',
      price:'',
      intro:'',
      // intro:'招商引资源于中国因开放政策所成立的开发区，早期主要集中在吸收制造业的外国直接投资（FDI，Foreign Direct Investment)。中国早期沿海开发区的招商引资所引起的示范效应（地方经济总量增长，地方财政收入增长，地方就业增加，地方政府基础设施投入的增加，地方官员升迁比例增加）被各地政府官员发现，随后中国各级政府成立了大量的开发区并开展招商引资工作。',
      detailSound:[],
      goods:[
        '../../image/123.jpg',
        '../../image/123.jpg',
        '../../image/123.jpg'
      ],
      detailBook:''
      // detailBook:'前言2\n第1章：后危机时代招商引资内涵、原则及趋势6\n第2章：制定符合当地特色的招商引资战略规划57\n第3章构建招商引资调研信息系统94\n3.1信息是招商引资成功的关键96\n3.2招商引资信息调研104\n3.3招商引资调研的内容111\n3.4招商引资调研方式116\n3.5构建招商引资信息管理系统121\n第4章：新形势下招商引资重点关注领域129\n4.1国内招商引资发展现状130\n4.2区域特色招商引资模式138\n4.3现代招商引资6大误区145\n4.5促进招商引资的6项对策153\n4.6招商引资8种路径160\n第5章：塑造优秀的招商引资环境172\n5.1招商引资环境的内涵174\n5.2招商引资环境评价184\n5.3优化招商引资环境6大路径196\n第6章：招商引资形象定位与设计219\n6.1区域招商引资形象的内涵221\n6.2区域招商引资形象设计227\n6.3区域招商引资形象传播242\n第7章：提升区域招商引资竞争力252\n7.1招商引资竞争无处不在253\n7.2招商引资宣传策略259\n7.3专业化招商引资策略265\n7.4产业招商引资策略271\n7.5科学合理制定招商引资政策291\n第8章：设计特色招商引资项目方案300\n8.1项目是招商引资的基础302\n8.2招商引资项目的前期准备工作310\n8.3招商引资项目的包装与推介314\n8.4招商引资项目评价317\n8.5撰写项目商业计划书325\n8.5.1项目商业计划书存在的3个问题325\n8.5.2项目商业计划书编制的关键点327\n8.5.3项目商业计划书的编写格式328\n第9章：高效招商引资谈判331\n9.1招商引资谈判概述332\n9.2谈判人员的组织与管理335\n9.3招商引资谈判准备341\n9.4招商引资谈判策略与技巧355\n9.5招商引资项目签约374\n第10章：招商引资人才选择与培育397\n10.1招商引资人才概述398\n10.2招商引资人才队伍建设5大误区406\n10.3招商引资人才的引进与培养410\n第11章：招商引资风险管理429\n11.1招商引资的风险内涵430\n11.2招商引资风险识别438\n11.3招商引资风险规避方法448\n第12章：招商引资绩效考核464\n12.1招商引资绩效指标465\n12.2优化绩效考核指标体系474\n12.3招商引资绩效考核的实施478\n结语：招商引资是一种方法论486'
    }
  },

  confirmDetails:function(){
    var navUrl = '../order/order?id='+this.data.item.id+"&name="+this.data.item.name+"&price="+this.data.item.price
    wx.navigateTo({
      url: navUrl,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // timer = setInterval(function(){
    //   var that = this
    //   that.data.sec = that.data.sec + 1
    //   if (that.data.sec >= 60) {
    //     that.data.sec = 0
    //     that.data.min = that.data.min + 1
    //   }
    // },1000)
    that.setData({
      'item.type':options.type
    })
    wx.onBackgroundAudioStop(function () {
      that.setData({
        playing: false
      })
    })
    if(that.data.item.type == 'audio'){
      wx.request({
        url: 'http://localhost:8080/weixin-xiaochengxu-music-server/music-list',
        success:function(res){
          that.setData({
            currentPlay: res.data.musicList[0],
            'item.detailSound':res.data.musicList
          })
        }
      })
    }
    if (that.data.item.type == 'book'){
      that.setData({
        "item.id":options.id,
        "item.name":options.name,
        "item.price":options.price,
        "item.intro":options.intro,
        "item.detailBook":options.detailBook
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  playCourse: function (event) {
    var that = this
    var musicId = event.target.dataset.musicId
    var clickedMusic = that.data.item.detailSound[musicId]
    // if (clickedMusic.song != that.data.currentPlay.song) {
    //   resetTimer(timer)
    // }
    that.setData({ currentPlay: clickedMusic })
    // this.audioCtx.setSrc(clickedMusic.url)
    // this.audioCtx.play()
    wx.playBackgroundAudio({
      dataUrl: clickedMusic.url,
      title:clickedMusic.song,
      complete:function(){
        that.setData({
          playing:true
        })
      }
    })
    // startTimer(timer)
  },
  play:function(){
    var that = this
    var currentPlay = that.data.currentPlay
    wx.playBackgroundAudio({
      dataUrl: currentPlay.url,
      title: currentPlay.song,
      complete: function () {
        that.setData({
          playing: true
        })
      }
    })
    // startTimer(timer)
  },
  pause:function(){
    var that = this
    wx.pauseBackgroundAudio({
      success: function () {
        that.setData({
          playing: false
        })
      }
    })
    // pauseTimer(that)
  },
  onReady: function (e) {
    // this.audioCtx = wx.createAudioContext('myAudio')
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})