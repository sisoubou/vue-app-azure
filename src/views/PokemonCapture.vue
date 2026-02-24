<template>
  <div class="capture-page">
    <router-link to="/pokemons" class="back-link">Retour au Pokédex</router-link>  

    <h1>Mon équipe capturée</h1>

    <p v-if="teamStore.team.length === 0" style="text-align:center;">
        Vous n'avez pas capturé de Pokémon.
    </p>

    <ul v-else>
      <li v-for="pokemon in teamStore.team" :key="pokemon.id">
        <PokemonCard :pokemon="pokemon">
          
          <button class="release-button" @click="handleRelease(pokemon.id)">
            Relâcher 
          </button>

        </PokemonCard>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import PokemonCard from '@/components/PokemonCard.vue';
import { useTeamStore } from '@/store/pokemonCapture';

const teamStore = useTeamStore()

onMounted(() => {
  teamStore.fetchTeam()
})

const handleRelease = async (id) => {
  if(confirm("Voulez-vous vraiment relâcher ce Pokémon ?")) {
    await teamStore.releasePokemon(id)
  }
}
</script>

<style scoped>
.capture-page {
  padding: 20px;
}
h1 { text-align: center; margin: 20px 0; }
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  padding: 10px;
}
.back-link {
  display: inline-block;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.release-button {
  margin-top: 15px;
  padding: 8px 12px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #ff4d4d;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.release-button:hover {
  background-color: #cc0000;
}
</style>