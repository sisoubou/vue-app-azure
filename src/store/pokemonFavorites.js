import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePokemonFavorites = defineStore('favorites', () => {
    const favorites = ref([]);

    const favoritesCount = computed(() => favorites.value.length);
    
    const addFavorite = (pokemon) => {
        const exists = favorites.value.find(p => p.numero === pokemon.numero);
        if (!exists) {
            favorites.value.push(pokemon);
        }
    };

    const removeFavorite = (pokemonToRemove) => {
        favorites.value = favorites.value.filter((p) => p.numero !== pokemonToRemove.numero);
    };

    return { favorites, favoritesCount, addFavorite, removeFavorite };
});