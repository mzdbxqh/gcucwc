var app = getApp()
var jsUtil = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 获取用户详细信息
   */
  getDetailInfo: function (res) {
    console.log(res)
    jsUtil.sessionRequest({
      url: '/user/info',
      data: {
        iv: res.detail.iv,
        rawData: res.detail.rawData,
        signature: res.detail.signature,
        encryptedData: res.detail.encryptedData
      },
      success: function (res2) {
        console.log(res2)
        jsUtil.formSuccessTip({
          title: '授权成功',
          callback: function (){
            wx.navigateBack({})
          }
        })
      },
      fail: function (res4) {
        jsUtil.formErrTip({
          title: '服务器大概是出错了'
        })
      }
    })
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
  
  }
})