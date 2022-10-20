<template>
    <div class="flex-col-center-center">
        <h1>{{ $t('somethingWentWrong') }}</h1>
        <PrimaryButton :label="$t('tryAgain')" @onClick="$emit('reFetchData')" danger />
    </div>
</template>

<script>
import PrimaryButton from './PrimaryButton'

export default {
    name: 'GenericError',
    components: { PrimaryButton },
    props: {
        showFetchButton: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
    h1 {
        margin-bottom: 24px;
    }
</style>
