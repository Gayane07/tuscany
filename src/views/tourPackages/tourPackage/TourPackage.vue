<template>
    <div class="overlay" v-if="homePageLoading">
        <span class="spinner"></span>
    </div>
    <div class="overlay" v-else-if="homePageError">
        <GenericError @reFetchData="fetchHomePageData" />
    </div>
    <div class="container pack" v-else :style="{ paddingTop: headerHeight + 'px' }">
        <div class="pack__back" @click="redirectBack">
            <img src="@/assets/icons/arrow-back.svg" alt="$t('arrowBack')" />
            <span>{{ $t('back') }}</span>
        </div>

        <div class="pack__back--info flex-between-start">
            <div class="pack__back--info__images">
                <img class="cover" :src="curPackage.images[0].src" :alt="$t('coverImage')" />
                <div class="flex-between-center pack__back--info__images--img">
                    <img
                        v-for="(img, index) in imagesToShow"
                        :key="index"
                        :src="img.src"
                        :alt="$t('packImg')"
                    />
                </div>
            </div>

            <div class="pack__back--info__about">
                <h1>{{ $t('wineTestingInTuscany') }}</h1>
                <div class="flex-col-between-start">
                    <div class="flex-start-center">
                        <span>{{ $t('from') }}</span>
                        <h3>{{ curPackage.amount.amount }} {{ curPackage.amount.currencySymbol }}</h3>
                    </div>
                    <p>{{ curPackage.description }}</p>
                </div>

                <div class="time flex-col-between-start">
                    <VueDatePicker
                        ref="datepicker"
                        class="item__date-picker"
                        v-model="payload.date"
                        no-calendar-icon
                        no-header
                        :visible="true"
                        color="#fa8b02"
                        :locale="{ lang: 'en' }"
                        :placeholder="$t('selectDate')"
                        @onOpen="setDatepickerMenuStyles()"
                    />
                    <div class="full-width">
                        <p class="time__title">{{ $t('time') }}</p>
                        <v-select
                            class="time__item"
                            :class="{ 'with-value': selectedLabels.time }"
                            :options="timeOptions || []"
                            :value="selectedLabels.time"
                            :placeholder="$t('chooseTime')"
                            :clearable="false"
                            :filterable="false"
                            :searchable="false"
                            @input="item => handleChangeField('time', item.value, item.label)"
                        >
                            <template #open-indicator>
                                <img class="clock" src="@/assets/icons/clock.svg" :alt="$t('clockIcon')" />
                            </template>
                        </v-select>
                    </div>
                    <PrimaryButton
                        class="time__btn"
                        :label="$t('buyNow')"
                        :disabled="$v.payload.$invalid"
                        @onClick="setDates"
                    />
                </div>
            </div>
        </div>

        <div class="pack__back--details">
            <h2>{{ $t('details') }}</h2>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                passages, and more recently with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
            </p>

            <div class="pack__back--details__features flex-col-between-start">
                <div class="flex-start-start" v-for="(item, index) in features" :key="index">
                    <img :src="item.imgUrl" :alt="$t('icon')" />
                    <span>
                        <strong>{{ item.label }}:</strong>
                    </span>
                    <span>&nbsp;{{ item.value }}</span>
                </div>
            </div>
        </div>

        <!-- Here should be the gallery -->
        <div class="pack__back--customers">
            <CustomersSays :data="homePageData.customerSays" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import 'vue-select/dist/vue-select.css'
import { times } from '@/utils/timeOptions.js'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

// Components
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import vSelect from 'vue-select'
import GenericError from '@/components/GenericError.vue'
import PrimaryButton from '@/components/PrimaryButton'
import CustomersSays from '../../home/components/customers/CustomersSays.vue'

export default {
    name: 'TourPackage',
    mixins: [validationMixin],
    components: { VueDatePicker, vSelect, GenericError, PrimaryButton, CustomersSays },
    props: {
        headerHeight: {
            type: Number,
            required: true,
        },
    },
    validations: {
        payload: {
            date: { required },
            time: { required },
        },
    },
    data() {
        return {
            timeOptions: times,
            curPackage: {},
            imagesToShow: [],
            payload: {
                date: null,
                time: null,
            },
            selectedLabels: {},

            features: [
                {
                    imgUrl: require('@/assets/icons/packages/companion.svg'),
                    label: 'Number of group',
                    value: '15-30',
                },
                {
                    imgUrl: require('@/assets/icons/packages/person.svg'),
                    label: 'Duration',
                    value: '15 hours and 45 minutes',
                },
                {
                    imgUrl: require('@/assets/icons/packages/location.svg'),
                    label: 'Departuring and arriving areas',
                    value: 'Lucca',
                },
                {
                    imgUrl: require('@/assets/icons/packages/driver.svg'),
                    label: 'Guide service',
                    value: 'Included',
                },
                {
                    imgUrl: require('@/assets/icons/packages/like-hand.svg'),
                    label: 'Language',
                    value: 'English, Italian',
                },
                {
                    imgUrl: require('@/assets/icons/packages/ticket.svg'),
                    label: 'Entry Fees',
                    value: 'Lorem ipsum',
                },
                {
                    imgUrl: require('@/assets/icons/packages/bus.svg'),
                    label: 'Entry Transportation',
                    value: 'Bus',
                },
            ],
        }
    },
    methods: {
        ...mapActions('homePageModule', ['fetchHomePageData']),
        ...mapMutations('bookItemModule', ['setPayloadFields', 'setCurrentPackage']),
        redirectBack() {
            window.history.back()
        },
        setDatepickerMenuStyles() {
            this.$nextTick(() => {
                document.querySelectorAll('.vd-picker__controls-wrapper button').forEach(button => {
                    button.style.fontSize = '18px'
                    button.style.fontWeight = '600'
                })
            })
        },
        onChange(item, field) {
            this.payload[field] = item.value
            this.selectedLabels[field] = item.label
        },
        handleChangeField(field, data, label = null) {
            this.payload[field] = data
            if (label) this.selectedLabels[field] = label
        },

        setDates() {
            this.setPayloadFields(this.payload)
            this.setCurrentPackage(this.curPackage)

            this.$router.push({
                name: 'bookingDetails',
                params: { id: this.$route.params.id },
            })
        },
    },
    computed: {
        ...mapGetters('homePageModule', ['homePageData', 'homePageLoading', 'homePageError']),
    },
    created() {
        if (!Object.keys(this.homePageData).length) {
            this.fetchHomePageData()
        }
    },
    watch: {
        homePageData: {
            immediate: true,
            handler(data) {
                if (Object.keys(this.homePageData).length) {
                    this.curPackage = data.popularDestinations.find(
                        item => item.id === +this.$route.params.id,
                    )
                    this.imagesToShow = this.curPackage.images.filter((img, index) => index > 0 && index < 4)
                }
            },
        },
    },
}
</script>

