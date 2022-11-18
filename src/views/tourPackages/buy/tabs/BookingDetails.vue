<template>
    <div class="buy flex-between-start">
        <div class="buy__details flex-col-start-start">
            <div class="full-width buy__details--date">
                <span>{{ $t('whenYouWillVisit') }}</span>
                <div class="flex-end-center date-wrap">
                    <VueDatePicker
                        class="buy__detail--date-picker"
                        v-model="payload.date"
                        no-header
                        fullscreen-mobile
                        color="#fa8b02"
                        :locale="{ lang: locale }"
                        :placeholder="$t('chooseDate')"
                        @onOpen="
                            isDatepickerOpened = true
                            setDatepickerMenuStyles()
                        "
                        @onClose="isDatepickerOpened = false"
                        @onChange="setPayloadFields(payload)"
                    />
                    <img
                        :class="{ rotated: isDatepickerOpened }"
                        src="@/assets/icons/arrow-down.svg"
                        :alt="$t('arrowDown')"
                    />
                </div>
            </div>

            <div class="full-width buy__details--time">
                <img class="clock" src="@/assets/icons/clock.svg" :alt="$t('clockIcon')" />
                <span>{{ $t('whichTime') }}</span>
                <v-select
                    :class="{ 'with-value': payload.time }"
                    :options="timeOptions || []"
                    :value="payload.time"
                    :placeholder="$t('chooseTime')"
                    :clearable="false"
                    :filterable="false"
                    :searchable="false"
                    @input="item => handleChangeField('time', item.value)"
                    @open="isTimePickerOpened = true"
                    @close="isTimePickerOpened = false"
                >
                    <template #open-indicator>
                        <img
                            :class="{ rotated: isTimePickerOpened }"
                            src="@/assets/icons/arrow-down.svg"
                            :alt="$t('clockIcon')"
                            width="16"
                        />
                    </template>
                </v-select>
            </div>

            <div class="full-width buy__details--info">
                <span>{{ $t('selectYourTickets') }}</span>
                <div class="buy__details--info__block">
                    <ul>
                        <li>{{ $t('freeForKids') }}</li>
                        <li>{{ $t('pregnantWomen') }}</li>
                    </ul>
                </div>
            </div>

            <div class="full-width buy__details--counts">
                <div class="item">
                    <div class="flex-between-center">
                        <div class="flex-col-start-start">
                            <h3>{{ $t('adult18') }}</h3>
                            <span>{{ prices.adult.currencySymbol + prices.adult.value }}</span>
                        </div>
                        <div class="flex-between-center set-value">
                            <div class="decrement" @click="handleChangeField('adult', payload.adult - 1)">
                                <img src="@/assets/icons/minus.svg" :alt="$t('minusIcon')" />
                            </div>
                            <div class="box">{{ payload.adult || '0' }}</div>
                            <div class="increment" @click="handleChangeField('adult', payload.adult + 1)">
                                <img src="@/assets/icons/plus.svg" :alt="$t('plusIcon')" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <div class="flex-between-center">
                        <div class="flex-col-start-start">
                            <h3>{{ $t('child6-17') }}</h3>
                            <ul>
                                <li>{{ $t('withValueId') }}</li>
                                <li>{{ $t('onlyInCombination') }}</li>
                            </ul>
                            <span>{{ prices.child.currencySymbol + prices.child.value }}</span>
                        </div>
                        <div class="flex-between-center set-value">
                            <div class="decrement" @click="handleChangeField('child', payload.child - 1)">
                                <img src="@/assets/icons/minus.svg" :alt="$t('minusIcon')" />
                            </div>
                            <div class="box">{{ payload.child || '0' }}</div>
                            <div class="increment" @click="handleChangeField('child', payload.child + 1)">
                                <img src="@/assets/icons/plus.svg" :alt="$t('plusIcon')" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <div class="flex-between-center">
                        <div class="flex-col-start-start">
                            <h3>{{ $t('infant0-5') }}</h3>
                            <ul>
                                <li>{{ $t('onlyInCombination') }}</li>
                            </ul>
                            <span>{{ $t('free') }}</span>
                        </div>
                        <div class="flex-between-center set-value">
                            <div class="decrement" @click="handleChangeField('infant', payload.infant - 1)">
                                <img src="@/assets/icons/minus.svg" :alt="$t('minusIcon')" />
                            </div>
                            <div class="box">{{ payload.infant || '0' }}</div>
                            <div class="increment" @click="handleChangeField('infant', payload.infant + 1)">
                                <img src="@/assets/icons/plus.svg" :alt="$t('plusIcon')" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="buy__overview">
            <TicketOverview @changeStep="changeStep" :disableNextButton="!payloadData.adult" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import 'vue-select/dist/vue-select.css'
