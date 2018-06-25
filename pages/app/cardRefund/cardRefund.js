var app = getApp()
var jsUtil = require('../../../utils/util.js')
var bankcardUtil = require('../../../utils/bank-card-util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankcardNo: "",
    userName: "",
    hasBook: true,
    hasAudit: false,
    hasReady: false
  },

  /**
   * 输入银行卡号
   */
  bankcardNoChange: function (e) {
    this.setData({
      bankcardNo: e.detail.value
    })
  },

  /**
   * 输入收款人姓名
   */
  userNameChange: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  /**
   * 提交表单
   */
  callSubmit: function (e) {

    const self = this
    const formId = e.detail.formId

    if (self.data.hasBook) {
      jsUtil.formErrTip({
        title: '已经预约，不能修改'
      })
      return
    }

    if (!self.data.userName) {
      jsUtil.formErrTip({
        title: '请填写收款人姓名'
      })
      return
    }

    const checkResult = bankcardUtil.verifyBankcardNo(self.data.bankcardNo)

    if (checkResult !== 'success') {
      jsUtil.formErrTip({
        title: checkResult
      })
      return
    }

    jsUtil.formLoading({
      title: "正在提交"
    })

    var postData = {
      bankcardNo: self.data.bankcardNo,
      userName: self.data.userName,
      formId: formId
    }

    jsUtil.sessionRequest({
      url: '/app/bankcard/book/cardRefund',
      data: postData,
      success: function () {
        jsUtil.formSuccessTip({
          title: '请等候审核，两天内审核完毕的话会有微信消息提醒',

          callback: function () {
            wx.navigateBack({
              delta: 1
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
    const self = this
    jsUtil.formLoading({
      title: "加载中"
    })
    jsUtil.sessionRequest({
      url: '/app/bankcard/book/cardRefund/openId/' + app.globalData.openId + '/last',
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        self.setData({
          bankcardNo: res.bankcardNo,
          userName: res.userName,
          hasBook: res.hasBook,
          hasAudit: res.hasAudit,
          hasReady: true
        })
      }
    })
  },

  viewLog: function () {
    jsUtil.formErrTip({
      title: '请9月份再查询退款情况'
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