<template>
    <div>
        step 2
        <button @click="$emit('changeStep', 3)">click</button>
    </div>
</template>

<script>
export default {
    name: 'YourDetails',
}
</script>

<style lang="scss" scoped></style>
