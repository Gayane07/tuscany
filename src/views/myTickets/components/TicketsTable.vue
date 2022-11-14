<template>
    <table>
        <tr class="head">
            <th>{{ $t('tourName') }}</th>
            <th>{{ $t('paymentMethod') }}</th>
            <th>{{ $t('price') }}</th>
            <th>{{ $t('status') }}</th>
        </tr>

        <tr v-for="(ticket, index) in tickets" :key="index" class="content">
            <td>
                <div class="flex-start-start">
                    <img class="cover" :src="ticket.imgUrl" :alt="$t('coverImage')" />
                    <div class="flex-col-start-start">
                        <h3>{{ ticket.title }}</h3>
                        <div class="flex-start-center time">
                            <img src="@/assets/icons/date.svg" :alt="$t('calendarIcon')" />
                            <span>{{ ticket.date }}</span>
                        </div>
                        <div class="flex-start-center time">
                            <img src="@/assets/icons/clock.svg" :alt="$t('clockIcon')" />
                            <span>{{ ticket.time }}</span>
                        </div>
                    </div>
                </div>
            </td>

            <td class="content__payment">
                <div class="flex-center-center">
                    <img
                        :src="require(`@/assets/icons/payments/${ticket.payment.icon}.svg`)"
                        :alt="$t('icon')"
                    />
                    <span>{{ ticket.payment.method }}</span>
                </div>
            </td>

            <td class="content__price">{{ ticket.price.currencySymbol }}{{ ticket.price.amount }}</td>

            <td class="content__status">
                <div class="flex-center-center">
                    <img :src="require(`@/assets/icons/statuses/${ticket.status}.svg`)" :alt="$t('icon')" />
                    <span>{{ ticket.status }}</span>
                </div>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
    name: 'TicketsTable',
    props: {
        tickets: {
            type: Array,
            default: () => [],
        },
    },
}
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    border-radius: 24px;
    border: 1px solid #efefef;
    padding: 4px 20px;
    color: #333333;
    min-width: 800px;
    tr {
        position: relative;
        width: 100%;
        &:not(:last-child)::after {
            content: '';
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 1px;
            background-color: #efefef;
        }
        &.head {
            height: 48px;
        }
        th {
            font-weight: 600;
            font-size: 20px;
            color: rgba(51, 51, 51, 0.6);
            &:first-child {
                text-align: left;
            }
        }
        td {
            text-align: center;
            padding: 20px 0;
            &:first-child {
                text-align: left;
            }
            &.content {
                &__payment {
                    img {
                        margin-right: 10px;
                    }
                    span {
                        font-weight: 600;
                        font-size: 18px;
                    }
                }
                &__price {
                    font-weight: 600;
                    font-size: 18px;
                }
                &__status {
                    text-transform: capitalize;
                    img {
                        margin-right: 12px;
                    }
                    span {
                        font-weight: 600;
                        font-size: 18px;
                    }
                }
            }

            h3 {
                font-size: 24px;
            }

            img.cover {
                width: 160px;
                height: 110px;
                border-radius: 12px;
                object-fit: cover;
                margin-right: 20px;
            }
            .time {
                margin-top: 10px;
                img {
                    margin-right: 8px;
                    filter: invert(58%) sepia(54%) saturate(2431%) hue-rotate(358deg) brightness(97%)
                        contrast(101%);
                }
                span {
                    font-size: 18px;
                }
            }
        }
    }
}

@media only screen and (max-width: 1559px) {
    table {
        padding: 4px 20px;
        tr {
            &.head {
                height: 40px;
            }
            th {
                font-size: 16px;
            }
            td {
                padding: 16px 0;
                &.content {
                    &__payment {
                        img {
                            margin-right: 10px;
                        }
                        span {
                            font-size: 14px;
                        }
                    }
                    &__price {
                        font-size: 14px;
                    }
                    &__status {
                        img {
                            margin-right: 12px;
                        }
                        span {
                            font-size: 14px;
                        }
                    }
                }

                h3 {
                    font-size: 18px;
                }

                img.cover {
                    width: 160px;
                    height: 110px;
                    margin-right: 20px;
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
            }
        }
    }
}

@media only screen and (max-width: 768px) {
    table {
        padding: 4px 12px;
        tr {
            &.head {
                height: 32px;
            }
            th {
                font-size: 14px;
            }
            td {
                padding: 14px 0;
                &.content {
                    &__payment {
                        img {
                            margin-right: 8px;
                        }
                        span {
                            font-size: 14px;
                        }
                    }
                    &__price {
                        font-size: 14px;
                    }
                    &__status {
                        img {
                            margin-right: 8px;
                        }
                        span {
                            font-size: 14px;
                        }
                    }
                }

                h3 {
                    font-size: 16px;
                }

                img.cover {
                    width: 160px;
                    height: 110px;
                    margin-right: 12px;
                }
                .time {
                    span {
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
</style>
