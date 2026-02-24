<template>
  <div class="home">
    <h1>Welcome to the Home Page</h1>
    <button @click="goToPokedex">Voir les Pokémons</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToPokedex = () => {
  router.push('/pokemons')
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

button {
  background-color: #a2e18c;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

button:hover {
  background-color: #0a7400;
}
</style>