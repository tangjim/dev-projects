<template>
    <div class="step-main">
        <h3 class="title">邮箱注册</h3>
        <div class="form-box">
            <!--<div class="form-group">-->
                <!--<input type="text" ref="mobilePhone" v-model="formData.mobilePhone" maxlength="11" placeholder="请输入您常用的手机号码"/>-->
            <!--</div>-->
            <my-input v-model="formData.email" ref="email" :maxlength="11" :placeholder="'请输入您常用的邮箱地址'" :rules="rules.email" />
        </div>
        <van-button class="form-btn" :loading="sms.sendState===1" round @click="sendSms">{{btnTxt}}</van-button>

        <div class="step-btn">
            <router-link class="email-register" to="/authorize/register/m">手机号码注册</router-link>
            <router-link class="login" to="/authorize/login">立即登录</router-link>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Toast, Button } from "vant";
    import "vant/lib/toast/style";
    import "vant/lib/button/style";
    Vue.use(Toast);
    Vue.use(Button);
    import config from "../../../../assets/js/conf/config";
    import MyInput from "../../../../components/input";
    import {mapActions} from "vuex";

    export default {
        name: "mobile-step2",
        components:{MyInput},
        data() {
            return {
                formData: {email: ''},
                rules: {
                    email: [{required:true,message:"请输入您常用的邮箱地址"}],
                },
                subState: 0,
                btnTxt: "下一步",
                // showPassword: false,
                sms: {sendState: 0}
            }
        },
        created() {
            document.title = config.appName + "-" + this.$route.meta.title;
        },
        beforeRouteUpdate(to, form, next) {
            document.title = config.appName + "-" + to.meta.title;
            next();
        },
        methods: {
            ...mapActions({
                register: "user/register"
            }),
            validate: function() {
                for (let rule in this.rules) {
                    this.$refs[rule].validate()
                }
            },
            sendSms: function() {
                if (this.sms.sendState === 1) {
                    return false;
                }

                this.sms.sendState = 1;
                this.validate();
                for (let rule in this.rules) {
                    if (!this.$refs[rule].flag) {
                        this.sms.sendState = 0;
                        return;
                    }
                }

                // 开启短信倒计时
                // send({email: this.formData.email, type:0,applyType:1}, "reg").then(res => {
                //     Toast(res.message);
                //     if (res.code === 1000) {
                //         if (res.data.code) {
                //             this.formData.smsCode = res.data.code;
                //         }
                //     } else {
                //         this.sms.seconds = 0;
                //         this.sms.sendState = 0;
                //     }
                // });
            },
        },
        destroyed() {
            this.sms.sendState = 0;
        }
    }
</script>

<style scoped>
    .step-main {width: 670px;overflow: hidden;padding: 0 40px;}
    .step-main h3.title {margin: 78px 0 174px 0;font-size:40px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(27,65,91,1);line-height:52px;}



    .form-box {width: 100%;}
    .form-box .form-group {width:100%;border:2px solid rgba(199,220,255,1);height: 80px;line-height: 80px;display: table;position: relative;overflow: hidden;border-radius:10px;}
    .form-box .form-group input {float: left;border: 0;padding: 0;margin: 0;height: 100%;line-height: 80px;display: table-cell;width: 100%;color: #666666;text-indent: 20px;font-size:32px;font-family:Microsoft YaHei;font-weight:400;color:rgba(27,65,91,1);border-radius:10px;}


    .form-btn {margin-top: 90px;width:670px;height:76px;background:rgba(83,136,216,1);opacity:1;font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:76px;color:rgba(255,255,255,1);border-radius: 0;}

    .step-btn {width: 670px;margin-top: 32px;}
    a.email-register, a.login {font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(27,65,91,1);display: inline-block}
    a.login {float: right}

    a {font-weight:400;line-height:32px;color:rgba(23,0,255,1);}
    input::-webkit-input-placeholder {
        font-size:32px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:80px;
        color:rgba(197,208,213,1);
    }
    input:-moz-placeholder {
        font-size:32px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:80px;
        color:rgba(197,208,213,1);
    }
    input:-ms-input-placeholder {
        font-size:32px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:80px;
        color:rgba(197,208,213,1);
        background: transparent;
        border: 0;
    }
</style>