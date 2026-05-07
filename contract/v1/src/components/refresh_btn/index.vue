<template>
    <span @click="onRefresh"><slot></slot></span>
</template>

<script>
    export default {
        name: "refresh-btn",
        methods: {
            onRefresh: function () {
                
            }
        }
    }
</script>

<style scoped>

</style>