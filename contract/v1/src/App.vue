<template>
    <div id="app">
        <template v-if="$route.meta.transition">
            <transition>
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
            </transition>
            <transition>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>
        </template>
        <template v-else>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </template>
    </div>
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex';

    export default {
        name: 'App',
        created() {
            // {formData:{productCode:"BTC-USDT"}}
            this.getCoinList();
        },
        methods: {
            ...mapActions({
                getCoinList: 'product/getSusProductInfo'
            })
        },
        watch: {
            $route(to, from) {
                if (to.meta.index > from.meta.index) {
                    // this.transition = "slide-left";
                } else {
                    // this.transition = "slide-right";
                }
            }
        }
    }
</script>

<style>
    @import "./assets/font/iconfont.css";
    @import "./assets/css/common/public.css";
    /*@import "./assets/css/common/waves.css";*/
    #app {
        width: 750px;
        margin: auto;
    }
    /*.layui-m-layer-msg .layui-m-layercont {*/
        /*padding: 20px;*/
    /*}*/

</style>
