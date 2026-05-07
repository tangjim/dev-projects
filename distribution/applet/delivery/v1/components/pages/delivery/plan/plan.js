// components/pages/delivery/plan/plan.js
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
    list: [
      {
        customerId: 1,
        customerName: "何春芳",
        storeName: "摊位",
        deliveryDate: "2024/12/20",
        productList: [
          { orderNo:"1", productName: "鲜湿米粉", productType: "二两", supplierName: "秦皇禧玥", num:20, unit:2 },
          { orderNo:"2", productName: "鲜湿切粉", productType: "汤粉", supplierName: "秦皇禧玥", num:20, unit:1 }
        ]
      },{
        customerId: 2,
        customerName: "何妹",
        storeName: "摊位",
        deliveryDate: "2024/12/20",
        productList: [
          { orderNo:"3", productName: "鲜湿米粉", productType: "二两", supplierName: "秦皇禧玥", num:20, unit:2 },
          { orderNo:"4", productName: "鲜湿切粉", productType: "汤粉", supplierName: "秦皇禧玥", num:20, unit:1 }
        ]
      }
    ]
  },

   /**
   * 创建组件时调用
   */
  created: function() {
    var app = getApp();
    // console.log(app.globalData.unitArray);
    // 获取数量单位全局数据
    this.setData({unitArray:app.globalData.unitArray})
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**修改数量单位调用事件 */
    _unitChange: function(val) {
      var currentTargetId = val.currentTarget.id;
      var arr = currentTargetId.split("_");
      var keyName = "list["+arr[0]+"].productList["+arr[1]+"]."+arr[2];
      this.setData({[keyName]:this.data.unitArray[val.detail.value].id});
    },
    /**点击确认送达调用事件 */
    _confirmArrive: function(o) {
      console.log(o.target.dataset.item);
      wx.showModal({
        title: '确认送达',
        content: '是否确认产品已全部送达？',
        complete: (res) => {
          /**确认 */
          if (res.confirm) {
            /**进行数据提交 */
          }
          /**取消 */
          // if (res.cancel) {}
        }
      })
    }
  }
})