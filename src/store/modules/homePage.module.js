// State
const state = () => ({
    homePage: {
        data: [],
        loading: false,
        error: false
    }
})

// Getters
const getters = {
    searchLoading: state => state.homePage.loading
}

// Mutations
const mutations = {
    setSearchLoading(state, value) {
        state.homePage.loading = value
    }
}

// Actions
const actions = {
    handleSearch({commit}, payload) {
        commit('setSearchLoading', true)
        // TODO
        setTimeout(() => {
            commit('setSearchLoading', false)
        }, 1000)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
