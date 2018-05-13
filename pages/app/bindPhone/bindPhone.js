var app = getApp()
var jsUtil = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    code: "",
    certificateNo: "",
    phoneFocus: false, //把焦点转移到input
    phoneDisabled: false,
    codeFocus: false // 把焦点转移到学号/工号输入框
  },

  /**
   * 输入手机
   */
  phoneChange: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  /**
   * 输入学号/工号
   */
  codeChange: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  /**
   * 输入证件号码
   */
  certificateNoChange: function(e) {
    this.setData({
      certificateNo: e.detail.value
    })
  },

  /**
   * 提交表单
   */
  callSubmit: function (e) {

    var that = this

    if (that.data.phone === "") {
      jsUtil.formErrTip({
        title: "请填写手机号码"
      })
      return
    }

    if (that.data.phone.length !== 11) {
      jsUtil.formErrTip({
        title: "手机号码不正确"
      })
      return
    }

    if (that.data.code === "") {
      jsUtil.formErrTip({
        title: "请填写学号/工号",
        duration: 9000
      })
      return
    }

    if (that.data.certificateNo === "") {
      jsUtil.formErrTip({
        title: "请填写证件号码"
      })
      return
    }

    jsUtil.formLoading({
      title: "正在提交"
    })

    var postData = {
      phone: that.data.phone,
      userId: that.data.code,
      certificateNo: that.data.certificateNo
    }

    jsUtil.sessionRequest({
      url: '/user/bind',
      data: postData,
      success: function (res) {
        wx.redirectTo({
          url: '/pages/app/bindPhone/checkVerifyCode',
        })
      },
      fail: function (e) {
        jsUtil.formErrTip({
          title: "请检查信息"
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(app.globalData.userType)
    if(app.globalData.userType != "") {
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