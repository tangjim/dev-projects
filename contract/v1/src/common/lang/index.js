import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from './en';
import zhLocale from './zh';
import zhTwLocale from './zh_tw';

Vue.use(VueI18n); // 通过插件的形式挂载

const i18n = new VueI18n({
  locale: localStorage.lang || 'zh',    // 语言标识
  // this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    en: {
      ...enLocale
    },
    zh: {
      ...zhLocale
    },
    zhTw: {
      ...zhTwLocale
    }
  }
});

export default i18n;
