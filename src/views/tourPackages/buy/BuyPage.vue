<template>
    <div class="overlay" v-if="loading">
        <span class="spinner"></span>
    </div>
    <div class="overlay" v-else-if="error">
        <GenericError @reFetchData="fetchData" />
    </div>
    <div class="container" :style="{ paddingTop: headerHeight + 'px' }" v-else>
        <div class="buy-stepper flex-center-center" v-if="step !== 4">
            <Stepper :steps="stepsData" :currentStepNum="step" @changeStep="handleChangeStep" />
        </div>
        <BookingDetails v-if="step === 1" @changeStep="handleChangeStep" />
        <YourDetails v-if="step === 2" @changeStep="handleChangeStep" />
        <Payment v-if="step === 3" @finishPayment="handleFinishPayment" />
        <OrderComplete v-if="step === 4" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

// Components
import GenericError from '@/components/GenericError'
import Stepper from '@/components/Stepper'
import BookingDetails from './tabs/BookingDetails'
import YourDetails from './tabs/YourDetails'
import Payment from './tabs/Payment'
import OrderComplete from './tabs/OrderComplete'

export default {
    name: 'BuyPage',
    components: { GenericError, Stepper, BookingDetails, YourDetails, Payment, OrderComplete },
    props: {
        headerHeight: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            step: 3,
            stepsData: [
                {
                    id: 1,
                    label: this.$t('bookingDetails'),
                },
                {
                    id: 2,
                    label: this.$t('yourDetails'),
                },
                {
                    id: 3,
                    label: this.$t('payment'),
                },
            ],
        }
    },
    methods: {
        ...mapActions('bookItemModule', ['fetchData']),
        handleChangeStep(step) {
            this.step = step
        },
        handleFinishPayment(step) {
            this.step = step
        },
    },
    computed: {
        ...mapGetters('bookItemModule', ['currentItem', 'loading', 'error']),
    },
    created() {
        if (!this.currentItem) {
            this.fetchData()
        }
    },
}
</script>

<style lang="scss" scoped>
.buy-stepper {
    width: 50%;
    margin: 0 auto 120px;
}

@media only screen and (max-width: 1359px) {
    .buy-stepper {
        margin: 0 auto 80px;
    }
}
@media only screen and (max-width: 991px) {
    .buy-stepper {
        margin: 0 auto 50px;
    }
}
@media only screen and (max-width: 575px) {
    .buy-stepper {
        width: 75%;
        margin: 0 auto 32px;
    }
}
</style>
