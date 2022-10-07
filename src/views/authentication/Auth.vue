<template>
    <div>
        <Login v-if="modalType === 'login'" @close="handleCloseModal" @changePage="handleChangeModal" />
        <Register v-if="modalType === 'register'" @close="handleCloseModal" @changePage="handleChangeModal" />
        <ForgotPassword
            v-if="modalType === 'forgotPassword'"
            @close="handleCloseModal"
            @changePage="handleChangeModal"
        />
        <CheckEmail v-if="modalType === 'checkEmail'" @close="handleCloseModal" @changePage="handleChangeModal" />
        <SetNewPassword v-if="modalType === 'setNewPassword'" @close="handleCloseModal" @changePage="handleChangeModal" />
        <PasswordReset v-if="modalType === 'passwordReset'" @close="handleCloseModal" @changePage="handleChangeModal" />
    </div>
</template>

<script>
import Login from './login/Login.vue'
import Register from './register/Register'
import ForgotPassword from './forgotPassword/ForgotPassword'
import CheckEmail from './chackEmail/CheckEmail'
import SetNewPassword from './setNewPassword/SetNewPassword'
import PasswordReset from './passwordReset/PasswordReset'

export default {
    name: 'AuthenticationFlow',
    components: { Login, Register, ForgotPassword, CheckEmail, SetNewPassword, PasswordReset },
    props: {
        type: {
            type: String,
        },
    },
    data() {
        return {
            modalType: '',
        }
    },
    methods: {
        handleCloseModal() {
            this.modalType = ''
            this.$emit('close')
        },
        handleChangeModal(value) {
            this.modalType = value
        },
    },
    watch: {
        type(value) {
            this.modalType = value
        },
    },
}
</script>

<style lang="scss" scoped></style>
