<template>
    <div class="step-main">
        <div class="form-box">
            <div class="form-module">
                <my-input v-model="formData.checkCode" ref="checkCode" :maxlength="4" :placeholder="'请输入邮箱验证码'" :rules="rules.checkCode" :is-r-btn="true">
                    <button slot="input-btn" type="button" @click="sendEmail" v-waves>{{email.seconds===0?"验证码":email.seconds+"s"}}</button>
                </my-input>
                <my-input v-model="formData.password" ref="password" :type="'password'" :maxlength="30" :placeholder="'6-30位，请使用字母与数字组合的密码'" :rules="rules.password" />
                <my-input v-model="formData.rePassword" ref="rePassword" :type="'password'" :maxlength="30" :placeholder="'请再次输入密码'" :rules="rules.rePassword" />
                <my-input v-model="formData.inviteCode" ref="inviteCode" :maxlength="6" :placeholder="'请输入邀请码(选填)'" />
            </div>
        </div>
        <div class="handle">
            <van-checkbox v-model="checked">
                <div class="checked-txt">我已阅读并同意<span>《用户协议》</span></div>
                <template #icon="props">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="props.checked ? '#icon-fuxuankuang1':'#icon-fuxuankuang2'"></use>
                    </svg>
                </template>
            </van-checkbox>
            <van-button class="form-btn" :loading="subState===1" @click="onSubmit" v-waves>{{btnTxt}}</van-button>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue';
    import { Toast, Button, Checkbox } from "vant";
    import "vant/lib/toast/style";
    import "vant/lib/button/style";
    import "vant/lib/checkbox/style";
    Vue.use(Toast);
    Vue.use(Button);
    Vue.use(Checkbox);
    import config from "../../../../../assets/js/conf/config";
    import MyInput from "../../../../../components/input";
    import {mapActions} from "vuex";

    import {send} from"../../../../../api/sms"
    export default {
        name: "mail-step2",
        components:{MyInput},
        props:{
            formData: {
                type: Object,
                required: false
            }
        },
        data() {
            return {
                rules: {
                    checkCode: [{required:true,message:"请输入邮箱验证码"}],
                    password: [{required:true,message:"6-30位，请使用字母与数字组合的密码"}, {len:[6, 30], message:"密码长度不能低于6位高于30位"}, {checkPassword:["letterAndNumber"], message:"请使用字母与数字组合的密码"}],
                    rePassword: [{required:true,message:"请再次输入密码"}, {repeat:"formData.password",message:"两次输入的密码不一致"}],
                },
                subState: 0,
                btnTxt: "注册",
                checked: true,
                defaultEmailSeconds: 120,
                email: {seconds: 0, sendState: 0}
            }
        },
        created() {
            document.title = config.appName + "-" + this.$route.meta.title;
            this.sendEmail();
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
            sendEmail: function() {
                if (this.email.sendState === 1) return;
                this.email.sendState = 1;

                // 开启短信倒计时
                this.email.seconds = this.defaultEmailSeconds;
                this.emialTiming();

                // 开启短信倒计时
                send({email: this.formData.email, type:0,applyType:1}).then(res => {
                    if (res.code === 1000) {
                        Toast("验证码已发送至邮箱");
                    } else {
                        Toast(res.message);
                        this.email.seconds = 0;
                        this.email.sendState = 0;
                    }
                });
            },
            emialTiming: function() {
                if (this.email.seconds > 0) {
                    this.email.seconds--;
                    setTimeout(this.emialTiming, 1000);
                } else {
                    this.email.sendState = 0;
                }
            },
            onSubmit: function () {
                if (this.subState === 1) return;
                this.subState = 1;
                if (this.checked) {
                    this.validate();
                    for (let rule in this.rules) {
                        if (!this.$refs[rule].flag) {
                            this.subState = 0;
                            return;
                        }
                    }
                } else {
                    this.subState = 0;
                    Toast("请认真阅读用户协议并勾选");
                }

                let data = {
                    formData: this.formData,
                    success: (res) => {
                        this.subState = 0;
                        if (res.code === 1000) {
                            // 返回上一页
                            this.$router.go(-1);
                        } else {
                            Toast(res.message);
                        }
                    }
                };
                this.register(data)
            }
        },
        destroyed() {
            this.email.seconds = 0;
            this.email.sendState = 0;
        }
    }
</script>

<style scoped>
    .form-box {width: 100%;}
    .form-box .form-module {margin-bottom: 40px;}

    .my-input {margin-bottom: 20px;}
    .my-input:last-child{margin-bottom: 0}

    .my-input .form-group-btn button {width: 100%;background:transparent;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:80px;color:rgba(48,118,237,1);padding: 0;margin: 0;float: left;}

    /*.form-box .form-group {width:100%;border:2px solid rgba(199,220,255,1);height: 80px;line-height: 80px;display: table;position: relative;overflow: hidden;border-radius:10px;}*/
    /*.form-box .form-group input {float: left;border: 0;padding: 0;margin: 0;height: 100%;line-height: 80px;display: table-cell;width: 100%;color: #666666;text-indent: 20px;font-size:32px;font-family:Microsoft YaHei;font-weight:400;color:rgba(27,65,91,1);border-radius:10px;}*/




    .handle .checked-txt {font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(27,65,91,1);}
    .handle .checked-txt span {color:rgba(48,118,237,1);}
    .icon {
        width: 30px;
        height: 30px;
        fill: currentColor;
        overflow: hidden;
    }

    .form-btn {margin-top: 26px;width:670px;height:76px;background:rgba(83,136,216,1);opacity:1;font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:76px;color:rgba(255,255,255,1);border-radius: 0;}
</style>