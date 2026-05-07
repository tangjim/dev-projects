// pages/delivery/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentView: "deliveryPlan",
    tabItems: [
      {text:"配送计划", id:"deliveryPlan"},
      {text:"配送记录", id:"deliveryRecord"},
      {text:"零售记录", id:"retailRecord"}
    ]
  },

  _selectdTab(e) {
    this.setData({currentView:this.data.tabItems[e.detail.index].id});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({active:0})
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})