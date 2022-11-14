import axios from 'axios'

// State
const state = () => ({
    tickets: {
        data: [],
        loading: false,
        error: false,
    },
})

// Getters
const getters = {
    tickets: state => state.tickets.data,
    loading: state => state.tickets.loading,
    error: state => state.tickets.error
}

// Mutations
const mutations = {
    setPageData(state, data) {
        state.tickets.data = data
    },
    setPageLoading(state, value) {
        state.tickets.loading = value
    },
    setPageError(state, value) {
        state.tickets.error = value
    }
}

// Actions
const actions = {
    fetchTickets({ commit }) {
        commit('setPageLoading', true)
        axios
            .get('http://localhost:3000/tickets')
            .then(response => {
                commit('setPageData', response.data)
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
