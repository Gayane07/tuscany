<template>
    <div class="payment flex-between-start">
        <div class="payment__stripe">
            <Stripe :clickOnPay="clickOnPay" @paymentSuccess="$emit('finishPayment', 4)" />
        </div>
        <div class="payment__overview">
            <TicketOverview @changeStep="changeStep" :disableNextButton="false" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

// Components
import TicketOverview from './components/TicketOverview'
import Stripe from './components/Stripe'

export default {
    name: 'PaymentComponent',
    components: { TicketOverview, Stripe },
    data() {
        return {
            payload: {},
            clickOnPay: false
        }
    },
    methods: {
        changeStep() {
            this.clickOnPay = true
            this.$nextTick(() => {
                this.clickOnPay = false
            })
        },
    },
    computed: {
        ...mapGetters('bookItemModule', ['payloadData']),
    },
    created() {
        this.payload = { ...this.payloadData }
    },
}
</script>

<style lang="scss" scoped>
.payment {
    margin-bottom: 24px;
    gap: 0 120px;
    &__stripe {
        width: 50%;
    }
    &__overview {
        width: 50%;
    }
}
@media only screen and (max-width: 1600px) {
    .payment {
        gap: 0 60px;
    }
}
@media only screen and (max-width: 1460px) {
    .payment {
        gap: 0 32px;
    }
}
@media only screen and (max-width: 767px) {
    .payment {
        flex-direction: column;
        gap: 32px 0;
        &__stripe {
            width: 100%;
        }
        &__overview {
            width: 100%;
        }
    }
}
</style>
