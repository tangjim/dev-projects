// pages/test/test.js

Page({
  /**
     * 页面的初始数据
     */
  data: {
    typeList: [
      [{type:1, name: "配送", pid:0}, {type:2, name: "借调", pid:0}, {type:3, name: "退换", pid:0}],
      [
        {type:4, name:"配送", color:"#FF7B00", pid:1}, {type:5, name: "归还", color:"#D92400", pid:1}, {type:6, name: "自提", color:"#1F61FF", pid:1},
        {type:7, name:"借走", color:"#FF5340", pid:2}, {type:8, name:"调用", color:"#1F61FF", pid:2},
        {type:9, name:"退回", color:"#A8A8A8", pid:3}, {type:10, name:"置换", color:"#FF5340", pid:3}
      ],
      [
        {type:11, name:"配送-3", color:"#FF5340", pid:4}, {type:12, name:"归还-3", color:"#1F61FF", pid:5},
        {type:13, name:"自提-3", color:"#FF5340", pid:6}, {type:14, name:"借走-3", color:"#1F61FF", pid:7},
        {type:15, name:"调用-3", color:"#FF5340", pid:8}, {type:16, name:"退回-3", color:"#1F61FF", pid:9},
        {type:17, name:"置换-3", color:"#1F61FF", pid:10}
      ]
    ],
    typeTree: {
      level:3,
      list: [
        {type:1, name: "配送", pid:0}, {type:2, name: "借调", pid:0}, {type:3, name: "退换", pid:0},
        {type:4, name:"配送", color:"#FF7B00", pid:1}, {type:5, name: "归还", color:"#D92400", pid:1}, {type:6, name: "自提", color:"#1F61FF", pid:1},

        {type:7, name:"借走", color:"#FF5340", pid:2}, {type:8, name:"调用", color:"#1F61FF", pid:2},
        {type:9, name:"退回", color:"#A8A8A8", pid:3}, {type:10, name:"置换", color:"#FF5340", pid:3},

        {type:11, name:"配送-3", color:"#FF5340", pid:4}, {type:12, name:"归还-3", color:"#1F61FF", pid:5},
        {type:13, name:"自提-3", color:"#FF5340", pid:6}, {type:14, name:"借走-3", color:"#1F61FF", pid:7},
        {type:15, name:"调用-3", color:"#FF5340", pid:8}, {type:16, name:"退回-3", color:"#1F61FF", pid:9},
        {type:17, name:"置换-3", color:"#1F61FF", pid:10}
        
      ]
    },
    currentType:[0, 1, 4],
    pickerType: {
      typeValuesIndex:[1, 4, 4],
      selectdTypesIndex: [0, 0, 0],
      list: [
        [{type:1, name: "配送", pid:0}, {type:2, name: "借调", pid:0}, {type:3, name: "退换", pid:0}],
        [
          {type:4, name:"配送", color:"#FF7B00", pid:1}, {type:5, name: "归还", color:"#D92400", pid:1}, {type:6, name: "自提", color:"#1F61FF", pid:1},
          {type:7, name:"借走", color:"#FF5340", pid:2}, {type:8, name:"调用", color:"#1F61FF", pid:2},
          {type:9, name:"退回", color:"#A8A8A8", pid:3}, {type:10, name:"置换", color:"#FF5340", pid:3}
        ],
        [
          {type:11, name:"配送-3", color:"#FF5340", pid:4}, {type:12, name:"归还-3", color:"#1F61FF", pid:5},
          {type:13, name:"自提-3", color:"#FF5340", pid:6}, {type:14, name:"借走-3", color:"#1F61FF", pid:7},
          {type:15, name:"调用-3", color:"#FF5340", pid:8}, {type:16, name:"退回-3", color:"#1F61FF", pid:9},
          {type:17, name:"置换-3", color:"#1F61FF", pid:10}
        ]
      ],

      values:[1, 4, 11],
      // valuesIndex:[0, 0, 0],
      datas: [
        {type:1, name: "配送", pid:0}, {type:2, name: "借调", pid:0}, {type:3, name: "退换", pid:0},

        {type:4, name:"配送", color:"#FF7B00", pid:1}, {type:5, name: "归还", color:"#D92400", pid:1}, {type:6, name: "自提", color:"#1F61FF", pid:1},
        {type:7, name:"借走", color:"#FF5340", pid:2}, {type:8, name:"调用", color:"#1F61FF", pid:2},
        {type:9, name:"退回", color:"#A8A8A8", pid:3}, {type:10, name:"置换", color:"#FF5340", pid:3},

        {type:11, name:"配送-3", color:"#FF5340", pid:4}, {type:12, name:"归还-3", color:"#1F61FF", pid:5},
        {type:13, name:"自提-3", color:"#FF5340", pid:6}, {type:14, name:"借走-3", color:"#1F61FF", pid:7},
        {type:15, name:"调用-3", color:"#FF5340", pid:8}, {type:16, name:"退回-3", color:"#1F61FF", pid:9},
        {type:17, name:"置换-3", color:"#1F61FF", pid:10}
      ]
    },

    productMultiPickerData: {
      list: [],
      value:[]
    }
  },

  bindChange(e) {
    var vals = e.detail.value;
    console.log(e);
    var pidArr = [0];
    for(var i=0; i<vals.length; i++) {
      // console.log(this.data.typeList[i][vals[i]]);
      pidArr.push(this.data.typeList[i][vals[i]].type);
    }
    console.log(pidArr);
    this.setData({currentType:pidArr});
  },
  changeType(index) {},
  initMultiPicker(column, value) {
    var typeArr = [];
    if (this.data.typeArr) {
      typeArr = this.data.typeArr;
    } else {
      typeArr.push(this.data.pickerType.list[0].filter(e=>e.pid === 0));
    }
    // var value = e.detail.value;
    for (var i=column; i<this.data.pickerType.list.length; i++) {
      if (i == column) {
        var selectdTypesIndex = "pickerType.selectdTypesIndex["+column+"]";
        this.setData({[selectdTypesIndex]: value});
      } else {
        // 设置修改列后面的列下标为0
        selectdTypesIndex = "pickerType.selectdTypesIndex["+[i]+"]";
        this.setData({[selectdTypesIndex]: 0});

        value = this.data.pickerType.selectdTypesIndex[i-1];
        if (!typeArr[i-1][value]) {
          value = 0;
        }
        var pid = typeArr[i-1][value].type;
        typeArr[i] = this.data.pickerType.list[i].filter(e=>e.pid === pid);
      }
    }
    this.setData({typeArr: typeArr});
  },
  _bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    // this.setData({"pickerType.typeValuesIndex": this.data.pickerType.selectdTypesIndex});
    
    // this.setData({
    //   multiIndex: e.detail.value
    // })
  },
  _bindMultiPickerCancel: function(e) {
    console.log(this.data.pickerType.typeValuesIndex);
    for (var i=0; i<this.data.pickerType.typeValuesIndex.length; i++) {
      var selectdTypesIndexStr = "pickerType.selectdTypesIndex["+i+"]";
      this.setData({[selectdTypesIndexStr]: this.data.pickerType.typeValuesIndex[i]});
    }
    this.initMultiPicker(0, this.data.pickerType.typeValuesIndex[0]);
  },
  _bindMultiPickerColumnChange: function (e) {
    // console.log(e);
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    this.initMultiPicker(e.detail.column, e.detail.value);
    // console.log(this.data.pickerType.selectdTypesIndex);
    
  },

  initMultiPicker2: function() {
    var values = this.data.pickerType.values;
    var valuesIndex = this.data.pickerType.valuesIndex;
    var pickerDatas = [];
    if (this.data.pickerDatas) {
      pickerDatas = this.data.pickerDatas;
    }
    for (var i=0; i<valuesIndex.length; i++) {
      if (pickerDatas.length == 0) {
        pickerDatas[i] = this.data.pickerType.datas.filter(e=>e.pid === 0);
      }
      var index = pickerDatas[i].findIndex(e=>e.type === values[i]);
      valuesIndex[i] = index;
      pickerDatas = this.factorial(this.data.pickerType.datas, 0, 0, valuesIndex);
    }
    this.setData({pickerDatas: pickerDatas, "pickerType.valuesIndex": valuesIndex});
  },
  _bindMultiPickerCancel2: function(e) {
    // console.log(this.data.pickerType.typeValuesIndex);
    this.initMultiPicker2();
  },
  _bindMultiPickerColumnChange2: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    let valuesIndex = this.data.pickerType.valuesIndex;
    valuesIndex[e.detail.column] = e.detail.value;
    for (var i=(e.detail.column+1); i<valuesIndex.length; i++) {
      valuesIndex[i] = 0;
    }
    var pickerDatas = this.factorial(this.data.pickerType.datas, 0, 0, valuesIndex);
    // console.log(pickerDatas);
    this.setData({pickerDatas: pickerDatas, "pickerType.valuesIndex": valuesIndex});
  },
  _bindMultiPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var values = [];
    for (var i=0; i<this.data.pickerDatas.length; i++) {
      values[i] = this.data.pickerDatas[i][e.detail.value[i]].type;
    }
    this.setData({"pickerType.values": values});
  },

  initProductMultiPickerData: function() {
    var app = getApp();

    var productMultiPickerData = [];
    var productArray = app.globalData.productArray;
    productMultiPickerData[0] = productArray;
    // var productNormsArray = app.globalData.productNormsArray;
    var supplierArray = []; // app.globalData.supplierArray;
    // 1.根据产品ID获取产品规格列表
    // console.log(productArray[0]);
    var productNormsArray = app.globalData.productNormsArray.filter(e=>e.productId === productArray[0].id);
    // console.log(productNormsArray);
    // 2.如果产品规格不为空根据产品规格的进货渠道ID获取进货渠道列表
    if (productNormsArray && productNormsArray.length > 0) {
      productMultiPickerData[1] = productNormsArray;
      supplierArray = app.globalData.supplierArray.filter(e=>productNormsArray[0].supplierIds.includes(e.id));
      if (supplierArray && supplierArray.length > 0) {
        productMultiPickerData[2] = supplierArray;
      }
    }
    this.setData({"productMultiPickerData.list": productMultiPickerData, "productMultiPickerData.value": [0,0,0]});
  },
  _bindProductMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);

    var product = this.data.productMultiPickerData.list[e.detail.column][e.detail.value];
    // console.log(this.data.productMultiPickerData.list[e.detail.column][e.detail.value]);


    var app = getApp();

    var productMultiPickerData = [];// this.data.productMultiPickerData.list;
    

    var productArray = app.globalData.productArray;
    productMultiPickerData[0] = productArray;

    // var productNormsArray = app.globalData.productNormsArray;
    var supplierArray = []; // app.globalData.supplierArray;
    // 1.根据产品ID获取产品规格列表
    // console.log(productArray[0]);
    var productNormsArray = app.globalData.productNormsArray.filter(e=>e.productId === product.id);
    // console.log(productNormsArray);
    // 2.如果产品规格不为空根据产品规格的进货渠道ID获取进货渠道列表
    if (productNormsArray && productNormsArray.length > 0) {
      productMultiPickerData[1] = productNormsArray;
      supplierArray = app.globalData.supplierArray.filter(e=>productNormsArray[0].supplierIds.includes(e.id));
      if (supplierArray && supplierArray.length > 0) {
        productMultiPickerData[2] = supplierArray;
      }
    } else {
      // this.setData({"productMultiPickerData.list": []});
      supplierArray = app.globalData.supplierArray.filter(e=>e.productIds.includes(product.id));
      productMultiPickerData[1] = supplierArray;
      productMultiPickerData[2] = [];
      
    }

    console.log(productMultiPickerData);
    this.setData({"productMultiPickerData.list": productMultiPickerData});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var app = getApp();

    this.initMultiPicker(0, this.data.pickerType.typeValuesIndex[0]);

    var valuesIndex = [];
    for (var i=0; i<this.data.pickerType.values.length; i++) {
      valuesIndex[i] = 0;
    }
    this.setData({"pickerType.valuesIndex": valuesIndex});
    this.initMultiPicker2();

    this.initProductMultiPickerData();

  },
  factorial: function(arr, pid, index, valueIndex, pickerDatas=[]) {
    var newArr = arr.filter(e=>e.pid === pid);
    if (newArr.length > 0) {
      // console.log(newArr);
      pickerDatas[index] = newArr;
      return this.factorial(arr, pickerDatas[index][valueIndex[index]].type, index+1, valueIndex, pickerDatas);
    } else {
      return pickerDatas;
    }
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