<template>
    <div class="main">
        <sub-header>
            <back-btn class="back-btn" slot="header-left"><i class="iconfont icon-jiantou1"></i></back-btn>
            <div class="header-title" slot="header-middle">{{$route.meta.title}}</div>
            <refresh-btn class="refresh-btn" slot="header-right"><i class="iconfont icon-wulumuqishigongandashujuguanlipingtai-ico-"></i></refresh-btn>
        </sub-header>

        <div class="form-box">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </div>
</template>

<script>
    import BackBtn from '../../../components/back_btn';
    import RefreshBtn from '../../../components/refresh_btn';
    import SubHeader from "../../../components/sub_header";
    export default {
        name: "register",
        components: {SubHeader, BackBtn, RefreshBtn}
    }
</script>

<style scoped>
    .main {width: 100%;height: 100vh;overflow: hidden;position: relative;background-color: #ffffff;}
    .refresh-btn, .back-btn {cursor: pointer;display: inline-block;}
    .back-btn {margin-left: 2px}
    .back-btn i, .refresh-btn i  {color:rgba(27,65,91,1);line-height: 80px;font-size: 42px;font-weight:400;}
    .header-title {text-align: center;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:80px;color:rgba(27,65,91,1);}
    .form-box {margin-top: 80px;}
</style>