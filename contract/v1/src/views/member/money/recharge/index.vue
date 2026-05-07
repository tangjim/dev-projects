<template>
    <div class="box">
        <sub-header>
            <a class="back-btn" @click="onClose" slot="header-left"><i class="iconfont icon-jiantou1"></i></a>
            <div class="header-title" slot="header-middle">充币</div>
            <div class="header-right" slot="header-right" @click="openChildPanel('rechargeRecord')"><i class="iconfont icon-wenjian1-copy"></i></div>
        </sub-header>
        <div class="main">
            <h3 class="title">充币</h3>
            <div class="plane1">
                <p>USDT</p><p><span class="fut-s">币种</span></p>
            </div>
            <div class="plane2">
                <div class="label"><span>链类型</span><i class="iconfont icon-yiwen"></i></div>
                <ul><li :class="{'active' : rechargeAddressIndex === index}" v-for="(item, index) in rechargeAddressType" :key="index" @click="changeRechargeAddressIndex(index)"><span class="fut-s">{{item.name}}</span></li></ul>
            </div>
            <div class="plane3">
                <div class="qrcode-plane">
                    <img id="qrcode_img" :src="qrcode_url" />
                    <div id="qrcode_temp" ref="qrcode_temp" v-if="isGenerateQrcode"></div>
                </div>
                <div class="save-btn" @click="saveQrcode">保存二维码至相册</div>
                <div class="address-text">
                    <p class="title">充币地址</p>
                    <p class="text fut-s">{{qrcode_text}}</p>
                    <div class="copy_btn" v-clipboard:copy="qrcode_text" v-clipboard:success="cpSuccess" v-clipboard:error="cpError"><span class="fut-s">复制</span></div>
                </div>
            </div>
            <div class="tips">
                <p class="fut-s">1、请勿向上述地址充值任何非ERC20-USDT资产，否则资产将不可找回。</p>
                <p class="fut-s">2、您充值至上述地址后，需要整个网络节点的确认，12次网络确认以后到账，12次网络确认后可提币。</p>
                <p class="fut-s">3、最小充值金额：1USDT，小于最小金额的充值将不会上账且无法退回。 您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。</p>
                <p class="fut-s">4、请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</p>
                <p class="fut-s">5、需要1个网络确认才能到账，任何非USDT-TRC资产充值到USDT-TRC20地址后不可找回。</p>
                <p class="fut-s">6、目前不支持打包充值的方法，使用打包充值将暂时无法上账，请您谅解。</p>
            </div>
        </div>

        <template v-if="childPanel.rechargeRecord.load">
            <van-popup v-model="childPanel.rechargeRecord.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <record v-on:close="closeChildPanel"/>
            </van-popup>
        </template>
    </div>
</template>

