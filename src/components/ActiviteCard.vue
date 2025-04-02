<template>
  <div class="container mx-auto p-4">
    <!-- Gestion du chargement et des erreurs -->
    <div v-if="loading" class="text-center text-gray-500">Chargement...</div>
    <div v-else-if="error" class="text-center text-red-500">Erreur : {{ error }}</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <!-- Boucle sur les activités pour afficher chaque card -->
      <div 
        v-for="activite in activites" 
        :key="activite.id" 
        class="bg-white rounded-lg shadow-lg hover:shadow-xl p-6 w-full transition duration-300"
      >
        <h1 class="text-lg font-bold text-gray-800">{{ activite.nom }}</h1>
        <p class="text-sm text-gray-600 mt-1">{{ activite.description }}</p>

        <!-- Liste des personnes associées -->
        <div class="mt-3">
          <h3 class="text-sm font-semibold text-gray-700">Personnes assignées :</h3>
          <ul class="mt-1 text-xs text-gray-600">
            <li v-if="!activite.personnes || activite.personnes.length === 0">
              Aucune personne assignée
            </li>
            <li v-for="personne in activite.personnes" :key="personne.id">
              {{ personne.nom }}
            </li>
          </ul>
        </div>

        <!-- Bouton pour voir les détails -->
        <button 
          class="mt-4 w-full bg-blue-500 text-white text-sm py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          @click="voirFichePresence(activite.id)"
        >
          Voir Fiche de Présence
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      activites: [],
      loading: true,
      error: null,
    };
  },
  async mounted() {
    try {
      // Récupérer le token depuis le localStorage
      const token = localStorage.getItem('token');

      // Vérifier si un token existe
      if (!token) {
        throw new Error('Token non trouvé. Veuillez vous connecter.');
      }

      // Effectuer la requête API avec le token dans l'en-tête Authorization
      const response = await axios.get("http://127.0.0.1:8000/api/activites-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      this.activites = response.data.activites;  // Axios parse automatiquement la réponse
    } catch (error) {
      this.error = error.message || "Une erreur est survenue";
    } finally {
      this.loading = false;
    }
  },
  methods: {
    voirFichePresence(id) {
      console.log("Bouton cliqué pour l'activité :", id);
      this.$router.push({ name: 'fichePresence', params: { id } });
    }
  }
};
</script>

<style scoped>
/* Ajout de styles spécifiques si nécessaire */
</style>
