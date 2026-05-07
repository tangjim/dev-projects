// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    tabbarList: [
      {"pagePath": "/pages/delivery/index", "text": "配送管理", "iconFont": "~icon-peisongcart"},
      {"pagePath": "/pages/store/index", "text": "进货计划", "iconFont": "~icon-caigou"},
      {"pagePath": "/pages/recycle/index", "text": "退回管理", "iconFont": "~icon-tuihuoguanli"},
      {"pagePath": "/pages/customer/index", "text": "客户管理", "iconFont": "~icon-kehuguanli"}
    ]
  },
  methods: {
    _switchTab(e){
      // console.log(e.currentTarget.dataset)
      const { index,url } = e.currentTarget.dataset;
      this.setData({active:e.currentTarget.dataset.index});
      wx.switchTab({url});
    }
  }
})