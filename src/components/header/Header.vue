<template>
    <header class="header">
        <div class="container">
            <div class="flex-between-center">
                <router-link :to="{ name: 'home' }" class="logo-link">
                    <img
                        class="cursor-pointer header__logo"
                        src="@/assets/icons/logo.svg"
                        :alt="$t('logo')"
                        width="133"
                        height="130"
                    />
                </router-link>
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
                            ref="selectLang"
                            class="nav-links__buttons--select"
                            appendToBody
                            :options="languages"
                            :value="languages.find(el => el.value === locale).label"
                            :clearable="false"
                            :filterable="false"
                            :searchable="false"
                            v-click-outside="() => $refs.selectLang.open = false"
                            @input="onChange"
                        ></v-select>
                    </li>

                    <template v-if="!token">
                        <li class="auth">
                            <button class="login" @click="authModalType = 'login'">
                                {{ $t('login') }}
                            </button>
                        </li>
                        <li class="auth">
                            <PrimaryButton :label="$t('signUp')" @onClick="authModalType = 'register'" />
                        </li>
                    </template>
                    <template v-else>
                        <div class="header__user">
                            <img
                                src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                                :alt="$t('userImage')"
                                @click="toggleDropdown"
                            />
                        </div>
                        <div class="header__dropdown flex-col-start-start" v-if="isDropdownOpen">
                            <ul>
                                <li class="flex-start-center" @click="redirectToMyTickets">
                                    <img src="@/assets/icons/tickets.svg" :alt="$t('icon')" />
                                    <span>{{ $t('myTickets') }}</span>
                                </li>
                                <li class="flex-start-center" @click="onLogout">
                                    <img src="@/assets/icons/logout.svg" :alt="$t('icon')" />
                                    <span>{{ $t('logout') }}</span>
                                </li>
                            </ul>
                        </div>
                    </template>
                </ul>
            </div>
        </div>
        <Auth :type="authModalType" @close="authModalType = ''" />
    </header>
</template>

<script>
import { mapActions } from 'vuex'
import 'vue-select/dist/vue-select.css'

// Components
import vSelect from 'vue-select'
import PrimaryButton from '@/components/PrimaryButton'
import Auth from '@/views/authentication/Auth'

export default {
    name: 'HeaderComponent',
    components: { vSelect, PrimaryButton, Auth },
    props: {
        offsetWidth: {
            type: Number,
            default: 1920,
        },
    },
    data() {
        return {
            token: localStorage.getItem('token'),
            isDropdownOpen: false,
            locale: localStorage.getItem('locale'),
            authModalType: '',
            pages: [
                { name: this.$t('home'), url: 'home', path: 'home', active: false },
                { name: this.$t('aboutUs'), url: 'aboutUs', path: 'about-us', active: false },
                { name: this.$t('tourPackages'), url: 'tourPackages', path: 'tour-packages', active: false },
                { name: this.$t('contactUs'), url: 'contactUs', path: 'contact-us', active: false },
            ],
            languages: [{ value: 'en', label: 'Eng' }],
        }
    },
    methods: {
        ...mapActions('authModule', ['handleLogout']),
        onChange(item) {
            if (localStorage.getItem('locale') === item.value) return
            localStorage.setItem('locale', item.value)
            window.location.reload()
        },
        resetActiveNestedTab() {
            this.pages.forEach(item => (item.active = false))
        },
        redirectToMyTickets() {
            this.$router.push({ name: 'myTickets' })
            if (this.offsetWidth > 991) {
                this.isDropdownOpen = false
            } else {
                document.getElementById('menu-btn').checked = false
            }
        },
        onLogout() {
            this.handleLogout()
        },
        toggleDropdown() {
            if (this.offsetWidth < 991) return
            this.isDropdownOpen = !this.isDropdownOpen
        },
    },
    watch: {
        $route(to) {
            // if (this.$route.fullPath === to.fullPath) return
            if (!to.path.includes('tour-packages')) {
                this.resetActiveNestedTab()
            }
            const tabname = to.path.split('/')[1]
            if (tabname === 'tour-packages') {
                this.pages.find(item => item.path === tabname).active = true
            }
        },
        offsetWidth(width) {
            this.isDropdownOpen = width < 991
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
    ::v-deep() {
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
    .logo-link {
        border-bottom: none !important;
    }
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

    &__user {
        position: relative;
        img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            margin-left: 24px;
            cursor: pointer;
        }
    }
    &__dropdown {
        width: 210px;
        position: absolute;
        right: 15%;
        bottom: -111px;
        z-index: 101;
        background-color: #fff;
        box-shadow: 0px 6px 10px rgba(87, 87, 87, 0.15);
        border-radius: 12px;
        ul {
            width: 100%;
            margin: 0;
            padding: 0;
            list-style: none;
            overflow: hidden;
            li {
                padding: 14px 24px;
                width: 100%;
                border-bottom: 1px solid silver;
                cursor: pointer;
                gap: 0 10px;
                color: #333333;
                font-weight: 400;
                font-size: 18px;
                &:last-child {
                    border: none;
                }
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
        font-size: 16px;
        &__logo {
            width: 100px;
            height: 97px;
        }
        &__dropdown {
            ul {
                li {
                    font-size: 16px;
                }
            }
        }
    }
}

@media only screen and (max-width: 1359px) {
    .header {
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
        &__dropdown {
            right: 11%;
        }
    }
}

@media only screen and (max-width: 1199px) {
    .header {
        &__dropdown {
            right: 8%;
        }
    }
}

@media only screen and (max-width: 991px) {
    .header {
        font-size: 14px;
        &__logo {
            width: 80px;
            height: 78px;
        }
        .menu-btn {
            &:checked {
                ~ {
                    .menu {
                        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                        .header__user {
                            img {
                                margin: 0;
                            }
                        }
                        .header__dropdown {
                            display: block;
                            width: 100%;
                            margin-right: -23px;
                            box-shadow: none;
                            border-radius: 0;
                            ul {
                                li {
                                    margin: 0;
                                }
                            }
                        }
                    }
                }
            }
        }
        &__dropdown {
            display: none;
            ul {
                li {
                    font-size: 14px;
                }
            }
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
