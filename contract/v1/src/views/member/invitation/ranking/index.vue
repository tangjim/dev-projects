<template>
    <div class="tab-main">
        <div class="banner-plane">
            <div class="banner-img"></div>
            <div class="banner-handle">返佣排行</div>
        </div>
        <div class="steps-plane">
            <div class="steps-plane_icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <p>分享链接</p>
                <p>给好友</p>
            </div>
            <i class="iconfont icon-jiantou2-copy"></i>
            <div class="steps-plane_icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yonghu"></use>
                </svg>
                <p>好友完成注册</p>
                <p>并进行交易</p>
            </div>
            <i class="iconfont icon-jiantou2-copy"></i>
            <div class="steps-plane_icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zhuanyongjin"></use>
                </svg>
                <p>获取相应</p>
                <p>比例佣金</p>
            </div>
        </div>
        <div class="division"></div>
        <div class="invite-plane">
            <div class="invite-plane_like"><span class="invite-plane__label">我的邀请链接</span><div class="form-input-group"><input type="text" :value="user.inviteUrl" readonly /><span class="handle"><i class="iconfont icon-fuzhi1" v-clipboard:copy="user.inviteUrl" v-clipboard:success="cpSuccess" v-clipboard:error="cpError"></i></span></div></div>
            <div class="invite-plane_code"><span class="invite-plane__label">我的邀请码</span><div class="form-input-group"><input type="text" :value="user.inviteCode" readonly /><span class="handle"><i class="iconfont icon-fuzhi1" v-clipboard:copy="user.inviteCode" v-clipboard:success="cpSuccess" v-clipboard:error="cpError"></i></span></div></div>
            <div class="invite-handle-button">
                <button class="posters_btn" v-waves>生成分享海报</button>
                <button class="link_btn" v-waves>分享链接</button>
            </div>
        </div>
        <div class="ranking-plane">
            <div class="title"><span>返佣排行榜</span><i class="iconfont icon-arrow-right-copy-copy-copy-copy"></i></div>
            <div class="ranking-content">
                <rebate-ranking :num="8"></rebate-ranking>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    import { Toast, Lazyload } from 'vant';
    import "vant/lib/toast/style";
    import "vant/lib/lazyload/style";
    Vue.use(Toast);
    Vue.use(Lazyload);

    import RebateRanking from '../../../../components/rebate_ranking';
    import {mapState, mapActions, mapGetters} from 'vuex';
    export default {
        name: "invitation-ranking",
        components: {RebateRanking},
        data() {
            return {}
        },
        computed: {
            ...mapState({
                user: state=>state.user
            }),
        },
        created() {},
        methods: {
            cpSuccess: function (e) {
                Toast("已复制");
            },
            cpError: function (e) {
                Toast("复制失败");
            },
        }
    }
</script>

