<template>
    <form id="payment-form" @submit="submit">
        <div class="methods">
            <div class="methods__title">
                <img src="@/assets/icons/circle.svg" :alt="$t('icon')" />
                <span>{{ $t('payWithCreditCard') }}</span>
            </div>
            <div class="methods__cards">
                <img src="@/assets/icons/credit-cards/visa.png" :alt="$t('visaLogo')" />
                <img src="@/assets/icons/credit-cards/discover.png" :alt="$t('discoverLogo')" />
                <img src="@/assets/icons/credit-cards/maestro.png" :alt="$t('maestroLogo')" />
                <img src="@/assets/icons/credit-cards/mastercard.png" :alt="$t('mastercardLogo')" />
            </div>
        </div>
        <div class="fields">
            <label>
                <div id="card-number" class="field is-empty"></div>
                <span><span>Card Number</span></span>
            </label>

            <label>
                <div id="card-exp" class="field is-empty"></div>
                <span><span>Expiration Date (mm / yy)</span></span>
            </label>

            <label class="test">
                <div id="card-cvc" class="field is-empty"></div>
                <span><span>Card Security Code</span></span>
            </label>

            <router-link to="#" target="_blank">{{ $t('whatsIsThis') }}</router-link>
        </div>
    </form>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'PaymentSimple',
    props: {
        clickOnPay: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            stripe: Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx'),
            elements: Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx').elements(),
            styles: {
                style: {
                    base: {
                        lineHeight: '32px',
                        fontWeight: 500,
                        fontFamily: '"Open Sans", sans-serif',
                        fontSize: '18px',

                        '::placeholder': {
                            color: 'transparent',
                        },
                    },
                    invalid: {
                        color: '#e85746',
                    },
                },
                classes: {
                    focus: 'is-focused',
                    empty: 'is-empty',
                },
            },
            cardNumber: null,
            form: null,
        }
    },

    methods: {
        ...mapMutations('bookItemModule', ['resetState']),
        createElement(stripeElement, id) {
            // Create an instance of the card Element
            var variable = this.elements.create(stripeElement, this.styles)

            // Add an instance of the card Element into the page
            variable.mount(id)

            return variable
        },

        submit(event) {
            if (event) event.preventDefault()

            this.stripe
                .createToken(this.cardNumber)
                .then(result => {
                    console.log(result)
                    this.$emit('paymentSuccess')
                })
                .catch(err => {
                    console.log(err.response)
                })

            // Should be removed
            setTimeout(() => {
                this.$emit('paymentSuccess')
                this.resetState()
            }, 2000);
        },
    },
    mounted() {
        this.cardNumber = this.createElement('cardNumber', '#card-number')
        this.createElement('cardCvc', '#card-cvc')
        this.createElement('cardExpiry', '#card-exp')
    },
    watch: {
        clickOnPay(value) {
            if (value) this.submit()
        },
    },
}
</script>

<style lang="scss" scoped>
form {
    background-color: rgba(250, 138, 2, 0.1);
    border-radius: 12px;
    border: 1px solid #e1af33;
    padding: 12px 14px 32px;

    .methods {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__title {
            span {
                margin-left: 8px;
                font-weight: 600;
                font-size: 18px;
                color: #333333;
            }
        }
        &__cards {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0 18px;
        }
    }
    .fields {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 0 18px;

        label {
            height: 45px;
            width: 45%;
            position: relative;
            color: #333;
            display: block;
            margin-top: 18px;
            margin-bottom: 18px;
            padding: 10px 18px;
            > span {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                font-weight: 400;
                font-size: 18px;
                font-family: 'Open Sans';
                color: rgba(51, 51, 51, 0.7);
                border: 1px solid rgba(51, 51, 51, 0.2);
                border-radius: 4px;
                transition: border-color 200ms ease-in-out;
                cursor: text;
                pointer-events: none;
                span {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    transform-origin: 0% 50%;
                    transition: transform 200ms ease-in-out;
                    cursor: text;
                    font-size: 16px;
                }
            }
            .field.is-focused {
                + {
                    span {
                        span {
                            transform: scale(0.72) translateY(-34px);
                            cursor: default;
                            background-color: rgb(254, 243, 229);
                            padding: 2px 8px;
                            font-size: 18px;
                        }
                        border-color: #fa8b02;
                    }
                }
            }
            .field {
                &:not(.is-empty) {
                    + {
                        span {
                            span {
                                transform: scale(0.68) translateY(-34px);
                                cursor: default;
                                background-color: rgb(254, 243, 229);
                                padding: 2px 8px;
                                font-size: 18px;
                            }
                        }
                    }
                }
            }
        }

        a {
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
            color: #fa8b02;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .field {
            background: transparent;
            font-weight: 300;
            border: 0;
            color: white;
            outline: none;
            cursor: text;
            display: block;
            width: 100%;
            line-height: 32px;
            padding-bottom: 3px;
            transition: opacity 200ms ease-in-out;
        }
    }
}

@media only screen and (max-width: 1450px) {
    form {
        .fields {
            label {
                > span {
                    span {
                        font-size: 14px;
                    }
                }
                .field.is-focused {
                    + {
                        span {
                            span {
                                font-size: 14px;
                                white-space: nowrap;
                            }
                        }
                    }
                }
                .field {
                    &:not(.is-empty) {
                        + {
                            span {
                                span {
                                    font-size: 14px;
                                    white-space: nowrap;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 1200px) {
    form {
        .methods {
            flex-direction: column;
            justify-content: flex-start;
            align-items: start;
            gap: 16px 0;
        }
        .fields {
            flex-direction: column;
            label {
                width: 100%;
            }
        }
    }
}
</style>
