<template>
    <div class="box">
        <sub-header>
            <a class="back-btn" @click="onClose" slot="header-left"><i class="iconfont icon-jiantou1"></i></a>
            <div class="header-title" slot="header-middle">身份认证</div>
        </sub-header>
        <div class="main">
            <div class="plane1">
                <h3>初始认证</h3>
                <p>请务必使用真实本人姓名及身份证号，一旦认证成功不可再次修改</p>
            </div>
            <div class="cut"></div>
            <div class="form-plane">
                <div class="form-input-group"><span class="input-label">姓名</span><input type="text" v-model="formData.realName" placeholder="请输入姓名"/></div>
                <div class="form-input-group"><span class="input-label">身份证号</span><input type="text" v-model="formData.idCard" placeholder="请输入证件号"/></div>
                <van-button class="form-btn" :loading="subState===1" @click="onSubmit" v-waves>{{btnTxt}}</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import BackBtn from '../../../../components/back_btn';
    import SubHeader from "../../../../components/sub_header";

    import Vue from 'vue';
    import { Toast, Button } from "vant";
    import "vant/lib/toast/style";
    import "vant/lib/button/style";

    Vue.use(Toast);
    Vue.use(Button);

    import { mapActions } from 'vuex';
    export default {
        name: "primary-auth",
        components: {SubHeader, BackBtn},
        data() {
            return {
                formData: {idCard: '', realName: ''},
                subState: 0,
                btnTxt: "提交"
            }
        },
        computed: {},
        created() {},
        methods: {
            ...mapActions({
                authIdCard: 'idCard/primaryAuth'
            }),
            onClose: function() {
                this.$emit("close", "primaryAuth");
            },
            onSubmit: function () {
                if (this.subState === 1) return;
                this.subState = 1;

                if (this.formData.realName.match(/^\s*$/)) {
                    Toast("请输入姓名");
                    this.subState = 0;
                    return;
                }
                if (this.formData.idCard.match(/^\s*$/)) {
                    Toast("请输入证件号");
                    this.subState = 0;
                    return;
                }

                let data = {
                    formData: this.formData,
                    success: (res) => {
                        this.subState = 0;
                        if (res.code === 1000) {
                            this.$emit("close", "primaryAuth");
                            Toast("初始认证成功");
                        } else {
                            Toast(res.message);
                        }
                    }
                };
                this.authIdCard(data)
            }
        }
    }
</script>

<style scoped>
    .box {width: 750px;margin: auto}

    .back-btn {cursor: pointer;display: inline-block;}
    .back-btn {margin-left: 2px}
    .back-btn i {color:rgba(27,65,91,1);line-height: 80px;font-size: 42px;font-weight:400;}
    .header-title {text-align: center;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:80px;color:rgba(27,65,91,1);}

    .main {margin: 80px auto 0;background-color: rgb(255, 255, 255);height: calc(100vh - 80px)}
    .main .plane1 {height: 220px;padding: 0 40px;overflow: hidden}
    .main .plane1 h3 {margin: 26px 0 36px 0;font-size:40px;font-family:Microsoft YaHei;font-weight:400;line-height:52px;color:rgba(27,65,91,1);}
    .main .plane1 p {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(118,152,175,1);}

    .main .form-plane {padding:  0 40px;}
    .main .form-plane .form-input-group {height: 110px;border-bottom: 2px solid rgba(238,238,238,1);overflow: hidden}
    .main .form-plane .form-input-group .input-label {font-size:28px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(27,65,91,1);line-height: 110px;float: left;width: 180px;}
    .main .form-plane .form-input-group input {float: right;height: 110px;line-height: 110px;width: 400px;text-align: right;font-size: 28px;font-family:Microsoft YaHei;font-weight: 400;color:rgba(27,65,91,1);}
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