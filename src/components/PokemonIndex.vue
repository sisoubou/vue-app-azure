<script setup>
import PokemonCard from './PokemonCard.vue'
import SearchInput from './SearchInput.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonFavorites } from '@/store/pokemonFavorites'
import { usePokemonStore } from '@/store/pokemonStore'
import { useTeamStore } from '@/store/pokemonCapture'

const searchQuery = ref('')
const router = useRouter()
const showFavoritesOnly = ref(false)

const favoriteStore = usePokemonFavorites()
const pokemonStore = usePokemonStore()
const teamStore = useTeamStore()

onMounted(async () => {
  if (pokemonStore.listPokemon.length === 0) {
    await pokemonStore.fetchPokemons()
  }
  await teamStore.fetchTeam()
})

const isFavorite = (pokemon) =>
  favoriteStore.favorites.some(p => p.numero === pokemon.numero)

const toggleFavorite = (pokemon) => {
  if (isFavorite(pokemon)) favoriteStore.removeFavorite(pokemon)
  else favoriteStore.addFavorite(pokemon)
}

const isCaptured = (pokemon) => teamStore.isCaptured(pokemon)

const toggleCaptured = async (pokemon) => {
  await teamStore.capturePokemon(pokemon)
}

const filteredList = computed(() => {
  return pokemonStore.listPokemon.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesFavorite = showFavoritesOnly.value ? isFavorite(pokemon) : true
    return matchesName && matchesFavorite
  })
})

const goToPokemonDetail = (pokemon) => {
  router.push(`/pokemons/${pokemon.numero}`)
}
</script>


<template>
  <h1>Pokédex</h1>

  <SearchInput v-model="searchQuery" />

  <div class="filter-container">
    <label>
        <input type="checkbox" v-model="showFavoritesOnly" />
        Afficher les favoris
    </label>
    <h2>{{ filteredList.length }} résultats</h2>
  </div>

    <ul>
        <li v-for="pokemon in filteredList" :key="pokemon.numero">
            <PokemonCard :pokemon="pokemon" @pokemonSelected="goToPokemonDetail">

               <button class="favorite-button" :class="{ 'is-favorite': isFavorite(pokemon)}" @click.stop="toggleFavorite(pokemon)">
                    {{  isFavorite(pokemon) ? '♥ Retirer' : '♡ Ajouter' }}
                </button>
                <button
                    class="capture-button"
                    :class="{ 'is-captured': isCaptured(pokemon) }"
                    @click.stop="toggleCaptured(pokemon)"
                    :disabled="isCaptured(pokemon)"
                    >
                    {{ isCaptured(pokemon) ? 'Capturé' : 'Capturer' }}
                </button>


            </PokemonCard>
        </li>
    </ul>
</template>

<style scoped>
    h1 {
        text-align: center;
        color: rgb(255, 255, 255); 
        font-size: 3rem;
        margin-top: 1rem;
    }
    
    ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 50px;
        padding: 10px;
    }

    .favorite-button {
        margin-top: 10px;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        background-color: white;
        transition: 0.3s;
    }

    .favorite-button.is-favorite {
        background-color: #ff6961;
        color: white;
        border-color: #ff6961;
    }

    .filter-container {
    text-align: center;
    margin: 10px 0;
    font-size: 1.2rem;
    color: #333; 
    }

    .filter-container input {
        margin-right: 10px;
        transform: scale(1.5);
        cursor: pointer;
    }
    .capture-button {
        margin-top: 10px;
        margin-left: 10px;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        background-color: white;
        transition: 0.3s;
    }

    .capture-button.is-captured {
        background-color: #77dd77;
        color: white;
        border-color: #77dd77;
    }

    .capture-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

</style>