<style scoped>
    .tab-main {margin: auto;background-color: rgb(255, 255, 255);width:750px;padding-bottom: 38px;}
    .tab-main .banner-plane {width: 750px;height:300px;background:rgba(255,243,243,1);position: relative;}
    .tab-main .banner-plane .banner-handle {position: absolute;top:30px;right: 0;width:116px;height:42px;background:rgba(48,118,237,1);border-radius:6px 0 0 6px;font-size:24px;font-family:PingFang SC;font-weight:400;line-height:34px;color:rgba(255,255,255,1);padding-top: 6px;padding-left: 24px;}
    .tab-main .steps-plane {width:675px;height:180px;background:rgba(255,255,255,1);display: inline-table;padding: 0 40px;}
    .tab-main .steps-plane > * {display: table-cell;vertical-align: middle;}
    .tab-main .division {width:750px;height:24px;background:rgba(247,247,250,1);}
    .tab-main .steps-plane .steps-plane_icon {text-align: center;}
    .tab-main .steps-plane .steps-plane_icon p {font-size:24px;font-family:PingFang SC;font-weight:400;line-height:34px;color:rgba(27,65,91,1)}
    .tab-main .steps-plane .steps-plane_icon p:nth-child(1) {margin-top:8px;}
    .tab-main .steps-plane .icon {
        width: 70px;
        height: 70px;
        fill: currentColor;
        overflow: hidden;
    }
    .tab-main .steps-plane .iconfont {color:rgba(139,160,172,1);font-size: 55px;text-align: center;width: 1px;}
    .tab-main .invite-plane {width: 670px;overflow: hidden;padding: 28px 40px 0;}
    .tab-main .invite-plane .invite-plane_code {margin-top: 16px;}
    .tab-main .invite-plane .invite-plane__label {font-size:24px;font-family:PingFang SC;font-weight:400;line-height:34px; color:rgba(27,65,91,1);}
    .tab-main .invite-plane .form-input-group {display: inline-table;float: right;background:rgba(247,247,250,1);height:44px;border-radius:6px;overflow: hidden}
    .tab-main .invite-plane .invite-plane_like .form-input-group {width: 510px;}
    .tab-main .invite-plane .invite-plane_code .form-input-group {width: 140px;}
    .tab-main .invite-plane .form-input-group input {margin:0; padding:0;display: table-cell;background: transparent;font-size:16px;font-family:PingFang SC;font-weight:400;line-height:44px;color:rgba(27,65,91,1);width: 120%;vertical-align: middle;text-indent: 12px;transform: scale(.8);transform-origin: left;}
    .tab-main .invite-plane .form-input-group .handle {display: table-cell;width: 1px;vertical-align: middle;padding: 0 14px;}
    .tab-main .invite-plane .form-input-group .handle .iconfont {color:rgba(139,160,172,1);font-size: 28px;}

    .tab-main .invite-plane .invite-handle-button {margin-top: 28px;overflow: hidden;}
    .tab-main .invite-plane .invite-handle-button button {height:64px;border-radius:6px;font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(255,255,255,1);padding: 0;margin: 0}
    .tab-main .invite-plane .invite-handle-button .posters_btn {width: 380px;background:rgba(27,65,91,1);float:left;}
    .tab-main .invite-plane .invite-handle-button .link_btn {width: 270px;background:rgba(76,185,113,1);float: right;}

    .tab-main .ranking-plane {width: 670px;overflow: hidden;margin: 40px 40px 0;height:714px;border-radius:10px;background:rgba(245,245,248,1);padding-bottom: 26px;}
    .tab-main .ranking-plane .title {height: 74px;border-bottom: 2px solid rgba(231,236,237,1);}
    .tab-main .ranking-plane .title span {font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(27,65,91,1);margin: 18px 0 0 32px;display: inline-block;}
    .tab-main .ranking-plane .title i {color:rgba(231,236,237,1);font-size: 32px;float: right;margin: 24px 26px 0 0;}
    .tab-main .ranking-plane .ranking-content {width:666px;height: 640px;background: rgba(255,255,255,1);margin: auto;overflow: hidden;overflow-y: auto;}

    .tab-main .ranking-plane .ranking-content .rebate-ranking-list li {height: 78px;border-bottom: 2px solid rgba(247,247,248,1);}
    .tab-main .ranking-plane .ranking-content .rebate-ranking-list li:last-child {border-bottom: 0;height: 80px;}
    .tab-main .ranking-plane .ranking-content .rebate-ranking-list li img {width: 52px;height: 48px;margin-left: 20px;margin-top: 16px;float: left}
    .tab-main .ranking-plane .ranking-content .rebate-ranking-list li .sequence_txt {width:36px;height:36px;background:rgba(27,65,91,1);border-radius:50%;font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(255,255,255,1);line-height: 32px;text-align: center;float:left;margin-left: 33px;margin-top: 16px;}
    .tab-main .ranking-plane .ranking-content .rebate-ranking-list li span.t1 {float: left;font-size:28px;font-weight:400;color:rgba(27,65,91,1);margin-left: 20px;line-height: 78px;}
    .tab-main .ranking-plane .ranking-content .rebate-ranking-list li span.t2 {float: right;margin-right: 32px;font-size:20px;font-weight:400;color:rgba(27,65,91,1);line-height: 78px;}
    /*.tab-main .ranking-plane .ranking-content .rebate-ranking-list li:last-child span {line-height: 80px;}*/
</style>