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
</style>
