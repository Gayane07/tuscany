<template>
    <div class="flex-between-center full-width public">
        <div class="flex-between-center full-width item__wrapper">
            <div class="item">
                <div class="flex-start-center item__title">
                    <img
                        src="@/assets/icons/private.svg"
                        style="filter: grayscale(100%) invert(1) opacity(0.7)"
                        :alt="$t('peopleIcon')"
                    />
                    <span>{{ $t('numberOfPeople') }}</span>
                </div>
                <div class="flex-end-center full-width">
                    <v-select
                        class="item__select"
                        appendToBody
                        :class="{ 'with-value': selectedLabels.peopleCount }"
                        :options="peopleCounts"
                        :value="selectedLabels.peopleCount"
                        :placeholder="$t('chooseNumber')"
                        :clearable="false"
                        :filterable="false"
                        :searchable="false"
                        @input="item => onChange(item, 'peopleCount')"
                    ></v-select>
                </div>
            </div>

            <div class="item">
                <div class="flex-start-center item__title">
                    <img src="@/assets/icons/date.svg" :alt="$t('dateIcon')" />
                    <span>{{ $t('date') }}</span>
                </div>
                <div class="flex-end-center full-width item__date">
                    <VueDatePicker
                        class="item__date-picker"
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
                    <img
                        :class="{ rotated: isDatepickerOpened }"
                        src="@/assets/icons/arrow-down.svg"
                        :alt="$t('arrowDown')"
                    />
                </div>
            </div>

            <div class="item">
                <div class="flex-start-center item__title">
                    <img src="@/assets/icons/clock.svg" :alt="$t('clockIcon')" />
                    <span>{{ $t('time') }}</span>
                </div>
                <div class="flex-end-center full-width">
                    <v-select
                        class="item__select"
                        appendToBody
                        :class="{ 'with-value': selectedLabels.time }"
                        :options="timeOptions"
                        :value="selectedLabels.time"
                        :placeholder="$t('chooseTime')"
                        :clearable="false"
                        :filterable="false"
                        :searchable="false"
                        @input="item => onChange(item, 'time')"
                    ></v-select>
                </div>
            </div>

            <div class="item">
                <div class="flex-start-center item__title">
                    <img src="@/assets/icons/tour.svg" :alt="$t('tourIcon')" />
                    <span>{{ $t('tour') }}</span>
                </div>
                <div class="flex-end-center full-width">
                    <v-select
                        class="item__select"
                        appendToBody
                        :class="{ 'with-value': selectedLabels.tour }"
                        :options="tourOptions"
                        :value="selectedLabels.tour"
                        :placeholder="$t('selectTour')"
                        :clearable="false"
                        :filterable="false"
                        :searchable="false"
                        @input="item => onChange(item, 'tour')"
                    ></v-select>
                </div>
            </div>

            <div class="item">
                <div class="flex-start-center item__title">
                    <img src="@/assets/icons/transport.svg" :alt="$t('transportIcon')" />
                    <span>{{ $t('transportation') }}</span>
                </div>
                <div class="flex-end-center full-width">
                    <v-select
                        class="item__select"
                        appendToBody
                        :class="{ 'with-value': selectedLabels.tour }"
                        :options="transportationOptions"
                        :value="selectedLabels.transportation"
                        :placeholder="$t('selectTransportation')"
                        :clearable="false"
                        :filterable="false"
                        :searchable="false"
                        @input="item => onChange(item, 'transportation')"
                    ></v-select>
                </div>
            </div>
        </div>

        <div class="search-btn">
            <PrimaryButton
                label=""
                showSearchIcon
                :disabled="searchLoading"
                :loading="searchLoading"
                @onClick="onSearch"
            />
        </div>
    </div>
</template>

<script>
import 'vue-select/dist/vue-select.css'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import homePageSearchMixin from '@/mixins/homePageSearchMixin'

// Components
import vSelect from 'vue-select'
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import PrimaryButton from '@/components/PrimaryButton'

export default {
    name: 'PublicTab',
    mixins: [homePageSearchMixin],
    components: { vSelect, VueDatePicker, PrimaryButton },
    data() {
        return {
            peopleCounts: [
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
            ],
            transportationOptions: [
                { value: 'minivanAndBus', label: this.$t('minivanAndBus') },
                { value: 'transferAndNCC', label: this.$t('transferAndNCC') },
                { value: 'luxuryExperience', label: this.$t('luxuryExperience') },
            ],
            selectedLabels: {
                peopleCount: null,
                time: null,
                tour: null,
                transportation: null,
            },

            payload: {
                search_type: 'public',
                peopleCount: null,
                date: null,
                time: null,
                tour: null,
                transportation: null,
            },
        }
    },
}
</script>

<style lang="scss" scoped>
.item {
    position: relative;
    padding: 16px;
    gap: 24px;
    width: 100%;
    min-width: 220px;
    &__wrapper {
        overflow-x: auto;
    }
    &:not(:last-child)::after {
        position: absolute;
        content: '';
        width: 0.5px;
        height: 50px;
        background: #3333331a;
        right: -0px;
        top: 50%;
        transform: translate(0, -50%);
    }

    &__title {
        margin-bottom: 6px;
        img {
            width: 24px;
            height: 16px;
            margin-right: 8px;
        }
        span {
            font-weight: 600;
            font-size: 18px;
            color: #333333;
            white-space: nowrap;
        }
    }

    &__select {
        width: 80%;
        ::v-deep {
            .vs__dropdown-toggle {
                border: none;
                background: transparent;
            }
            input {
                color: #33333333;
                font-weight: 400;
                font-size: 18px;
            }
            .vs__selected {
                font-weight: 500;
                font-size: 18px;
            }
            .vs__dropdown-menu {
                width: max-content;
                // max-width: 250px;
                border-radius: 0 0 12px 12px;
                li {
                    background-color: #fff;
                    font-weight: 400;
                    font-size: 18px;
                    color: #333333cc;
                    border-bottom: 1px solid #efefef;
                    padding: 12px 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                li:hover {
                    background-color: #fa8b02;
                }
            }
        }
        &.with-value {
            ::v-deep {
                input {
                    display: none;
                }
            }
        }
    }
    &__date {
        &-picker {
            padding-left: 24px;
        }
        img {
            transition: 0.2s;
            &.rotated {
                transform: rotate(180deg);
                transition: 0.2s;
            }
        }
        ::v-deep {
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
    }
}

.search-btn {
    border-radius: 13px;
    box-shadow: -7px 0px 20px 0px rgba(0, 0, 0, 0.3);
}

@media only screen and (max-width: 1599px) {
    .item {
        &__title {
            span {
                font-size: 16px;
            }
        }
    }
}

@media only screen and (max-width: 1359px) {
    .item {
        padding: 10px;
        &__title {
            span {
                font-size: 14px;
            }
        }
        &__select {
            ::v-deep {
                input {
                    font-size: 14px;
                }
            }
        }
        &__date {
            ::v-deep {
                input {
                    font-size: 14px !important;
                }
                .vd-picker__controls {
                    &-wrapper {
                        font-size: 14px;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 1199px) {
}

@media only screen and (max-width: 991px) {
}

@media only screen and (max-width: 767px) {
}

@media only screen and (max-width: 575px) {
    .public {
        flex-direction: column;
    }
    .search-btn {
        width: 100%;
        margin-top: 16px;
        ::v-deep {
            button {
                box-shadow: none;
                width: 100% !important;
                height: 40px !important;
            }
        }
    }
}
</style>
