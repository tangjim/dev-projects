<template>
    <div class="step-main">
        <div class="form-box">
            <my-input v-model="formData.mobilePhone" ref="mobilePhone" :maxlength="11" :placeholder="'请输入手机号码'" :rules="rules.mobilePhone" />
        </div>
        <van-button class="form-btn" @click="next" v-waves>{{btnTxt}}</van-button>

        <div class="step-btn">
            <router-link class="email-register" to="/find/pwd/e">邮箱找回</router-link>
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

    export default {
        name: "mobile-step1",
        components:{MyInput},
        data() {
            return {
                formData: {mobilePhone: ''},
                rules: {
                    mobilePhone: [{required:true,message:"请输入手机号码"}],
                },
                btnTxt: "下一步",
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
            validate: function() {
                for (let rule in this.rules) {
                    this.$refs[rule].validate()
                }
            },
            next: function() {
                this.validate();
                for (let rule in this.rules) {
                    if (!this.$refs[rule].flag) {
                        return;
                    }
                }
                this.$emit("next", this.formData.mobilePhone);
            },
        },
        destroyed() {}
    }
</script>

<style scoped>
    .form-box {width: 100%;}
    /*.form-box .form-group {width:100%;border:2px solid rgba(199,220,255,1);height: 80px;line-height: 80px;display: table;position: relative;overflow: hidden;border-radius:10px;}*/
    /*.form-box .form-group input {float: left;border: 0;padding: 0;margin: 0;height: 100%;line-height: 80px;display: table-cell;width: 100%;color: #666666;text-indent: 20px;font-size:32px;font-family:Microsoft YaHei;font-weight:400;color:rgba(27,65,91,1);border-radius:10px;}*/


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