import Vue from 'vue';
import App from './App.vue';
// 导入配置好的路由
import router from "./router";
import store from './store';


// import '@/assets/js/vconsole';
// import vhCheck from "vh-check";
// vhCheck();

// 使用mock随机数据
if (process.env.VUE_APP_MOCK === "true") {
  require('./mock');
}

// 导入控件
// import animated from 'animate.css';
import VueClipboard from 'vue-clipboard2';
import Confirm from "./components/confirm";
import Message from "./components/message";
import Loading from "./components/loading"
Vue.use(VueClipboard).use(Confirm).use(Message).use(Loading);

// 自定义全局过滤器
import * as filter from './assets/js/utils/filter';
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

// 导入字体文件
import './assets/font/iconfont';
import 'lib-flexible/flexible';
import 'animate.css/animate.min.css';
import './assets/css/common/waves.css';
Vue.directive('waves', {
  bind(el, binding) {
    el.addEventListener('click', e => {
      const customOpts = Object.assign({}, binding.value);
      const opts = Object.assign({
        ele: el, // 波纹作用元素
        type: 'hit', // hit点击位置扩散center中心点扩展
        color: 'rgba(0, 0, 0, 0.15)' // 波纹颜色
      }, customOpts);
      const target = opts.ele;
      if (target) {
        target.style.position = 'relative';
        target.style.overflow = 'hidden';
        const rect = target.getBoundingClientRect();
        let ripple = target.querySelector('.waves-ripple');
        if (!ripple) {
          ripple = document.createElement('span');
          ripple.className = 'waves-ripple';
          ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
          target.appendChild(ripple)
        } else {
          ripple.className = 'waves-ripple'
        }
        switch (opts.type) {
          case 'center':
            ripple.style.top = (rect.height / 2 - ripple.offsetHeight / 2) + 'px';
            ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px';
            break;
          default:
            ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop) + 'px';
            ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft) + 'px';
        }
        ripple.style.backgroundColor = opts.color;
        ripple.className = 'waves-ripple z-active';

        // setTimeout(function() {
        //     ripple && el.removeChild(ripple);
        //     target.style.position = 'absolute';
        //     target.style.overflow = 'hidden';
        // }, 3000);

        return false
      }
    }, false)
  }
});

// 配置项目启动时生成提示信息
Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

// rsa加密
// import JsEncrypt from "jsencrypt";
// Vue.prototype.jsEncrypt = JsEncrypt;


Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
