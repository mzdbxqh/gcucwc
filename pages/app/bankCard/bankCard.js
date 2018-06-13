var app = getApp()
var jsUtil = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankcardNo: ""
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

    // 判空
    if (self.data.bankcardNo === self.data.bankcardNo) {
      jsUtil.formErrTip({
        title: "银行卡没变化，不用提交"
      })
      return
    }

    // 判空
    if (self.data.bankcardNo === "") {
      jsUtil.formErrTip({
        title: "请填写银行卡号"
      })
      return
    }

    // 判断长度
    const len = self.data.bankcardNo.length
    if (len !== 16 && len !== 19) {
      jsUtil.formErrTip({
        title: "银行卡号长度不对"
      })
      return
    }

    // 判断bin(错误前置，无错继续往下走)
    const prefix = self.data.bankcardNo.substr(0,6) + ''
    // 16位银行卡，3种bin
    if (len === 16) {
      if (prefix !== '421349' &&
          prefix !== '434061' &&
          prefix !== '434062' &&
          prefix !== '524094' &&
          prefix !== '526410' &&
          prefix !== '552245' &&
          prefix !== '621080' &&
          prefix !== '621466' &&
          prefix !== '621488' &&
          prefix !== '621499' &&
          prefix !== '622966' &&
          prefix !== '622988' &&
          prefix !== '621082' &&
          prefix !== '623251' &&
          prefix !== '622382' &&
          prefix !== '621487' &&
          prefix !== '621083' &&
          prefix !== '621084' &&
          prefix !== '623350' &&
          prefix !== '620107') {
        jsUtil.formErrTip({
          title: "不是有效的建设银行储蓄卡卡号，请核对银行卡"
        })
        return
      }
    // 19位银行卡号,5种bin
    } else {
      if (prefix !== '621284' &&
          prefix !== '436742' &&
          prefix !== '589970' &&
          prefix !== '620060' &&
          prefix !== '621081' &&
          prefix !== '621467' &&
          prefix !== '621598' &&
          prefix !== '621621' &&
          prefix !== '621700' &&
          prefix !== '622280' &&
          prefix !== '622700' &&
          prefix !== '621673' &&
          prefix !== '623211' &&
          prefix !== '623668' &&
          prefix !== '623094' &&
          prefix !== '623669' &&
          prefix !== '623656' &&
          prefix !== '623644') {
        jsUtil.formErrTip({
          title: "不是有效的建设银行储蓄卡卡号，请核对银行卡"
        })
        return
      }
    }

    jsUtil.formLoading({
      title: "正在提交"
    })

    var postData = {
      bankcardNo: self.data.bankcardNo,
      formId: formId
    }

    jsUtil.sessionRequest({
      url: '/bankcard/log',
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
      url: '/bankcard',
      method: 'GET',
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        self.setData({
          bankcardNo: res.bankcardNo
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