import WeCropper from '../../../weCropper/we-cropper.js'
var jsUtil = require('../../../utils/util.js')
const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth * 0.8 - 30 // 示例为一个与屏幕等宽的矩形裁剪框
const height = (width * 240) / 168

Page({
  data: {
    hasSelected: false,
    cropperOpt: {
      id: 'cropper',
      width,  // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: (width - 168) / 2, // 裁剪框x轴起点
        y: (height - 240) / 2, // 裁剪框y轴期起点
        width: 168, // 裁剪框宽度
        height: 240 // 裁剪框高度
      }
    }
  },
  onLoad(option) {
    const { cropperOpt } = this.data
    // 若同一个页面只有一个裁剪容器，在其它Page方法中可通过this.wecropper访问实例
    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context: ${ctx}`)
        wx.showToast({
          title: '导入中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context: ${ctx}`)
        wx.hideToast()
      })
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getUploadLog() {
    wx.navigateTo({
      url: '/pages/app/profile/log',
    })
  },
  uploadTap() {
    const self = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        self.wecropper.pushOrign(src)
        self.setData({
          hasSelected: true
        })
      }
    })
  },
  getCropperImage() {
    // 如果还没选图片，不给上传(空图片)
    const self = this
    if(!self.data.hasSelected) return

    jsUtil.formLoading({
      title: '正在上传'
    })
    this.wecropper.getCropperImage((src) => {
      if (src) {
        console.log(src)
        jsUtil.sessionUploader({
          url: '/media/avatar/upload',
          filePath: src,
          success: function (data) {
            jsUtil.formSuccessTip({
              title: '请等候审核',
              callback: function(){
                wx.navigateBack()
              }
            })
          }
        })
        // console.log(src)
        // wx.previewImage({
        //   current: '', // 当前显示图片的http链接
        //   urls: [src] // 需要预览的图片http链接列表
        // })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  }
})
