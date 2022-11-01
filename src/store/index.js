import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import authModule from './modules/auth.module'
import homePageModule from './modules/homePage.module'
import searchModule from './modules/search.module'
import bookItemModule from './modules/bookItem.module'
import sendMessageModule from './modules/sendMessage.module'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        authModule,
        homePageModule,
        searchModule,
        bookItemModule,
        sendMessageModule,
    },
})
