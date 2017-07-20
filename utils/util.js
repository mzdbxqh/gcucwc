//表单提示
function formErrTip({ title, duration = 1500, callback = function () { } }) {
  wx.showToast({
    title: title,
    icon: 'loading', //TODO:不支持该ICON
    image: '../../images/tip_error.png',
    duration: duration,
    success: function () {
      // bug解决之前手动延时
      setTimeout(callback, duration)
    }
  })
}
function formSuccessTip({ title, duration = 1500, callback = function () { } }) {
  wx.showToast({
    title: title,
    icon: 'success',
    duration: duration,
    mask: true,
    success: function () {
      // bug解决之前手动延时
      setTimeout(callback, duration)
    }
  })
}

/**
 * 校对微信基础库版本
 */
function checkVersion(callback) {
  wx.getSystemInfo({
    success: function (res) {
      var SDKVersion = res.SDKVersion
      var vers = SDKVersion.split(".")
      if (vers[0] == 1 && vers[1] < 2) {
        formErrTip({
          title: "当前微信版本过低，请升级",
          duration: 50000
        })
      } else {
        callback()
      }
    }
  })
}

module.exports = {
  checkVersion: checkVersion,
  formErrTip: formErrTip,
  formSuccessTip: formSuccessTip
}
