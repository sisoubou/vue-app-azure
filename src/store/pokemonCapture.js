import { defineStore } from 'pinia'
import { ref } from 'vue'
import { teamApi } from '@/services/teamApi'

export const useTeamStore = defineStore('team', () => {
  const team = ref([])

  const fetchTeam = async () => {
    try {
      const response = await teamApi.get('/team')
      team.value = response.data
    } catch (error) {
      console.error('Erreur GET /team', error)
    }
  }

  const isCaptured = (pokemon) => {
    return team.value.some(p => p.numero === pokemon.numero)
  }

  const capturePokemon = async (pokemon) => {
    try {
      if (isCaptured(pokemon)) return

      // On envoie les infos nécessaires
      await teamApi.post('/team', {
        numero: pokemon.numero,
        name: pokemon.name,
        image: pokemon.image,
        type: pokemon.type
      })

      await fetchTeam()
    } catch (error) {
      console.error('Erreur POST /team', error)
    }
  }

  const releasePokemon = async (id) => {
    try {
      await teamApi.delete(`/team/${id}`)
      await fetchTeam()
    } catch (error) {
      console.error('Erreur DELETE /team', error)
    }
  }

  return { team, fetchTeam, isCaptured, capturePokemon, releasePokemon }
})