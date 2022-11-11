<template>
    <footer>
        <div class="container">
            <div class="logo">
                <img src="@/assets/icons/logo.svg" :alt="$t('logo')" width="133" height="130" />
            </div>
            <div class="divider"></div>
            <div class="flex-between-start wrap column__wrapper">
                <div
                    class="flex-col-between-start column"
                    v-for="(column, index) in items"
                    :key="'column' + index"
                >
                    <h4 class="column-title text-bold">{{ column.title }}</h4>

                    <div
                        class="column-items"
                        :class="column.isLast ? 'flex-between-start' : 'flex-col-between-start'"
                    >
                        <router-link v-for="(child, i) in column.childs" :key="'link' + i" :to="child.link">
                            <template v-if="child.iconUrl">
                                <img
                                    :src="child.iconUrl"
                                    :alt="$t('mediaIcon')"
                                    :width="column.isLast ? 44 : 22"
                                    :height="column.isLast ? 44 : 18"
                                />
                            </template>
                            {{ child.label }}
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="copyright flex-center-center">{{ $t('copyrightText') }}</div>
        </div>
    </footer>
</template>

<script>
import footerItemsMixin from './footerItems.mixin.js'

export default {
    name: 'FooterComponent',
    mixins: [footerItemsMixin],
}
</script>

<style lang="scss" scoped>
footer {
    padding: 40px 0;
    background: #333333;
    font-size: 18px;
    color: #fff;
    .divider {
        height: 0.5px;
        opacity: 0.1;
    }

    .copyright {
        font-size: 16px;
        font-weight: 400;
    }

    .column {
        &__wrapper {
            gap: 30px;
        }
        &-title {
            font-size: 20px;
            margin-bottom: 20px;
        }

        a {
            color: #fff;
            &:hover {
                color: #fa8b02;
            }
        }
        &-items {
            gap: 10px 24px;
            img {
                transition: 0.2s;
            }
            img:hover {
                filter: invert(0) hue-rotate(-35deg);
                transition: 0.2s;
                margin-top: -5px;
            }
        }
    }

    .divider {
        margin: 33px 0;
    }
}

@media only screen and (max-width: 1599px) {
    footer {
        font-size: 16px;
        .column {
            &-title {
                font-size: 18px;
                margin-bottom: 18px;
            }
        }
        .logo {
            img {
                width: 120px;
                height: 117px;
            }
        }
    }
}

@media only screen and (max-width: 1359px) {
}

@media only screen and (max-width: 1199px) {
}

@media only screen and (max-width: 991px) {
}

@media only screen and (max-width: 767px) {
    .column {
        &__wrapper {
            flex-direction: column;
            gap: 30px;
        }
    }
}

@media only screen and (max-width: 575px) {
    footer {
        font-size: 14px;
    }
}
</style>
