<template>
  <div class="overlay-main" v-if="isOpen">
    <van-overlay :show="isShow" :duration="0.2" class-name="overlay-custom">
      <div class="win__animated win__bounceIn wrapper" @click.stop>
        <div class="confirm-wrap">
          <div class="title" v-if="title">{{title}}</div>
          <div class="message" v-html="msg"></div>
          <div class="handle">
            <button v-for="(item, index) in buttons" :class="item.cssName||''" :key="index" @click="handleBtn(index)" v-waves>{{item.txt}}</button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Vue from "vue";
import { Overlay} from "vant";
import "vant/lib/overlay/style";
Vue.use(Overlay);
export default {
  name: "custom-confirm",
  data() {
    return {
      title: "",
      msg: "",
      buttons: [{txt:"取消"}],
      isShow: false,
      isOpen: true,
    }
  },
  methods: {
    handleBtn(index) {
      if (this.buttons[index].onPress) {
        this.buttons[index].onPress();
      }
      this.isOpen = false;
    }
  }
}
</script>

<style scoped>
.overlay-main {z-index: 999999;position: relative;}
.wrapper {display: flex;align-items: center;justify-content: center;height: 100%;}
.overlay-custom {background: rgba(0, 0, 0, 0.5);}

.confirm-wrap {width: 610px;min-height: 220px;background: #ffffff;border-radius: 10px 10px 0 0;box-shadow: 5px 5px 30px 0 rgba(17, 17, 17, 0.4);position: relative;overflow: hidden;}
.confirm-wrap .title {width: 100%;height: 52px;background: #05AD8E;opacity: 1;font-size: 28px;font-family: Microsoft YaHei;font-weight: 400;line-height: 38px;color: #FFFFFF;text-align: center;padding-top: 12px;}
.confirm-wrap .message {font-size: 28px;font-weight: 400;color:rgba(57,57,57,1);padding: 40px 20px 50px;}
.confirm-wrap .handle {width: 100%;height: 72px;display: flex}
.confirm-wrap .handle button {flex: 1;height: 72px;background: #F7F7FA;opacity: 1;border: 0;font-size: 28px;font-weight: 400;color: #1B415B;}
.confirm-wrap .handle button.green {background: #05AD8E;color: #FFFFFF;}
</style>