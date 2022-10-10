import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import messages from './messages' // Messages
import Vuelidate from 'vuelidate'


import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/'

Vue.use(axios)
Vue.use(VueI18n)
Vue.use(Vuelidate)

const i18n = new VueI18n({
    locale: 'en',
    messages
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')
