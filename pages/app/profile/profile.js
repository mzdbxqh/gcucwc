// pages/app/info/info.js
var app = getApp()
var jsUtil = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: "200630858480",
    name: "张三丰",
    dept: "汽车工程系",
    avatar: ""
    // avatar: app.serverUrl + "/user/avatar/" + app.globalData.openId
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    jsUtil.sessionRequest({
      url: '/user/info/' + app.globalData.openId,
      method: 'GET',
      success: function(data) {
        console.log(data)
        that.setData({
          name: data.name,
          code: data.code,
          dept: data.dept,
          avatar: app.serverUrl + '/user/avatar/' + app.globalData.openId + '/active?' + new Date().getTime()
        })
      }
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
  
  }
})