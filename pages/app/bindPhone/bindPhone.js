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

    if (that.data.code === "" || (that.data.code.length != 7 && that.data.code.length != 12)) {
      jsUtil.formErrTip({
        title: "请填写有效学号/工号",
        duration: 9000
      })
      return
    }

    if (that.data.certificateNo === "") {
      jsUtil.formErrTip({
        title: "请填写证件号码",
        duration: 9000
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
      url: '/user/info/phone/manual',
      data: postData,
      success: function (res) {
        // 手动填写的手机号码，需验证
        if (res === "发送验证码"){
          wx.redirectTo({
            url: '/pages/app/bindPhone/checkVerifyCode',
          })
        // 已绑定微信的手机号码，不需要验证
        } else {
          app.globalData.isLogin = true
          jsUtil.formSuccessTip({
            title: '绑定成功',
            callback: function () {
              wx.redirectTo({
                url: '/pages/app/list',
              })
            }
          })
        }
        
      },
      fail: function (e) {
        jsUtil.formErrTip({
          title: "信息可能有误"
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