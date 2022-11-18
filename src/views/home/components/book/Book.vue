<template>
    <div class="container flex-between-center offer">
        <div class="flex-col-center-center offer__wrapper">
            <h1>{{ $t('getSpecialOffers') }}</h1>
            <div class="flex-col-center-center offer__info">
                <div class="offer__info--fields">
                    <InputField
                        :value="payload.name"
                        :label="$t('nameAndSurname')"
                        :placeholder="$t('enterYourName')"
                        :isError="$v.payload.name.$error"
                        :errorMessage="
                            !$v.payload.name.required
                                ? $t('fieldIsRequired')
                                : $t('minimumSymbols', { n: $v.payload.name.$params.minLength.min })
                        "
                        @change="val => handleChangeField('name', val)"
                    />
                    <InputField
                        :value="payload.email"
                        :label="$t('emailAddress')"
                        :placeholder="$t('enterYourEmail')"
                        :isError="$v.payload.email.$error"
                        :errorMessage="
                            !$v.payload.email.required ? $t('fieldIsRequired') : $t('incorrectEmail')
                        "
                        @change="val => handleChangeField('email', val)"
                    />
                    <InputField
                        :value="payload.phoneNumber"
                        :label="$t('telephoneNumber')"
                        :placeholder="$t('enterYourPhone')"
                        :isError="$v.payload.phoneNumber.$error"
                        :errorMessage="
                            !$v.payload.phoneNumber.required ? $t('fieldIsRequired') : $t('incorrectNumber')
                        "
                        @change="val => handleChangeField('phoneNumber', val)"
                    />

                    <div class="offer__info--fields__item">
                        <p class="label">{{ $t('serviceType') }}</p>
                        <v-select
                            class="offer__info--fields__item--select"
                            :class="{ 'with-value': selectedLabels.serviceType }"
                            :options="serviceTypes || []"
                            :value="selectedLabels.serviceType"
                            :placeholder="$t('selectServiceType')"
                            :clearable="false"
                            :filterable="false"
                            :searchable="false"
                            @input="item => handleChangeField('serviceType', item.value, item.label)"
                        ></v-select>
                    </div>
                    <div class="offer__info--fields__item">
                        <p class="label">{{ $t('date') }}</p>
                        <img class="date" src="@/assets/icons/date.svg" :alt="$t('dateIcon')" />
                        <VueDatePicker
                            class="offer__info--fields__item--date"
                            v-model="payload.date"
                            no-calendar-icon
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
                        />
                    </div>

                    <div class="offer__info--fields__item">
                        <p class="label">{{ $t('time') }}</p>
                        <v-select
                            class="offer__info--fields__item--select"
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
                </div>
                <PrimaryButton
                    class="offer__btn"
                    :label="$t('bookNow')"
                    :loading="bookLoading"
                    :disabled="$v.payload.$invalid || bookLoading"
                    @onClick="onBookNow"
                />
            </div>
        </div>
        <img class="cover" src="@/assets/images/bike.png" :alt="$t('bikeImage')" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email, minLength, numeric } from 'vuelidate/lib/validators'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import 'vue-select/dist/vue-select.css'
import { times } from '@/utils/timeOptions.js'

// Components
import PrimaryButton from '@/components/PrimaryButton'
import InputField from '@/components/InputField'
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import vSelect from 'vue-select'

export default {
    name: 'BookSection',
    mixins: [validationMixin],
    components: { PrimaryButton, InputField, VueDatePicker, vSelect },
    validations: {
        payload: {
            name: { required, minLength: minLength(4) },
            email: { required, email },
            phoneNumber: { required, numeric },
            serviceType: { required },
            date: { required },
            time: { required },
        },
    },
    data() {
        return {
            locale: localStorage.getItem('locale'),
            payload: {
                name: null,
                email: null,
                phoneNumber: null,
                serviceType: null,
                date: new Date().toISOString().split('T')[0],
                time: null,
            },
            selectedLabels: {
                serviceType: null,
                time: null,
            },

            serviceTypes: [
                { value: 'luccaBikeTour', label: this.$t('luccaBikeTour') },
                { value: 'bookABike', label: this.$t('bookABike') },
                { value: 'tourOutsideLucca', label: this.$t('tourOutsideLucca') },
                { value: 'wineTestingInTuscany', label: this.$t('wineTestingInTuscany') },
                { value: 'cinqueTerreTour', label: this.$t('cinqueTerreTour') },
                { value: 'sienaAndSurroundings', label: this.$t('sienaAndSurroundings') },
                { value: 'pissaLucca', label: this.$t('pissaLucca') },
                { value: 'italySpecialTrips', label: this.$t('italySpecialTrips') },
            ],
            timeOptions: times,
        }
    },
    methods: {
        ...mapActions('homePageModule', ['handleBookItem']),
        handleChangeField(field, data, label = null) {
            this.payload[field] = data
            if (label) this.selectedLabels[field] = label

            this.$v.payload[field].$touch()
        },
        setDatepickerMenuStyles() {
            this.$nextTick(() => {
                document.querySelectorAll('.vd-picker__controls-wrapper button').forEach(button => {
                    button.style.fontSize = '18px'
                    button.style.fontWeight = '600'
                })
            })
        },
        onBookNow() {
            this.handleBookItem(this.payload)
        },
    },
    computed: {
        ...mapGetters('homePageModule', ['bookLoading']),
    },
}
</script>