import { times } from '@/utils/timeOptions.js'

// Components
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import vSelect from 'vue-select'
import TicketOverview from './components/TicketOverview'

export default {
    name: 'BookingDetails',
    components: { VueDatePicker, vSelect, TicketOverview },
    data() {
        return {
            locale: localStorage.getItem('locale'),
            payload: {},
            timeOptions: times,
            isDatepickerOpened: false,
            isTimePickerOpened: false,
        }
    },
    methods: {
        ...mapMutations('bookItemModule', ['setPayloadFields']),
        setDatepickerMenuStyles() {
            this.$nextTick(() => {
                document.querySelectorAll('.vd-picker__controls-wrapper button').forEach(button => {
                    button.style.fontSize = '18px'
                    button.style.fontWeight = '600'
                })
            })
        },
        handleChangeField(field, value) {
            if (value === -1) return
            this.payload[field] = value
            this.setPayloadFields(this.payload)
        },
        calculateTotalPrice() {
            return (
                +this.payloadData.adult * +this.prices.adult.value +
                +this.payloadData.child * +this.prices.child.value +
                +this.payloadData.infant * +this.prices.infant.value
            )
        },

        changeStep() {
            this.payload.totalPrice = this.calculateTotalPrice()
            this.setPayloadFields(this.payload)
            this.$emit('changeStep', 2)
        },
    },
    computed: {
        ...mapGetters('bookItemModule', ['payloadData', 'prices']),
    },
    created() {
        this.payload = { ...this.payloadData }
    },
}
</script>

<style lang="scss" scoped>
.rotated {
    transform: rotate(180deg);
    transition: 0.2s;
}
.buy {
    gap: 130px;
    &__details {
        width: 50%;
        &--date {
            margin-bottom: 40px;
            &-picker {
                padding-left: 24px;
            }
            img {
                transition: 0.2s;
            }
            ::v-deep() {
                div.vd-picker__input--is-active {
                    color: #33333366 !important;
                    input {
                        font-weight: 400;
                        color: #33333366 !important;
                    }
                }
                input {
                    font-size: 18px !important;
                    &::placeholder {
                        color: #33333366;
                    }
                }
                .vd-picker__controls {
                    &-wrapper {
                        font-weight: 600;
                        font-size: 18px;
                    }
                }
            }

            span {
                display: block;
                font-weight: 600;
                font-size: 24px;
                color: #333333;
                margin-bottom: 20px;
            }
            .date-wrap {
                padding: 10px 24px;
                border: 1px solid rgba(51, 51, 51, 0.2);
                border-radius: 8px;
            }
        }
        &--time {
            position: relative;
            margin-bottom: 40px;
            img {
                transition: 0.2s;
            }
            span {
                display: block;
                font-weight: 600;
                font-size: 24px;
                color: #333333;
                margin-bottom: 20px;
            }
            .with-value {
                ::v-deep() {
                    input {
                        display: none;
                    }
                    span.vs__selected {
                        font-size: 18px;
                        opacity: 1;
                        color: black;
                        font-weight: 400;
                    }
                }
            }
            .clock {
                position: absolute;
                top: 65%;
                left: 30px;
                z-index: 10;
            }
        }
        &--info {
            margin-bottom: 40px;
            span {
                display: block;
                font-weight: 600;
                font-size: 24px;
                color: #333333;
                margin-bottom: 20px;
            }
            &__block {
                padding: 16px 24px;
                background: rgba(239, 239, 239, 0.4);
                border-radius: 12px;
                ul {
                    font-weight: 400;
                    font-size: 18px;
                    color: rgba(51, 51, 51, 0.8);
                    li:not(:last-child) {
                        margin-bottom: 16px;
                    }
                }
            }
        }
        &--counts {
            .item {
                padding: 16px 24px;
                border: 1px solid rgba(51, 51, 51, 0.2);
                border-radius: 12px;
                margin-bottom: 32px;
                h3 {
                    font-weight: 700;
                    font-size: 20px;
                    line-height: 27px;
                    color: #333333;
                    margin-bottom: 10px;
                }
                span {
                    font-weight: 700;
                    font-size: 20px;
                    line-height: 27px;
                    color: #fa8b02;
                }
                ul {
                    margin-bottom: 10px;
                    font-size: 18px;
                }
                .set-value {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid rgba(192, 192, 192, 0.8);
                    border-radius: 8px;
                    .decrement,
                    .increment,
                    .box {
                        padding: 9px 18px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        user-select: none;
                    }
                    .box {
                        background: #efefef;
                        font-weight: 600;
                        font-size: 24px;
                        cursor: auto;
                    }
                }
            }
        }
    }

    &__overview {
        width: 50%;
    }
}
::v-deep() {
    .vd-wrapper.buy__details--date-picker {
        input {
            font-weight: 600;
            font-size: 18px !important;
            color: #333333;
            &::placeholder {
                font-weight: 600;
                font-size: 18px;
                color: #333333;
                opacity: 1;
            }
        }
    }

    .vs__dropdown-toggle {
        padding-left: 50px;
        padding-right: 16px;
        height: 54px;
        border: 1px solid rgba(51, 51, 51, 0.2);
        border-radius: 8px;
    }
    .v-select.vs--open {
        .vs__selected {
            margin-top: 12px;
        }
    }
}

