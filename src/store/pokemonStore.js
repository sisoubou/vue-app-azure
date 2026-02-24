import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', () => {
  const listPokemon = ref([])

  const fetchPokemons = async () => {
    try {
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0'
  )

  const detailedPokemons = await Promise.all(
    response.data.results.map(async (p) => {
      const pokemonResponse = await axios.get(p.url)

      const data = pokemonResponse.data

      return {
        name: data.name,
        numero: data.id,
        type: data.types.map(t => t.type.name),
        image: data.sprites.front_default
      }
    })
  )

  listPokemon.value = detailedPokemons

} catch (error) {
  console.error('Erreur lors du chargement des Pokémon', error)
}
  }

  return { listPokemon, fetchPokemons }
})
