<template>
    <div class="main">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        created() {
            // console.log(this.$route);
            // let self = this;
            // self.isShow = false;
            // setTimeout(function () {
            //     self.isShow = true;
            // }, 100);
        },
        methods: {
            sysInit: function () {}
        }
    }
</script>

<style scoped>
    .main {
        width: 750px;
        height: 100vh;
        overflow: hidden;
        position: relative;
        background-color: #ffffff;
    }
</style>
