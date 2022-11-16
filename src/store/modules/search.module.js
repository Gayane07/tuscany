import axios from 'axios'

// State
const state = () => ({
    search: {
        data: null,
        loading: false,
        error: false,
    },
    requestSuccess: false,
})

// Getters
const getters = {
    searchData: state => state.search.data,
    searchLoading: state => state.search.loading,
    searchError: state => state.search.error,
    requestSuccess: state => state.requestSuccess,
}

// Mutations
const mutations = {
    setSearchData(state, data) {
        state.search.data = data
    },
    setSearchLoading(state, value) {
        state.search.loading = value
    },
    setSearchError(state, value) {
        state.search.error = value
    },
    setRequestSuccess(state, value) {
        state.requestSuccess = value
    },
}

// Actions
const actions = {
    handleSearch({ commit }, payload) {
        commit('setSearchLoading', true)
        commit('setRequestSuccess', false)
        axios
            .get('/search')
            .then(response => {
                commit('setSearchData', response.data)
                commit('setSearchError', false)
                commit('setRequestSuccess', true)
            })
            .catch(error => {
                commit('setSearchError', true)
            })
            .finally(() => {
                commit('setSearchLoading', false)
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
