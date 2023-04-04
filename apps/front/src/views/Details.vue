<template>
    <Spinner :label="'Loading movie details ...'" :loading="loading"/>
    <div class="md:flex no-wrap md:-mx-2" v-if="movie">
        <!-- Left Side -->
        <div class="w-full md:w-3/12 md:mx-2">
            <!-- Profile Card -->
            <div class="bg-white p-3 border-t-4 border-gray-500">
                <div class="image overflow-hidden">
                    <img class="h-auto w-full mx-auto"
                        :src="movie.Poster"
                        :alt="movie.Title">
                </div>
                <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{{ movie.Title }}</h1>
                <h3 class="text-gray-500 font-lg font-bold text-semibold">{{ movie.Genre }}</h3>
                <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 mt-2">
                    {{ movie.Plot }}
                </p>
                <ul
                    class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li class="flex items-center py-3">
                        <span class="font-bold">Type</span>
                        <span class="ml-auto">
                            <span class=" py-1 px-2 rounded text-sm font-bold" :class="getStyleForType">{{ movie.Type}}</span>
                        </span>
                    </li>
                    <li class="flex items-center py-3">
                        <span class="font-bold">Released</span>
                        <span class="ml-auto">{{ movie.Released }}</span>
                    </li>
                </ul>
            </div>
            <div class="my-4"></div>
            <div class="bg-white p-3 hover:shadow">
                <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                    <span class="text-gray-600">
                        <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </span>
                    <span>Actors</span>
                </div>
                <div class="grid grid-cols-3">
                    <div class="text-center my-2" v-for="actor in actors">
                        <img class="h-16 w-16 rounded-full mx-auto"
                            src="../assets/avatar.png"
                            alt="">
                        <a href="#" class="text-main-color">{{ actor }}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-4"></div>
        <!-- Right Side -->
        <div class="w-full md:w-9/12 md:mx-2 h-64">
            <div class="bg-white p-3 shadow-sm rounded-sm">
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span clas="text-green-500">
                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                    <span class="tracking-wide">About</span>
                </div>
                <div class="text-gray-700">
                    <div class="grid md:grid-cols-2 text-sm">
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Director</div>
                            <div class="px-4 py-2">{{ movie.Director }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Country</div>
                            <div class="px-4 py-2">{{ movie.Country }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Runtime</div>
                            <div class="px-4 py-2">{{ movie.Runtime }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Rated</div>
                            <div class="px-4 py-2">{{ movie.Rated }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Year</div>
                            <div class="px-4 py-2">{{ movie.Year }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">ImdbRating</div>
                            <div class="px-4 py-2">{{ movie.imdbRating }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">ImdbVotes</div>
                            <div class="px-4 py-2">
                                {{ movie.imdbVotes }}
                            </div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Website</div>
                            <div class="px-4 py-2">{{ movie.Website }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios";
import Spinner from "../components/Spinner.vue";

const route = useRoute();
const movie = ref();
const loading = ref(false);

const fetchMovie = async (id: string) => {
    try {
        loading.value = true;
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=4a5a2443`)
        if(response.status === 200) {
            movie.value = response.data
        }
    } catch (error) {

    } finally {
        loading.value = false
    }
}

const getStyleForType = computed(() => {
    return {
        'bg-blue-200 text-blue-700': movie.value.Type === 'movie',
        'bg-orange-200 text-orange-700': movie.value.Type === 'series',
        'bg-orange-200 text-ornage-700': movie.value.Type === 'series',
    }
});

const actors = computed(() => movie.value?.Actors.split(','))

onMounted(() => {
    fetchMovie(route.params.id as string);
})
</script>
<style scoped></style>