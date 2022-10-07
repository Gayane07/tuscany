import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import authModule from './modules/auth.module'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        authModule
    },
});
