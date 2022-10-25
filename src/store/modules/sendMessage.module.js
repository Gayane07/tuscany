// import axios from 'axios'

// State
const state = () => ({
    sendMessage: {
        data: {},
        loading: false,
        error: false,
    },
})

// Getters
const getters = {
    buttonLoading: state => state.sendMessage.loading,
}

// Mutations
const mutations = {
    setButtonLoading(state, value) {
        state.sendMessage.loading = value
    },
}

// Actions
const actions = {
    handleSendMessage({ commit }, payload) {
        commit('setButtonLoading', true)
        // TODO
        setTimeout(() => {
            commit('setButtonLoading', false)
        }, 1000)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
