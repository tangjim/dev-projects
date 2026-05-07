<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive && isRouterAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>
        <div class="bottom-nav">
            <ul :class="{active:item.active}" @click="goPage(item)" v-for="(item, index) in navArr" :key="index">
                <li><i class="iconfont" :class="item.icon"></i></li>
                <li>{{item.txt}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import { Overlay } from "vant";
    import "vant/lib/overlay/style";
    Vue.use(Overlay);

    import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
    import {DELETE_ALL, SET_REPLACE_ISSUE_TIP_STATE, EMPTY_USER_INFO} from "../../store/modules/mutation-types";
    import config from "../../assets/js/conf/config";
    import Socket from '../../websocket';
    export default {
        name: "Main",
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                navArr:[
                    {code: "home", txt:"首页", icon:"icon-icon_huabanfuben", active: this.$route.name==="home", page:"/index"},
                    {code: "quotation", txt:"行情", icon:"icon-hangqing", active: this.$route.name==="quotation", page:"/quotation"},
                    {code: "contract", txt:"合约", icon:"icon-heyueguanli", active: this.$route.name==="contract", page:"/contract"},
                    {code: "assets", txt:"资产", icon:"icon-zichanshebei", active: this.$route.name==="assets", page:"/assets"},
                    {code: "my", txt:"我的", icon:"icon-wode-copy", active: this.$route.name==="my", page:"/my"}
                ],
                homeStyle: true,
                lotteryStyle: false,
                lotteryResultStyle: false,
                trendStyle: false,
                myStyle: false,
                isRouterAlive:true
            }
        },
        beforeCreate() {
            // Socket.init();
            // Socket.onMessage((res)=>{
            //     // this.lotterySocketMessage(res);
            //     this.configSocketMessage(res);
            //     this.susProductSocketMessage(res);
            // });
        },
        created() {
            // console.log(process.env.VUE_APP_NAME);
            document.title = config.appName + "-" + this.$route.meta.title;
            // this.changeStyleNav(this.$route.name);
            this.delLocalStorage();
            this.userInfo();
        },
        beforeRouteUpdate(to, form, next) {
            document.title = config.appName + "-" + to.meta.title;
            this.changeStyleNav(to.name);
            next();
        },
        activated() {
            document.title = config.appName + "-" + this.$route.meta.title;
            this.changeStyleNav(this.$route.name);
        },
        methods: {
            ...mapMutations({
                emptyUser: "user/"+EMPTY_USER_INFO,
            }),
            ...mapActions({
                userInfo: "user/info",
                configSocketMessage: "config/socketMessage",
                susProductSocketMessage: "product/susSocketMessage",
                // 获取合约产品信息
                // getSusProductInfo

                // 获取指数产品信息
                // getProductInfo

            }),
            goPage: function (item) {
                for (let i=0; i<this.navArr.length; i++) {
                    if (this.navArr[i].active) {
                        this.navArr[i].active = false;
                        break;
                    }
                }
                item.active = true;
                if (this.$route.meta.jump === "replace") {
                    this.$router.replace(item.page);
                } else {
                    this.$router.push(item.page);
                }
            },
            changeStyleNav: function(name) {
                for (let i=0; i<this.navArr.length; i++) {
                    if (this.navArr[i].active) {
                        this.navArr[i].active = false;
                        break;
                    }
                }
                for (let i=0; i<this.navArr.length; i++) {
                    if (this.navArr[i].code === name) {
                        this.navArr[i].active = true;
                        break;
                    }
                }
            },
            reload: function () {
                this.isRouterAlive = false;
                this.$nextTick(function () {
                    this.isRouterAlive = true;
                });
            },
            delLocalStorage: function() {}
        },
        destroyed() {
            this.delLocalStorage();
            // Socket.close();
        }
    }
</script>

<style scoped>
    .bottom-nav {
        width: 750px;
        height: 150px;
        background:rgba(255,255,255,1);
        border-top: 2px solid rgba(231,236,237,1);
        position: fixed;
        z-index: 999;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;
    }
    .bottom-nav ul {
        width: 150px;
        height: 150px;
        overflow: hidden;
    }
    .bottom-nav ul li {
        text-align: center;
        background:rgba(255,255,255,1);
        opacity:0.94;
    }
    .bottom-nav ul li:nth-child(1) {
        width: 150px;
        height: 41px;
        margin-top: 26px;
    }
    .bottom-nav ul li:nth-child(1) .iconfont {
        font-size: 64px;
        line-height: 64px;
        color: rgba(154,154,154,1);
    }
    .bottom-nav ul li:nth-child(2) {
        margin-top: 28px;
        font-size: 28px;
        font-family: Arial;
        font-weight:400;
        line-height:32px;
        color: rgb(139, 161, 177);
        opacity:1;
    }
    .bottom-nav ul.active li:nth-child(1) .iconfont {
        color: rgb(5, 173, 142);
    }
    .bottom-nav ul.active li:nth-child(2) {
        color: rgb(5, 173, 142);
    }
</style>