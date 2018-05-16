//app.js
App({
  onLaunch: function () {
    
  },
  globalData:{
    userInfo: null,
    isLogin: false,
    userType: "",
    sessionId: "",
    unionId: "",
    openId: ""
  },
  
  /**
   * 全局Url
   */
  // serverUrl: "http://localhost:10011",
  // serverUrl: "http://192.168.199.209:10011/app",
  // serverUrl: "http://192.168.199.108:10011/app",
  serverUrl: "https://cwc.gcu.edu.cn/app" // 服务器Url
})