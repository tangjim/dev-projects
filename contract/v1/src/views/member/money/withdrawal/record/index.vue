<template>
    <div class="box">
        <sub-header>
            <a class="back-btn" @click="onClose" slot="header-left"><i class="iconfont icon-jiantou1"></i></a>
            <div class="header-title" slot="header-middle">提币记录</div>
        </sub-header>

        <div class="main">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <van-cell v-for="(item, index) in list" :key="index">
                        <div class="item-wrap">
                            <div class="top">
                                <div class="title">USDT<span class="title-">{{item.type}}</span></div>
                                <span class="title-right">-{{item.amount}}</span>
                            </div>
                            <div class="wrap">0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359</div>
                            <div class="bottom">
                                <span class="date">{{item.date}}</span>
                                <div class="state">
                                    <template v-if="item.state === 0"><span class="red">待审核</span></template>
                                    <template v-if="item.state === 1"><span class="green">提币成功</span></template>
                                </div>
                            </div>
                        </div>

                    </van-cell>
                    <template #finished><span class="finished-txt">...我是有底线的...</span></template>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
    import BackBtn from '../../../../../components/back_btn';
    import SubHeader from "../../../../../components/sub_header/index";

    import Vue from 'vue';
    import "vant/lib/list/style";
    import "vant/lib/pull-refresh/style";
    import { List, PullRefresh  } from 'vant';

    Vue.use(List);
    Vue.use(PullRefresh);

    import {DELETE_ALL} from "../../../../../store/modules/mutation-types";
    import {mapState, mapActions, mapMutations} from 'vuex';
    export default {
        name: "withdrawal-record",
        components: {SubHeader, BackBtn},
        data() {
            return {
                loading: false,
                finished: false,
                refreshing: false,
            };
        },
        computed: {
            ...mapState({
                list: state=>state.userWithdrawalRecord.list
            }),
        },
        methods: {
            ...mapMutations({
                emptyList: "userWithdrawalRecord/"+DELETE_ALL
            }),
            ...mapActions({
                getData: 'userWithdrawalRecord/get'
            }),
            onClose: function() {
                this.$emit("close", "withdrawalRecord");
            },
            onLoad() {
                if (this.refreshing) {
                    // this.list = [];
                    this.emptyList();
                    this.refreshing = false;
                }

                setTimeout(()=>{
                    let data = {
                        success:(res) => {
                            this.loading = false;
                            // this.dataPage.total = res.data.total;
                            if (this.list.length >= 5) {
                                this.finished = true;
                            }
                        }, formData:{userCode:"abc"}
                    };
                    this.getData(data);
                }, 500)
            },
            onRefresh() {
                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
            },
        }
    }
</script>

<style scoped>
    .box {width: 750px;margin: auto}
    .back-btn {cursor: pointer;display: inline-block;}
    .back-btn {margin-left: 2px}
    .back-btn i {color:rgba(27,65,91,1);line-height: 80px;font-size: 42px;font-weight:400;}
    .header-title {text-align: center;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:80px;color:rgba(27,65,91,1);}

    .main {margin: 112px auto 0;background-color: rgb(255, 255, 255);height: calc(100vh - 112px)}
    .main .van-cell {height: 150px;padding: 0 20px;margin: 0;}
    .main .van-cell:not(:last-child)::after {left: 0;border-bottom: 2px solid  rgba(231,236,237,1);transform:none;}

    .item-wrap {float: left;width: 710px}
    .item-wrap .top {overflow: hidden}
    .item-wrap .top .title {font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(27,65,91,1);margin-top: 12px;float: left}
    .item-wrap .top .title .title- {margin-left: 20px;height:28px;line-height: 28px;margin-top: 18px;background:rgba(5,173,142,1);border-radius:6px;padding: 0 8px;font-size:12px;font-family:Microsoft YaHei;font-weight:400;color:rgba(255,255,255,1);}

    .item-wrap .top .title-right {float: right;height:28px;line-height: 28px;margin-top: 18px;padding: 0 8px;font-size:26px;font-family:Microsoft YaHei;font-weight:400;color: rgb(75, 137, 185);}

    .item-wrap .wrap {font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:28px;color:rgba(140,161,169,1);margin-top: 18px;width: 90%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden}
    .item-wrap {font-size:20px;font-family:Microsoft YaHei;font-weight:400;color:rgba(140,161,169,1);}

    .item-wrap .bottom .date,.item-wrap .bottom .state {font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:28px;color: rgb(172, 172, 172);margin-top: 18px;}
    .item-wrap .bottom .date {float: left;}
    .item-wrap .bottom .state{float: right;}

    .red {color: #ff2c25;}
    .green {color: #5da83f;}

</style>