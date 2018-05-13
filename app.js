//app.js
App({
  onLaunch: function () {
    
  },
  globalData:{
    userInfo: null,
    isLogin: false,
    userType: "",
    sessionId: ""
  },
  
  /**
   * 全局Url
   */
  // serverUrl: "http://localhost:10011",
  // serverUrl: "http://192.168.199.108:10011",
  serverUrl: "https://cwc.gcu.edu.cn/app" // 服务器Url
})