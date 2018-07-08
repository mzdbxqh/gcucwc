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
    houseCode: "",
    coldWaterRemain: 0,
    hotWaterRemain: 0,
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
   * 输入宿舍号
   */
  houseCodeChange: function (e) {
    this.setData({
      houseCode: e.detail.value
    })
  },

  /**
   * 输入冷水剩余量
   */
  coldWaterRemainChange: function (e) {
    this.setData({
      coldWaterRemain: Math.ceil(e.detail.value)
    })
  },

  /**
   * 输入热水剩余量
   */
  hotWaterRemainChange: function (e) {
    this.setData({
      hotWaterRemain: Math.ceil(e.detail.value)
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
        title: '请填写预约人姓名'
      })
      return
    }

    if (!self.data.houseCode) {
      jsUtil.formErrTip({
        title: '请填写宿舍号，例如C04-123'
      })
      return
    }

    if (!self.data.coldWaterRemain && self.data.coldWaterRemain !== 0) {
      jsUtil.formErrTip({
        title: '请填写冷水表剩余量'
      })
      return
    }

    if (!self.data.hotWaterRemain && self.data.hotWaterRemain !== 0) {
      jsUtil.formErrTip({
        title: '请填写热水表剩余量'
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
      houseCode: self.data.houseCode,
      coldWaterRemain: self.data.coldWaterRemain,
      hotWaterRemain: self.data.hotWaterRemain,
      formId: formId
    }

    jsUtil.sessionRequest({
      url: '/app/bankcard/book/waterRefund',
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
      url: '/app/bankcard/book/waterRefund/openId/' + app.globalData.openId + '/last',
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        if (res.result === "无关联宿舍信息"){
          jsUtil.formErrTip({
            title: "无关联宿舍信息",
            callback: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
        self.setData({
          bankcardNo: res.bankcardNo,
          userName: res.userName,
          houseCode: res.houseCode,
          coldWaterRemain: res.coldWaterRemain ? res.coldWaterRemain : 0,
          hotWaterRemain: res.hotWaterRemain ? res.hotWaterRemain : 0,
          hasBook: res.hasBook,
          hasAudit: res.hasAudit,
          hasReady: true
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