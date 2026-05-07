import Vue from 'vue';
import Vuex from 'vuex';

import config from './modules/config';
import coin from './modules/coin';
import coinPair from './modules/coin/pair';
import notice from './modules/common/notice';
import help from './modules/common/help';
import basic from './modules/common/basic';
import exchange from './modules/common/exchange';
import rankingProfit from "./modules/ranking/profit";
import rankingGain from "./modules/ranking/gain";
import rankingRebate from "./modules/ranking/rebate";
import point from "./modules/user/point";
import pointRecord from "./modules/user/point/record";
import pointGain from "./modules/user/gain";
import coinPairGain from "./modules/user/gain/coinPair";
import pointExchange from "./modules/user/point/exchange";
import robot from "./modules/robot";
import user from './modules/user';
import asset from './modules/user/asset';
import withdrawalAddress from "./modules/user/address/withdrawal";
import recommend from "./modules/recommend";
import recommendDirectly from "./modules/recommend/directly";
import recommendIndirect from "./modules/recommend/indirect";
import recommendTeam from "./modules/recommend/team";
import order from './modules/order';
// import strategy from "./modules/strategy";
import strategySettings from "./modules/strategy/settings";


Vue.use(Vuex);

let store = new Vuex.Store({
    modules: {config, user, asset, order, coin, coinPair, notice, help, basic, exchange, rankingProfit, rankingGain, rankingRebate, point, pointRecord, pointGain, coinPairGain, robot, withdrawalAddress, recommend, recommendDirectly, recommendIndirect, recommendTeam, strategySettings, pointExchange}
});

export default store;
