
<template>
    <div class="p-4">
      <h1 class="text-2xl font-semibold mb-4">Liste des Personnes</h1>
      <table class="min-w-full table-auto border-separate border-spacing-0">
        <thead class="bg-gray-200">
          <tr>
            <th class="border-b p-3 text-left text-sm font-medium text-gray-700">Nom</th>
            <th class="border-b p-3 text-left text-sm font-medium text-gray-700">Âge</th>
            <th class="border-b p-3 text-left text-sm font-medium text-gray-700">Tel</th>
            <th class="border-b p-3 text-left text-sm font-medium text-gray-700">Email</th>
            <th class="border-b p-3 text-left text-sm font-medium text-gray-700">Organisation</th>
            <th class="border-b p-3 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="person in personnes" :key="person.id" class="hover:bg-gray-100 transition-colors">
            <td class="border-b p-3 text-sm text-gray-700">{{ person.nom }}</td>
            <td class="border-b p-3 text-sm text-gray-700">{{ person.age }}</td>
            <td class="border-b p-3 text-sm text-gray-700">{{ person.tel }}</td>
            <td class="border-b p-3 text-sm text-gray-700">{{ person.email }}</td>
            <td class="border-b p-3 text-sm text-gray-700">{{ person.organisation }}</td>
            <td class="border-b p-3 text-sm text-gray-700 flex space-x-2">
              <!-- Icône Voir (œil) -->
              <router-link :to="'/personne/' + person.id" class="text-blue-500 hover:underline">
              <EyeIcon class="w-5 h-5 inline mr-2" />
              Voir
              </router-link>
              
              <!-- Icône Éditer (crayon) -->
              <button @click="editPerson(person)" class="text-green-500 hover:text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4"> <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" /> <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" /> </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  
  import { ref, onMounted } from 'vue';
  import axios from '../services/axios'; 
  
  const personnes = ref([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get('/personnes');
      personnes.value = response.data.data; 
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error.message);
    }
  });
  
  // Fonction pour afficher les détails de la personne
  const voirDetails = (person) => {
    console.log('Détails de la personne:', person);
    // Rediriger vers une page de détails ou afficher dans un modal
  };
  
  // Fonction pour éditer une personne
  const editPerson = (person) => {
    console.log('Modifier la personne:', person);
    // Logique d'édition, comme l'ouverture d'un formulaire d'édition
  };
  </script>
  