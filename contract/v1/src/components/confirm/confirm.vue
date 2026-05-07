<template>
    <div class="overlay-main" v-if="isOpen">
        <van-overlay :show="isShow" :duration="0.2" class-name="overlay-custom">
            <div class="wrapper" @click.stop>
                <div class="confirm-wrap">
                    <div class="title" v-if="title">{{title}}</div>
                    <div class="message" v-html="msg"></div>
                    <div class="handle">
                        <button v-for="(item, index) in btnArr" :key="index" @click="handleBtn(index)" v-waves>{{item.txt}}</button>
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
                btnArr: [],
                isShow: false,
                isOpen: true,
            }
        },
        methods: {
            handleBtn(index) {
                if (this.btnArr[index].onPress) {
                    this.btnArr[index].onPress();
                }
                this.isOpen = false;
            }
        }
    }
</script>

<style scoped>
    .overlay-main {z-index: 9999;position: relative;}
    .wrapper {display: flex;align-items: center;justify-content: center;height: 100%;}
    .overlay-custom {background: rgba(0, 0, 0, 0.5);}

    .confirm-wrap {width: 610px;min-height: 220px;background: #ffffff;border-radius: 5px;box-shadow: 5px 5px 30px 0 rgba(17, 17, 17, 0.4);padding: 30px 20px 10px 40px;position: relative}
    .confirm-wrap .title {font-size: 28px;font-weight: 400;color:rgba(57,57,57,1);}
    .confirm-wrap .message {font-size: 28px;font-weight: 400;color:rgba(57,57,57,1);}
    .confirm-wrap .handle {width: 100%;position: absolute;bottom: 0;left: 0;-webkit-user-select:none; -moz-user-select:none;-ms-user-select:none;user-select:none;}
    .confirm-wrap .handle button {font-size: 28px;background: transparent;float: right;margin-bottom: 15px;padding: 10px 20px;color: rgba(212,0,0,1);margin-right: 15px;border-radius: 3px;transition: .2s;}
    .confirm-wrap .handle button:active {background: #ededed;transition: .2s;}
</style>