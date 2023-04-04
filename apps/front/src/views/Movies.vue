<template>
    <SearchBar @searchMovies="search" />
    <Spinner :label="'Loading movies ...'" :loading="movies.loading" />

    <div class="w-full p-6" v-if="movies.data.length === 0 && !movies.loading">
        <p class="text-center md:text-base sm:text-sm text-gray-700">Whoops!! No movies match founded.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full justify-center">
        <Movie v-for="movie in movies.data" :movie="movie" />
    </div>
    <div class="flex w-full justify-center pt-2 items-center" v-if="isFinished">
        <button :disabled="movies.loading"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded inline-flex items-center"
            @click="loadMore">
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Load More</span>
        </button>
    </div>
</template>

<script setup lang="ts">

import axios from "axios";
import { computed, reactive } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import Movie from "../components/Movie.vue";
import SearchBar from "../components/SearchBar.vue";
import Spinner from "../components/Spinner.vue";
import { MovieQueryParams } from "../types";

const movies = reactive({ data: [], loading: false, page: 1, total: 0, success: false, params: {} as MovieQueryParams });

const isFinished = computed(() => {
    const length = movies.data.length
    return length > 0 && length <= movies.total
})

const search = async (params: MovieQueryParams) => {
    movies.params = params;
    let sanitizedParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null));

    const searchParams = new URLSearchParams(sanitizedParams);
    searchParams.append('page', movies.page.toString())
    searchParams.append('apikey', '4a5a2443')

    movies.loading = true;
    try {
        const response = await axios.get(`http://www.omdbapi.com/?${searchParams}`)
        if (response.data.Response == 'True') {
            movies.total = parseInt(response.data.totalResults);
            movies.data = response.data.Search
        } else {
            throw new Error("Error during fetching movies");
        }
    } catch (error) {
        toast("Whoops!! Error occuring...", {
            autoClose: 1000,
            type: 'error'
        });
    } finally {
        movies.loading = false;
    }
}

const loadMore = async () => {
    if (movies.data.length <= movies.total) {
        movies.page++;
        let sanitizedParams = Object.fromEntries(Object.entries(movies.params).filter(([_, v]) => v != null));

        const searchParams = new URLSearchParams(sanitizedParams);
        searchParams.append('page', movies.page.toString())
        searchParams.append('apikey', '4a5a2443')
        try {
            const response = await axios.get(`http://www.omdbapi.com/?${searchParams}`)
            if (response.data.Response == 'True') {
                movies.total = parseInt(response.data.totalResults);
                movies.data = [...movies.data, ...response.data.Search] as never[];
            } else {
                throw new Error("Error during fetching movies");
            }
        } catch (error) {
            toast("Whoops!! Error occuring...", {
                autoClose: 1000,
                type: 'error'
            });
        } finally {
            movies.loading = false;
        }
    }
}
</script>

<style scoped></style>