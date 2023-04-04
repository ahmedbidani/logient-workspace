<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full justify-center">
        <Movie v-for="movie in favorites" :movie="movie" />
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useMainStore } from "../store";
import Movie from "../components/Movie.vue";

const main = useMainStore();


const favorites = computed(() => {
    return main.getAllFavorites
})
</script>
<style scoped></style>