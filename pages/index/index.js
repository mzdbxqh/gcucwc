Page({
  data: {
    list: [
      {
        id: 'tuition',
        name: '学费相关',
        open: false,
        pages: [
            {
              "title": '2017年老生缴费指南',
              "pid": 0
            },
            {
              "title": '柜台缴费说明',
              "pid": 5
            },
            {
              "title": '网银缴费流程',
              "pid": 1
            },
            {
              "title": '手机银行缴费流程',
              "pid": 2
            },
            // {
            //   "title": '金蜜蜂App缴费流程',
            //   "pid": 4
            // },
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
  }
});
