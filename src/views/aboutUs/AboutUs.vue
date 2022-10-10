<template>
    <div class="about-us" :style="{ paddingTop: headerHeight + 'px' }"></div>
</template>

<script>
export default {
    name: 'AboutUs',
    props: {
        headerHeight: {
            type: Number,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped></style>
