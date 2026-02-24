import { createRouter, createWebHistory } from 'vue-router'
import PokemonDetailView from '@/views/PokemonDetailView.vue'
import PokemonListView from '@/views/PokemonListView.vue'
import HomeView from '@/views/HomeView.vue'
import PokemonCapture from '@/views/PokemonCapture.vue'

const routes = [
    {path: '/', name: 'home', component: HomeView},
    {path: '/pokemons', name: 'pokedex', component: PokemonListView},
    {path: '/pokemons/:id', name: 'pokemon-detail', component: PokemonDetailView},
    {path: '/:pathMatch(.*)*', name: 'not-found', component: { template: '<p>Page non trouvé !<p>'}},
    {path: '/captures', name: 'captures', component: PokemonCapture},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router