<template>
    <div class="complete flex-center-center">
        <div class="flex-col-center-center">
            <img src="@/assets/icons/check-fill.svg" :alt="$t('checkIcon')" />
            <h1>{{ $t('yourOrderIsComplete') }}</h1>
            <p>{{ $t('youWillBeReceiving') }}</p>
            <PrimaryButton :label="$t('goToHomePage')" secondary @onClick="$router.push({ name: 'home' })" />
        </div>
    </div>
</template>

<script>
import PrimaryButton from '@/components/PrimaryButton'

export default {
    name: 'OrderComplete',
    components: { PrimaryButton },
}
</script>

<style lang="scss" scoped>
.complete {
    height: calc(100vh - 300px);
    color: #000000;
    img {
        width: 90px;
        height: 90px;
        margin-bottom: 32px;
    }
    h1 {
        font-weight: 700;
        font-size: 32px;
        text-align: center;
        margin-bottom: 16px;
    }
    p {
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        margin-bottom: 32px;
    }
    button {
        font-size: 20px;
    }
}

@media only screen and (max-width: 1359px) {
    .complete {
        img {
            width: 75px;
            height: 75px;
            margin-bottom: 24px;
        }
        h1 {
            font-size: 24px;
        }
        p {
            font-size: 18px;
            margin-bottom: 24px;
        }
        button {
            font-size: 18px;
        }
    }
}
@media only screen and (max-width: 575px) {
    .complete {
        img {
            margin-bottom: 18px;
        }
        h1 {
            font-size: 22px;
        }
        p {
            font-size: 16px;
            margin-bottom: 24px;
        }
    }
}

@media only screen and (max-height: 600px) {
    .complete {
        height: calc(100vh - 150px);
    }
}

@media only screen and (max-height: 400px) {
    .complete {
        height: calc(100vh - 100px);
        img {
            width: 60px;
            height: 60px;
            margin-bottom: 12px;
        }
    }
}
</style>
