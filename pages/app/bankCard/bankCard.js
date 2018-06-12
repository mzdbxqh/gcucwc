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
      if (prefix !== '621080' &&
          prefix !== '621466' &&
          prefix !== '621499') {
        jsUtil.formErrTip({
          title: "不是有效的建设银行储蓄卡卡号，请核对银行卡"
        })
        return
      }
    // 19位银行卡号,5种bin
    } else {
      console.log(prefix)
      console.log(prefix === '622280')
      if (prefix !== '436742' &&
          prefix !== '589970' &&
          prefix !== '621081' &&
          prefix !== '622280' &&
          prefix !== '623668') {
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
        wx.hideLoading()
        self.setData({
          bankcardNo: res
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