<template>
  <div class="overlay-main" v-if="isOpen">
    <van-overlay :show="isShow" :duration="0.2" class-name="overlay-custom">
      <div class="win__animated win__bounceIn wrapper" @click.stop>
        <div class="message-wrap">
          <div class="title" v-if="title">{{title}}</div>
          <div class="message" v-html="msg"></div>
          <div class="handle">
            <button v-for="(item, index) in buttons" class="green" :key="index" @click="handleBtn(index)" v-waves>{{item.txt}}</button>
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
  name: "message",
  data() {
    return {
      title: "",
      msg: "",
      buttons: [{txt:"知道了"}],
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

.message-wrap {width: 650px;padding: 40px 0 30px 0;background: #ffffff;border-radius: 10px;box-shadow: 5px 5px 30px 0 rgba(17, 17, 17, 0.4);position: relative;overflow: hidden;}
.message-wrap .title {opacity: 1;font-size: 36px;font-family: Microsoft YaHei;font-weight: bold;line-height: 38px;color: rgba(57,57,57,1);padding-left: 30px}
.message-wrap .message {font-size: 28px;font-weight: 400;color:rgba(57,57,57,1);padding: 30px 30px 40px 30px;}
.message-wrap .handle {width: 610px;height: 72px;margin: auto}
.message-wrap .handle button {width:100%;height: 72px;background: #F7F7FA;opacity: 1;border: 0;font-size: 28px;font-weight: 400;color: #1B415B;border-radius: 10px;}
.message-wrap .handle button.green {background: #4CB971;color: #FFFFFF;}
</style>