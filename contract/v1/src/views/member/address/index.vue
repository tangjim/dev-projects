<template>
    <div class="box">
        <sub-header>
            <a class="back-btn" @click="onClose" slot="header-left"><i class="iconfont icon-jiantou1"></i></a>
            <div class="header-title" slot="header-middle">地址管理</div>
        </sub-header>

        <div class="main">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <van-cell v-for="(item, index) in addressInfoArr" :key="index">
                        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-dizhi_huaban"></use></svg>
                        <div class="address-wrap">
                            <div class="top">
                                <span class="title">备注内容</span>
                                <span class="title-right">{{item.productCode}}-{{item.type}}</span>
                            </div>
                            <div class="wrap"><span class="fut-s">0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359</span></div>
                        </div>

                    </van-cell>
                    <template #finished><span class="finished-txt"><em class="fut-s">...我是有底线的...</em></span></template>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
    import BackBtn from '../../../components/back_btn';
    import SubHeader from "../../../components/sub_header/index";

    import Vue from 'vue';
    import "vant/lib/list/style";
    import "vant/lib/pull-refresh/style";
    import { List, PullRefresh  } from 'vant';

    Vue.use(List);
    Vue.use(PullRefresh);

    import {DELETE_ALL} from "../../../store/modules/mutation-types";
    import {mapState, mapActions, mapMutations} from 'vuex';
    export default {
        name: "my-address",
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
                addressInfoArr: state=>state.address.addressInfo
            }),
        },
        methods: {
            ...mapMutations({
                emptyList: "address/"+DELETE_ALL
            }),
            ...mapActions({
                getAddress: 'address/get'
            }),
            onClose: function() {
                this.$emit("close", "address");
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
                            if (this.addressInfoArr.length >= 5) {
                                this.finished = true;
                            }
                        }, formData:{userCode:"abc"}
                    };
                    this.getAddress(data);
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
    .main .van-cell {height: 100px;padding: 0 40px;margin: 0;}
    .main .van-cell:not(:last-child)::after {left: 0;border-bottom: 2px solid  rgba(231,236,237,1);transform:none;}
    .main .van-cell .icon { width: 42px;height: 42px;fill: currentColor;overflow: hidden;margin-top: 18px;margin-left: 2px;float: left}
    .address-wrap {float: left;margin-left: 14px;width: calc(670px - 58px)}
    .address-wrap .top {overflow: hidden}
    .address-wrap .top .title {font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(27,65,91,1);margin-top: 12px;float: left}
    .address-wrap .top .title-right {float: right;height:28px;line-height: 28px;margin-top: 18px;background:rgba(5,173,142,1);border-radius:6px;padding: 0 8px;font-size:12px;font-family:Microsoft YaHei;font-weight:400;color:rgba(255,255,255,1);}
    .address-wrap .wrap {font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:28px;color:rgba(140,161,169,1);margin-top: 8px;width: 100%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden}
    .finished-txt {font-size:20px;font-family:Microsoft YaHei;font-weight:400;color:rgba(140,161,169,1);}
</style>