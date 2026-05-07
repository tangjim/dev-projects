import Vue from 'vue';
import App from './App.vue';
import i18n from './common/lang/index';
import router from './router';
import store from './store';
import Socket from './websocket';
import VueClipboard from 'vue-clipboard2';

require('./mock/index.js');

import 'lib-flexible/flexible';
// import '../public/js/rem';
import './assets/font/iconfont'

import Confirm from "./components/confirm";

import 'animate.css/animate.min.css';
import './assets/css/common/waves.css';

Vue.use(VueClipboard);
Vue.use(Confirm);

// 定义全局的发送数据方法
Vue.prototype.sendMessage = function(data) {
    Socket.send(data);
};

Vue.config.productionTip = false;

/*Vue.directive('waves', {
    bind: function(el, binding) {
        el.classList.add('waves-effect');
        let modifiers = Object.keys(binding.modifiers)[0], duration = +binding.expression || 400;
        !!modifiers && el.classList.add(`waves-${modifiers}`);
        function convertStyle(obj) {
            let style = '';
            for (let a in obj) {
                if (obj.hasOwnProperty(a)) {
                    style += `${a}:${obj[a]};`
                }
            }
            return style;
        }

        el.addEventListener('mousedown', function(e) {
            let ripple = document.createElement('div');
            ripple.classList.add('waves-ripple');
            el.appendChild(ripple);
            // console.log((el.clientWidth / 100) * 10);
            // console.log(e.layerX, e.layerY);
            let styles = {
                left: `${e.layerX}px`,
                top: `${e.layerY}px`,
                opacity: 1,
                // transform: `scale(${(el.clientWidth / 100) * 10})`,
                transform: `scale(${(el.clientWidth / 100) * 15})`,
                'transition-duration': `${duration}ms`,
                'transition-timing-function': 'ease-in-out'
            };
            ripple.setAttribute('style', convertStyle(styles));
            setTimeout(function() {
                ripple.setAttribute('style', convertStyle({
                    opacity: 0,
                    transform: styles.transform,
                    left: styles.left,
                    top: styles.top,
                }));
                setTimeout(function() {
                    ripple && el.removeChild(ripple);
                }, duration * 3);
            }, duration);
        });
    },
});*/

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

new Vue({
    store,
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');


// Vue.prototype.$toast = function (msg, time = 2) {
//     layer.open({ // eslint-disable-line
//         content: msg,
//         skin: 'msg',
//         time: time // 2秒后自动关闭
//     });
// };

String.prototype.colorRgb = function (opacity=1) {
    // 16进制颜色值的正则
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 把颜色值变成小写
    var color = this.toLowerCase();
    if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
            var colorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        var colorChange = [];
        for (var i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "rgba(" + colorChange.join(",") + ", "+opacity+")";
    } else {
        return color;
    }
};

/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};