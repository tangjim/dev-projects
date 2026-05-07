<template>
    <div class="box">
        <sub-header>
            <a class="back-btn" @click="onClose" slot="header-left"><i class="iconfont icon-jiantou1"></i></a>
            <div class="header-title" slot="header-middle">绑定手机号码</div>
        </sub-header>
        <compoment :is="step" v-on:next="next" v-on:success="success" :formData="formData"></compoment>
    </div>
</template>

<script>
    import BackBtn from '@/components/back_btn';
    import SubHeader from "@/components/sub_header";

    import Vue from 'vue';
    import { Toast, Button } from "vant";
    import "vant/lib/toast/style";
    import "vant/lib/button/style";

    Vue.use(Toast);
    Vue.use(Button);
    import Step1 from './step1';
    import Step2 from './step2';
    export default {
        name: "bind-mobilePhone-index",
        components: {SubHeader, BackBtn, Step1, Step2},
        data() {
            return {
                step:"Step1",
                formData: {mobilePhone: "", checkCode:""},
            }
        },
        methods: {
            onClose: function() {
                this.$emit("close", "bindMobilePhone");
            },
            next: function(mobilePhone) {
                this.formData.mobilePhone = mobilePhone;
                this.step = "Step2";
            },
            success: function () {
                this.$emit("close", "bindMobilePhone");
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
</style>