Page({
  data: {
    list: [
      {
        id: 'phone',
        name: '缴费方式',
        open: false,
        pages: [
            {
              title: '2017年老生缴费指南',
              pid: 0
            },
            {
              title: '柜台缴费说明',
              pid: 5
            },
            {
              title: '网银缴费流程',
              pid: 1
            },
            {
              title: '手机银行缴费流程',
              pid: 2
            },
            {
              title: '建行金蜜蜂App缴费流程',
              pid: 3
            },
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
            title: '如何查询新生学号',
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
  }
});
