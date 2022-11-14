// State
const state = () => ({
    request: {
        loading: false,
    },

    // Reset password
    resetPassword: {
        email: '',
        messageSent: false,
    },

    // New password
    newPassword: {
        changed: false,
    },
})

// Getters
const getters = {
    loading: state => state.request.loading,

    // Reset password
    emailForResetPassword: state => state.resetPassword.email,
    messageSent: state => state.resetPassword.messageSent,

    // New password
    passwordChanged: state => state.newPassword.changed,
}

// Mutations
const mutations = {
    setButtonLoading(state, value) {
        state.request.loading = value
    },

    // Reset password
    setMessageSuccessfullySent(state, value) {
        state.resetPassword.messageSent = value
    },
    setEmailForResetPassword(state, email) {
        state.resetPassword.email = email
    },

    // Set new password
    setPasswordSuccessfullyChanged(state, value) {
        state.newPassword.changed = value
    },

    removeMessageSentValue(state) {
        state.resetPassword.messageSent = false
    },
}

// Actions
const actions = {
    handleLogIn({ commit }, payload) {
        commit('setButtonLoading', true)
        // TODO
        setTimeout(() => {
            localStorage.setItem('token', '5fd4v5sd1vsdv1sdvfd5bhgthd1shj1sf5o4t5p41mngda5gfsdgv1h45fd1bs5dg')
            window.location.reload()
            commit('setButtonLoading', false)
        }, 1000)
    },
    handleLogout({ commit }) {
        // commit('setButtonLoading', true)
        setTimeout(() => {
            localStorage.removeItem('token')
            window.location.href = '/'
            // commit('setButtonLoading', false)
        }, 1000)
    },

    handleRegister({ commit }, payload) {
        commit('setButtonLoading', true)
        // TODO
        setTimeout(() => {
            commit('setButtonLoading', false)
        }, 1000)
    },

    resetPassword({ commit }, payload) {
        commit('setEmailForResetPassword', payload.email)
        commit('setButtonLoading', true)
        // TODO
        setTimeout(() => {
            commit('setButtonLoading', false)
            commit('setMessageSuccessfullySent', true)
        }, 1000)
    },

    handleSetNewPassword({ commit }, payload) {
        commit('setButtonLoading', true)
        // TODO
        setTimeout(() => {
            commit('setButtonLoading', false)
            commit('setPasswordSuccessfullyChanged', true)
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
