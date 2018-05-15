var app = getApp()

//表单提示
function formErrTip({ title, duration = 4000, callback = function () { } }) {
  wx.showToast({
    title: title,
    icon: 'none',
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
function formLoading({ title }) {
  wx.showLoading({
    title: title,
    mask: true
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

// 首次登录: 确认用户信息和校内身份方法
// 登陆后，后续session过期也可以用
function getUserInfo(cb) {
  var that = this
  // 如果有用户信息 & 标记为已登录 -> 调用回调函数
  if (app.globalData.userInfo && app.globalData.isLogin) {
    typeof cb == "function" && cb()
  } else {
    // 调用登录接口
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
              if (res1.statusCode === 200) {
                console.log("Server return 200")
                app.globalData.sessionId = res1.data.sessionId
                app.globalData.unionId = res1.data.unionId
                // 用户未绑定身份，尝试获取手机号码
                if (res1.data.result === "未绑定用户" ||
                    res1.data.result === "新用户") {
                  // 检查是否有权限获取用户信息
                  that.checkUserInfoAuth({
                    // 有权限，获取用户信息并跳转登录页，由用户点击按钮触发获取手机号码
                    success: function () {
                      console.log("checkUserInfoAuth")
                      that.getUserDetailInfo(function(){
                        wx.redirectTo({
                          url: '/pages/login/login',
                        })
                      })
                    }, 
                    // 没权限，重复索取直至成功，或放弃退出小程序
                    fail: function () {
                      that.showAuthTip(() => {
                        that.getUserDetailInfo(function () {
                          wx.redirectTo({
                            url: '/pages/login/login',
                          })
                        })
                      })
                    }
                  })
                // 用户状态正常，进入正常页面
                } else {
                // if(res1.data.result === "登录成功") {
                  wx.redirectTo({
                    url: '/pages/app/list/list',
                  })
                }
              // 服务器返回异常
              } else {
              // if (res1.statusCode === 400) {
                that.exitTip('服务器出错')
                console.log("Server return" + res1.statusCode)
              }
              // 服务器请求失败
            }, fail: function () {
              console.log("Server error")
              that.exitTip('服务器出错')
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

// 首次登录: 检查是否有权限获取用户信息
function checkUserInfoAuth({success, fail}) {
  // 异步方法，有坑，必须用回调
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

// 首次登录: 授权提示
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

// 首次登录: 授权页面
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

// 首次登录: 获取用户详细信息以及密钥等
function getUserDetailInfo(cb) {
  var that = this
  wx.getUserInfo({
    withCredentials: true,
    success: function (res2) {
      console.log("get user detail info")
      that.sessionRequest({
        url: '/user/info',
        data: {
          iv: res2.iv,
          rawData: res2.rawData,
          signature: res2.signature,
          encryptedData: res2.encryptedData
        },
        success: function(res3){
          console.log(res3)
          cb()
        },
        fail: function(res4) {
          console.log(res4)
        }
      })
      return true
    }
  })
}

// 首次登录: 错误关闭小程序的提示
function exitTip(tip) {
  var wholeTip = tip ? tip + ',' : ''
  wholeTip += '点右上角同心圆退出'
  wx.showToast({
    title: wholeTip,
    icon: 'none',
    duration: 2000
  })
}

// 封装网络请求方法,每次都带上sessionId,401则重新登录
function sessionRequest({ url, data, success, fail, complete, method = "POST" }) {
  var that = this
  var cookieStr = ""
  var header = {}
  url = app.serverUrl + url
  var callback = function () {
    var sessionId = app.globalData.sessionId
    cookieStr = "JSESSIONID=" + sessionId
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'isWechat': '1',
      'Cookie': cookieStr
    }

    wx.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success: res => {
        var data = res.data
        if (res['statusCode'] === 200) {
          console.log("request success")
          typeof success == "function" && success(data)
        } else if (res['statusCode'] === 401) {
          console.log("request deny")
          that.getUserInfo(callback)
        } else {
          console.log("request fail")
          typeof fail == "function" && fail(data)
        }
      },
      complete: complete
    })
  }
  callback()
}

//封装上传方法,每次都带上sessionId,401则重新登录
function sessionUploader({ url, filePath, formData = {}, success, fail, complete }) {
  var that = this
  var cookieStr = ""
  var header = {}
  url = app.serverUrl + url
  var callback = function () {
    var sessionId = app.globalData.sessionId
    cookieStr = "JSESSIONID=" + sessionId
    header = {
      'content-type': 'multipart/form-data',
      'isWechat': '1',
      'Cookie': cookieStr
    }

    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'file',
      header: header,
      formData: formData,
      success: function (res) {
        var data = res.data
        if (res['statusCode'] === 200) {
          typeof success == "function" && success(data)
        } else if (res['statusCode'] === 401) {
          that.getUserInfo(callback)
        } else if (res['statusCode'] === 417) {
          console.log("登录失效")
          typeof success == "function" && success(data)
        } else if (res['statusCode'] === 500) {
          that.formErrTip({
            title: "真是抱歉，服务器恐怕是被撑爆了"
          })
        }
      },
      fail: function (res) {
        console.log("fail:")
        console.log(res)
      },
      complete: function (res) {
        typeof complete == "function" && complete(res)
      }
    })

  }
  callback()
}

module.exports = {
  checkVersion: checkVersion,
  formErrTip: formErrTip,
  formSuccessTip: formSuccessTip,
  formLoading: formLoading,
  getUserInfo: getUserInfo,
  checkUserInfoAuth: checkUserInfoAuth,
  showAuthTip: showAuthTip,
  showAuthDialog: showAuthDialog,
  getUserDetailInfo: getUserDetailInfo,
  exitTip: exitTip,
  sessionRequest: sessionRequest,
  sessionUploader: sessionUploader
}