<style lang="scss" scoped>
.offer {
    position: relative;
    &__wrapper {
        width: 50%;
        h1 {
            font-weight: 800;
            font-size: 32px;
            color: #333333;
            text-align: center;
            margin-bottom: 36px;
        }
    }
    img {
        position: absolute;
        right: 0;
        bottom: calc(-60px + -38px); // Padding of section + bottom
        object-fit: cover;
    }
    &__btn {
        width: 212px;
        font-size: 20px;
        padding-right: 48px;
        padding-left: 48px;
    }
    &__info {
        gap: 30px 0;
        padding: 30px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 24px;
        &--fields {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            .with-value {
                ::v-deep() {
                    input {
                        display: none;
                    }
                }
            }
            &__item {
                position: relative;
                width: 100%;
                img.date {
                    position: absolute;
                    top: 51px;
                    right: 24px;
                    z-index: 10;
                    pointer-events: none;
                }
                p.label {
                    font-weight: 600;
                    font-size: 18px;
                    color: #33333399;
                    margin-bottom: 10px;
                    text-align: left;
                }
                &--date {
                    position: relative;
                    background-color: white;
                    width: 100%;
                    height: 50px;
                    padding-left: 24px;
                    padding-right: 24px;
                    border: 1px solid rgba(51, 51, 51, 0.2);
                    border-radius: 8px;
                    font-size: 16px;
                    color: #333333;
                    ::v-deep() {
                        div.vd-picker__input--is-active {
                            color: #33333366 !important;
                            input {
                                font-weight: 400;
                                color: #33333366 !important;
                            }
                        }
                        input::placeholder {
                            color: #333333;
                        }
                    }
                }
                &--select {
                    img.clock {
                        position: absolute;
                        top: 50%;
                        right: 24px;
                        transform: translate(0, -50%);
                    }
                    ::v-deep() {
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
        p {
            font-weight: 400;
            font-size: 18px;
            color: #000000;
            text-align: center;
            line-height: 26px;
        }
    }
}

@media only screen and (max-width: 1850px) {
    .offer {
        img.cover {
            width: 650px;
            height: 490px;
        }
    }
}
@media only screen and (max-width: 1730px) {
    .offer {
        img.cover {
            width: 550px;
            height: 420px;
        }
    }
}
@media only screen and (max-width: 1599px) {
    .offer {
        &__wrapper {
            h1 {
                font-size: 28px;
            }
        }
        &__btn {
            font-size: 16px;
        }
        &__info {
            &--fields {
                &__item {
                    p.label {
                        font-size: 16px;
                    }
                    &--date {
                        font-size: 14px;
                    }
                    &--select {
                        ::v-deep() {
                            .vs__dropdown-toggle {
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 1480px) {
    .offer {
        img.cover {
            width: 400px;
            height: 300px;
        }
    }
}
@media only screen and (max-width: 1359px) {
}

@media only screen and (max-width: 1199px) {
    .offer {
        &__wrapper {
            width: 60%;
            h1 {
                font-size: 24px;
            }
        }
    }
}

@media only screen and (max-width: 991px) {
    .offer {
        flex-direction: column-reverse;
        img.cover {
            position: static;
            margin-bottom: 24px;
        }
        &__wrapper {
            width: 100%;
        }
        &__info {
            width: 100%;
            &--fields {
                width: 100%;
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .offer {
        &__btn {
            font-size: 14px;
        }
        &__info {
            &--fields {
                &__item {
                    p.label {
                        font-size: 14px;
                    }
                    &--date {
                        font-size: 12px;
                    }
                    &--select {
                        ::v-deep() {
                            .vs__dropdown-toggle {
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 575px) {
    .offer {
        &__wrapper {
            h1 {
                font-size: 22px;
            }
        }
        &__info {
            &--fields {
                display: flex;
                flex-direction: column;
            }
        }
    }
}
@media only screen and (max-width: 475px) {
    .offer {
        img.cover {
            width: 300px;
            height: 200px;
        }
    }
}
</style>
