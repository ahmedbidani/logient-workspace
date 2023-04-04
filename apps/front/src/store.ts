
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Movie } from './types';

type FavoriteType = {
    [key: string|number]: { items: Array<Movie>}
}

export const useMainStore = defineStore({
    id: 'main',
    state: () => ({
        favorites: useStorage('todos', {} as FavoriteType),
    }),
    getters: {
        getAllFavorites(): Array<Movie> {
            const user = localStorage.getItem('user') as string
            return this.favorites[user]['items'];
        },
    },
    actions: {
        addFavorite(favorite: Movie) {
            const user = localStorage.getItem('user') as string
            if (!this.favorites[user]) {
                this.favorites[user] = { items: [] }
            }
            this.favorites[user].items.push(favorite)

        },
        removeFavorite(index: string) {
            const user = localStorage.getItem('user') as string
            let items = this.favorites[user].items
            items = items.filter(item => item.imdbID !== index)
            this.favorites[user] = { items }
        }

    },
})