var app = getApp()

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

// 需要登录态时调用本方法
function getUserInfo(cb) {
  var that = this
  // 调用回调函数并传入用户信息
  if (app.globalData.userInfo) {
    typeof cb == "function" && cb(app.globalData.userInfo)
  } else {
    //调用登录接口
    wx.login({
      success: function (res) {
        if (res.code) {
          // 发起网络请求，获取unionID和微信的sessionKey
          wx.request({
            url: app.serverUrl + '/user/login',
            data: {
              code: res.code
            },
            // 返回用户状态
            success: function (res1) {
              // 用户未绑定身份，尝试获取手机号码
              if (res1.statusCode === 404) {
                console.log("Server return 404")
                // 检查是否有权限获取用户信息
                that.checkUserInfoAuth({
                  success: function () {
                    console.log("checkUserInfoAuth")
                    wx.redirectTo({
                      url: '/pages/login/login',
                    })
                  }, 
                  fail: function () {
                    that.showAuthTip(() => {
                      console.log("callback")
                      // 获取用户信息
                      if (that.getUserDetailInfo()) {
                        console.log("跳转到获取手机号码页")
                      } else {
                        that.exitTip('出错了')
                      }
                    })
                  }
                });
                // 用户状态正常，进入正常页面
              } else if (res1.statusCode === 200) {
                console.log("Server return 200")
              }
              // 服务器请求失败
            }, fail: function () {
              console.log("Server error")
              that.exitTip('服务器出错了')
            }
          })
          // login接口调用失败
        } else {
          console.log('服务器登录失败！' + res.errMsg)
          that.exitTip('出错了')
        }
      }, fail: function () {
        console.log("login fail")
        that.exitTip('出错了')
      }
    })
  }
}

// 检查是否有权限获取用户信息(是否纯判断-首次调用时使用)
function checkUserInfoAuth({success, fail}) {
  // 异步方法，有坑
  wx.getSetting({
    success: (res) => {
      if (!res.authSetting["scope.userInfo"]) {
        typeof fail == "function" && fail()
      } else {
        typeof success == "function" && success()
      }
    }
  })
}

// 授权提示
function showAuthTip(cb) {
  var that = this
  wx.showModal({
    title: '提示',
    content: '请允许获取用户信息，以进行校内身份绑定等操作。',
    confirmText: '授权',
    cancelText: '退出',
    success: function (res) {
      if (res.confirm) {
        that.showAuthDialog(cb)
      } else if (res.cancel) {
        that.exitTip('')
      }
    }
  })
}

// 授权页面
function showAuthDialog(cb) {
  var that = this
  // 提示用户授权
  wx.openSetting({
    success: (res2) => {
      // 还是没给授权
      if (!res2.authSetting["scope.userInfo"]) {
        that.showAuthTip(cb)
      } else {
        typeof cb == "function" && cb()
      }
    }
  })
}

// 获取用户详细信息以及密钥等
function getUserDetailInfo() {
  wx.getUserInfo({
    withCredentials: true,
    success: function (res2) {
      console.log(res2)
      return true
    },
    fail: function (err) {
      console.log(err)
      return false
    }
  })
}

function exitTip(tip) {
  var wholeTip = tip ? tip + ',' : ''
  wholeTip += '点右上角同心圆退出'
  wx.showToast({
    title: wholeTip,
    icon: 'none',
    duration: 2000
  })
}

module.exports = {
  checkVersion: checkVersion,
  formErrTip: formErrTip,
  formSuccessTip: formSuccessTip,
  getUserInfo: getUserInfo,
  checkUserInfoAuth: checkUserInfoAuth,
  showAuthTip: showAuthTip,
  showAuthDialog: showAuthDialog,
  getUserDetailInfo: getUserDetailInfo,
  exitTip: exitTip
}
