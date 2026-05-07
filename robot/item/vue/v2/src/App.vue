<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: 'App',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters({})
  },
  created() {},
  methods: {}
}
</script>

<style>

@import "./assets/font/iconfont.css";
@import "./assets/css/common/public.css";

#app {
  width: 100%;
  height: 100vh;
  background-color: #171A1E;
}

</style>