<script>
    import BackBtn from '../../../../components/back_btn';
    import SubHeader from "../../../../components/sub_header";

    import Vue from 'vue';

    import { Toast, Popup } from 'vant';
    import "vant/lib/toast/style";
    import "vant/lib/popup/style";
    Vue.use(Toast);
    Vue.use(Popup);

    import QRCode from 'qrcodejs2';
    import Record from "./record";
    export default {
        name: "recharge",
        components: {SubHeader, BackBtn, Record},
        data() {
            return {
                rechargeAddressType: [{name:"ERC20"},{name:"TRC20"},{name:"OMNI"}],
                rechargeAddressIndex: 0,
                qrcode_url: "",
                isGenerateQrcode: true,
                qrcode_text:"0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
                childPanel: {
                    rechargeRecord: {load: false, show:false}
                },
            }
        },
        created() {},
        methods: {
            cpSuccess: function (e) {
                Toast("已复制");
            },
            cpError: function (e) {
                Toast("复制失败");
            },
            changeRechargeAddressIndex: function(index) {
                this.rechargeAddressIndex = index;
            },
            onClose: function() {
                this.$emit("close", "recharge");
            },
            initQrcode() {
                new QRCode('qrcode_temp', {
                    width: 380,
                    height: 380, // 高度
                    text: this.qrcode_text, // 二维码内容
                    correctLevel: QRCode.CorrectLevel.H
                    // image: '../../static/img/wechat2.png'
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f'
                    // foreground: '#ff0'
                });
                this.qrcode_url = this.$refs.qrcode_temp.children[0].toDataURL('image/png');
                this.isGenerateQrcode = false;
            },
            saveQrcode() {
                let a = document.createElement("a");
                a.href = this.qrcode_url.replace('image/jpeg', 'image/octet-stream');
                a.download = this.randomString(18)+".jpg";
                a.click();
            },
            randomString(len) {
                len = len || 32;
                let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                let maxPos = $chars.length;
                let pwd = '';
                for (let i = 0; i < len; i++) {
                    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            },
            openChildPanel: function(panel) {
                this.childPanel[panel].load = true;
                setTimeout(()=>{this.childPanel[panel].show=true}, 50);
            },
            closeChildPanel: function(panel) {
                this.childPanel[panel].show = false;
                setTimeout(()=>{this.childPanel[panel].load = false;}, 80);
            },
        },
        mounted() {
            this.initQrcode();
        }
    }
</script>

<style scoped>
    .box {width: 750px;margin: auto;}

    .header-right, .back-btn {cursor: pointer;display: inline-block;}
    .back-btn {margin-left: 2px}
    .back-btn i, .header-right i  {color:rgba(27,65,91,1);line-height: 80px;font-size: 42px;font-weight:400;}
    .header-right i  {font-size: 44px;}
    .header-title {text-align: center;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:80px;color:rgba(27,65,91,1);}

    .main {margin: 80px auto 0;background-color: rgba(255,255,255,1);overflow: hidden;width: 670px;}
    .main .title {font-size:40px;font-family:Microsoft YaHei;font-weight:400;line-height:52px;color:rgba(27,65,91,1);margin: 24px 0 20px 0}
    .main .plane1, .main .plane2 {height: 90px;background:rgba(247,247,250,1);border-radius:6px;margin-bottom: 24px;padding: 0 28px;}
    .main .plane1 p:nth-child(1) {font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:90px;color:rgba(27,65,91,1);float: left}
    .main .plane1 p:nth-child(2) {font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:90px;color:rgba(27,65,91,1);float: right}
    .main .plane2 .label {float: left;}
    .main .plane2 .label span {font-size:28px;font-family:Microsoft YaHei;font-weight:400;color:rgba(27,65,91,1);line-height: 90px;}
    .main .plane2 .label i {margin-left: 10px;font-size: 30px;}
    .main .plane2 ul {float: left;margin: 24px 0 0 32px;}
    .main .plane2 ul li {float: left;height:44px;width:120px;background:rgba(231,236,237,1);border-radius:6px;margin-right: 20px;}
    .main .plane2 ul li > span {font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height: 44px;color:rgba(140,160,172,1);text-align: center;display: block;}
    .main .plane2 ul li.active {background:rgba(27,65,91,1);transition: .2s;}
    .main .plane2 ul li.active > span {color:rgba(255,255,255,1);}
    .main .plane3 {margin-top: 28px;background:rgba(247,247,250,1);border-radius:6px;padding: 44px 0 72px;}
    .main .plane3 .qrcode-plane {width: 380px;height: 380px;margin: auto}
    .main .plane3 .qrcode-plane img {width: 100%;}
    .main .plane3 .save-btn {width:292px;height:64px;background:rgba(233,241,247,1);border:2px solid rgba(186,212,230,1);border-radius:6px;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:64px;color:rgba(21,133,214,1);text-align: center;margin: 36px auto}
    .main .plane3 .address-text {margin-top: 50px;text-align: center}
    .main .plane3 .address-text .title {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(139,160,172,1);}
    .main .plane3 .address-text .text {font-size:20px;font-family:PingFang SC;font-weight:400;line-height:28px;color:rgba(27,65,91,1);margin-top: 10px;}
    .main .plane3 .address-text .copy_btn {width:120px;height:44px;background:rgba(231,236,237,1);border-radius:6px;margin: 18px auto 0;}
    .main .plane3 .address-text .copy_btn > span {font-size:20px;font-family:PingFang SC;font-weight:400;line-height: 44px;color:rgba(140,160,172,1);text-align: center;display: inline-block;}

    .main .tips {width: 630px;margin: 36px auto;}
    .main .tips p {font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:34px;color:rgba(140,161,169,1);margin-bottom: 10px;text-align:justify;}

</style>