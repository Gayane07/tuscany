// import axios from 'axios'

// State
const state = () => ({
    item: {
        payload: {},
        loading: false,
        error: false,
    },
})

// Getters
const getters = {}

// Mutations
const mutations = {
    setPayloadFields(state, data) {
        // state.item.payload
    },
}

// Actions
const actions = {
    handleBuyItem({}, payload) {
        console.log(payload)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
