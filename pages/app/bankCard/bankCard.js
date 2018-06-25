var app = getApp()
var jsUtil = require('../../../utils/util.js')
var bankcardUtil = require('../../../utils/bank-card-util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankcardNo: "",
    initNoValue: ""
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
   * 提交表单
   */
  callSubmit: function (e) {

    const self = this
    const formId = e.detail.formId

    const checkResult = bankcardUtil.verifyBankcardNoWithOldNo(self.data.bankcardNo,self.data.initNoValue)

    if(checkResult !== 'success') {
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
      formId: formId
    }

    jsUtil.sessionRequest({
      url: '/app/bankcard/log',
      data: postData,
      success: function () {
        jsUtil.formSuccessTip({
          title: '请等候审核',
          callback: function () {
            wx.navigateTo({
              url: '/pages/app/bankCard/log',
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
      url: '/user/bankcard/openId/' + app.globalData.openId,
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        self.setData({
          bankcardNo: res.bankcardNo,
          initNoValue: res.bankcardNo
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