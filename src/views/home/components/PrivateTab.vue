<template>
    <div class="flex-between-center full-width">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
        <div class="item">5</div>
    </div>
</template>

<script>
export default {
    name: 'PrivateTab',
}
</script>

<style lang="scss" scoped>
.item {
    position: relative;
    padding: 16px;
    height: 88px; // Will delete
    gap: 24px;
    &::after {
        position: absolute;
        content: '';
        width: 0.5px;
        height: 50px;
        background: silver;
        right: -16px;
    }
}
</style>
