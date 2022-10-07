<template>
    <label class="label">
        <div class="label__wrapper">
            <slot name="label">Label</slot>
        </div>
        <input
            type="checkbox"
            :checked="checked"
            @change="event => $emit('change', { checked: event.target.checked, id })"
        />
        <span class="checkmark"></span>
    </label>
</template>

<script>
export default {
    name: 'CheckboxInput',
    props: {
        checked: {
            type: Boolean,
            default: false,
        },
        id: {
            type: String,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
.label {
    display: block;
    position: relative;
    padding-left: 28px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 14px;
    &__wrapper {
        margin-top: 2px;
    }
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:checked ~ .checkmark {
            background-color: #fa8b02;
            &:after {
                display: block;
            }
        }
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 18px;
        width: 18px;
        background-color: #fff;
        border: 1px solid rgba(51, 51, 51, 0.2);
        border-radius: 4px;
        &:after {
            content: '';
            position: absolute;
            display: none;
            left: 5px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    }

    &:hover {
        input {
            &:checked ~ .checkmark {
                background-color: #d77a08;
            }
            & ~ .checkmark {
                border: 1px solid #fa8b02;
            }
        }
    }
}
</style>
