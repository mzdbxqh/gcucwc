var app = getApp()
var jsUtil = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifyCode: ""
  },

  /**
   * 输入验证码
   */
  verifyCodeChange: function (e) {
    this.setData({
      verifyCode: e.detail.value
    })
  },

  /**
   * 提交表单
   */
  callSubmit: function (e) {

    var that = this

    if (that.data.verifyCode === "") {
      jsUtil.formErrTip({
        title: "请填写验证码"
      })
      return
    }

    jsUtil.formLoading({
      title: "正在提交"
    })

    var postData = {
      code: that.data.verifyCode
    }

    jsUtil.sessionRequest({
      url: '/user/info/phone/code',
      data: postData,
      success: function (res) {
        app.globalData.isLogin = true
        jsUtil.formSuccessTip({
          title: '绑定成功',
          callback: function(){
            wx.redirectTo({
              url: '/pages/app/list/list',
            })
          }
        })
      },
      fail: function (e) {
        jsUtil.formErrTip({
          title: "验证码无效",
          callback: function(){
            wx.redirectTo({
              url: '/pages/app/bindPhone/bindPhone',
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(app.globalData.userType)
    if (app.globalData.userType != "") {
      that.setData({
        phone: app.globalData.userType,
        phoneDisabled: true,
        codeFocus: true
      })
    } else {
      that.setData({
        phoneFocus: true
      })
    }
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
    var that = this
    return jsUtil.doShare({
      page: "feedback"
    })
  }
})