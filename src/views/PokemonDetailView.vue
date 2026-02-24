<template>
  <router-link to="/pokemons">Retour</router-link>  

  <div class="pokemon-view" v-if="pokemon">
    <PokemonCard :pokemon="pokemon"/>
  </div>

  <p v-else>Pokémon introuvable </p>
</template>


<script setup>
import { usePokemonStore } from '../store/pokemonStore';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import PokemonCard from '@/components/PokemonCard.vue';

const store = usePokemonStore()
const route = useRoute()

const pokemon = computed(() =>{
  const idFromRoute = route.params.id
  return store.listPokemon.find(p => p.numero === idFromRoute)
})
</script>

<style scoped>
.detail-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
}

.back-link {
    margin-bottom: 2rem;
    font-size: 1.2rem;
}

.center-card {
    transform: scale(1.2); 
    margin-top: 20px;
}
</style>
