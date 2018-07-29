const app = getApp()
const jsUtil = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
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
    const self = this
    const userType = app.globalData.userType
    if (!userType) {
      jsUtil.formErrTip({
        title: '非校内用户无权访问当前页面',
        duration: 2000,
        callback: function () {
          wx.switchTab({
            url: '/pages/news/list',
          })
        }
      })
    }
    jsUtil.sessionRequest({
      url: '/sys/menu/app/list',
      method: 'GET',
      success: function (res) {
        self.setData({
          list: res
        })
      }
    })
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