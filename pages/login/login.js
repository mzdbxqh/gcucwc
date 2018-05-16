var jsUtil = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 用户提供手机号码用于绑定
   */
  viewAsMember: function (e) {
    console.log(e)
    if (e.detail.encryptedData) {
      jsUtil.sessionRequest({
        url: '/user/bind/phone',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        },
        success: function(res1) {
          console.log(res1)
          var result = res1.result
          // 进入手动绑定逻辑
          if(result == "手动绑定"){
            // 此处userType为手机号码
            app.globalData.userType = res1.userType
            app.globalData.isLogin = false
            wx.redirectTo({
              url: '/pages/app/bindPhone/bindPhone',
            })
          } else if (result == "绑定成功") {
            app.globalData.userType = res1.userType
            app.globalData.isLogin = true
            wx.redirectTo({
              url: '/pages/app/list',
            })
          }
        }
      })
    }
  },

  /**
   * 访客访问
   */
  viewAsGuest: function () {
    wx.redirectTo({
      url: '/pages/news/list',
    })
  }
})