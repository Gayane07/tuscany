import axios from 'axios'

// State
const state = () => ({
    item: {
        payloadData: {
            date: new Date().toISOString().split('T')[0],
            time: null,
            adult: null,
            child: null,
            infant: null,
            name: null,
            surname: null,
            phoneNumber: null,
            email: null,
            cardNumber: null,
            expirationDate: null,
            cvv: null,
            totalPrice: null,
        },
        loading: false,
        error: false,
    },
    page: {
        loading: false,
        error: false,
    },
    prices: {
        adult: {
            value: 32,
            currencySymbol: '€',
        },
        child: {
            value: 22,
            currencySymbol: '€',
        },
        infant: {
            value: 0,
            currencySymbol: '€',
        },
    },
    currentItem: null,
})

// Getters
const getters = {
    payloadData: state => state.item.payloadData,
    prices: state => state.prices,
    currentItem: state => state.currentItem,
    loading: state => state.page.loading,
    error: state => state.page.error,
}

// Mutations
const mutations = {
    setPayloadFields(state, data) {
        for (let key in data) {
            state.item.payloadData[key] = data[key]
        }
    },
    setCurrentPackage(state, currentItem) {
        state.currentItem = currentItem
    },

    setPageLoading(state, value) {
        state.page.loading = value
    },
    setPageError(state, value) {
        state.page.error = value
    },

    resetState(state) {
        for (const key in state.item.payloadData) {
            state.item.payloadData[key] = null
        }
        state.item.payloadData.date = new Date().toISOString().split('T')[0]
        state.currentItem = null
    },
}

// Helper function
const findItem = data => {
    const id = +window.location.pathname.split('/')[2]
    return data.popularDestinations.find(el => el.id === id)
}

// Actions
const actions = {
    fetchData({ commit }) {
        commit('setPageLoading', true)
        axios
            .get('/homepage-data')
            .then(response => {
                commit('setCurrentPackage', findItem(response.data))
                commit('setPageError', false)
            })
            .catch(error => {
                commit('setPageError', true)
            })
            .finally(() => {
                commit('setPageLoading', false)
            })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
