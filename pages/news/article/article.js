const app = getApp()
const jsUtil = require('../../../utils/util.js')
const WxParse = require('../../../wxParse/wxParse.js')
const content = require('../../../utils/content.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    jsUtil.sessionRequest({
      url: '/news/content/' + options.pid,
      method: 'GET',
      success: function (res) {
        console.log(res)
        self.setData({
          title: res.title,
          content: res.content
        })
        wx.setNavigationBarTitle({
          // title: content.html[options.pid].title
          title: res.title
        })
        // WxParse.wxParse('article', 'html', content.html[options.pid].content, self, 18);
        WxParse.wxParse('article', 'html', res.content, self, 18);
      }
    })
    
  },

  navBack: function (){
    wx.navigateBack({
      delta: 1
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
