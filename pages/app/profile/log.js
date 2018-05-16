var app = getApp()
var jsUtil = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.serverUrl + '/user/avatar/' + app.globalData.openId + '/last',
    status: "无记录"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    jsUtil.sessionRequest({
      url: '/user/avatar/log/' + app.globalData.openId +  '/last',
      success: function(res) {
        console.log(res)
        if (res.localAvatar) {
          var newStatus = ""
          switch(res.delFlag){
            case 0:
              newStatus = "审核中"
              break
            case 1:
              newStatus = "审核不通过"
              break;
            case 2:
              newStatus = "审核通过"
              break;
          }
          that.setData({
            status: newStatus,
            url: app.serverUrl + '/user/avatar/' + app.globalData.openId + '/last'
          })
        }
      },
      fail: function(e) {
        jsUtil.formErrTip({
          title: "无上传记录",
          callback: function () {
            wx.navigateBack({})
          }
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