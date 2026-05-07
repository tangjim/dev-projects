<template>
    <div class="box">
        <sub-header>
            <a class="back-btn" @click="onClose" slot="header-left"><i class="iconfont icon-jiantou1"></i></a>
            <div class="header-title" slot="header-middle">下载</div>
        </sub-header>
        <div class="main">
            <div class="img"><img src="@/assets/img/ios.png"/></div>
            <div class="img"><img src="@/assets/img/android.png"/></div>
        </div>
    </div>
</template>

<script>
    import BackBtn from '../../../components/back_btn';
    import SubHeader from "../../../components/sub_header";
    export default {
        name: "download",
        components: {SubHeader, BackBtn},
        methods: {
            onClose: function() {
                this.$emit("close", "download");
            }
        }
    }
</script>

<style scoped>
    .box {width: 750px;margin: auto}
    .back-btn {cursor: pointer;display: inline-block;}
    .back-btn {margin-left: 2px}
    .back-btn i, .refresh-btn i  {color:rgba(27,65,91,1);line-height: 80px;font-size: 42px;font-weight:400;}
    .header-title {text-align: center;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:80px;color:rgba(27,65,91,1);}

    .main {margin: 80px auto 0;height:calc(100vh - 294px);background-color: rgba(18,22,43,1);overflow: hidden;padding-top: 214px;}
    .main .img {width: 670px;height: 180px;margin: 60px auto;}
    .main img {width: 100%;height: 100%;}
</style>