<template>
    <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
            <svg id="changeColor" fill="#000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                width="54" zoomAndPan="magnify" viewBox="0 0 375 374.9999" height="54" preserveAspectRatio="xMidYMid meet"
                version="1.0">
                <defs>
                    <path id="pathAttribute"
                        d="M 7.09375 7.09375 L 367.84375 7.09375 L 367.84375 367.84375 L 7.09375 367.84375 Z M 7.09375 7.09375 "
                        fill="#ffffff" stroke-width="0" stroke="#727272"></path>
                </defs>
                <g>
                    <path id="pathAttribute"
                        d="M 187.46875 7.09375 C 87.851562 7.09375 7.09375 87.851562 7.09375 187.46875 C 7.09375 287.085938 87.851562 367.84375 187.46875 367.84375 C 287.085938 367.84375 367.84375 287.085938 367.84375 187.46875 C 367.84375 87.851562 287.085938 7.09375 187.46875 7.09375 "
                        fill-opacity="1" fill-rule="nonzero" fill="#ffffff" stroke-width="0" stroke="#727272"></path>
                </g>
                <g id="inner-icon" transform="translate(85, 75)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="199.8" height="199.8" fill="b" class="bi bi-film"
                        viewBox="0 0 16 16" id="IconChangeColor">
                        <path
                            d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"
                            id="mainIconPathAttribute"></path>
                    </svg>
                </g>
            </svg>
            <span class="font-semibold text-xl tracking-tight">Movies App</span>
        </div>
        <div class="block lg:hidden">
            <button
                class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-md font-semibold" :class="{'lg:flex-grow': !isLoggedIn}">
                <router-link :to="{ name: 'Movies' }"
                    class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                    Movies
                </router-link>
            </div>
            <div class="text-md lg:flex-grow font-semibold" v-if="isLoggedIn">
                <router-link :to="{ name: 'Favorites' }"
                    class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                    Favorites
                </router-link>
            </div>
            <div>
                <button @click="logOut"
                    class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                    v-if="isLoggedIn">
                    Logout
                </button>
                <router-link v-if="!isLoggedIn" :to="{ name: 'Login' }"
                    class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                    Login
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '../hooks';

const router = useRouter();
const route = useRoute();
const isLoggedIn = ref<string | null>(null)

const { loggedIn, logOut: removeToken } = useAuth();


const logOut = () => {
    removeToken()
    router.push({
        name: 'Login'
    })
}

watch(() => route.path, () => {
    isLoggedIn.value = loggedIn();
})

</script>

<style scoped></style>