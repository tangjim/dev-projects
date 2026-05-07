<template>
    <div class="tab-main">
        <div class="banner-plane">
            <div class="banner-img"></div>
            <div class="banner-handle">返佣排行</div>
        </div>
        <div class="invite-plane">
            <div class="invite-plane_wrap_plane">
                <div class="invite-plane_wrap">
                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-huaban"></use></svg>
                    <div class="invite-plane_wrap_ttt_content">
                        <span class="fut-s">
                            <p>已邀请好友<br><em>99</em></p>
                        </span>
                    </div>
                </div>
                <div class="invite-plane_wrap">
                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-hongbao"></use></svg>
                    <div class="invite-plane_wrap_ttt_content">
                        <span class="fut-s">
                            <p>合约累计返佣<br><em>2138981.81</em><br><em>USDT</em></p>
                        </span>
                    </div>
                </div>
                <div class="invite-plane_wrap">
                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-qianbao"></use></svg>
                    <div class="invite-plane_wrap_ttt_content">
                        <span class="fut-s">
                            <p>累计返佣<br><em>932131.21</em><br><em>USDT</em></p>
                        </span>
                    </div>
                </div>
            </div>
            <div class="invite-handle-button">
                <button class="posters_btn" v-waves>生成分享海报</button>
                <button class="link_btn" v-waves>分享链接</button>
            </div>
        </div>
        <div class="division"></div>
        <div class="invitation-child-tabs">
            <van-tabs v-model="active" animated color="#3076ED" line-height="0.08rem" title-active-color="#3076ED" title-inactive-color="#8BA0AC">
                <van-tab v-for="(item, index) in tabs" :title="item.name" :key="index">
                    <compoment :is="item.view"></compoment>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import { Tab, Tabs } from "vant";
    import "vant/lib/tabs/style";
    import "vant/lib/tab/style";
    Vue.use(Tab);
    Vue.use(Tabs);

    import CompomentInvite from './compoment/invite';
    import CompomentRebate from './compoment/rebate';
    export default {
        name: "invitation-invite",
        components: {CompomentInvite, CompomentRebate},
        data() {
            return {
                active: 0,
                tabs: [{name:"邀请记录", view:"compomentInvite"},{name:"返佣明细", view:"CompomentRebate"}]
            }
        },
    }
</script>

<style scoped>
    .tab-main {margin: auto;background-color: rgb(255, 255, 255);width:750px;padding-bottom: 38px;}
    .tab-main .banner-plane {width: 750px;height:300px;background:rgba(255,243,243,1);position: relative;}
    .tab-main .banner-plane .banner-handle {position: absolute;top:30px;right: 0;width:116px;height:42px;background:rgba(48,118,237,1);border-radius:6px 0 0 6px;font-size:24px;font-family:PingFang SC;font-weight:400;line-height:34px;color:rgba(255,255,255,1);padding-top: 6px;padding-left: 24px;}
    .tab-main .division {width:750px;height:24px;background:rgba(247,247,250,1);}

    .tab-main .invite-plane {width: 750px;overflow: hidden;}

    .tab-main .invite-plane .invite-plane_wrap_plane {display: flex;width: 750px;height: 130px;overflow: hidden}
    .tab-main .invite-plane .invite-plane_wrap_plane .invite-plane_wrap {flex:1;text-align: left;}
    .tab-main .invite-plane .invite-plane_wrap_plane .invite-plane_wrap_ttt_content {float:left;margin-left: 4px;}
    .tab-main .invite-plane .invite-plane_wrap_plane .invite-plane_wrap:nth-child(1) .invite-plane_wrap_ttt_content{margin-left: 8px;}
    .tab-main .invite-plane .invite-plane_wrap_plane .invite-plane_wrap:nth-child(3) .invite-plane_wrap_ttt_content{margin-left: 6px;}
    .tab-main .invite-plane .invite-plane_wrap_plane .invite-plane_wrap_ttt_content span {height: 130px;display: flex;align-items: center;}
    .tab-main .invite-plane .invite-plane_wrap_plane p {font-size:20px;font-family:PingFang SC;font-weight:400;line-height:28px;color:rgba(71,71,71,1);overflow: hidden;}
    .tab-main .invite-plane .invite-plane_wrap_plane p em {color:rgba(139,160,172,1);}
    .tab-main .invite-plane .invite-plane_wrap_plane .icon {
        width: 76px;
        height: 130px;
        fill: currentColor;
        overflow: hidden;
        float: left;
        vertical-align: middle;
    }
    .tab-main .invite-plane .invite-plane_wrap_plane .invite-plane_wrap:nth-child(1) .icon {margin-left: 42px;}
    .tab-main .invite-plane .invite-plane_wrap_plane .invite-plane_wrap:nth-child(2) .icon {margin-left: 12px;}
    .tab-main .invite-plane .invite-plane_wrap_plane .invite-plane_wrap:nth-child(3) .icon {margin-left: 8px;}

    .tab-main .invite-plane .invite-handle-button {margin-top: 12px;margin-bottom: 40px;overflow: hidden;padding: 0 40px;display: inline-block;width: 670px;}
    .tab-main .invite-plane .invite-handle-button button {height:64px;border-radius:6px;font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(255,255,255,1);padding: 0;margin: 0;}
    .tab-main .invite-plane .invite-handle-button .posters_btn {width: 380px;background:rgba(27,65,91,1);float:left;}
    .tab-main .invite-plane .invite-handle-button .link_btn {width: 270px;background:rgba(76,185,113,1);float: right;}

    .tab-main .invitation-child-tabs {width: 750px;margin: 0 auto;}
</style>