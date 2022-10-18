<template>
    <div class="flex-between-center statistics">
        <img :src="imgUrl" :alt="$t('defImage')" :width="imageWidth" />
        <div class="flex-col-between-start statistics__info">
            <span>{{ $t('welcomeToOurSite') }}</span>
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>

            <div class="flex-start-center statistics__nums--wrapper">
                <div class="statistics__nums" v-for="(item, index) in statistics" :key="index">
                    <h3>{{ item.value }}+</h3>
                    <p>{{ item.label }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StatisticsSection',
    props: {
        statistics: {
            type: [Array, Object],
            default: () => [],
        },
        imgUrl: {
            type: String,
        },
        imageRadius: {
            type: [Number, String],
            default: 0,
        },
        imageWidth: {
            type: [Number, String],
            default: 400,
        },
        title: {
            type: String,
            default: 'We are the best company',
        },
        description: {
            type: String,
            default: 'Default description',
        },
    },
}
</script>

<style lang="scss" scoped>
.statistics {
    gap: 0 20%;
    color: #333333;
    img {
        object-fit: cover;
    }
    span {
        font-weight: 600;
        font-size: 16px;
        color: #33333399;
        margin-bottom: 6px;
        text-transform: uppercase;
    }
    h1 {
        font-weight: 800;
        font-size: 32px;
    }
    p {
        font-weight: 400;
        font-size: 18px;
        margin: 32px 0;
    }

    &__nums {
        width: 100px;
        margin-right: 50px;
        h3 {
            font-weight: 700;
            font-size: 32px;
            color: #fa8b02;
        }
        p {
            color: #33333399;
            margin: 0;
            font-size: 16px;
        }
    }
}

@media only screen and (max-width: 1359px) {
    .statistics {
        gap: 0 80px;
        img {
            width: 340px;
            height: 550px;
        }
    }
}

@media only screen and (max-width: 1199px) {
    .statistics {
        img {
            width: 280px;
            height: 470px;
        }
        &__info {
            width: 60%;
            h1 {
                font-size: 28px;
            }
        }
    }
}

@media only screen and (max-width: 991px) {
    .statistics {
        img {
            width: 250px;
            height: 420px;
        }
        &__info {
            width: 70%;
            h1 {
                font-size: 28px;
            }
            span,
            p {
                font-size: 14px;
            }
        }
        &__nums {
            width: 70%;
            min-width: 72px;
            align-items: flex-start;
            margin: 0;

            &--wrapper {
                gap: 0 20px;
            }

            h3 {
                font-size: 28px;
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .statistics {
        flex-direction: column;
        img {
            margin-bottom: 24px;
        }
        &__info {
            width: 100%;
        }
        &__nums {
            width: 100%;
            padding-left: 16px;
            &--wrapper {
                width: 100%;
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 20px 0;
                align-content: center;
            }
            h3 {
                font-size: 28px;
            }
        }
    }
}

@media only screen and (max-width: 575px) {
}
</style>
