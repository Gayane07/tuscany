<template>
    <div class="container flex-between-center offer">
        <div class="offer__info flex-col-center-center">
            <h1>{{ $t('getSpecialOffers') }}</h1>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s.
            </p>
            <PrimaryButton
                class="offer__btn"
                :label="$t('contactUs')"
                @onClick="$router.push({ name: 'contactUs' })"
            />
        </div>
        <img src="@/assets/images/woman-offers.png" :alt="$t('womanImage')" />
    </div>
</template>

<script>
import PrimaryButton from '@/components/PrimaryButton'

export default {
    name: 'SpecialOffer',
    components: { PrimaryButton },
}
</script>

<style lang="scss" scoped>
.offer {
    position: relative;
    img {
        position: absolute;
        right: 0;
        bottom: -60px; // Padding of section
        width: 420px;
        height: 600px;
        object-fit: cover;
    }
    &__btn {
        font-size: 20px;
        padding-right: 48px;
        padding-left: 48px;
    }
    &__info {
        max-width: 550px;
        gap: 32px 0;
        padding: 30px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 24px;
        h1 {
            font-weight: 800;
            font-size: 32px;
            color: #333333;
            text-align: center;
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

@media only screen and (max-width: 1599px) {
    .offer {
        &__info {
            h1 {
                font-size: 28px;
            }
            p {
                font-size: 16px;
            }
        }
    }
}
@media only screen and (max-width: 1359px) {
}

@media only screen and (max-width: 1199px) {
    .offer {
        img {
            width: 360px;
            height: 500px;
        }
        &__info {
            max-width: 500px;
            h1 {
                font-size: 24px;
            }
            p {
                font-size: 14px;
            }
        }
    }
}

@media only screen and (max-width: 991px) {
    .offer {
        flex-direction: column-reverse;
        img {
            position: static;
            margin-bottom: 24px;
        }
        &__info {
            max-width: 100%;
        }
    }
}

@media only screen and (max-width: 767px) {
    .offer {
        img {
            width: 300px;
            height: 410px;
        }
    }
}

@media only screen and (max-width: 575px) {
    .offer {
        &__info {
            p {
                font-size: 14px;
            }
        }
    }
}

@media only screen and (max-width: 420px) {
}
</style>