<style lang="scss" scoped>
.overlay {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    span.spinner {
        border-color: #fa8b02;
        width: 100px;
        height: 100px;
    }
}

.pack {
    color: #333333;
    &__back {
        margin-top: 50px;
        cursor: pointer;
        font-weight: 600;
        font-size: 18px;
        width: max-content;
        padding: 0 20px 20px 0;
        margin-bottom: 30px; // Summary 50px (30 + 20)
        &:hover {
            text-decoration: underline;
        }
        img {
            margin-right: 12px;
        }

        &--info {
            gap: 0 40px;
            &__images {
                width: 50%;
                img {
                    border-radius: 12px;
                    width: 100%;
                    &.cover {
                        margin-bottom: 20px;
                        max-width: 700px;
                        max-height: 600px;
                    }
                }
                &--img {
                    width: 100%;
                    gap: 0 20px;
                    overflow-x: auto;
                    img {
                        width: 210px;
                    }
                }
            }

            &__about {
                width: 50%;
                h1 {
                    font-weight: 800;
                    font-size: 48px;
                }
                span {
                    font-weight: 600;
                    font-size: 24px;
                }
                h3 {
                    font-weight: 800;
                    font-size: 32px;
                    color: #fa8b02;
                    margin-left: 16px;
                }
                p {
                    margin-top: 16px;
                    font-weight: 400;
                    font-size: 18px;
                    color: #33333399;
                    margin-bottom: 20px;
                }

                .time {
                    width: 100%;
                    &__title {
                        font-weight: 600;
                        font-size: 18px;
                        color: #333333;
                    }
                    &__btn {
                        width: 100%;
                        max-width: 300px;
                        margin-top: 20px;
                        font-weight: 600;
                        font-size: 20px;
                    }
                    &__item {
                        max-width: 300px;
                        img.clock {
                            position: absolute;
                            top: 50%;
                            right: 24px;
                            transform: translate(0, -50%);
                        }
                        ::v-deep {
                            .vs__dropdown-toggle {
                                outline: none;
                                width: 100%;
                                height: 50px;
                                padding-left: 10px;
                                padding-right: 24px;
                                border: 1px solid rgba(51, 51, 51, 0.2);
                                border-radius: 8px;
                                font-size: 16px;
                                color: #333333;
                                font-weight: 400;
                                .vs__selected-options {
                                    align-items: center;
                                }
                                input {
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                    color: #33333399;
                                }
                            }
                        }
                    }
                }
            }
        }

        &--details {
            width: 100%;
            max-width: 50%;
            margin: 80px 0;
            h2 {
                font-weight: 800;
                font-size: 32px;
                margin-bottom: 32px;
            }
            p {
                font-size: 18px;
            }

            &__features {
                margin-top: 32px;
                gap: 20px 0;
                font-size: 18px;
                img {
                    margin-right: 10px;
                }
            }
        }

        &--customers {
            margin-bottom: 80px;
        }
    }
}
::v-deep {
    .vd-wrapper.item__date-picker {
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

    .with-value {
        ::v-deep {
            input {
                display: none;
            }
        }
    }
}

@media only screen and (max-width: 1359px) {
    .pack {
        &__back {
            &--info {
                &__about {
                    h1 {
                        font-size: 32px;
                    }
                    span {
                        font-size: 20px;
                    }
                    h3 {
                        font-size: 28px;
                    }
                    p {
                        font-size: 16px;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 1199px) {
}

@media only screen and (max-width: 991px) {
    .pack {
        &__back {
            &--info {
                flex-direction: column-reverse;
                &__about {
                    width: 100%;
                }
                &__images {
                    margin-top: 24px;
                    width: 100%;
                    img.cover {
                        max-width: 100%;
                    }
                }
            }
            &--details {
                max-width: 100%;
            }
        }
    }
}

@media only screen and (max-width: 767px) {
}

@media only screen and (max-width: 575px) {
}
@media only screen and (max-width: 475px) {
}
</style>
