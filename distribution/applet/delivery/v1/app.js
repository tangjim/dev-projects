// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    unitArray: [{id:1, name:"斤"},{id:2, name:"个"},{id:3, name:"根"}],
    deliveryTypeArray: [
      {type:1, name: "配送", pid:0}, {type:2, name: "借调", pid:0}, {type:3, name: "退换", pid:0},
      {type:4, name:"配送", color:"#FF7B00", pid:1}, {type:5, name: "归还", color:"#D92400", pid:1}, {type:6, name: "自提", color:"#1F61FF", pid:1},
      {type:7, name:"借走", color:"#FF5340", pid:2}, {type:8, name:"调用", color:"#1F61FF", pid:2},
      {type:9, name:"退回", color:"#A8A8A8", pid:3}, {type:10, name:"置换", color:"#FF5340", pid:3}
    ],
    productArray: [
      {id:1, name:"鲜湿米粉"},
      {id:2, name:"鲜湿切粉"},
      {id:3, name:"干粉"},
      {id:4, name:"撩粉"},
      {id:5, name:"油条"}
    ],
    productNormsArray: [
      {id:1, name:"一两", productId: 1, supplierIds:[1,2]},
      {id:2, name:"二两", productId: 1, supplierIds:[1,2]},
      {id:3, name:"汤粉", productId: 2, supplierIds:[1,2]},
      {id:4, name:"油粉", productId: 2, supplierIds:[1,2]},
      {id:5, name:"1.1", productId: 3, supplierIds:[1,2]},
      {id:6, name:"1.4", productId: 3, supplierIds:[1,2,3]},
      {id:7, name:"1.6", productId: 3, supplierIds:[1,2,3]},
      {id:8, name:"1.8", productId: 3, supplierIds:[1,2]},
      {id:9, name:"细粉", productId: 4, supplierIds:[3]},
      {id:10, name:"粗粉", productId: 4, supplierIds:[3]},
      // {id:11, name:"油条", productId: 5, supplierIds:[4]}
    ],
    supplierArray: [
      {id:1, name:"秦皇禧玥", productIds:[1,2,3], productNormsIds: [1,2,3,4,5,6,7,8]},
      {id:2, name:"福中福", productIds:[1,2,3], productNormsIds: [1,2,3,4,5,6,7,8]},
      {id:3, name:"何春芳", productIds:[3,4], productNormsIds: [4,7,9,10]},
      {id:4, name:"下水洞油条", productIds:[5], productNormsIds: []}
    ],
    deliveryStaffArr: [
      {id:1, name:"唐健铭", status:0},
      {id:2, name:"黄小艳", status:0},
      {id:3, name:"其他", status:-1}
    ]
  }
})
