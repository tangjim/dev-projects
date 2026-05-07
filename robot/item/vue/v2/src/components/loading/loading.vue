<template>
  <div class="overlay-main">
    <van-overlay :show="true" :duration="0.1" class-name="overlay-custom">
      <div class="wrapper" @click.stop>
        <van-loading :color="'#05AD8E'">{{ text }}</van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Vue from "vue";
import {Overlay, Loading} from "vant";
import "vant/lib/overlay/style";
import "vant/lib/loading/style";

Vue.use(Overlay);
Vue.use(Loading);
export default {
  name: "custom-loading",
  data() {
    return {
      text: ""
    }
  }
}
</script>

<style scoped>
.overlay-main {
  position: relative;
  z-index: 999999;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.wrapper .wrapper-txt {
  display: inline-block;
  margin-left: 15px;
}

.overlay-custom {
  background: rgba(255, 255, 255, 0.6);
}
.van-loading__spinner {
  width: 60px;
  height: 60px;
}
.van-loading__text {
  font-size: 36px;
}
</style>