<template>
  <div class="container mx-auto px-6 py-8">
    <!-- Header -->
    <h3 class="text-2xl font-bold text-gray-800 mb-8 tracking-tight text-center">
    Détails de la personne
  </h3>


    <!-- Loading State -->
    <div v-if="loading" class="text-center">
      <span class="text-gray-600 text-lg animate-pulse">Chargement...</span>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center">
      <span class="text-red-500 font-medium bg-red-50 px-4 py-2 rounded-lg inline-block">
        {{ error }}
      </span>
    </div>

    <!-- Person Details -->
    <div v-if="personne" class="max-w-2xl mx-auto">
      <div class="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <!-- Grid Layout for Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <p class="flex items-center">
              <span class="font-semibold text-gray-700 w-28">Nom :</span>
              <span class="text-gray-900">{{ personne.nom }}</span>
            </p>
            <p class="flex items-center">
              <span class="font-semibold text-gray-700 w-28">Âge :</span>
              <span class="text-gray-900">{{ personne.age }}</span>
            </p>
            <p class="flex items-center">
              <span class="font-semibold text-gray-700 w-28">Téléphone :</span>
              <span class="text-gray-900">{{ personne.tel }}</span>
            </p>
            <p class="flex items-center">
              <span class="font-semibold text-gray-700 w-28">Email :</span>
              <span class="text-gray-900">{{ personne.email }}</span>
            </p>
            <p class="flex items-center">
              <span class="font-semibold text-gray-700 w-28">Facebook :</span>
              <span class="text-gray-900">{{ personne.fb }}</span>
            </p>
          </div>
          <div class="space-y-4">
            <p class="flex items-center">
              <span class="font-semibold text-gray-700 w-28">PSH :</span>
              <span :class="[
                personne.psh === 1 
                  ? 'text-green-600 bg-green-100' 
                  : 'text-red-600 bg-red-100',
                'px-2 py-1 rounded-full text-sm font-medium'
              ]">
                {{ personne.psh === 1 ? 'Oui' : 'Non' }}
              </span>
            </p>
            <p class="flex items-center">
              <span class="font-semibold text-gray-700 w-28">Fonction :</span>
              <span class="text-gray-900">{{ personne.fonction_fiche }}</span>
            </p>
            <p class="flex items-center">
              <span class="font-semibold text-gray-700 w-28">Organisation :</span>
              <span class="text-gray-900">{{ personne.organisation }}</span>
            </p>
            <p class="flex items-center">
              <span class="font-semibold text-gray-700 w-28">Région :</span>
              <span class="text-gray-900">{{ personne.region }}</span>
            </p>
            <p class="flex items-center">
              <span class="font-semibold text-gray-700 w-28">District :</span>
              <span class="text-gray-900">{{ personne.district }}</span>
            </p>
            <p class="flex items-center">
              <span class="font-semibold text-gray-700 w-28">Commune :</span>
              <span class="text-gray-900">{{ personne.commune }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from '@/services/axios';

export default {
  data() {
    return {
      personne: null,
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchPersonneDetails();
  },
  methods: {
    async fetchPersonneDetails() {
      const { id } = this.$route.params;
      try {
        const response = await axios.get(`/personnes/${id}`);
        this.personne = response.data.data;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
