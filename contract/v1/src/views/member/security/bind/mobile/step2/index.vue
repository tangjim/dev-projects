<template>
    <div class="box">
        <div class="main">
            <div class="plane1">
                <h3>验证码已发送</h3>
                <p>验证码已发送至{{formData.mobilePhone.replace(/\d{7}(\d{4})/, '******$1')}}</p>
            </div>
            <div class="cut"></div>
            <div class="form-plane">
                <div class="form-input-group">
                    <span class="input-label">邮箱验证码</span>
                    <input type="text" v-model="formData.checkCode" placeholder="请输入邮箱验证码"/>
                    <div class="handle"><button type="button" @click="sendSms" v-waves>{{sms.seconds===0?"验证码":sms.seconds+"s"}}</button></div>
                </div>
                <van-button class="form-btn" :loading="subState===1" @click="onSubmit" v-waves>{{btnTxt}}</van-button>
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import { Toast, Button } from "vant";
    import "vant/lib/toast/style";
    import "vant/lib/button/style";

    Vue.use(Toast, Button);

    import {send} from"@/api/sms"
    export default {
        name: "bind-mobilePhone-step2",
        props:{
            formData: {
                type: Object,
                required: false
            }
        },
        data() {
            return {
                subState: 0,
                btnTxt: "确认绑定",
                defaultSmsSeconds: 120,
                sms: {seconds: 0, sendState: 0}
            }
        },
        created() {
            this.sendSms();
        },
        methods: {
            sendSms: function() {
                if (this.sms.sendState === 1) return;
                this.sms.sendState = 1;

                // 开启短信倒计时
                this.sms.seconds = this.defaultSmsSeconds;
                this.smsTiming();

                // 开启短信倒计时
                send({mobilePhone: this.formData.mobilePhone, type:1,applyType:1}).then(res => {
                    if (res.code === 1000) {
                        Toast("短信已发送");
                    } else {
                        Toast(res.message);
                        this.sms.seconds = 0;
                        this.sms.sendState = 0;
                    }
                });
            },
            smsTiming: function() {
                if (this.sms.seconds > 0) {
                    this.sms.seconds--;
                    setTimeout(this.smsTiming, 1000);
                } else {
                    this.sms.sendState = 0;
                }
            },
            onSubmit: function() {
                this.$emit("success", this.formData);
            }
        }
    }
</script>

<style scoped>
    .box {width: 750px;margin: auto}

    .main {margin: 80px auto 0;background-color: rgb(255, 255, 255);height: calc(100vh - 80px)}
    .main .plane1 {height: 220px;padding: 0 40px;overflow: hidden}
    .main .plane1 h3 {margin: 26px 0 36px 0;font-size:40px;font-family:Microsoft YaHei;font-weight:400;line-height:52px;color:rgba(27,65,91,1);}
    .main .plane1 p {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(118,152,175,1);}

    .main .form-plane {padding:  0 40px;}
    .main .form-plane .form-input-group {height: 110px;border-bottom: 2px solid rgba(238,238,238,1);overflow: hidden;display: inline-table;width: 100%;}
    .main .form-plane .form-input-group .input-label {font-size:28px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(27,65,91,1);display: table-cell;width:180px;}
    .main .form-plane .form-input-group input {display:table-cell;width:100%;height: 110px;line-height: 110px;text-align: left;font-size: 28px;font-family:Microsoft YaHei;font-weight: 400;color:rgba(27,65,91,1);padding: 0;margin: 0}
    .main .form-plane .form-input-group .handle {display: table-cell;width: 120px;}
    .main .form-plane .form-input-group .handle button {background: rgb(75, 175, 104);font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:50px;color:rgba(255,255,255,1);padding: 0;margin: 0;width: 100%;border-radius: 8px;}
    .main .form-plane .form-btn {margin-top: 120px;width:670px;height:76px;background:rgba(76,185,113,1);opacity:1;border-radius:6px;font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:42px;color:rgba(255,255,255,1);}
    .cut {width: 750px;height: 24px;background:rgba(247,247,250,1);}

    input::-webkit-input-placeholder {
        font-size:28px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:110px;
        color:rgba(197,208,213,1);
    }
    input:-moz-placeholder {
        font-size:28px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:110px;
        color:rgba(197,208,213,1);
    }
    input:-ms-input-placeholder {
        font-size:28px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:110px;
        color:rgba(197,208,213,1);
        background: transparent;
        border: 0;
    }
</style>