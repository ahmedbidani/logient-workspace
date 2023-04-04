<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import FavoriteIcon from "../components/FavoriteIcon.vue";
import UnFavroiteIcon from "../components/UnFavoriteIcon.vue";
import { Movie } from "../types";
import { useMainStore } from "../store";
import { useAuth } from '../hooks';

const router = useRouter()
const main = useMainStore();
const { loggedIn } = useAuth();

const { movie } = defineProps<{ movie: Movie }>()

const getStyleForType = computed(() => {
    return {
        'bg-blue-200 text-blue-700': movie.Type === 'movie',
        'bg-orange-200 text-orange-700': movie.Type === 'series',
        'bg-orange-200 text-ornage-700': movie.Type === 'series',
    }
});

const isFavorite = computed(() => {
    console.log(main.getAllFavorites)
    return main.getAllFavorites.find(m => m.imdbID === movie.imdbID);
})
const goToDetailsMovie = (id: string) => {
    router.push({
        name: 'MovieDetails',
        params: {
            id
        },
    })
}

</script>

<template>
    <div class="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md" style="min-height: 160px">
        <div>
            <div class="absolute top-0 right-0 mt-2 mr-2 p-4 z-20 flex justify-between" v-if="loggedIn()">
                <div class="inline-flex items-center justify-center w-8 h-8 p-2 rounded-full bg-white shadow-sm">
                    <UnFavroiteIcon :movie="movie" v-if="!isFavorite" />
                    <FavoriteIcon :id="movie.imdbID" v-else />
                </div>
            </div>

            <div class="relative block h-full">
                <img :src="movie.Poster" class="h-40 object-cover w-full bg-gray-100 rounded-lg" />
            </div>
        </div>

        <h2 class="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
            {{ movie.Title }}
        </h2>

        <div class="w-full mt-2 flex justify-between">
            <div draggable="true" role="button" title="Hover chip"
                class="h-8 px-3 w-max flex gap-2 items-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 hover:bg-opacity-75 focus:bg-gray-300 focus:text-blue-900 active:text-primary active:bg-blue-100 disabled:bg-gray-100 disabled:text-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:active:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-calendar-fill" viewBox="0 0 16 16">
                    <path
                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z" />
                </svg>
                <span class="block text-sm font-medium">{{ movie.Year }}</span>
            </div>
            <div draggable="true" role="button" title="Hover chip" :class="getStyleForType"
                class="h-8 px-3 w-max flex gap-2 items-center rounded-full hover:bg-gray-300 hover:bg-opacity-75 focus:bg-gray-300 focus:text-blue-900 active:text-primary active:bg-blue-100 disabled:bg-gray-100 disabled:text-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:active:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-camera-reels-fill" viewBox="0 0 16 16">
                    <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    <path
                        d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z" />
                </svg>
                <span class="block text-sm font-medium">{{ movie.Type }}</span>
            </div>
        </div>


        <button @click="goToDetailsMovie(movie.imdbID)"
            class="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md w-full">
            Show Details
        </button>
    </div>
</template>

<style scoped></style>