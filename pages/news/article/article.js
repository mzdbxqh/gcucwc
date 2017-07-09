var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var article = []
    article[0] =  `
      <h1 align="center">2017年老生缴费指南</h1>
      <div class="content">
				<p>　　新学年即将到来，为方便各位老生（2017级以前的学生）在新学年开始能够快捷顺利办妥缴费、注册手续，今年学校使用中国建设银行（以下简称建行）“银行统一代扣”、 “网上银行”及“营业点的代收费平台”三种缴费方式。通过这三种缴费方式中任意一种缴费成功后，建行会将学生的缴费结果实时通知学校。开学后，已缴费成功学生可直接到所在学院办理注册登记手续，无需提供任何缴费凭据.学费发票相关事宜将在开学后另行通知。现将缴费具体流程通知如下：</p>
<p>　　<strong>一、缴费期间</strong>：2017年7月15日 - 2017年8月31日。</p>
<p>　　<strong>二、缴费方式</strong>：</p>
<p><strong>　　1、银行统一代扣</strong></p>
<p>　　（1）请学生通过财务查询系统（http://cwc.gcu.edu.cn:8888/）核对本人的中国建设银行账号，并查询本人应缴学杂费金额。</p>
<p>　　（2）确认无误后，将学杂费足额存入本人建行账号。（注：建行代扣时，需保证卡上余额比扣款金额大1元以上，才允许扣款。为避免发生扣除异地存款手续费、银行卡年费、短信服务费等不可预知的费用后，卡上余额不足以扣款，建议适当多存一些钱）。</p>
<div>　　（3）学校将在7月31日、8月18日、25日和31日委托建行进行统一代扣学杂费。开学后，将根据扣款结果，酌情委托建行对扣款不成功的同学再进行补扣。</div>
<p><strong>　　2、网上银行缴费（需签约网上银行）</strong></p>
<p>　　（1）通过中国建设银行网站（www.ccb.com）,登录个人网上银行。</p>
<p>　　（2）选择「生活服务」→「教育服务」→「学杂费」；</p>
<p>　　（3）依次选择或输入以下信息：</p>
<p>　　　　省　　份：广东省 &nbsp;</p>
<p>　　　　城　　市：广州市</p>
<p>　　　　收费单位：华南理工大学广州学院代收学费</p>
<p>　　　　学　　号：学生学号</p>
<p>　　（4）确认系统提示的信息（姓名、金额）无误后，按提示插网银盾，完成支付。</p>
<p><strong>　　3、建行“代收费平台”缴费</strong></p>
<p>　　请学生于缴费期间到就近的广东省内的建行营业网点（不包括深圳市）缴纳学杂费。届时您只要向建行工作人员索取“代收费凭证”并认真填写如下内容：收费单位：华南理工大学广州学院</p>
<p>　　　　用 户 号：学生学号</p>
<p>　　　　缴 款 人：学生姓名</p>
<p>　　建行工作人员将根据以上信息，通过内部系统查询学生应缴学杂费金额。学生核对金额无误后，可通过现金或建行的活期存折、储蓄卡等方式办理全额缴纳学杂费手续。缴费成功后，建行工作人员会向您提供一张“代收费凭证回单”。</p>
<p>　　在缴费过程中，如果有问题可以拨打建行凤华支行电话（020）3683 5523 （办公），以获得更多信息。</p>
<div>&nbsp;</div>
<p style="text-align: right;">华南理工大学广州学院财务处<br>
二〇一七年六月三十日　</p>
</div>`

    article[1] = `
    <h1 align="center">网银缴费操作流程</h1>
    <div class="content">
				<p>1、登录中国建设银行网站，并按下图中红色箭头所示，点击登录按钮</p>
<p><img alt="" src="http://cwc.gcu.edu.cn/uploadfile/2017/0709/20170709042730519.png" style="width: 996px; height: 746px;"></p>
<p>2、输入账号密码，登录个人网上银行</p>
<p><img alt="" src="http://cwc.gcu.edu.cn/uploadfile/2017/0709/20170709042818171.png" style="width: 996px; height: 746px;"></p>
<p>3、登陆后，按下图红色箭头所示，将鼠标停留在菜单最右侧一项「生活服务」，然后点击「教育服务」</p>
<p><img alt="" src="http://cwc.gcu.edu.cn/uploadfile/2017/0709/20170709042858889.png" style="width: 996px; height: 746px;"></p>
<p>4、点击学杂费按钮</p>
<p><img alt="" src="http://cwc.gcu.edu.cn/uploadfile/2017/0709/20170709043118895.png" style="width: 996px; height: 746px;"></p>
<p>5、选择省、市、学校，输入学号，点击下一步</p>
<p><img alt="" src="http://cwc.gcu.edu.cn/uploadfile/2017/0709/20170709043144507.png" style="width: 996px; height: 746px;"></p>
<p>6、校对付款所用账号、应缴费金额、姓名和专业是否无误，如无误，按提示完成剩下的付款步骤。</p>
<p><img alt="" src="http://cwc.gcu.edu.cn/uploadfile/2017/0709/20170709043225692.png" style="width: 996px; height: 746px;"></p>
<p>7、注意：如学号有误，将提示「8440ZXM04403」错误（尾数是3），表示该生不存在；如已缴费，重复查询该学号欠费信息，将提示「8440ZXM04402」错误（尾数是2），表示已缴费。</p>
</div>`

    article[2] = `
    <h1 align="center">手机银行缴费指南</h1>
    <div class="content">
				<p>1、首先，安装并打开「中国建设银行」App，从底部菜单进入「悦享生活」</p>
<p><img alt="" src="http://cwc.gcu.edu.cn/uploadfile/2017/0709/20170709074643454.jpg" style="width: 640px; height: 1136px;"></p>
<p>2、在「悦享生活」栏目页面，点击「更多」按钮</p>
<p><img alt="" src="http://cwc.gcu.edu.cn/uploadfile/2017/0709/20170709074736181.jpg" style="width: 640px; height: 1136px;"></p>
<p>3、在当前列表页面往下翻页，找到并点击「学杂费」按钮</p>
<p><img alt="" src="http://cwc.gcu.edu.cn/uploadfile/2017/0709/20170709074819265.jpg" style="width: 640px; height: 1136px;"></p>
<p>4、首先确认地区为「广州市」，然后依次选择「缴费单位」、输入「学号」，然后点击查询</p>
<p><img alt="" src="http://cwc.gcu.edu.cn/uploadfile/2017/0709/20170709075359281.jpg" style="width: 640px; height: 1136px;"></p>
<p>5、校对查询出来的「缴费金额」、「姓名」和「专业」，如信息无误，点击支付按钮，按提示完成付款操作。</p>
<p><img alt="" src="http://cwc.gcu.edu.cn/uploadfile/2017/0709/20170709075455952.jpg" style="width: 640px; height: 1136px;"></p>
<p>&nbsp;</p>
</div>`

  article[5] = `
      <h1 align="center">柜台缴费操作流程</h1>
      <div class="content">
        <p><span style="color:red">在柜台缴费时，如工作人员反馈说找不到该生信息，请主动出示以下内容</span></p>
				事项说明:代收华南理工大学广州学院学费说明<br>
项目号:00066<br>
项目名称:银校互联缴费项目<br>
单位号:10001<br>
单位名称:华南理工大学广州学院<br>
操作界面提示:<br>
-「本地特色」<br>
-「8499」<br>
-「代收费」<br>
-「3 通用代收费」<br>
-「8 花都学费代扣」<br>
<strong><span style="color:red">我校在建行柜台系统内有两个缴费入口，其中一个已弃用，将无法找到任何学生信息；新的入口需由「8 花都学费代扣」进入，或需提醒银行工作人员</span></strong><br>
-「【1】代收费」<br>
-「项目号（00066）【银校互联缴费项目】」<br>
-「单位号（10001）【华南理工大学广州学院】」</div>`
    WxParse.wxParse('article', 'html', article[options.pid], that, 18)
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