@media only screen and (max-width: 1359px) {
    .buy {
        gap: 0 60px;
        &__details {
            &--date {
                margin-bottom: 20px;
                span {
                    font-size: 18px;
                    margin-bottom: 12px;
                }
                ::v-deep() {
                    input {
                        font-size: 14px !important;
                    }
                    .vd-picker__controls {
                        &-wrapper {
                            font-size: 14px;
                        }
                    }
                }
                .date-wrap {
                    padding: 8px 18px;
                }
            }
            &--time {
                margin-bottom: 20px;
                span {
                    font-size: 18px;
                    margin-bottom: 12px;
                }
                .with-value {
                    ::v-deep() {
                        span.vs__selected {
                            font-size: 14px;
                        }
                    }
                }
                .clock {
                    top: 62%;
                    left: 20px;
                }
            }
            &--info {
                margin-bottom: 20px;
                span {
                    font-size: 18px;
                    margin-bottom: 12px;
                }
                &__block {
                    padding: 12px 12px 12px 0;
                    ul {
                        font-size: 14px;
                    }
                }
            }
            &--counts {
                .item {
                    padding: 12px 18px;
                    margin-bottom: 16px;
                    h3 {
                        font-size: 18px;
                        line-height: 20px;
                        margin-bottom: 10px;
                    }
                    span {
                        font-size: 16px;
                        line-height: 18px;
                    }
                    ul {
                        margin-bottom: 10px;
                        font-size: 14px;
                        font-weight: 400;
                    }
                    .set-value {
                        .box {
                            padding: 6px 12px;
                            font-size: 18px;
                        }
                        .decrement {
                            padding: 6px 12px;
                            img {
                                width: 12px;
                                height: 1px;
                            }
                        }
                        .increment {
                            padding: 6px 12px;
                            img {
                                width: 12px;
                                height: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
    ::v-deep() {
        .v-select.vs--open {
            .vs__selected {
                margin-top: 15px;
            }
        }
        .vs__dropdown-toggle {
            padding-left: 42px;
            padding-right: 16px;
            height: 50px;
        }
        .vs__selected {
            margin: 0;
            padding: 0;
            margin-top: 4px;
        }
    }
}

@media only screen and (max-width: 1199px) {
    .buy {
        gap: 0 32px;
        &__details {
            &--counts {
                ul {
                    padding-left: 20px;
                    margin-right: 16px;
                }
            }
        }
    }
}

@media only screen and (max-width: 991px) {
}

@media only screen and (max-width: 767px) {
    .buy {
        flex-direction: column;
        &__details {
            width: 100%;
        }
        &__overview {
            width: 100%;
            margin-bottom: 24px;
        }
    }
}

@media only screen and (max-width: 575px) {
}
@media only screen and (max-width: 475px) {
}
</style>
