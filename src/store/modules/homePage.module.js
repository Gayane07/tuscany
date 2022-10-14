import axios from 'axios'

// State
const state = () => ({
    homePage: {
        data: [],
        loading: false,
        searchLoading: false,
        bookLoading: false,
        error: false,
    },
})

// Getters
const getters = {
    homePageData: state => state.homePage.data,
    homePageLoading: state => state.homePage.loading,
    searchLoading: state => state.homePage.searchLoading,
    bookLoading: state => state.homePage.bookLoading,
    homePageError: state => state.homePage.error,
}

// Mutations
const mutations = {
    setHomePageData(state, data) {
        state.homePage.data = data
    },
    setHomePageLoading(state, value) {
        state.homePage.loading = value
    },
    setSearchLoading(state, value) {
        state.homePage.searchLoading = value
    },
    setBookBtnLoading(state, value) {
        state.homePage.bookLoading = value
    },
    setHomePageError(state, value) {
        state.homePage.error = value
    },
}

// Actions
const actions = {
    fetchHomePageData({ commit }) {
        commit('setHomePageLoading', true)
        axios
            .get('http://localhost:3000/homepage-data')
            .then(response => {
                commit('setHomePageData', response.data)
                commit('setHomePageError', false)
            })
            .catch(error => {
                commit('setHomePageError', true)
            })
            .finally(() => {
                commit('setHomePageLoading', false)
            })
    },

    handleSearch({ commit }, payload) {
        commit('setSearchLoading', true)
        // TODO
        setTimeout(() => {
            commit('setSearchLoading', false)
        }, 1000)
    },

    handleBookItem({commit}, payload) {
        commit('setBookBtnLoading', true)
        // TODO
        setTimeout(() => {
            commit('setBookBtnLoading', false)
        }, 1000);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
