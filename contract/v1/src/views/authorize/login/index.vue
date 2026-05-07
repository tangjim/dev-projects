<template>
    <div>
        <div class="form-box">
            <div class="login-wp">
                <div class="logo"><img :src="'/images/logo.png'" /></div>
                <p>平台名称</p>
            </div>
            <!--<div class="form-module">-->
                <!--<div class="form-group"><input type="text" ref="loginCode" v-model="formData.loginCode" maxlength="30" placeholder="请输入邮箱/手机号"/></div>-->
                <!--<div class="form-group">-->
                    <!--<input type="password" ref="password" :type="!showPassword?'password':'txt'" v-model="formData.password" minlength="6" maxlength="20" placeholder="请输入登录密码"/>-->
                    <!--<div class="form-group-btn">-->
                        <!--<i class="iconfont" :class="showPassword?'icon-yincang1':'icon-yincang2'" @click="showPassword=!showPassword"></i>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <div class="form-module">
                <my-input v-model="formData.loginCode" ref="loginCode" :maxlength="30" :placeholder="'请输入邮箱/手机号'" :rules="rules.loginCode" />
                <my-input v-model="formData.password" ref="password" :type="!showPassword?'password':'text'" :maxlength="30" :placeholder="'请输入登录密码'" :is-r-btn="true" :rules="rules.password">
                    <i slot="input-btn" class="iconfont" :class="showPassword?'icon-yincang1':'icon-yincang2'" @click="showPassword=!showPassword"></i>
                </my-input>
            </div>

            <router-link class="find-pwd" to="/find/pwd">忘记密码</router-link>
        </div>
        <!--<button class="form-btn" type="button" @click="onSubmit">{{btnTxt}}</button>-->
        <van-button class="form-btn" :loading="subState===1" @click="onSubmit" v-waves>{{btnTxt}}</van-button>
        <div class="register-btn"><router-link class="register" to="/authorize/register">立即注册</router-link></div>
    </div>
</template>

<script>
    import config from "../../../assets/js/conf/config";
    import {mapMutations, mapActions, mapState} from "vuex";
    import {SET_LOGIN_CODE} from "../../../store/modules/mutation-types";

    import Vue from 'vue';
    import { Toast, Button } from "vant";
    import "vant/lib/toast/style";
    import "vant/lib/button/style";
    import "vant/lib/lazyload/style";

    Vue.use(Toast);
    Vue.use(Button);
    import MyInput from "../../../components/input";
    export default {
        name: "login",
        components:{MyInput},
        data() {
            return {
                rules: {
                    loginCode: [{required:true,message:"请输入邮箱/手机号"}],
                    password: [{required:true,message:"请输入登录密码"}]
                },
                formData: {loginCode: '', password: ''},
                subState: 0,
                btnTxt: "登录",
                showPassword: false
            };
        },
        computed: {
            ...mapState({
                mobile:state=>state.config.mobile
            })
        },
        created() {
            document.title = config.appName + "-" + this.$route.meta.title;
            this.formData.loginCode = this.mobile;
        },
        beforeRouteUpdate(to, form, next) {
            document.title = config.appName + "-" + to.meta.title;
            next();
        },
        methods: {
            // ...mapMutations({
            //     setLoginCode: "config/" + SET_LOGIN_CODE,
            // }),
            ...mapActions({
                authorize: "user/authorize"
            }),
            goPage: function (page) {
                this.$router.replace(page);
            },
            validate: function() {
                for (let rule in this.rules) {
                    this.$refs[rule].validate()
                }
            },
            onSubmit: function () {
                if (this.subState === 1) return;
                this.subState = 1;
                this.validate();
                for (let rule in this.rules) {
                    if (!this.$refs[rule].flag) {
                        this.subState = 0;
                        return;
                    }
                }

                // 判断登录帐号是否为邮箱
                let formData = {type:1,mobilePhone:this.formData.loginCode,email:"",password:this.formData.password};
                if (this.formData.loginCode.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) !== -1) {
                    formData.type = 0;
                    formData.email = this.formData.loginCode;
                    formData.mobilePhone = "";
                }

                let data = {
                    formData: formData,
                    success: (res) => {
                        this.subState = 0;
                        if (res.code === 1000) {
                            // 返回上一页
                            this.$router.go(-1);
                        } else {
                            Toast(res.message);
                        }
                        // 登录失败
                        // Toast(this.$i18n.t("tips." + res.message)+"");
                    }
                };

                // this.setLoginCode({mobile:this.formData.loginCode});
                this.authorize(data)
            }
        }
    }
</script>

<style scoped>
    .form-box {width: 670px;overflow: hidden;padding: 0 40px;}

    .form-box .login-wp {height: 524px;width: 670px;overflow: hidden;}
    .form-box .login-wp .logo {height: 121px;width: 126px;margin: 190px auto 0;}
    .form-box .login-wp .logo img {width: 100%}
    .login-wp p {font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:42px;color:rgba(212,177,37,1);margin-top: 30px;text-align: center}

    .form-box .form-module {margin-bottom: 20px;}

    .my-input {margin-bottom: 36px;}
    .my-input:last-child{margin-bottom: 0}
    .my-input .form-group-btn i.iconfont {color: rgba(94,94,94,1);font-size: 62px;padding: 0;margin: 0;float: left;width: 38px;}

    .form-btn {margin: 60px 40px 0 40px;width:670px;height:76px;background:rgba(76,185,113,1);opacity:1;border-radius:6px;font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:42px;color:rgba(255,255,255,1);}
    a.find-pwd {float: right;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(48,118,237,1);}
    .register-btn {width: 750px;text-align: center}
    a.register {font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(27,65,91,1);margin-top: 34px;display: inline-block}
</style>