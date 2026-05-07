// components/tabs/tabs.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击事件，点击tab栏不同项目进，触发
    _handleItemTap(e) {
      // 1 获取点击的tab索引
      let index = e.currentTarget.dataset.index;
      this.setData({active: index});
      // 2 触发父组件中的事件，传递数据给父组件，把当前点击的index数据传给父组件
      this.triggerEvent("selectdTab", {index: index});
    }
  }
})