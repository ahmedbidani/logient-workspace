<template>
    <div class="flex justify-center w-full shadow p-5 rounded-lg bg-white">
      <form class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Title
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name" type="text" placeholder="Example: Batman" v-model="searchForm.searchQuery">
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Year
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name" type="number" placeholder="Example: 2010" v-model="searchForm.year">
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-4">
          <ul
            class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                <input id="horizontal-list-radio-license" type="radio" value="movie" name="pickedType"
                  v-model="searchForm.pickedType"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                <label for="horizontal-list-radio-license"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Movies</label>
              </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                <input id="horizontal-list-radio-id" type="radio" value="series" name="pickedType"
                  v-model="searchForm.pickedType"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                <label for="horizontal-list-radio-id"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Series</label>
              </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                <input id="horizontal-list-radio-millitary" type="radio" value="episode" name="pickedType"
                  v-model="searchForm.pickedType"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                <label for="horizontal-list-radio-millitary"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Episodes</label>
              </div>
            </li>
          </ul>
  
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, watch } from 'vue';
  import debounce from "lodash.debounce";
  import { SearchFormType } from '../types';
  
  const searchForm = reactive<SearchFormType>({ searchQuery: null, year: null, pickedType: null })
  
  
  const emit = defineEmits(['searchMovies'])
  
  watch(searchForm,
    debounce((formValues: SearchFormType) => {
      if (formValues.searchQuery != '') {
        emit('searchMovies', {
          s: formValues.searchQuery,
          y: formValues.year,
          type: formValues.pickedType
        });
      }
    }, 500)
  )
  
  </script>
  
  <style scoped></style>