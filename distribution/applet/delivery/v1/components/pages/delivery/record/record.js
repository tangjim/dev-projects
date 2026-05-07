// components/pages/delivery/record/record.js
var util = require("../../../../utils/util.js");
Component({

  /**
   * 组件的属性列表
   */
  properties: {},

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
          { orderNo: "1", productName: "鲜湿米粉", productType: "二两", supplierName: "秦皇禧玥", num: 2000, unit: 2, deliveryType: [1, 4], time: "03:20" },
          { orderNo: "2", productName: "鲜湿切粉", productType: "汤粉", supplierName: "秦皇禧玥", num: 20, unit: 1, deliveryType: [1, 4], time: "03:20" }
        ]
      }, {
        customerId: 2,
        customerName: "何妹",
        storeName: "摊位",
        deliveryDate: "2024/12/20",
        productList: [
          { orderNo: "3", productName: "鲜湿米粉", productType: "二两", supplierName: "秦皇禧玥", num: 20, unit: 2, deliveryType: [1, 4], time: "03:20" },
          { orderNo: "4", productName: "鲜湿切粉", productType: "汤粉", supplierName: "秦皇禧玥", num: 20, unit: 1, deliveryType: [1, 4], time: "03:20" }
        ]
      }
    ],
    editListItem: {},
    productFDTMultiPicker: {
      deliveryTypesIndex: [],
      listData: []
    },
    productFomData: {
      deliveryTypeValues: [1, 4],
      productName: "",
      unitPrice: 0,
      number: 0,
      unitValue: 1,
      deliveryStaffValue: 1
    }
    // showPopup: false
  },

  /**
   * 创建组件时调用
   */
  created: function () {
    var app = getApp();
    // 获取数量单位全局数据

    // 初始化添加配送产品表单里配送类型下标值
    var deliveryTypesIndex = [];
    for (var i=0; i<this.data.productFomData.deliveryTypeValues.length; i++) {
      deliveryTypesIndex[i] = 0;
    }
    this.setData({ "productFDTMultiPicker.deliveryTypesIndex": deliveryTypesIndex, unitArray: app.globalData.unitArray, deliveryTypeArray: app.globalData.deliveryTypeArray });

    this.initPFDTMultiPicker();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /** 初始化添加配送产品表单配送类型的Picker数据 */
    initPFDTMultiPicker: function() {
      var values = this.data.productFomData.deliveryTypeValues;
      var valuesIndex = this.data.productFDTMultiPicker.deliveryTypesIndex;
      var pickerDatas = [];
      if (this.data.productFDTMultiPicker.listData) {
        // console.log(123);
        pickerDatas = this.data.productFDTMultiPicker.listData;
      }
      for (var i=0; i<valuesIndex.length; i++) {
        if (pickerDatas.length == 0) {
          pickerDatas[i] = this.data.deliveryTypeArray.filter(e=>e.pid === 0);
        }
        var index = pickerDatas[i].findIndex(e=>e.type === values[i]);
        if (index < 0) index = 0;
        valuesIndex[i] = index;
        // console.log(valuesIndex);
        pickerDatas = util.factorial(this.data.deliveryTypeArray, 0, ["pid", "type"], 0, valuesIndex);
      }
      // console.log(pickerDatas);
      this.setData({"productFDTMultiPicker.listData": pickerDatas, "productFDTMultiPicker.deliveryTypesIndex": valuesIndex});
    },

    /** 添加配送产品表单配送类型MultiPicker的修改事件 */
    _bindPFDTMultiPickerChange: function(e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value);
      var values = [];
      for (var i=0; i<this.data.productFDTMultiPicker.listData.length; i++) {
        values[i] = this.data.productFDTMultiPicker.listData[i][e.detail.value[i]].type;
      }
      this.setData({"productFomData.deliveryTypeValues": values});
    },
    /** 添加配送产品表单配送类型MultiPicker的修改列事件 */
    _bindPFDTMultiPickerColumnChange: function(e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      let valuesIndex = this.data.productFDTMultiPicker.deliveryTypesIndex;
      valuesIndex[e.detail.column] = e.detail.value;
      for (var i=(e.detail.column+1); i<valuesIndex.length; i++) {
        valuesIndex[i] = 0;
      }
      var pickerDatas = util.factorial(this.data.deliveryTypeArray, 0, ["pid", "type"], 0, valuesIndex);
      // console.log(pickerDatas);
      this.setData({"productFDTMultiPicker.listData": pickerDatas, "productFDTMultiPicker.deliveryTypesIndex": valuesIndex});
    },
    /** 添加配送产品表单配送类型MultiPicker的取消事件 */
    _bindPFDTMultiPickerCancel: function() {
      this.initPFDTMultiPicker();
    },

    /**显示添加配送记录窗口 */
    _addRecordPopup: function (e) {
      var editListItem = {...this.data.list[e.target.dataset.index]};
      this.setData({ editListItem: editListItem });
      let popup = this.selectComponent("#a-r-p");
      popup._showPopup();
    },
    /**删除用户配送产品记录 */
    _delProductRecord: function (e) {
      // console.log(e.target.dataset.index);
      var index = e.target.dataset.index;
      wx.showModal({
        title: '确认删除',
        content: '是否确认删除该条数据？',
        complete: (res) => {
          /**确认 */
          if (res.confirm) {
            /**进行数据提交 */
            // 修改数据
            var productList = [...this.data.editListItem.productList];
            this.setData({"editListItem.productList":productList.splice(index, 1)});
          }
          /**取消 */
          // if (res.cancel) {}
        }
      });
    },
    /**当添加配送记录窗口关闭时 */
    _closeRecordPopup: function(e) {
      this.setData({ editListItem: {} });
    },
    /**显示添加配送产品产窗口 */
    _addProductPopup: function(e) {
      let popup = this.selectComponent("#a-p-p");
      popup._showPopup();
    }
  }
})