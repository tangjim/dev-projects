<template>
  <div class="main">
    <div class="main-top"></div>
    <div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { PullRefresh, Toast, Lazyload, Swipe, SwipeItem, Tab, Tabs } from "vant";
import "vant/lib/pull-refresh/style";
import "vant/lib/toast/style";
import "vant/lib/lazyload/style";
import "vant/lib/swipe/style";
import "vant/lib/swipe-item/style";
import "vant/lib/tabs/style";
import "vant/lib/tab/style";
Vue.use(PullRefresh).use(Toast).use(Lazyload).use(Swipe).use(Swipe).use(SwipeItem).use(Tab).use(Tabs);

import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  name: "home",
  components: {},
  data() {
    return {
      appName: process.env.VUE_APP_NAME
    }
  },
  computed: {
    ...mapGetters({})
  },
  created() {
    // this.init();
  },
  mounted() {},
  destroyed() {},
  methods: {
    ...mapMutations({}),
    ...mapActions({})
  },
  watch: {}
}
</script>

<style scoped>
  .main {
  }
  .main-top {
    width: 100%;
    height: 66px;
    border-bottom: 1px solid #2C3139;
  }
</style>
