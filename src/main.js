import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import messages from './messages'
import Vuelidate from 'vuelidate'
import vClickOutside from 'v-click-outside'
import * as VueGoogleMaps from 'vue2-google-maps'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000/'

const MAP_KEY = process.env.VUE_APP_MAP_KEY

Vue.use(axios)
Vue.use(VueI18n)
Vue.use(Vuelidate)
Vue.use(vClickOutside)
Vue.use(VueGoogleMaps, {
    load: {
        // KEY taken from https://developers.google.com/maps/documentation/javascript/custom-markers#maps_custom_markers-html
        // Please use the original KEY instead in the future
        key: MAP_KEY,
        libraries: 'places',
    },
})

// Set default language
if (!localStorage.getItem('locale')) {
    localStorage.setItem('locale', process.env.VUE_APP_LOCALE || 'en')
}

const locale = localStorage.getItem('locale') || process.env.VUE_APP_LOCALE || 'en'
const i18n = new VueI18n({
    locale,
    messages,
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')
