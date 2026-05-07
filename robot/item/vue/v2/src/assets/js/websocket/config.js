import allStore from '@/store';
export default {
    ip: process.env["VUE_APP_"+allStore.getters["exchange/currentExchangeShowCode"]+"_SOCKET_ADDRESS_IP"],// .VUE_APP_SOCKET_ADDRESS_IP,
    port: process.env["VUE_APP_"+allStore.getters["exchange/currentExchangeShowCode"]+"_SOCKET_ADDRESS_PORT"],// .VUE_APP_SOCKET_ADDRESS_PORT,
    dir: process.env.VUE_APP_SOCKET_ADDRESS_DIR
}
