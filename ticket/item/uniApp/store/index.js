//引入vue和vuex
import Vue from 'vue';
import Vuex from 'vuex';

import config from './modules/config';
import user from './modules/user';
import ticket from './modules/ticket';
import orderTicket from './modules/order/ticket';
import orderHotel from './modules/order/hotel';

import hotel from './modules/hotel';

import product from './modules/product'

Vue.use(Vuex);

let store = new Vuex.Store({
    modules: {config, user, ticket, orderTicket, hotel, orderHotel, product}
});

export default store;
