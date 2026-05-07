<template>
    <span @click="logic"><slot></slot></span>
</template>

<script>
    export default {
        name: "back-btn",
        props: {
            query: { type: Object },
            url: { type: String }
        },
        data() {
            return {
                backUrl: ""
            }
        },
        created() {
            this.backUrl = this.$route.meta.backUrl;
        },
        beforeRouteUpdate(to, form, next) {
            this.backUrl = this.$route.meta.backUrl;
            next();
        },
        methods: {
            logic: function() {
                this.onBack();
            },
            onBack: function() {
                if (this.backUrl === undefined) {
                    this.backUrl = "/";
                }
                if (this.url) {
                    if (!this.query) {
                        this.query = {};
                    }
                    this.$router.push({path:this.url, query: this.query});
                } else {
                    if (this.backUrl === "/") {
                        this.$router.push({path:this.backUrl, query:{}});
                    } else {
                        this.$router.go(-1);
                    }
                }
            },

        }
    }
</script>

<style scoped>

</style>