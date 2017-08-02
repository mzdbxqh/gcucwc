var jsUtil = require('../../utils/util.js')
Page({
  data: {
    list: [
      {
        id: 'phone',
        name: '缴费方式',
        open: false,
        pages: [
            {
              title: '网银缴费图文流程',
              pid: 1
            },
            {
              title: '手机银行缴费图文流程',
              pid: 2
            },
            // {
            //   title: '建行金蜜蜂App缴费流程',
            //   pid: 3
            // },
            {
              title: '柜台缴费图文说明（必读）',
              pid: 5
            }
          ]
      },
      {
        id: 'tuition',
        name: '收费项目',
        open: false,
        pages: [
          {
            title: '学费标准',
            pid: 10
          },
          {
            title: '住宿费',
            pid: 11
          },
          {
            title: '医疗保险',
            pid: 12
          }
        ]
      },
      {
        id: 'question',
        name: '其他问题',
        oepn: false,
        pages: [
          {
            title: '申请了生源地贷款该如何缴费',
            pid: 21
          },
          {
            title: '如何办理助学贷款',
            pid: 22
          }
        ]
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  onLoad: function (e) {
    jsUtil.checkVersion(function(){

    })
  }
});
