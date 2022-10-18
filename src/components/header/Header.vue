<template>
    <header class="header">
        <div class="container">
            <div class="flex-between-center">
                <img
                    class="cursor-pointer header__logo"
                    src="@/assets/icons/logo.svg"
                    :alt="$t('logo')"
                    width="133"
                    height="130"
                    @click="$router.push('/')"
                />
                <input class="menu-btn" type="checkbox" id="menu-btn" />
                <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
                <ul class="menu flex-between-center">
                    <li v-for="(link, index) in pages" :key="index">
                        <router-link :class="{ 'active-nested-route': link.active }" :to="{ name: link.url }">
                            {{ link.name }}
                        </router-link>
                    </li>

                    <li class="auth">
                        <v-select
                            class="nav-links__buttons--select"
                            appendToBody
                            :options="languages"
                            :value="localLanguage"
                            :clearable="false"
                            :filterable="false"
                            :searchable="false"
                            @input="onChange"
                        ></v-select>
                    </li>
                    <li class="auth">
                        <button class="login" @click="authModalType = 'login'">
                            {{ $t('login') }}
                        </button>
                    </li>
                    <li class="auth">
                        <PrimaryButton :label="$t('signUp')" @onClick="authModalType = 'register'" />
                    </li>
                </ul>
            </div>
        </div>
        <Auth :type="authModalType" @close="authModalType = ''" />
    </header>
</template>

<script>
import 'vue-select/dist/vue-select.css'

// Components
import vSelect from 'vue-select'
import PrimaryButton from '@/components/PrimaryButton'
import Auth from '@/views/authentication/Auth'

export default {
    name: 'HeaderComponent',
    components: { vSelect, PrimaryButton, Auth },
    data() {
        return {
            localLanguage: 'Eng',
            authModalType: '',
            pages: [
                { name: this.$t('home'), url: 'home', path: 'home', active: false },
                { name: this.$t('aboutUs'), url: 'aboutUs', path: 'about-us', active: false },
                { name: this.$t('tourPackages'), url: 'tourPackages', path: 'tour-packages', active: false },
                { name: this.$t('contactUs'), url: 'contactUs', path: 'contact-us', active: false },
            ],
            languages: [{ title: 'Eng', label: 'Eng' }],
        }
    },
    methods: {
        onChange(item) {
            this.localLanguage = item.label
        },
        resetActiveNestedTab() {
            this.pages.forEach(item => (item.active = false))
        },
    },
    watch: {
        $route(to) {
            if (!to.path.includes('tour-packages')) {
                this.resetActiveNestedTab()
            }
            const tabname = to.path.split('/')[1]
            if (tabname === 'tour-packages') {
                this.pages.find(item => item.path === tabname).active = true
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.router-link-exact-active,
.active-nested-route {
    border-bottom: 3px solid #fa8b02;
}

.nav-links__buttons--select {
    width: 70px;
    ::v-deep {
        .vs__dropdown-toggle {
            cursor: pointer;
            border: none;
            background: transparent;
        }
        input {
            display: none;
        }
        &.vs--open {
            input {
                display: block;
            }
        }
        span.vs__selected {
            color: #33333380;
        }
        .vs__dropdown-menu {
            margin-top: 10px;
        }
    }
}
.header {
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.05);
    position: fixed;
    width: 100%;
    z-index: 99;
    font-size: 20px;
    font-weight: 600;
    padding: 20px 0 0 0;
    background: rgba(255, 255, 255, 0.8);
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        overflow: hidden;
        background-color: transparent;
        li {
            a {
                display: block;
                margin-right: 40px;
                width: max-content;
            }
            &.auth {
                margin-left: 24px;
                button.login {
                    background-color: transparent;
                }
            }
        }
    }
    .menu-btn {
        &:hover {
            background-color: #f4f4f4;
        }
        display: none;
        &:checked {
            ~ {
                .menu {
                    display: block;
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 5;
                    margin-top: 40px;
                    padding: 20px 50px 0 20px;
                    max-height: 350px;
                    width: 300px;
                    overflow-y: auto;
                    background-color: #fff;
                    li {
                        margin: 0 0 15px 0;
                    }
                }
                .menu-icon {
                    .navicon {
                        background: transparent;
                        &:before {
                            transform: rotate(-45deg);
                        }
                        &:after {
                            transform: rotate(45deg);
                        }
                    }
                    &:not(.steps) {
                        .navicon {
                            &:before {
                                top: 0;
                            }
                            &:after {
                                top: 0;
                            }
                        }
                    }
                }
            }
        }
    }
    .menu {
        clear: both;
        max-height: 0;
        // transition: max-height 0.2s ease-out;
    }
    .menu-icon {
        cursor: pointer;
        display: inline-block;
        padding: 28px;
        position: absolute;
        right: 0;
        user-select: none;
        z-index: 10;
        .navicon {
            background: #333;
            display: block;
            height: 2.5px;
            position: relative;
            // transition: background 0.2s ease-out;
            width: 22px;
            &:before {
                background: #333;
                content: '';
                display: block;
                height: 100%;
                position: absolute;
                transition: all 0.2s ease-out;
                width: 100%;
                top: 5px;
            }
            &:after {
                background: #333;
                content: '';
                display: block;
                height: 100%;
                position: absolute;
                transition: all 0.2s ease-out;
                width: 100%;
                top: -5px;
            }
        }
    }
}
@media (min-width: 991px) {
    .header {
        .menu {
            clear: none;
            float: right;
            max-height: none;
        }
        .menu-icon {
            display: none;
        }
    }
}

@media only screen and (max-width: 1599px) {
    .header {
        &__logo {
            width: 100px;
            height: 97px;
        }
    }
}

@media only screen and (max-width: 1359px) {
    .header {
        font-size: 16px;
        ul {
            li {
                a {
                    margin-right: 30px;
                }
                &.auth {
                    margin-left: 10px;
                }
            }
        }
    }
}

@media only screen and (max-width: 991px) {
    .header {
        &__logo {
            width: 80px;
            height: 78px;
        }
    }
}

@media only screen and (max-width: 576px) {
    .header {
        padding-top: 10px;
        &__logo {
            width: 58px;
            height: 56px;
        }
        .menu-btn:checked ~ .menu {
            width: 100%;
            margin-top: 0;
            padding-top: 60px;
        }
    }
}
</style>
