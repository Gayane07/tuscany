<template>
    <div class="overview">
        <h2>{{ $t('yourTicketsOverview') }}</h2>
        <div class="flex-start-start overview__header">
            <img class="cover" :src="currentItem.imgUrl" :alt="$t('coverImage')" />
            <div class="flex-col-start-start">
                <h3>{{ currentItem.title }}</h3>
                <div class="flex-start-center time" v-if="payloadData.date">
                    <img src="@/assets/icons/date.svg" :alt="$t('calendarIcon')" />
                    <span>{{ payloadData.date }}</span>
                </div>
                <div class="flex-start-center time" v-if="payloadData.time">
                    <img src="@/assets/icons/clock.svg" :alt="$t('clockIcon')" />
                    <span>{{ payloadData.time }}</span>
                </div>
            </div>
        </div>

        <div class="divider"></div>

        <div class="flex-col-start-start overview__counts">
            <div class="flex-between-center full-width">
                <div class="flex-start-center">
                    <span class="overview__counts--count">{{ payloadData.adult || 0 }}</span>
                    <span>
                        {{ $t('adult18') }} ({{ prices.adult.currencySymbol + prices.adult.value + '.00' }})
                    </span>
                </div>
                <span class="overview__counts--total">
                    {{ prices.adult.currencySymbol }}{{ +payloadData.adult * +prices.adult.value }}
                </span>
            </div>
            <div class="flex-between-center full-width">
                <div class="flex-start-center">
                    <span class="overview__counts--count">{{ payloadData.child || 0 }}</span>
                    <span>
                        {{ $t('child6-17') }} ({{ prices.child.currencySymbol + prices.child.value + '.00' }})
                    </span>
                </div>
                <span class="overview__counts--total">
                    {{ prices.child.currencySymbol }}{{ +payloadData.child * +prices.child.value }}
                </span>
            </div>
            <div class="flex-between-center full-width">
                <div class="flex-start-center">
                    <span class="overview__counts--count">{{ payloadData.infant || 0 }}</span>
                    <span>
                        {{ $t('infant0-5') }} ({{
                            prices.infant.currencySymbol + prices.infant.value + '.00'
                        }})
                    </span>
                </div>
                <span class="overview__counts--total">
                    {{ prices.infant.currencySymbol }}{{ +payloadData.infant * +prices.infant.value }}
                </span>
            </div>
        </div>

        <div class="divider"></div>

        <div class="flex-between-center total">
            <span class="total-price">{{ $t('totalPrice') }}</span>
            <span class="total-value">{{ prices.adult.currencySymbol + computeTotalValue }}</span>
        </div>

        <PrimaryButton
            class="full-width next-btn"
            :label="$t('goToTheNextStep')"
            :disabled="disableNextButton"
            @onClick="$emit('changeStep')"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

// Components
import PrimaryButton from '@/components/PrimaryButton'

export default {
    name: 'TicketOverview',
    components: { PrimaryButton },
    props: {
        disableNextButton: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapGetters('bookItemModule', ['currentItem', 'payloadData', 'prices']),
        computeTotalValue() {
            return (
                +this.payloadData.adult * +this.prices.adult.value +
                +this.payloadData.child * +this.prices.child.value +
                +this.payloadData.infant * +this.prices.infant.value
            )
        },
    },
}
</script>

<style lang="scss" scoped>
.divider {
    margin-top: 22px;
}
.overview {
    border: 1px solid rgba(51, 51, 51, 0.2);
    border-radius: 24px;
    padding: 30px;
    h2 {
        font-weight: 800;
        font-size: 24px;
        color: #333333;
        margin-bottom: 50px;
    }
    img.cover {
        width: 160px;
        height: 110px;
        border-radius: 12px;
        object-fit: cover;
        margin-right: 20px;
    }

    .time {
        margin-top: 14px;
        img {
            margin-right: 12px;
            filter: invert(58%) sepia(54%) saturate(2431%) hue-rotate(358deg) brightness(97%) contrast(101%);
        }
        span {
            font-weight: 600;
            font-size: 18px;
        }
    }

    &__counts {
        font-size: 20px;
        font-weight: 400;
        gap: 32px 0;
        margin-top: 36px;
        &--count {
            display: block;
            border-radius: 50%;
            text-align: center;
            background-color: #efefef;
            font-weight: 600;
            padding: 5px 12px;
            margin-right: 10px;
        }
        &--total {
            font-weight: 600;
        }
    }

    .total {
        margin-top: 20px;
        &-price {
            font-weight: 700;
            font-size: 24px;
            color: rgba(51, 51, 51, 0.8);
        }
        &-value {
            color: #fa8b02;
            font-weight: 700;
            font-size: 24px;
        }
    }

    .next-btn {
        font-weight: 700;
        font-size: 20px;
        padding: 16px 24px;
        margin-top: 50px;
    }
}

@media only screen and (max-width: 1359px) {
    .divider {
        margin-top: 18px;
    }
    .overview {
        padding: 18px;
        h2 {
            font-size: 18px;
            margin-bottom: 32px;
        }
        h3 {
            font-size: 16px;
        }

        .time {
            margin-top: 10px;
            img {
                margin-right: 8px;
            }
            span {
                font-size: 14px;
            }
        }

        &__counts {
            font-size: 14px;
            gap: 16px 0;
            margin-top: 18px;
            &--count {
                margin-right: 8px;
            }
        }

        .total {
            margin-top: 18px;
            &-price {
                font-size: 18px;
            }
            &-value {
                font-size: 18px;
            }
        }

        .next-btn {
            font-size: 18px;
            padding: 8px 12px;
            margin-top: 24px;
        }
    }
}

@media only screen and (max-width: 1199px) {
    .overview {
        &__header {
            flex-direction: column;
            img.cover {
                margin: 0;
                margin-bottom: 12px;
                width: 100%;
                height: 200px;
            }
        }
    }
}

@media only screen and (max-width: 991px) {
}

@media only screen and (max-width: 767px) {
    .overview {
        &__header {
            img.cover {
                height: 300px;
            }
        }
    }
}

@media only screen and (max-width: 575px) {
    .overview {
        &__header {
            img.cover {
                height: 200px;
            }
        }
    }
}
@media only screen and (max-width: 475px) {
}
</style>
