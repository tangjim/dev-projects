<template>
    <div class="box">
        <div class="main">
            <div class="plane1">
                <h3>邮箱绑定</h3>
                <p>请务必使用真实本人邮箱地址，一旦绑定成功不可再次修改</p>
            </div>
            <div class="cut"></div>
            <div class="form-plane">
                <div class="form-input-group"><span class="input-label">邮箱地址</span><input type="text" v-model="formData.email" placeholder="请输入邮箱地址"/></div>
                <button class="form-btn" :loading="subState===1" @click="sendEmail" v-waves>{{btnTxt}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bind-email-step1",
        data() {
            return {
                formData: {email: ''},
                subState: 0,
                btnTxt: "下一步",
            }
        },
        methods: {
            sendEmail: function() {
                this.$emit("next", this.formData.email);
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