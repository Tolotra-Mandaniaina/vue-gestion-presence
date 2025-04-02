<template>
    <div class="container mx-auto p-4">
      <div v-if="personne" class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Détails de la personne</h2>
        <p><strong>Nom :</strong> {{ personne.nom }}</p>
        <p><strong>Age :</strong> {{ personne.age }}</p>
        <p><strong>Téléphone :</strong> {{ personne.tel }}</p>
        <p><strong>Email :</strong> {{ personne.email }}</p>
        <p><strong>Organisation :</strong> {{ personne.organisation }}</p>
        <p><strong>Région :</strong> {{ personne.region }}</p>
        <p><strong>District :</strong> {{ personne.district }}</p>
        <p><strong>Commune :</strong> {{ personne.commune }}</p>
        
        <h3 class="mt-4 font-semibold">Fonctions :</h3>
        <ul class="list-disc ml-6">
          <li v-for="fonction in personne.fonctions" :key="fonction.id">
            {{ fonction.nom }}: {{ fonction.description }}
          </li>
        </ul>
      </div>
      <div v-else class="text-center">
        <p>Chargement...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })
  
  const personne = ref(null)
  
  const fetchPersonneDetails = async () => {
    try {
      const response = await axios.get(`/personnes/${props.id}`)
      personne.value = response.data.data
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error)
    }
  }
  
  onMounted(() => {
    fetchPersonneDetails()
  })
  </script>
  
  <style scoped>
  /* Personnaliser les styles si nécessaire */
  </style>
  