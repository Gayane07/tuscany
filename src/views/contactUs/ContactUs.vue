<template>
    <div :style="{ paddingTop: headerHeight + 'px' }">
        <div class="contact">
            <div class="container">
                <div class="flex-between-start contact__wrapper">
                    <div class="flex-col-start-start contact__info">
                        <h1>{{ $t('getInTouch') }}</h1>
                        <p>{{ $t('fillUpTheForm') }}</p>
                        <span class="flex-start-center">
                            <img src="@/assets/icons/location.svg" :alt="$t('icon')" />
                            {{ $t('piazzaNapoleone') }}
                        </span>
                        <span class="flex-start-center phone">
                            <img src="@/assets/icons/phone.svg" :alt="$t('icon')" />
                            {{ $t('phoneNumber') }}
                        </span>
                        <span class="flex-start-center">
                            <img src="@/assets/icons/message.svg" :alt="$t('icon')" />
                            {{ $t('email') }}
                        </span>
                    </div>

                    <div class="flex-col-center-center contact__form">
                        <InputField
                            class="full-width"
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
                            class="full-width"
                            :value="payload.email"
                            :label="$t('emailAddress')"
                            :placeholder="$t('enterYourEmail')"
                            :isError="$v.payload.email.$error"
                            :errorMessage="
                                !$v.payload.email.required ? $t('fieldIsRequired') : $t('incorrectEmail')
                            "
                            @change="val => handleChangeField('email', val)"
                        />

                        <div class="full-width">
                            <bdi>{{ $t('message') }}</bdi>
                            <div class="relative">
                                <textarea
                                    class="full-width"
                                    :class="{ error: $v.payload.message.$error }"
                                    name="message"
                                    cols="10"
                                    rows="8"
                                    :value="payload.message"
                                    :placeholder="$t('enterYourMessage')"
                                    @change="event => handleChangeField('message', event.target.value)"
                                ></textarea>
                                <span v-if="$v.payload.message.$error" class="contact__form--errmsg">
                                    {{ $t('fieldIsRequired') }}
                                </span>
                            </div>
                        </div>
                        <PrimaryButton
                            class="contact__btn"
                            :label="$t('sendMessage')"
                            :loading="buttonLoading"
                            :disabled="$v.payload.$invalid || buttonLoading"
                            @onClick="onSendMessage"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="full-width">
            <GoogleMap />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

// Components
import InputField from '@/components/InputField'
import PrimaryButton from '@/components/PrimaryButton'
import GoogleMap from '@/components/GoogleMap'

export default {
    name: 'ContactUs',
    mixins: [validationMixin],
    components: { InputField, PrimaryButton, GoogleMap },
    props: {
        headerHeight: {
            type: Number,
            required: true,
        },
    },
    validations: {
        payload: {
            name: { required, minLength: minLength(4) },
            email: { required, email },
            message: { required },
        },
    },
    data() {
        return {
            payload: {
                name: null,
                email: null,
                message: null,
            },
            selectedLabels: {},
        }
    },
    methods: {
        ...mapActions('sendMessageModule', ['handleSendMessage']),
        handleChangeField(field, data, label = null) {
            this.payload[field] = data
            if (label) this.selectedLabels[field] = label

            this.$v.payload[field].$touch()
        },

        onSendMessage() {
            this.handleSendMessage(this.payload)
        },
    },
    computed: {
        ...mapGetters('sendMessageModule', ['buttonLoading']),
    },
}
</script>

<style lang="scss" scoped>
.relative {
    position: relative;
}
.contact {
    color: #333333;
    background-image: linear-gradient(to right, #fda674, #ffcc9c, #fda674);
    &__wrapper {
        padding: 60px 0;
        gap: 0 24px;
    }

    &__info {
        width: 100%;
        max-width: 50%;
        h1 {
            font-weight: 800;
            font-size: 48px;
            margin-bottom: 16px;
        }
        p {
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 48px;
        }
        span {
            width: 100%;
            max-width: 350px;
            font-weight: 600;
            font-size: 18px;
            img {
                margin-right: 14px;
                font-weight: 600;
                font-size: 18px;
                margin-left: 16px;
            }
            &.phone {
                background: rgba(250, 139, 2, 0.2);
                padding: 16px;
                border: 1px solid #fa8b02;
                border-radius: 12px;
                margin: 56px 0;
                img {
                    margin-left: 0;
                }
            }
        }
    }
    &__form {
        width: 100%;
        gap: 30px 0;
        padding: 30px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 24px;

        bdi {
            font-weight: 600;
            font-size: 18px;
        }
        textarea {
            padding: 14px 24px;
            background: #ffffff;
            border-radius: 8px;
            font-weight: 400;
            font-size: 16px;
            color: #333333;
            font-family: 'Open Sans', sans-serif;
            resize: none;
            outline: none;
            border: 1px solid rgba(51, 51, 51, 0.2);
            margin-top: 8px;
            &:focus {
                border: 1px solid rgba(51, 51, 51, 0.6);
            }
            &::placeholder {
                color: #333333;
                opacity: 0.6;
            }

            &.error {
                border: 1px solid rgb(255, 0, 0);
                &:focus {
                    border: 1px solid rgb(255, 0, 0);
                }
            }
        }
        &--errmsg {
            position: absolute;
            font-size: 12px;
            color: rgb(255, 0, 0);
            margin-top: 4px;
            left: 0;
            font-weight: 500;
            bottom: -16px;
        }
    }

    &__btn {
        font-weight: 600;
        font-size: 20px;
        min-width: 190px;
        height: 45px;
    }
}

::v-deep {
    p.input-wrapper__label {
        opacity: 1;
    }
}

@media only screen and (max-width: 1359px) {
    .contact {
        &__info {
            h1 {
                font-size: 40px;
            }
        }
    }
}

@media only screen and (max-width: 1199px) {
    .contact {
        &__info {
            h1 {
                font-size: 36px;
            }
            p,
            span {
                font-size: 16px;
            }
        }
    }
}

@media only screen and (max-width: 991px) {
    .contact {
        &__wrapper {
            padding: 30px 0;
            flex-direction: column;
        }
        &__info {
            max-width: 100%;
            margin-bottom: 32px;
            h1,
            p,
            span,
            span.phone {
                margin: 10px 0;
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .contact {
        &__form {
            padding-right: 16px;
            padding-left: 16px;
            gap: 16px 0;
        }
    }
}

@media only screen and (max-width: 575px) {
}
@media only screen and (max-width: 475px) {
}
</style>
