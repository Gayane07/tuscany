<template>
    <div class="overlay" v-if="loading">
        <span class="spinner"></span>
    </div>
    <div class="overlay" v-else-if="error">
        <GenericError @reFetchData="fetchData" />
    </div>
    <div class="container" :style="{ paddingTop: headerHeight + 'px' }" v-else>
        <div class="stepper flex-center-center">stepper</div>
        <BookingDetails v-if="step === 1" @changeStep="handleChangeStep" />
        <YourDetails v-if="step === 2" @changeStep="handleChangeStep" />
        <Payment v-if="step === 3" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

// Components
import GenericError from '@/components/GenericError'
import BookingDetails from './tabs/BookingDetails'
import YourDetails from './tabs/YourDetails'
import Payment from './tabs/Payment'

export default {
    name: 'BuyPage',
    components: { GenericError, BookingDetails, YourDetails, Payment },
    props: {
        headerHeight: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            step: 1
        }
    },
    methods: {
        ...mapActions('bookItemModule', ['fetchData']),
        handleChangeStep(step) {
            this.step = step
        }
    },
    computed: {
        ...mapGetters('bookItemModule', ['currentItem', 'loading', 'error']),
    },
    created() {
        if (!this.currentItem) {
            this.fetchData()
        }
    }
}
</script>

<style lang="scss" scoped>
.stepper {
    margin-bottom: 120px;
}
</style>
