<template>
    <div class="find-pwd-main">
        <h3 class="title">忘记密码<p v-if="step === 'Step2'">验证码已发送至{{formData.email.replaceAll("(\\w?)(\\w+)(\\w)(@\\w+\\.[a-z]+(\\.[a-z]+)?)", "$1******$4")}}</p></h3>
        <compoment :is="step" v-on:next="next" :formData="formData"></compoment>
    </div>
</template>

<script>
    import Step1 from './step1';
    import Step2 from './step2';
    export default {
        name: "email-register",
        components: {Step1, Step2},
        data() {
            return {
                step:"Step1",
                formData: {type:0, email: "", password:"", rePassword:"", checkCode:""},
            }
        },
        methods: {
            next: function(email) {
                this.formData.email = email;
                this.step = "Step2";
            }
        }
    }
</script>
<style scoped>
    .find-pwd-main {width: 670px;overflow: hidden;padding: 0 40px;}
    .find-pwd-main h3.title {height: 226px;font-size:40px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(27,65,91,1);line-height:52px;margin: 0;padding-top: 78px;}
    .find-pwd-main h3.title p {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(197,208,213,1);margin-top: 24px;}
</style>