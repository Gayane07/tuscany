<template>
    <div class="flex-between-start details">
        <div class="details__info">
            <h2>{{ $t('whoShallWeSend') }}</h2>
            <div class="details__info--fields">
                <InputField
                    :value="payload.name"
                    :label="$t('name')"
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
                    :value="payload.surname"
                    :label="$t('surname')"
                    :placeholder="$t('enterYourSurname')"
                    :isError="$v.payload.surname.$error"
                    :errorMessage="
                        !$v.payload.surname.required
                            ? $t('fieldIsRequired')
                            : $t('minimumSymbols', { n: $v.payload.surname.$params.minLength.min })
                    "
                    @change="val => handleChangeField('surname', val)"
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
                <InputField
                    :value="payload.email"
                    :label="$t('emailAddress')"
                    :placeholder="$t('enterYourEmail')"
                    :isError="$v.payload.email.$error"
                    :errorMessage="!$v.payload.email.required ? $t('fieldIsRequired') : $t('incorrectEmail')"
                    @change="val => handleChangeField('email', val)"
                />
            </div>
        </div>
        <div class="details__overview">
            <TicketOverview @changeStep="changeStep" :disableNextButton="false" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email, minLength, numeric } from 'vuelidate/lib/validators'

// Components
import InputField from '@/components/InputField'
import TicketOverview from './components/TicketOverview'

export default {
    name: 'YourDetails',
    mixins: [validationMixin],
    components: { InputField, TicketOverview },
    validations: {
        payload: {
            name: {
                required,
                minLength: minLength(4),
            },
            surname: {
                required,
                minLength: minLength(4),
            },
            phoneNumber: { required, numeric },
            email: { required, email },
        },
    },
    data() {
        return {
            payload: {},
        }
    },
    methods: {
        ...mapMutations('bookItemModule', ['setPayloadFields']),
        handleChangeField(field, value) {
            this.payload[field] = value

            this.$v.payload[field].$touch()
        },

        changeStep() {
            this.setPayloadFields(this.payload)
            this.$emit('changeStep', 3)
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
.details {
    margin-bottom: 24px;
    gap: 0 120px;
    &__info {
        width: 50%;
        &--fields {
            margin-top: 40px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 55px;
            ::v-deep() {
                p.input-wrapper__label {
                    opacity: 1;
                }
            }
        }
    }
    &__overview {
        width: 50%;
    }
}

@media only screen and (max-width: 1359px) {
    .details {
        gap: 0 32px;
        &__info {
            &--fields {
                gap: 32px;
                ::v-deep() {
                    input {
                        font-size: 14px;
                        padding: 8px 16px;
                        height: 40px;
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 1199px) {
    .details {
        &__info {
            h2 {
                font-size: 22px;
            }
            &--fields {
                gap: 32px 24px;
            }
        }
    }
}
@media only screen and (max-width: 991px) {
    .details {
        &__info {
            h2 {
                font-size: 20px;
            }
            &--fields {
                margin-top: 24px;
                grid-template-columns: 1fr;
                gap: 28px 0;
            }
        }
    }
}
@media only screen and (max-width: 767px) {
    .details {
        flex-direction: column;
        &__info {
            width: 100%;
        }
        &__overview {
            width: 100%;
        }
    }
}
@media only screen and (max-width: 576px) {
    .details {
        &__info {
            h2 {
                font-size: 18px;
            }
            &--fields {
                margin-top: 16px;
                margin-bottom: 16px;
                gap: 18px 0;
            }
        }
    }
}
</style>
