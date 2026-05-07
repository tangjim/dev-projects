import Vue from 'vue';
import Vuex from 'vuex';

import config from './modules/config';
import user from './modules/user';
import asset from './modules/user/asset';
import address from './modules/user/address';
import idCard from './modules/user/idCard';

import product from './modules/product/index';

import notice from './modules/notice';
import userRebateRanking from './modules/user/rebate/ranking';
import userWithdrawalRecord from './modules/user/withdrawal/record';
import userRechargeRecord from './modules/user/recharge/record';
import userRebateProfit from './modules/user/rebate/profit';
import order from './modules/order';


Vue.use(Vuex);

let store = new Vuex.Store({
    modules: {config, user, asset, address, idCard, product, notice, userRebateRanking, userWithdrawalRecord, userRechargeRecord, userRebateProfit, order}
});

export default store;
