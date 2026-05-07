<template>
    <div class="box">
        <sub-header>
            <a class="back-btn" @click="onClose" slot="header-left"><i class="iconfont icon-jiantou1"></i></a>
            <div class="header-title" slot="header-middle">{{tabs[active].title}}</div>
        </sub-header>
        <div class="main">
            <div class="invitation-tabs">
                <van-tabs v-model="active" animated color="#3076ED" line-height="0.08rem" title-active-color="#3076ED" title-inactive-color="#474747">
                    <van-tab v-for="(item, index) in tabs" :title="item.name" :key="index">
                        <compoment :is="item.view"></compoment>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import BackBtn from '../../../components/back_btn';
    import SubHeader from "../../../components/sub_header/index";

    import Vue from "vue";
    import { Tab, Tabs } from "vant";
    import "vant/lib/tabs/style";
    import "vant/lib/tab/style";
    Vue.use(Tab);
    Vue.use(Tabs);

    import Ranking from './ranking';
    import Invite from './invite';
    import Recommend from './recommend';
    export default {
        name: "invitation",
        components: {SubHeader, BackBtn, Ranking, Invite, Recommend},
        data() {
            return {
                active: 0,
                tabs: [{title:"我的推广", name:"周返佣排行", view:"ranking"},{title:"我的邀请", name:"我的邀请", view:"invite"},{title:"我的推荐", name:"我的推荐", view:"recommend"}]
            }
        },
        methods: {
            onClose: function() {
                this.$emit("close", "invitation");
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

    .main {margin: 80px auto 0;background-color: rgba(247,247,250,1);}
</style>